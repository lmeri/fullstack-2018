import React from 'react'
import ReactDOM from 'react-dom'

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            selected: 0,
            votes: Array(anecdotes.length).fill(0)
        }
    }

    clickNext = () => { 
        const num = Math.floor(Math.random() * anecdotes.length);
        return () => {
            this.setState({
                selected: num
            })
        }   
    }

    vote = () => { 
        const voted = [...this.state.votes];
        voted[this.state.selected] += 1;
        return () => {
            this.setState({
                votes: voted
            })
        }   
    }

    max = () => {
        let max = Math.max(...this.state.votes);
        return (
            max
        )        
    }

    render() {
        return (
            <div> 
                <Anecdote anecdote={this.props.anecdotes[this.state.selected]} votes={this.state.votes[this.state.selected]} />
                <Button click={this.clickNext()} buttontext="next anecdote" />
                <Button click={this.vote()} buttontext="give a vote" />
                <Title />
                <Anecdote anecdote={this.props.anecdotes[this.state.votes.indexOf(this.max())]} votes={this.max()} />
            </div>
        )
    }
}

const Title = () => {
    return (
    <div>
        <h2>anecdote with most votes</h2>
    </div>
    )
}

const Button = ({click, buttontext}) => (
    <button onClick={click}>{buttontext}</button>
)

const Anecdote = ({votes, anecdote}) => {
    return (
        <div>
            <p>{anecdote}</p>
            <p>currently has {votes} votes</p>
        </div>
    ) 
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />, document.getElementById('root')
)