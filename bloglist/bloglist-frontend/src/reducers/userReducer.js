import userService from '../services/user'

const userReducer = (state = [], action) => {
  switch(action.type){
    case 'INIT_USERS':
      return action.data
    case 'NEW_BLOG':
      const id = action.data.user.id
      const userToChange = state.find(u => u.id === id)
      const blogs = userToChange.blogs
      const changedUser = {
        ...userToChange,
        blogs: blogs.concat({title: action.data.title, author: action.data.author, url: action.data.url, id: action.data.id})
      }

      return state.map(user =>
        user.id !== id ? user : changedUser  
      )
    default:
      return state
  }
}

export const initializeUsers = () => {
  return async dispatch => {
    const users = await userService.getAll()
    dispatch({
      type: 'INIT_USERS',
      data: users,
    })
  }
}

export default userReducer