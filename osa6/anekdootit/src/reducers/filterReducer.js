export const filterCreation = (f) => {
  return {
    type: 'FILTER',
    filter: f
  }
}

const initialState = ''

const reducer = (store = initialState, action) => {
  switch (action.type) {
  case 'FILTER':
    return action.filter
  default:
    return store
  }
}

export default reducer