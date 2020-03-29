import React from 'react'
import { likeBlog, removeBlog } from '../reducers/blogReducer'
import { useDispatch, useSelector } from 'react-redux'
import { setNotification } from '../reducers/notificationReducer'
import { useParams } from 'react-router-dom'



const Blog = () => {
  const dispatch = useDispatch()

  const id = useParams().id
  const blog = useSelector(state => state.blogs.find(b => b.id === id))
  const user = useSelector(state => state.user)

  const handleLike = (blog) => (event) => {
    event.preventDefault()
    dispatch(likeBlog(blog.id, blog))
    dispatch(setNotification(`voted blog ${blog.title}`, 'notification'))
  }

  const handleDeleteBlog = (blog) => (event) => {
    event.preventDefault()
    if(window.confirm(`remove blog ${blog.title} by ${blog.author}`)){
      dispatch(removeBlog(blog.id))
    }
    
  }
  if(!blog || !user){
    return null
  }

  return (
    <div>
      <div>
        {blog.title} {blog.author}
        <div>{blog.url}</div>
        <div>{blog.likes} likes <button onClick={handleLike(blog)}>like</button></div>
        <div>added by {blog.user.name}</div>
        {user.id === blog.user.id ? <div><button onClick={handleDeleteBlog(blog)}>remove</button></div> : null}
      </div>
    </div>
  )
  
}

export default Blog