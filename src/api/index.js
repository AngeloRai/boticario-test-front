import axios from 'axios'
require('dotenv').config()

const api = axios.create({
  baseURL: 'http://www.mocky.io/v2/'
})

export default api
