import axios from 'axios'
import { getLocalStorage } from '../LocalStorageUtils'

const axiosInstance = axios.create({
  baseURL: 'http://localhost:5000/api',
})

axiosInstance.interceptors.request.use(
  (config) => {
    const token = getLocalStorage('token')
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}` 
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

axiosInstance.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.clear()
      window.location.href = '/login'
    }
    return Promise.reject(error)
  },
)

export default axiosInstance