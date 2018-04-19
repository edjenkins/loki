import axios from 'axios'
import * as config from '@/config'

export default {
  get (id, cb, errorCb) {
    axios.get(`${config.API_ADDRESS}/subscriber/${id}`, { withCredentials: true }).then((response) => {
      cb(response.data)
    }).catch((error) => { errorCb(error) })
  },
  all (cb, errorCb) {
    axios.get(`${config.API_ADDRESS}/subscribers`, { withCredentials: true }).then((response) => {
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
  }
}
