import React from 'react'
import BookIcon from '@material-ui/icons/Book'
import { Card, Paper, CardHeader, CardContent, List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core'
import { useParams, Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

const User = () => {
  const id = useParams().id
  const user = useSelector(state => state.users.find(u => u.id === id))

  if(!user){
    return null
  }

  return(
    <Card component={Paper}> 
      <CardHeader 
        title={user.name}
        subheader={`has added blogs`}
      />
      <CardContent>
        <List dense={true}>
          {user.blogs.map(blog =>
            <ListItem key={blog.id}>
              <ListItemIcon>
                <BookIcon />
              </ListItemIcon>
              <Link to={`/blogs/${blog.id}`} ><ListItemText primary={blog.title} /></Link>
            </ListItem>
          )}
        </List>

      </CardContent>
    </Card>
  )
}

export default User