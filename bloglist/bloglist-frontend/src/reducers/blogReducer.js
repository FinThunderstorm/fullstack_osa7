import blogsService from '../services/blogs'

const blogReducer = (state = [], action) => {
  console.log('state now: ', state)
  console.log('action', action)

  switch(action.type){
    case 'LIKE':
      const id = action.data.id
      const blogToChange = state.find(b => b.id === id)
      const likes = blogToChange.likes
      const changedBlog = {
        ...blogToChange,
        likes: likes + 1
      }

      return state.map(blog =>
        blog.id !== id ? blog : changedBlog  
      )
    case 'REMOVE': 
        return state.filter(blog => blog.id !== action.data)
    case 'NEW_BLOG':
      return [...state, action.data]
    case 'INIT_BLOGS':
      return action.data
    default:
      return state
  }
} 

export const likeBlog = (id, blog) => {
  return async dispatch => {
    const likedBlog = {
      ...blog,
      'likes': blog.likes + 1,
    }
    const updatedBlog = await blogsService.update(id, likedBlog)
    dispatch({
      type: 'LIKE',
      data: updatedBlog,
    })
  }
}

export const removeBlog = (id) => {
  return async dispatch => {
    await blogsService.remove(id)
    dispatch({
      type: 'REMOVE',
      data: id,
    })
  }
}

export const addBlog = (blog) => {
  return async dispatch => {
    const newBlog = await blogsService.create(blog)
    dispatch({
      type: 'NEW_BLOG',
      data: newBlog,
    })
  }
}

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogsService.getAll()
    dispatch({
      type: 'INIT_BLOGS',
      data: blogs,
    })
  }
}

export default blogReducer