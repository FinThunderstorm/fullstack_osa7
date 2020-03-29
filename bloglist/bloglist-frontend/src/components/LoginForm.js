import React from 'react'
import { useHistory } from 'react-router-dom'

import Notification from './Notification'

import { useDispatch } from 'react-redux'

import { useField } from '../hooks'
import { removeReset } from '../utils'

import { login } from '../reducers/userReducer'

const LoginForm = () => {
  const dispatch = useDispatch()
  const history = useHistory()

  const username = useField('text')
  const password = useField('password')

  const handleLogin = (event) => {
    event.preventDefault()
    dispatch(login({username, password}))
    history.push('/')
    username.reset()
    password.reset()
  }

  return (
    <div>
      <h2>Log in to application</h2>
      <Notification />
      <form onSubmit={handleLogin}>
        <div>
          username
          <input { ...removeReset(username) }/>
        </div>
        <div>
          password
          <input { ...removeReset(password) }/>
        </div>
        <div><button>login</button></div>
      </form>
    </div>
  )
} 

export default LoginForm