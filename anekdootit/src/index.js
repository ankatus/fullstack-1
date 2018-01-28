import React from 'react'
import ReactDOM from 'react-dom'

const Button = ({ handler, text }) => {
    return (
        <button onClick={handler}>{text}</button>
    )
}

const MostVotes = ({ anecdote, votes }) => {
    return (
        <div>
            <p>{anecdote}</p>
            <p>has {votes} votes</p>
        </div>
    )
}

const MostVotesHeader = () => {
    return (
        <h1>anecdote with most votes:</h1>
    )
}

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            selected: 0,
            votes: [0, 0, 0, 0, 0, 0]
        }
    }

    randomNumber() {
        const randomInteger = Math.floor(Math.random() * 6)
        return randomInteger
    }

    vote = () => {
        const votesCopy = this.state.votes
        votesCopy[this.state.selected] = votesCopy[this.state.selected] + 1
        this.setState({ votes: votesCopy })
    }

    nextAnecdote = () => {
        this.setState({ selected: this.randomNumber() })
    }

    indexOfMostVotes = () => {
        let most = 0;
        let index = 0;

        for (let i = 0; i < this.state.votes.length; i++) {
            if (this.state.votes[i] > most) {
                most = this.state.votes[i]
                index = i;
            }
        }
        return index;
    }

    render() {
        return (
            <div>
                <Button handler={this.nextAnecdote} text="next anecdote" />
                <Button handler={this.vote} text="vote" />
                <p>{this.props.anecdotes[this.state.selected]}</p>
                <p>has {this.state.votes[this.state.selected]} points</p>
                <MostVotesHeader />
                <MostVotes anecdote={this.props.anecdotes[this.indexOfMostVotes()]} votes={this.state.votes[this.indexOfMostVotes()]}/>
            </div>
        )
    }
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
    <App anecdotes={anecdotes} />,
    document.getElementById('root')
)
