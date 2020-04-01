import React from 'react'

import BlogForm from './BlogForm'
import { Link } from 'react-router-dom'
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
  Grid,
  Typography
} from '@material-ui/core'

import { useSelector } from 'react-redux'

const Blogs = () => {
  const blogs = useSelector(state => state.blogs.sort((a,b) => b.likes-a.likes))

  return (
    <Grid container spacing={2} color='secondary' direction='column' justify='space-around' alignItems='stretch'>
      <Grid item>
        <Typography component='h1' variant='h5'><b>BLOGS</b></Typography>
      </Grid>
      <Grid item>
        <Paper>
          <Grid container spacing={1} direction='column' justify='space-around' alignItems='center'>
            <Grid item><Typography component='h2' variant='h5'>create new</Typography></Grid>
            <Grid item><BlogForm /></Grid>
          </Grid>
        </Paper>
      </Grid>
      <Grid item>
        <TableContainer component={Paper}>
          <Table>
            <TableBody>
              <TableRow>
                <TableCell>
                  <b>Title</b>
                </TableCell>
                <TableCell>
                  <b>Author</b>
                </TableCell>
              </TableRow>
              {blogs.map(blog =>
                <TableRow key={blog.id}> 
                  <TableCell>
                    <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
                  </TableCell>
                  <TableCell>
                    {blog.author}
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </Grid>
  )
}

export default Blogs