import React from 'react'
import { Link } from 'react-router-dom'
import { Grid, Typography, Table, TableBody, TableCell, TableContainer, TableRow, Paper } from '@material-ui/core'
import { useSelector } from 'react-redux'

const Users = () => {

  const users = useSelector(state => state.users)

  if(!users){
    return null
  }

  return(
    
      <Grid container spacing={2} color='secondary' direction='column' justify='space-around' alignItems='stretch'>
      <Grid item>
        <Typography component='h1' variant='h5'><b>USERS</b></Typography>
      </Grid>
      <Grid item>
        <TableContainer component={Paper}>
          <Table>
            <TableBody>
              <TableRow>
                <TableCell>
                  <b>Name</b>
                </TableCell>
                <TableCell>
                  <b>Blogs created</b>
                </TableCell>
              </TableRow>
              {users.map(user =>
                <TableRow key={user.id}> 
                  <TableCell>
                    <Link to={`/users/${user.id}`}>{user.name}</Link>
                  </TableCell>
                  <TableCell>
                    {user.blogs.length}
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

export default Users