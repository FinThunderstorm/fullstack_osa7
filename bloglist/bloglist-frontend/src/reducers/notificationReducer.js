var timeoutID
const initialState = {
  message: '',
  errorType: null,
}

const notificationReducer = (state = initialState, action) => {
  console.log('state now: ', state)
  console.log('action: ', action)

  switch(action.type){
    case 'NOTIFICATION':
      state = action.data
      return state
    default: 
      return state
  }
}

export const setNotification = (message, errorType) =>  {
  return dispatch => {
    clearTimeout(timeoutID)
    dispatch({
      type: 'NOTIFICATION',
      data: {
        message: message,
        errorType: errorType,
      }
    })
    timeoutID = setTimeout(() => {
      dispatch({
        type: 'NOTIFICATION',
        data: {
          message: '',
          errorType: null
        }
      })
    }, 5000)
  }
}

export default notificationReducer