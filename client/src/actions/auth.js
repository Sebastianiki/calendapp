import { axiosWOT } from "../config/axios"
import { types } from "../types/types";

export const startLogin = (email, password) => {
  return async(dispatch) => {
    const resp = await axiosWOT.post('auth', { email, password})
      .then(response => {
        const { token, userId, name } = response.data
        localStorage.setItem('token', token);
        localStorage.setItem('token-init-date', new Date().getTime() );
        dispatch( login({userId, name}) );
      })
      .catch(error => {
        console.log(error.response.data, 'entro al catch')
      });
  }
}

const login = (user) => ({
  type: types.authLogin,
  payload: user
})