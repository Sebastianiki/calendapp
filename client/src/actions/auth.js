import axiosWT from "../config/axiosWithToken";
import axiosWOT from '../config/axios'
import { types } from "../types/types";

export const authLogin = (email, password) => {
  return async(dispatch) => {
    dispatch( login() );
    const resp = await axiosWOT.post('auth', { email, password })
      .then(response => {
        const { token, user } = response.data
        localStorage.setItem('token', token);
        localStorage.setItem('token-init-date', new Date().getTime() );
        dispatch( loginSuccess(user) );
      })
      .catch(error => {
        const { data } = error.response;
        dispatch( loginFail(data))
      });
  }
}

const login = () => ({ type: types.authLogin });

const loginSuccess = (user) => ({ type: types.authLoginSuccess, payload: user });

const loginFail = (error) => ({ type: types.authLoginFail, payload: error });

export const authRegister = (name, email, password) => {
  return async(dispatch) => {
    dispatch( register() );
    const resp = await axiosWOT.post('auth/register', {name, email, password})
      .then(response => {
        const { token, user } = response.data
        localStorage.setItem('token', token);
        localStorage.setItem('token-init-date', new Date().getTime() );
        dispatch( registerSuccess(user) );
      })
      .catch(error => {
        const { data } = error.response;
        dispatch( registerFail(data))
      })
  }
}

const register = () => ({ type: types.authRegister });

const registerSuccess = (user) => ({ type: types.authRegisterSuccess, payload: user })

const registerFail = (error) => ({ type: types.authRegisterFail, payload: error })

export const checkJWT = () => {
  return async(dispatch) => {
    const resp = await axiosWT.get('auth/renewjwt')
    const { error, data } = resp;
    if(error){
      localStorage.clear();
      dispatch( logOut() );
    } else {
      const { token, user } = data
      localStorage.setItem('token', token);
      localStorage.setItem('token-init-date', new Date().getTime() );
      dispatch( checkJWTSuccess(user) );
    }
  }
}

export const checkJWTSuccess = (user) => ({ type: types.authCheckJWTSuccess, payload: user })

export const authLogOut = () => {
  return (dispatch) => {
    localStorage.clear();
    dispatch( logOut() );
  }
}

const logOut = () => ({ type: types.authLogout })