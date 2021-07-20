import axios from 'axios'

// configures AXIOS with base url to avoid repetion
const api = axios.create({
  baseURL: 'https://www.mocky.io/'
})

export default api
