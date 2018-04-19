import axios from 'axios'
import * as config from '@/config'

export default {
  health (cb, errorCb) {
    axios.get(`${config.API_ADDRESS}/health`, { withCredentials: true }).then((response) => {
      cb(response.data)
    }).catch((error) => { errorCb(error) })
  }
}
