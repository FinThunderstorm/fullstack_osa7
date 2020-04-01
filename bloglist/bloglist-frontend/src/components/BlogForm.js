import React from 'react'
import { TextField, Button, Grid } from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux'

import { removeReset } from '../utils'
import { useField } from '../hooks'

import { addBlog } from '../reducers/blogReducer'

import Togglable from '../components/Togglable'

const BlogForm = () => {
  const dispatch = useDispatch()

  const user = useSelector(state => state.user)

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
      url: url.value,
      user: {
        username: user.username,
        name: user.name,
        id: user.id
      }
    }
    await dispatch(addBlog(newBlog))
    title.reset()
    author.reset()
    url.reset()

  }

  return (
    <Togglable buttonLabel='new blog' ref={blogFormRef}>
      <form onSubmit={add}>
        <Grid container spacing={1} color='secondary' direction='column' justify='space-around' alignItems='center'>
          <Grid item>
            <TextField label='Title' color='secondary' variant='outlined' {...removeReset(title)}/>
          </Grid>
          <Grid item>
            <TextField label='Author' color='secondary' variant='outlined' {...removeReset(author)}/>
          </Grid>
          <Grid item>
            <TextField label='Url' color='secondary' variant='outlined' {...removeReset(url)}/>
          </Grid>
          <Grid item><Button variant='contained' color='secondary' type='submit'>create</Button></Grid>
        </Grid>
      </form>
      
    </Togglable>
  )
}

export default BlogForm