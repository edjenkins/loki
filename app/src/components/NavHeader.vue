<template lang="pug">

#nav-header
  //- router-link#back-link(v-if="$route.name !== 'dashboard' && $route.name !== 'auth'" v-bind:to="{ name: 'dashboard' }") Home
  //- a#back-link(v-bind:href="logoutLink" target="_self" v-if="$route.name === 'dashboard'") Logout
  router-link(tag="h1" v-bind:to="{ name: 'dashboard' }") {{ route }}
  #state(v-bind:class="{ 'healthy': healthy }")
</template>

<script>
import API from '@/api'
import * as config from '@/config'
import { mapGetters } from 'vuex'

export default {
  name: 'nav-header',
  props: ['title', 'subtitle'],
  mounted () {
    this.healthCheck()
    setInterval(this.healthCheck, 30000)
  },
  data () {
    return {
      healthy: false
    }
  },
  computed: {
    ...mapGetters(['defaultTitle', 'defaultSubtitle', 'userFullname', 'userRole']),
    logoutLink () {
      return `${config.API_ADDRESS}/auth/logout`
    },
    route () {
      return `${this.title || this.defaultTitle}${this.$route.path}`
    }
  },
  methods: {
    healthCheck () {
      API.auth.health(
        (response) => {
          this.healthy = true
        },
        (response) => {}
      )
    }
  }
}
</script>

<style lang="stylus" scoped>

@import '~stylus/shared'

#nav-header
  background-color $color-info
  height $nav-height
  position fixed
  left 0
  top 0
  right 0
  text-align left
  z-index 999
  #state
    radius(($nav-height - 10px) / 2)
    background-color $color-danger
    height $nav-height - 10px
    min-width $nav-height - 10px
    position fixed
    top 5px
    right 5px
    &.healthy
      background-color $color-success
  h1
    reset()
    color white
    font-size .8em
    font-weight bold
    line-height $nav-height
    margin 0 10px
    &:hover
      cursor pointer

</style>
