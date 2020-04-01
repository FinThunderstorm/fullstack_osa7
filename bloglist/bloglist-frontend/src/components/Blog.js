import React from 'react'
import { likeBlog, removeBlog, commentBlog } from '../reducers/blogReducer'
import { useDispatch, useSelector } from 'react-redux'
import { setNotification } from '../reducers/notificationReducer'
import { useParams } from 'react-router-dom'
import { Grid, TextField, Card, Paper, CardHeader, CardActions, CardContent, Typography, Button, List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core'
import CommentIcon from '@material-ui/icons/Comment'
import { useField } from '../hooks'
import { removeReset } from '../utils'


const Blog = () => {
  const dispatch = useDispatch()

  const comment = useField('text')

  const id = useParams().id
  const blog = useSelector(state => state.blogs.find(b => b.id === id))
  const user = useSelector(state => state.user)

  const handleLike = (blog) => (event) => {
    event.preventDefault()
    dispatch(likeBlog(blog.id, blog))
    dispatch(setNotification(`voted blog ${blog.title}`, 'success'))
  }

  const handleDeleteBlog = (blog) => (event) => {
    event.preventDefault()
    if(window.confirm(`remove blog ${blog.title} by ${blog.author}`)){
      dispatch(removeBlog(blog.id))
    }
    
  }

  const handleComment = (blog, addedComment) => (event) => {
    event.preventDefault()
    dispatch(commentBlog(blog.id, blog, addedComment))
    comment.reset()
  }

  if(!blog || !user){
    return null
  }

  return (
    <Card component={Paper}> 
      <CardHeader 
        title={blog.title}
        subheader={`by ${blog.author}`}
      />
      <CardContent>
        <Typography variant='body2'>{blog.likes} likes</Typography>
        <Typography variant='body2'>added by {blog.user.name}</Typography>
        <Typography variant='h5'>COMMENTS</Typography>
        <form onSubmit={handleComment(blog, comment.value)}>
          <Grid container spacing={1} direction='row' justify='flex-start' alignItems='center'>
          
            <Grid item><TextField label='Add comment' variant='outlined' { ...removeReset(comment) }/></Grid>
            <Grid item><Button variant='contained' color='secondary' type='submit'>add</Button></Grid>
          
          </Grid>
        </form>
        <List dense={true}>
          {blog.comments.map(comment =>
            <ListItem key={comment}>
              <ListItemIcon>
                <CommentIcon />
              </ListItemIcon>
              <ListItemText primary={comment} />
            </ListItem>
          )}
        </List>
      </CardContent>
      <CardActions>
        <Button href={`https:\\${blog.url}`}>read</Button><Button onClick={handleLike(blog)}>like</Button>{user.id === blog.user.id ? <Button onClick={handleDeleteBlog(blog)}>remove</Button> : null}
      </CardActions>
    </Card>
  )
  
}

export default Blog