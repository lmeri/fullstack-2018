import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import { createStore } from 'redux'
import counterReducer from './reducers/reducer'

const store = createStore(counterReducer)

const Statistiikka = () => {
    let palautteita = 0
    const state = store.getState()
    
    for (let s in state) { palautteita += state[s] }

    const positiiviset = () => {
        const kaikki = state.good + state.bad + state.ok
        return ((state.good / kaikki) * 100).toFixed(1)
    }

    const keskiarvo = () => {
        let ka = 0
        for (let s in state) { 
            if (s === 'good') {
                ka += state[s]
            } else if (s === 'bad') {
                ka -= state[s]
            }
        }
        return (ka / palautteita).toFixed(1)
    }

    if (palautteita === 0) {
        return (
        <div>
            <h2>stataistiikka</h2>
            <div>ei yhtään palautetta annettu</div>
        </div>
        )
    }

    return (
        <div>
        <h2>statistiikka</h2>
        <table>
            <tbody>
            <tr>
                <td>hyvä</td>
                <td>{state.good}</td>
            </tr>
            <tr>
                <td>neutraali</td>
                <td>{state.ok}</td>
            </tr>
            <tr>
                <td>huono</td>
                <td>{state.bad}</td>
            </tr>
            <tr>
                <td>keskiarvo</td>
                <td>{keskiarvo()}</td>
            </tr>
            <tr>
                <td>positiivisia</td>
                <td>{positiiviset()} %</td>
            </tr>
            </tbody>
        </table>

        <button onClick={() => store.dispatch({ type: 'ZERO' })}>nollaa tilasto</button>
        </div >
    )
}

class App extends React.Component {
    klik = (nappi) => () => {
        store.dispatch({ type: nappi })
    }

    render() {
        return (
            <div>
                <h2>anna palautetta</h2>
                <button onClick={this.klik('GOOD')}>hyvä</button>
                <button onClick={this.klik('OK')}>neutraali</button>
                <button onClick={this.klik('BAD')}>huono</button>
                <Statistiikka />
            </div>
        )
    }
}

const renderApp = () => {
    ReactDOM.render(<App />, document.getElementById('root'))
}

renderApp()
store.subscribe(renderApp)