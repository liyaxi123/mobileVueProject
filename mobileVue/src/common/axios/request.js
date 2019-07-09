import axios from 'axios'

const instance = axios.create({
  baseUrl: '',
  timeout: 1000
})

export default instance
