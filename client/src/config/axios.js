import axios from 'axios'

export const axiosWOT = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: { 'Content-type': 'application/json' }
})

export const axiosWT = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: { 'Content-type': 'application/json', 'x-token': localStorage.getItem('token') }
})