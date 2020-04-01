import React from 'react'
import { Alert } from '@material-ui/lab'
import { Paper } from '@material-ui/core'
import { useSelector } from 'react-redux'

const Notification = (props) => {
  const notification = useSelector(state => state.notification)

  const message = notification.message
  const errorType = notification.errorType

  if(message === ''){
    return null
  }
  return (
    <Alert component={Paper} variant='filled' severity={errorType}>
      {message}
    </Alert>
  )
}

export default Notification