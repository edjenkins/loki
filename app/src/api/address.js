import axios from 'axios'
import * as config from '@/config'

export default {
  get (id, cb, errorCb) {
    axios.get(`${config.API_ADDRESS}/address/${id}`, { withCredentials: true }).then((response) => {
      cb(response.data)
    }).catch((error) => { errorCb(error) })
  },
  all (cb, errorCb) {
    axios.get(`${config.API_ADDRESS}/addresses`, { withCredentials: true }).then((response) => {
      cb(response.data)
    }).catch((error) => { errorCb(error) })
  },
  create (body, cb, errorCb) {
    axios.post(`${config.API_ADDRESS}/address`, body, { withCredentials: true }).then((response) => {
      cb(response.data)
    }).catch((error) => { errorCb(error) })
  },
  search (body, cb, errorCb) {
    axios.post(`${config.API_ADDRESS}/address/search`, body, { withCredentials: true }).then((response) => {
      cb(response.data)
    }).catch((error) => { errorCb(error) })
  },
  destroy (_id, cb, errorCb) {
    axios.post(`${config.API_ADDRESS}/address/destroy`, { _id }, { withCredentials: true }).then((response) => {
      cb(response.data)
    }).catch((error) => { errorCb(error) })
  }
}
