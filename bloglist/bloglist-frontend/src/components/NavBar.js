import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { logout } from '../reducers/userReducer'

import { Link, Redirect } from 'react-router-dom'

const NavBar = () => {
  const user = useSelector(state => state.user)
  const dispatch = useDispatch()

  const handleLogout = (event) => {
    event.preventDefault()
    dispatch(logout())
    window.localStorage.removeItem('loggedBlogAppUser')
  }
  
  return (
    <>
      {user ? <div><Link to='/'>blogs</Link> <Link to='/users'>users</Link> <em>{user.name} logged in</em> <button onClick={handleLogout}>log out</button></div> : <Redirect to='/login' />}
    </>
  )
}

export default NavBar