import axios from 'axios'

const axiosWT = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: { 'Content-type': 'application/json'}
})

axiosWT.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['x-token'] = token;
    }
    return config;
  },
  (error) => Promise.reject(error),
)

export default axiosWT