import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import './App.css'

import blogsService from './services/blogs'

import {
  BrowserRouter as Router,
  Switch, Route
} from "react-router-dom"
import { Grid, Container} from '@material-ui/core'

import NavBar from './components/NavBar'
import Blog from './components/Blog'
import Blogs from './components/Blogs'
import Notification from './components/Notification'
import User from './components/User'
import Users from './components/Users'

import { initializeBlogs } from './reducers/blogReducer'
import { initializeUsers } from './reducers/userReducer'
import {  setUser } from './reducers/loginReducer'
import LoginForm from './components/LoginForm'


const App = () => {
  const dispatch = useDispatch()

  const user = useSelector(state => state.user)

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if(loggedUserJSON){
      const user = JSON.parse(loggedUserJSON)
      dispatch(setUser(user))
      blogsService.setToken(user.token)
    } 
  },[dispatch])

  useEffect(() => {
    if(user !== null){
      dispatch(initializeBlogs())
      dispatch(initializeUsers())
    }
  },[user, dispatch])



  

  /*if (user === null) {
    return (
      <LoginForm />
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification />
      <div>{user.name} logged in<button onClick={handleLogout}>log out</button></div>
      <h1>create new</h1>
      <BlogForm />
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog}/>
      )}
    </div>
  )*/



  return (
    
      
      <Router>   
        <Container >
          <Grid container spacing={1} direction='column' justify='space-around'>
            <Grid item><NavBar /></Grid>
            <Grid item><Notification /></Grid>
            <Switch>

              <Route path='/login'>
                <Grid item><LoginForm /></Grid>
              </Route>

              <Route path='/blogs/:id'>
                <Grid item><Blog /></Grid>
              </Route>

              <Route path='/users/:id'>
                <Grid item><User /></Grid>
              </Route>

              <Route path='/users'>
              <Grid item><Users /></Grid>
              </Route>

              <Route path='/'>
                {user ? <Grid item><Blogs /></Grid> : <Grid item><LoginForm /></Grid>}
              </Route>

            </Switch>
          </Grid>
        </Container>
      </Router>
    
    
  )
}


export default App
