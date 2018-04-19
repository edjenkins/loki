import Vue from 'vue'
import Vuex from 'vuex'

import * as config from '@/config'
import auth from '@/store/modules/auth'
import groups from '@/store/modules/groups'
import subscribers from '@/store/modules/subscribers'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    auth,
    groups,
    subscribers
  },
  state: {
    debug: false
  },
  getters: {
    config () {
      return require('@/config')
    },
    defaultTitle () {
      return config.DEFAULT_TITLE
    },
    defaultSubtitle () {
      return config.DEFAULT_SUBTITLE
    }
  },
  actions: {
  },
  mutations: {
  }
})
