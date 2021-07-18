import axios from 'axios'
require('dotenv').config()

const api = axios.create({
  baseURL: 'http://www.mocky.io/'
})

export default api
