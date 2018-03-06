import React from 'react';

class App extends React.Component {
    addAnecdote = (event) => {
        event.preventDefault()
        this.props.store.dispatch({
            type: 'ADD',
            content: event.target.anec.value

        })
        event.target.anec.value = ''
    }


    render() {
        const anecdotes = this.props.store.getState().sort((a,b) => b.votes - a.votes)

        return (
        <div>
            <h2>Anecdotes</h2>
            {anecdotes.map(anecdote=>
            <div key={anecdote.id}>
                <div>
                {anecdote.content} 
                </div>
                <div>
                has {anecdote.votes}
                <button onClick={() => this.props.store.dispatch({ type: 'VOTE', id: anecdote.id })}>vote</button>
                </div>
            </div>
            )}
            <h2>create new</h2>
            <form onSubmit={this.addAnecdote}>
                <div><input name='anec'/></div>
                <button type='submit'>create</button> 
            </form>
        </div>
        )
    }
}

export default App