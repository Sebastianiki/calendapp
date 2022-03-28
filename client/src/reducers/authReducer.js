import { types } from "../types/types"

const initialState = {
  user: null,
  loading: false,
  loginValidation: {
    error: false,
    msg: ''
  },
  registerValidation: {
    error: false,
    msg: ''
  }
}

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.authLogin:
      return {
        ...state,
        loading: true,
      }
    case types.authLoginSuccess:
      return {
        ...state,
        loginValidation: { error: false, msg: '' },
        loading: false,
        user: action.payload
      }
    case types.authLoginFail:
      return {
        ...state,
        loginValidation: {...action.payload},
        loading: false,
      }
    case types.authRegister:
      return {
        ...state,
        loading: true
      }
    case types.authRegisterSuccess:
      return {
        ...state,
        registerValidation: { error: false, msg: '' },
        loading: false,
        user: action.payload
      }
    case types.authRegisterFail:
      return {
        ...state,
        registerValidation: {...action.payload},
        loading: false,
      }
    default:
      return state
  }
}