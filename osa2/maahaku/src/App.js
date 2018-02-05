import React from 'react';
import axios from 'axios';
import Countries from './components/Countries';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
        countries: [],
        filter: ''
    }
  }

  componentWillMount() {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        console.log('promise fulfilled')
        this.setState({ countries: response.data })
      })
  }

  handleSearch = (event) => {
    this.setState(
      { 
        filter: event.target.value 
      }
    )
  }

  updateFilter = (value) => {
    return () => {
      this.setState(
        {
          filter: value
        }
      )
    }
  }

  render() {
      return (
        <div>
            <h2>Search countries</h2>
              
              search: <input value={this.state.filter}
              onChange={this.handleSearch}
              />
              <h4>Countries that match</h4>
              <Countries countries={this.state.countries} filter={this.state.filter} click={this.updateFilter} />
        </div>
      )
  }
}

export default App
