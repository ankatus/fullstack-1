import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

const PalauteHeader = () => {
    return (
        <h1>anna palautetta</h1>
    )
}

const StatistiikkaHeader = () => {
    return (
        <h1>statistiikka</h1>
    )
}

const Statistics = ({ state, avg, percentage }) => {
    if (state.hyva + state.neutraali + state.huono === 0) {
        return <p>ei yhtään palautetta annettu</p>
    }
    return (
        <table>
            <tbody>
                <Statistic stat={state.hyva} text="hyvä" />
                <Statistic stat={state.neutraali} text="neutraali" />
                <Statistic stat={state.huono} text="huono" />
                <Statistic stat={avg} text="keskiarvo" />
                <Statistic stat={percentage} text="positiivisia" />
            </tbody>
        </table>
    )
}

const Statistic = ({ stat, text }) => {
    if (text === "positiivisia") {
        return (
            <tr><td>{text}</td><td>{stat}%</td></tr>
        )
    }
    return (
        <tr><td>{text}</td><td>{stat}</td></tr>
    )
}

const Button = ({ handleClick, text }) => {
    return (
        <button onClick={handleClick}>
            {text}
        </button>
    )
}

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            hyva: 0,
            neutraali: 0,
            huono: 0
        }
    }

    increaseStat = (stat) => {
        if (stat === "hyva") {
            return () => { this.setState({ hyva: this.state.hyva + 1 }) }
        } else if (stat === "neutraali") {
            return () => { this.setState({ neutraali: this.state.neutraali + 1 }) }
        } else {
            return () => { this.setState({ huono: this.state.huono + 1 }) }
        }
    }

    keskiarvo = () => {
        const sum = this.state.hyva + this.state.neutraali + this.state.huono
        const pointsSum = this.state.hyva - this.state.huono
        if (sum === 0) {
            return 0
        }
        const avg = pointsSum / sum
        return avg
    }

    positiivisia = () => {
        const sum = this.state.hyva + this.state.neutraali + this.state.huono
        if (sum === 0) {
            return 0
        }
        return (this.state.hyva / sum) * 100
    }
    render() {
        return (
            <div>
                <PalauteHeader />
                <Button handleClick={this.increaseStat("hyva")} text="hyvä" />
                <Button handleClick={this.increaseStat("neutraali")} text="neutraali" />
                <Button handleClick={this.increaseStat("huono")} text="huono" />
                <StatistiikkaHeader />
                <Statistics state={this.state} avg={this.keskiarvo()} percentage={this.positiivisia()} />
            </div>
        )
    }
}

ReactDOM.render(
    <App />,
    document.getElementById('root')
)
