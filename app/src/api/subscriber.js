import axios from 'axios'
import * as config from '@/config'

export default {
  get (id, cb, errorCb) {
    axios.get(`${config.API_ADDRESS}/subscriber/${id}`, { withCredentials: true }).then((response) => {
      cb(response.data)
    }).catch((error) => { errorCb(error) })
  },
  all (skip, limit, cb, errorCb) {
    axios.get(`${config.API_ADDRESS}/subscribers?skip=${skip}&limit=${limit}`, { withCredentials: true }).then((response) => {
      cb(response.data)
    }).catch((error) => { errorCb(error) })
  },
  create (body, cb, errorCb) {
    axios.post(`${config.API_ADDRESS}/subscriber`, body, { withCredentials: true }).then((response) => {
      cb(response.data)
    }).catch((error) => { errorCb(error) })
  },
  destroy (_id, cb, errorCb) {
    axios.post(`${config.API_ADDRESS}/subscriber/destroy`, { _id }, { withCredentials: true }).then((response) => {
      cb(response.data)
    }).catch((error) => { errorCb(error) })
  },
  destroyAll (cb, errorCb) {
    axios.post(`${config.API_ADDRESS}/subscriber/destroy/all`, {}, { withCredentials: true }).then((response) => {
      cb(response.data)
    }).catch((error) => { errorCb(error) })
  }
}
