import { RECEIVE_DECKS, ADD_DECK } from '../actions'

function decks (state = {}, action) {
  switch (action.type) {
    case RECEIVE_DECKS :
      return {
        ...state,
        ...action.entries,
      }
    case ADD_DECK :
      return {
        ...state,
        [action.entry.title]:
          action.entry
      }
    default :
      return state
  }
}

export default decks
