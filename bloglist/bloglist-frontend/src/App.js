import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  BrowserRouter as Router,
  Switch, Route
} from "react-router-dom"

import './App.css'

import blogsService from './services/blogs'

import NavBar from './components/NavBar'
import Blog from './components/Blog'
import Blogs from './components/Blogs'

import { initializeBlogs } from './reducers/blogReducer'
import {  setUser } from './reducers/userReducer'
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
    console.log('user: ', user, user !== null)
    if(user !== null){
      dispatch(initializeBlogs())
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

  /*
        

          <Route path='/users/:id'>
            <User />
          </Route>

          <Route path='/users'>
            <Users />
          </Route>

  */

  return (
    <div>
      
      <Router>
        <NavBar />
        <Switch>

          <Route path='/login'>
            <LoginForm />
          </Route>

          <Route path='/blogs/:id'>
            <Blog />
          </Route>

          <Route path='/'>
            <Blogs />
          </Route>

        </Switch>
      </Router>
    </div>
    
  )
}


export default App
