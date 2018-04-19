import axios from 'axios'
import * as config from '@/config'

export default {
  get (id, cb, errorCb) {
    axios.get(`${config.API_ADDRESS}/message/${id}`, { withCredentials: true }).then((response) => {
      cb(response.data)
    }).catch((error) => { errorCb(error) })
  },
  all (cb, errorCb) {
    axios.get(`${config.API_ADDRESS}/messages`, { withCredentials: true }).then((response) => {
      cb(response.data)
    }).catch((error) => { errorCb(error) })
  },
  create (body, cb, errorCb) {
    axios.post(`${config.API_ADDRESS}/message`, body, { withCredentials: true }).then((response) => {
      cb(response.data)
    }).catch((error) => { errorCb(error) })
  },
  update (body, cb, errorCb) {
    axios.put(`${config.API_ADDRESS}/message`, body, { withCredentials: true }).then((response) => {
      cb(response.data)
    }).catch((error) => { errorCb(error) })
  },
  process (cb, errorCb) {
    axios.post(`${config.API_ADDRESS}/messages/process`, { }, { withCredentials: true }).then((response) => {
      cb(response.data)
    }).catch((error) => { errorCb(error) })
  },
  destroy (_id, cb, errorCb) {
    axios.post(`${config.API_ADDRESS}/message/destroy`, { _id }, { withCredentials: true }).then((response) => {
      cb(response.data)
    }).catch((error) => { errorCb(error) })
  }
}
