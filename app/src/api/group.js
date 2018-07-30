import axios from 'axios'
import * as config from '@/config'

export default {
  get (id, cb, errorCb) {
    axios.get(`${config.API_ADDRESS}/group/${id}`, { withCredentials: true }).then((response) => {
      cb(response.data)
    }).catch((error) => { errorCb(error) })
  },
  all (cb, errorCb) {
    axios.get(`${config.API_ADDRESS}/groups`, { withCredentials: true }).then((response) => {
      cb(response.data)
    }).catch((error) => { errorCb(error) })
  },
  create (body, cb, errorCb) {
    axios.post(`${config.API_ADDRESS}/group`, body, { withCredentials: true }).then((response) => {
      cb(response.data)
    }).catch((error) => { errorCb(error) })
  },
  destroy (id, cb, errorCb) {
    axios.post(`${config.API_ADDRESS}/group/destroy`, { _id: id }, { withCredentials: true }).then((response) => {
      cb(response.data)
    }).catch((error) => { errorCb(error) })
  },
  destroyAll (cb, errorCb) {
    axios.post(`${config.API_ADDRESS}/group/destroy/all`, {}, { withCredentials: true }).then((response) => {
      cb(response.data)
    }).catch((error) => { errorCb(error) })
  },
  source (id, cb, errorCb) {
    axios.get(`${config.API_ADDRESS}/source/${id}`, { withCredentials: true }).then((response) => {
      cb(response.data)
    }).catch((error) => { errorCb(error) })
  }
}
