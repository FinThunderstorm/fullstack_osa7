import React, { useState, useImperativeHandle } from 'react'
import PropTypes from 'prop-types'
import { Button, Grid } from '@material-ui/core'

const Togglable = React.forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  useImperativeHandle(ref, () => {
    return {
      toggleVisibility
    }
  })

  return (
    <>
      <Grid container spacing={1} color='secondary' direction='column' justify='center' alignItems='center' style={hideWhenVisible}>
        <Grid item><Button variant='contained' color='secondary' onClick={toggleVisibility}>{props.buttonLabel}</Button></Grid>
      </Grid>
      <Grid container spacing={1} color='secondary' direction='column' justify='space-around' alignItems='center' style={showWhenVisible}>
        <Grid item>{props.children}</Grid>
        <Grid item><Button variant='contained' color='secondary' onClick={toggleVisibility}>cancel</Button></Grid>
      </Grid>
    </>
  )

})

Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired
}

export default Togglable