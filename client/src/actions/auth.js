import { axiosWOT, axiosWT } from "../config/axios"
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
    console.log('llamo el check');
    const resp = await axiosWT.get('auth/renewjwt')
    console.log(resp);
    const { error, data } = resp;
    if(error){
      localStorage.removeItem('token');
      localStorage.removeItem('token-init-date')
      dispatch( checkJWTFail() )
    } else {
      const { token, user } = data
      console.log(user);
      localStorage.setItem('token', token);
      localStorage.setItem('token-init-date', new Date().getTime() );
      dispatch( checkJWTSuccess(user) );
    }
  }
}

export const checkJWTSuccess = (user) => ({ type: types.authCheckJWTSuccess, payload: user })

export const checkJWTFail = () => ({ type: types.authCheckJWTFail })

