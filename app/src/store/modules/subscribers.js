import API from '@/api'

// initial state
const state = {
  subscribers: []
}

// getters
const getters = {
  subscribers () {
    return state.subscribers
  }
}

// actions
const actions = {
  async getSubscribers () {
    // Fetch subscribers
    API.subscriber.all(
      (response) => {
        console.log(response)
        this.commit('saveSubscribers', response.subscribers)
      },
      (response) => {
        console.error(response)
        this.commit('saveSubscribers', [])
      })
  }
}

// mutations
const mutations = {
  saveSubscribers (state, subscribers) {
    state.subscribers = subscribers
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
