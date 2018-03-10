import anecdoteService from '../services/anecdotes'

export const anecdoteCreation = (content) => {
  return async (dispatch) => {
    const newAnec = await anecdoteService.createNew(content)
    dispatch({
      type: 'CREATE',
      ...newAnec
    })
  }
}

export const voteAnecdote = (anecdote) => {
  return async (dispatch) => {
    await anecdoteService.update(anecdote, anecdote.id)
    dispatch({
      type: 'VOTE',
      id: anecdote.id
    })
  }
}

export const anecdoteInitialization = () => {
  return async (dispatch) => {
    const anecs = await anecdoteService.getAll()
    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecs
    })
  }
}

const reducer = (store = [], action) => {
  const old = store.filter(a => a.id !==action.id)
  const voted = store.find(a => a.id === action.id)
  switch (action.type) {
  case 'VOTE':
    return [...old, { ...voted, votes: voted.votes + 1 } ]
  case 'CREATE':
    return [...store, { content: action.content, id: action.id, votes:0 }]
  case 'INIT_ANECDOTES':
    return action.data
  default:
    return store
  }
}

export default reducer