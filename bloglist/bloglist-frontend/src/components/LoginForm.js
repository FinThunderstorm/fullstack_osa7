import React from 'react'
import { useHistory } from 'react-router-dom'

import { TextField, Button, Grid, Typography } from '@material-ui/core'

import { useDispatch } from 'react-redux'

import { useField } from '../hooks'
import { removeReset } from '../utils'

import { login } from '../reducers/loginReducer'

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
    <form onSubmit={handleLogin}>
      <Grid container spacing={1} direction='column' justify='space-around' alignItems='center'>
        <Grid item><Typography component='h1' variant='h5'>Log in to application</Typography></Grid>
        <Grid item><TextField label='Username' variant='outlined' { ...removeReset(username) }/></Grid>
        <Grid item><TextField label='Password' variant='outlined' { ...removeReset(password) }/></Grid>
        <Grid item><Button variant='contained' color='primary' type='submit'>login</Button></Grid>
      </Grid>
    </form>
  )
} 

export default LoginForm