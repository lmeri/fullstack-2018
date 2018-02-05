import React from 'react';
import Person from './components/Person';
import Form from './components/Form';
import Notification from './components/Notification';
import personService from './services/persons'

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            persons: [],
            newName: '',
            newNumber: '',
            filter: '',
            notif: null,
            error: false   
        }
    }

    componentWillMount() {
        personService
            .getAll()
            .then(response => {
                this.setState({persons: response})
            }
        )
    }

    addPerson = (event) => {
        event.preventDefault()
        const personObject = {
            name: this.state.newName,
            number: this.state.newNumber
        }

        if (this.includesPerson()) {
            let person = this.findPerson();
            if (window.confirm("Korvataanko " + personObject.name + " numero uudella?")) {
                personService
                    .update(person.id, personObject)
                    .then(response => {
                        this.setState({
                            persons: this.state.persons.map(p => p.id !== person.id ? p : personObject),
                            newName: '',
                            newNumber: '',
                            notif: 'yhteystietoa ' + person.name + ' on muokattu onnistuneesti'
                        })
                        this.timeout()
                    }).catch(error => {
                        this.setState({
                          notif: 'yhteystieto ' + person.name + ' on jo valitettavasti poistettu palvelimelta',
                          error: true,
                          persons: this.state.persons.filter(p => p.id !== person.id)
                        })
                        setTimeout(() => {
                          this.setState(
                                {
                                    notif: null,
                                    error: false
                                })
                        }, 4000)
                    }) 
            }
        } else {
            personService
                .create(personObject)
                .then(response => {
                    this.setState({
                        persons: this.state.persons.concat(response),
                        newName: '',
                        newNumber: '',
                        notif: 'yhteystieto ' + personObject.name + ' on lisätty onnistuneesti'
                    })
                    this.timeout()
                })
        }
    }

    removePerson = (props) => {
        return () => {
            if (window.confirm("Haluatko varmasti poistaa " + props.name + "?" )) {
            personService.remove(props.id)
              .then(() => {
                this.setState({
                    persons: this.state.persons.filter(p => p.id !== props.id),
                    notif: 'yhteystieto ' + props.name + ' on poistettu onnistuneesti'
                })
                this.timeout()
              }) 
            }
        }
    }

    includesPerson = () => {
        const personel = this.state.persons.map(person => person.name.toLowerCase());

        if (personel.includes(this.state.newName.toLowerCase())) {
            return true;
        } else {
            return false;
        }
    }

    findPerson = () => {
        let p = this.state.persons.find(person => person.name.toLowerCase() === this.state.newName.toLowerCase())
        
        if (p) {
            return p;
        } else {
            return false;
        }
    }

    handleSearch = (event) => {
        this.setState({ filter: event.target.value })
    }
      
    handleNameChange = (event) => {
        this.setState({ newName: event.target.value })
    }

    handleNumberChange = (event) => {
        this.setState({ newNumber: event.target.value })
    }

    timeout = () => {
        setTimeout(() => {
            this.setState(
                {
                    notif: null,
                    error: false,
                })
          }, 4000)
    }

    render() {
        let list = this.state.persons.filter((person) => {
            return person.name.toLowerCase().includes(this.state.filter.toLowerCase());
        });

        return (
        <div className="container">
            <h1>Puhelinluettelo</h1>
            <Notification message={this.state.notif} error={this.state.error} />
            <div>
                haku: <input value={this.state.filter}
                onChange={this.handleSearch}
                />
            </div>
            <h2>Lisää yhteystieto</h2>
            <Form addPerson={this.addPerson} 
                newName={this.state.newName} 
                newNumber={this.state.newNumber}
                handleNameChange={this.handleNameChange}
                handleNumberChange={this.handleNumberChange} 
            />
            <h2>Numerot</h2>
            <table><tbody>
                {list.map(person => <Person key={person.name} person={person} removePerson={this.removePerson}/>)}
            </tbody></table>
        </div>
        )
    }
}

export default App