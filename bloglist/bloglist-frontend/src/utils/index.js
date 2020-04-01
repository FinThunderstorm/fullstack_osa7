import { createMuiTheme } from '@material-ui/core/styles'
import pink from '@material-ui/core/colors/pink'
import yellow from '@material-ui/core/colors/yellow'

export const removeReset = (withReset) => {
  const withoutReset = {
    'value': withReset.value,
    'type': withReset.type,
    'onChange': withReset.onChange
  }
  return( withoutReset )
}

export const theme = createMuiTheme({
  palette: {
    primary: pink,
    secondary: yellow,
  },
})