import React from 'react';
import ReactDOM from 'react-dom';

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            hyva: 0,
            neutraali: 0,
            huono: 0,
            kaikki: 0
        }
    }

    click = (which) => {
        return () => {
            this.setState({
                [which]: this.state[which] + 1,
                kaikki: this.state.kaikki + 1
            })
        }
    }

    render() {
        return (
            <div>
                <Title />
                <Button arvo="hyvä" click={this.click("hyva")}/>
                <Button arvo="neutraali" click={this.click("neutraali")}/>
                <Button arvo="huono" click={this.click("huono")}/>
                <StatTitle />
                <Statistics  arvot={this.state}/>
            </div>
        )
    }
}

const Title = () => {
    return (
    <div>
        <h1>anna palautetta</h1>
    </div>
    )
}

const StatTitle = () => {
    return (
    <div>
        <h1>statistiikka</h1>
    </div>
    )
}

const Button = ({click, arvo}) => (
    <button onClick={click}>{arvo}</button>
)

const Statistics = ({arvot}) => {
    let ka = <Average arvot={arvot}/>
    let pos = <Positive arvot={arvot}/>

    if (arvot.kaikki === 0) {
        return (
            <div>
                <em>ei yhtään palautetta annettu</em>
            </div>
        )
    } 
    return (
        <div>
            <table>
                <tbody align="left">
                <Statistic stat="hyvä" arvo={arvot.hyva} />
                <Statistic stat="neutraali" arvo={arvot.neutraali} />
                <Statistic stat="huono" arvo={arvot.huono} />
                <Statistic stat="keskiarvo" arvo={ka} />
                <Statistic stat="positiivisia" arvo={pos} />
                </tbody>
            </table>
        </div>
       
    )
}

const Statistic = ({stat, arvo}) => {
    return (
        <tr>
            <td>{stat}</td>
            <td>{arvo}</td>
        </tr>
    )
}

const Average = ({arvot}) => {
    const iterator = arvot;
    let ka = 0;
    for (let arvo in iterator) {
        if (arvo === "hyva") {
            ka += arvot.hyva;
        } else if (arvo === "huono") {
            ka -= arvot.huono;
        }
    }

    ka = (ka / arvot.kaikki).toFixed(1);
    
    return ka
}


const Positive = ({arvot}) => {
    let pos = (arvot.hyva / arvot.kaikki * 100).toFixed(1);

    return pos
}

ReactDOM.render(<App />, document.getElementById('root'));

