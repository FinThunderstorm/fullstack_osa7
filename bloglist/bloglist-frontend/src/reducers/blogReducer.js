import blogsService from '../services/blogs'
import { setNotification } from './notificationReducer'

const blogReducer = (state = [], action) => {
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
    case 'COMMENT':
      const commentId = action.data.id
      const commentedBlogToChange = state.find(b => b.id === commentId)
      const comments = commentedBlogToChange.comments
      const commentedBlog = {
        ...commentedBlogToChange,
        comments: comments.concat(action.data.comment)
      }

      return state.map(blog =>
        blog.id !== commentId ? blog : commentedBlog  
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

export const commentBlog = (id, blog, comment) => {
  if(comment === ''){
    return dispatch => {
      dispatch(setNotification('validation error, check input and try again.', 'error'))
    }
  }
  return async dispatch => {
    const commentedBlog = {
      ...blog,
      'comments': blog.comments.concat(comment)
    }
    const updatedBlog = await blogsService.update(id, commentedBlog)
    dispatch({
      type: 'COMMENT',
      data: {
        ...updatedBlog,
        comment: comment,
      }
    })
    dispatch(setNotification(`comment added.`, 'success'))
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
    try {
      const newBlog = await blogsService.create(blog)
      dispatch({
        type: 'NEW_BLOG',
        data: newBlog,
      })
      dispatch(setNotification(`a new blog ${newBlog.title} by ${newBlog.author} added.`, 'success'))
    } catch{
      dispatch(setNotification('input validation error, check your inputs and try again', 'error'))
    }
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