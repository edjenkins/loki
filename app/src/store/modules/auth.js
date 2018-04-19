import API from '@/api'

// initial state
const state = {
  user: undefined
}

// getters
const getters = {
  user () {
    return state.user
  },
  isAuthenticated () {
    return (typeof state.user !== 'undefined')
  }
}

// actions
const actions = {
  async reloadUser () {
    // Fetch user
    const user = await new Promise(resolve => {
      API.auth.getProfile(
        (response) => {
          resolve(response.data)
        },
        (response) => {
          console.log(response)
          resolve(undefined)
        })
    })
    // Commit profile
    this.commit('updateUser', user)
  }
}

// mutations
const mutations = {
  updateUser (state, user) {
    state.user = user
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
