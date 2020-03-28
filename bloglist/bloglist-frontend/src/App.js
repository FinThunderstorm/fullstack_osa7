import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import './App.css'

import blogsService from './services/blogs'

import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'

import { useField } from './hooks'
import { removeReset } from './utils'

import { initializeBlogs } from './reducers/blogReducer'
import { login, logout, setUser } from './reducers/userReducer'


const App = () => {
  const dispatch = useDispatch()

  const username = useField('text')
  const password = useField('password')

  const blogs = useSelector(state => state.blogs.sort((a,b) => b.likes-a.likes))
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

  const handleLogin = (event) => {
    event.preventDefault()
    dispatch(login({username, password}))
    username.reset()
    password.reset()
  }

  const handleLogout = (event) => {
    event.preventDefault()
    dispatch(logout())
    window.localStorage.removeItem('loggedBlogAppUser')
  }

  

  if (user === null) {
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
  )
}


export default App
