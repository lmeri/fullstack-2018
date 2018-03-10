export const notify = (n, d) => {
  return async (dispatch) => {
    dispatch({
      type: 'CREATE_N',
      notification: n
    })
    setTimeout(() => dispatch({
      type: 'DELETE_N'
    }), d * 1000)
  }
}

const initialState = ''

const reducer = (store = initialState, action) => {
  switch (action.type) {
  case 'CREATE_N':
    return action.notification
  case 'DELETE_N':
    return ''
  default:
    return store
  }

}

export default reducer