import { types } from "../types/types"

const initialState = {
  modalOpen: false,
  snackBar: null
}

export const uiReducer = (state = initialState, action ) => {
  switch (action.type){
    case types.uiOpenModal:
      return {
        ...state,
        modalOpen: true
      }
    case types.uiCloseModal:
      return {
        ...state,
        modalOpen: false
      }
    case types.uiOpenSnackBar:
      return {
        ...state,
        snackBar: action.payload
      }
    case types.uiCloseSnackBar:
      return {
        ...state,
        snackBar: null,
      }
    default:
      return state;
  }
}