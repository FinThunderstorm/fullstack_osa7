import React from 'react'

import BlogForm from './BlogForm'
import { Link } from 'react-router-dom'

import { useSelector } from 'react-redux'

const Blogs = () => {
  const blogs = useSelector(state => state.blogs.sort((a,b) => b.likes-a.likes))

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'dotted',
    borderWidth: 1,
    marginBottom: 5
  }

  return (
    <div>
      <h2>blogs</h2>
      <h1>create new</h1>
      <BlogForm />
      {blogs.map(blog =>
        <div style={blogStyle}> 
          <Link to={`/blogs/${blog.id}`}>{blog.title} {blog.author}</Link>
        </div>
      )}
    </div>
  )
}

export default Blogs