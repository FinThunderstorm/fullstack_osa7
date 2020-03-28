import React, { useState } from 'react'
import { likeBlog, removeBlog } from '../reducers/blogReducer'
import { useDispatch } from 'react-redux'
import { setNotification } from '../reducers/notificationReducer'



const Blog = (props) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'dotted',
    borderWidth: 1,
    marginBottom: 5
  }

  const dispatch = useDispatch()

  const [visible, setVisible] = useState(false)

  const toggleVisibility = () => {
    setVisible(!visible)
  }

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

  const showWhenVisible = { display: visible ? '' : 'none' }

  if(props.blog.user.id === JSON.parse(window.localStorage.getItem('loggedBlogAppUser')).id){
    return (
      <div style={blogStyle}>
        <div className='blog' onClick={() => toggleVisibility()}>
          {props.blog.title} {props.blog.author}
          <div className='info' style={showWhenVisible}>
            <div>{props.blog.url}</div>
            <div>{props.blog.likes} likes <button onClick={handleLike(props.blog)}>like</button></div>
            <div>added by {props.blog.user.name}</div>
            <div><button onClick={handleDeleteBlog(props.blog)}>remove</button></div>
          </div>
        </div>
      </div>
    )
  } else{
    return (
      <div style={blogStyle}>
        <div className='blog' onClick={() => toggleVisibility()}>
          {props.blog.title} {props.blog.author}
          <div className='info' style={showWhenVisible}>
            <div>{props.blog.url}</div>
            <div>{props.blog.likes} likes <button onClick={handleLike(props.blog)}>like</button></div>
            <div>added by {props.blog.user.name}</div>
          </div>
        </div>
      </div>
    )
  }
}

export default Blog