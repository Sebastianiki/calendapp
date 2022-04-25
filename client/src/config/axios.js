import axios from 'axios'

const axiosWOT = axios.create({
  baseURL: `http://${process.env.REACT_APP_API_URL}:${process.env.REACT_APP_API_PORT}/api`,
  headers: { 'Content-type': 'application/json' }
})

export default axiosWOT
