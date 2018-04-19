import API from '@/api'

// initial state
const state = {
  groups: []
}

// getters
const getters = {
  groups () {
    return state.groups
  }
}

// actions
const actions = {
  async getGroups () {
    // Fetch groups
    API.group.all(
      (response) => {
        console.log(response)
        this.commit('saveGroups', response.groups)
      },
      (response) => {
        console.error(response)
        this.commit('saveGroups', [])
      })
  }
}

// mutations
const mutations = {
  saveGroups (state, groups) {
    state.groups = groups
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
