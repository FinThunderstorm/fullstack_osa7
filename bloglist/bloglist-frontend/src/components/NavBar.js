import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { logout } from '../reducers/loginReducer'

import { Link } from 'react-router-dom'
import AccountCircleIcon from '@material-ui/icons/AccountCircle'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'
import { AppBar, Toolbar, Button, Typography, Menu, MenuItem, ButtonGroup } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const NavBar = () => {
  const [ anchorEl, setAnchorEl ] = useState(null)

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const user = useSelector(state => state.user)
  const dispatch = useDispatch()

  const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    spacing: {
      marginRight: theme.spacing(2),
    },
    lastButton: {
      flexGrow: 1,
    },
    icon: {
      marginRight: theme.spacing(1),
    }
  }))

  const classes = useStyles()

  const handleLogout = (event) => {
    setAnchorEl(null)
    event.preventDefault()
    dispatch(logout())
    window.localStorage.removeItem('loggedBlogAppUser')
  }
  
  if(!user){
    return null
  }
  

  return (
    <div className={classes.root}>
      <AppBar position='static'>
        <Toolbar>
          <ButtonGroup color='inherit' className={classes.lastButton}>
            <Button component={Link} to='/'>
              Blogs
            </Button>
            <Button component={Link} to='/users'>
              Users
            </Button>
          </ButtonGroup>


          

          <Button color='inherit' aria-controls='userMenu' aria-haspopup='true' onClick={handleClick}>
            <AccountCircleIcon className={classes.icon} /> <Typography variant='body2' component='h5'>{`${user.name}`}</Typography>
          </Button>

          <Menu
            id='userMenu'
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={handleLogout}><ExitToAppIcon className={classes.icon} />Logout</MenuItem>
          </Menu>

      </Toolbar>
    </AppBar>

    </div>
  )
}

export default NavBar