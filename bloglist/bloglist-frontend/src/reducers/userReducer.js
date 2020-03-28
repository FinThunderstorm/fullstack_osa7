import loginService from '../services/login'
import blogsService from '../services/blogs'

import { setNotification } from '../reducers/notificationReducer'

const userReducer = (state = null, action) => {
  console.log('state now: ', state)
  console.log('action: ', action)

  switch(action.type){
    case 'LOGIN':
      return action.data
    case 'LOGOUT':
      return null
    default:
      return state
  }
}

export const login = (user) => {
  return async dispatch => {
try{
      const loginUser = await loginService.login(user)
      console.log('logged: ', loginUser)
      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(loginUser))
      blogsService.setToken(loginUser.token)
      dispatch({
        type: 'LOGIN',
        data: loginUser
      })
    } catch{
      dispatch(setNotification('wrong username or password.', 'error'))
    }
    
  }
}

export const logout = () => {
  return dispatch => {
    dispatch({
      type: 'LOGOUT',
    })
  }
}

export const setUser = (user) => {
  return dispatch => {
    dispatch({
      type: 'LOGIN',
      data: user,
    })
  }
}

export default userReducer