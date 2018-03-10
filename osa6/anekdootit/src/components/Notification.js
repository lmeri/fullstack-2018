import React from 'react'
import { connect } from 'react-redux'

class Notification extends React.Component {
  render() {
    const style = {
      border: 'solid',
      padding: 10,
      borderWidth: 1,
      margin: 7,
      display: this.props.notification === '' ? 'none' : 'block'
    }

    return (
      <div style={style}>
        {this.props.notification}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    notification: state.notifications
  }
}

const ConnectedNotif = connect(
  mapStateToProps
)(Notification)

export default ConnectedNotif