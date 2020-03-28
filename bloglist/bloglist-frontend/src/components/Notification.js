import React from 'react'
import { useSelector } from 'react-redux'

const Notification = (props) => {
  const notification = useSelector(state => state.notification)

  const message = notification.message
  const errorType = notification.errorType

  if(message === ''){
    return null
  }
  return (
    <div className={errorType}>
      {message}
    </div>
  )
}

export default Notification