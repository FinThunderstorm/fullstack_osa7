import React from 'react'
import { useDispatch } from 'react-redux'

import { removeReset } from '../utils'
import { useField } from '../hooks'

import { addBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'

import Togglable from '../components/Togglable'

const BlogForm = () => {
  const dispatch = useDispatch()

  const title = useField('text')
  const author = useField('text')
  const url = useField('text')

  const blogFormRef = React.createRef()

  const add = async (event) => {
    event.preventDefault()
    blogFormRef.current.toggleVisibility()
    const newBlog = {
      author: author.value,
      title: title.value,
      url: url.value
    }
    dispatch(addBlog(newBlog))
    dispatch(setNotification(`a new blog ${title.value} by ${author.value} added.`, 'notification'))
    title.reset()
    author.reset()
    url.reset()

  }

  return (
    <Togglable buttonLabel='new blog' ref={blogFormRef}>
      <form onSubmit={add}>
        <div>
          title:
          <input {...removeReset(title)}/>
        </div>
        <div>
          author:
          <input {...removeReset(author)}/>
        </div>
        <div>
          url:
          <input {...removeReset(url)}/>
        </div>
        <div><button>create</button></div>
      </form>
    </Togglable>
  )
}

export default BlogForm