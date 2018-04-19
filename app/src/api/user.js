import axios from 'axios'
import * as config from '@/config'

export default {
  get (cb, errorCb) {
    axios.get(`${config.API_ADDRESS}/users/list`, { withCredentials: true }).then((response) => {
      cb(response.data)
    })
      .catch((error) => {
        errorCb(error)
      })
  }
}
