import axios from 'axios'

export default axios.create({
  baseURL: 'https://sea-turtle-app-b7wlr.ondigitalocean.app',
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' }
})
