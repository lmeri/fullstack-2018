import React from 'react'
import { connect } from 'react-redux'
import Filter from './Filter'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { notify } from '../reducers/notificationReducer'

class AnecdoteList extends React.Component {

  vote = async (anecdote) => {
    this.props.voteAnecdote(anecdote)
    this.props.notify('you voted for "' + anecdote.content + '"', 5)
  }

  render() {
    const style = {
      margin: 7
    }

    return (
      <div>
        <Filter />
        <h2>Anecdotes</h2>
        {this.props.anecdotes.sort((a, b) => b.votes - a.votes).map(anecdote =>
          <div key={anecdote.id} style={style}>
            <div>
              {anecdote.content}
            </div>
            <div>
              has {anecdote.votes}
              <button onClick={() => this.vote(anecdote) }>
                vote
              </button>
            </div>
          </div>
        )}
      </div>
    )
  }
}

const filteredAnecdotes = (anec, f) => {
  return anec.filter((a) => a.content.toLowerCase().includes(f.toLowerCase()))
}

const mapStateToProps = (state) => {
  return {
    anecdotes: filteredAnecdotes(state.anecdotes, state.filter)
  }
}

const ConnectedAnecdotes = connect(
  mapStateToProps, { voteAnecdote, notify }
)(AnecdoteList)

export default ConnectedAnecdotes