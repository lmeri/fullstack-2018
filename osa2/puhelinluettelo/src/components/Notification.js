import React from 'react'

const Notification = ({ message, error }) => {
    if (message === null) {
      return null
    } if (message !== null && error !== true) {
        return (
            <div className="notif">
              {message}
            </div>
          )
    }
    
    return (
      <div className="error">
        {message}
      </div>
    )
}

export default Notification
  