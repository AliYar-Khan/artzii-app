import axios from 'axios'

console.log('====================================')
console.log(
  'process.env.REACT_APP_BACKEND_URL ----->>>>',
  process.env.REACT_APP_BACKEND_URL
)
console.log('====================================')

console.log('====================================')
console.log(
  'process.env.REACT_APP_POLOTNO_KEY ----->>>',
  process.env.REACT_APP_POLOTNO_KEY
)
console.log('====================================')

export const client = axios.create({
  baseURL: '/api'
})
