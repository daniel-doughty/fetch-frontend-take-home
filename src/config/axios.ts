import axios from 'axios'
import { API_BASE_URL } from '../utils/constants'

const instance = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  timeout: 5000
})
export default instance
