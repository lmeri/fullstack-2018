import React from 'react'
const Notification = ({ error, notif }) => {
  if (error) {
    return (<div id='error'><p>{error}</p></div>)
  } else if (notif) {
    return (<div id='notif'><p>{notif}</p></div>)
  } else {
    return (<div></div>)
  }
   
}

export default Notification