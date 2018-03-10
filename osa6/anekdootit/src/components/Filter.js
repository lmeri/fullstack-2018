import React from 'react'
import { filterCreation } from '../reducers/filterReducer'
import { connect } from 'react-redux'

class Filter extends React.Component {
  handleChange = (e) => {
    this.props.filterCreation(e.target.value)
  }

  render() {
    const style = {
      marginBottom: 10
    }

    return (
      <div style={style}>
        filter: <input onChange={this.handleChange}/>
      </div>
    )
  }
}

export default connect(
  null, { filterCreation }
)(Filter)
