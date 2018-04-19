<template lang="pug">

.auth-view
  nav-header
  #auth-container
    form
      h3 Email or ID
      p Request an access link below to view dashboard.
      input(v-model="userInput" type="text" placeholder="e.g. me@example.com" v-on:keydown.enter="requestLink")
      .button(v-bind:class="[ userInput.length === 0 ? 'disabled': 'success-button' ]" @click="requestLink") {{ (isSecret) ? 'Login' : 'Request Link' }}

</template>

<script>
import { mapGetters } from 'vuex'
import API from '@/api'
import NavHeader from '@/components/NavHeader'

export default {
  name: 'Auth',
  components: {
    NavHeader
  },
  mounted () {
    if (this.isAuthenticated) {
      this.$router.push({ name: 'dashboard' })
    }
  },
  watch: {
    isSecret (nV, oV) {
      if (nV) {
        this.requestLink()
      }
    }
  },
  data () {
    return {
      userInput: ''
    }
  },
  computed: {
    ...mapGetters(['isAuthenticated', 'config']),
    isSecret () {
      const regexp = /([a-zA-Z0-9]{8}[-]{1}[a-zA-Z0-9]{4}[-]{1}[a-zA-Z0-9]{4}[-]{1}[a-zA-Z0-9]{4}[-]{1}[a-zA-Z0-9]{12}){1}/i
      return this.userInput.match(regexp)
    }
  },
  methods: {
    requestLink () {
      if (this.isSecret) {
        // User has entered a secret so simply auth them
        document.location = `${this.config.API_ADDRESS}/auth/login/${this.userInput}`
      } else {
        // Send user a new link
        API.auth.sendlink(
          { identifier: this.userInput, email: this.userInput },
          (response) => {
            console.log(response)
            this.$router.push({ query: { status: 'linksent' } })
          },
          (response) => {
            console.log(response)
            this.$router.push({ query: { status: 'linkfailed' } })
          })
      }
    }
  }
}
</script>

<style lang="stylus" scoped>

@import '~stylus/shared'

$auth-width = 320px

reset()
  margin 0
  padding 0

border-box()
  box-sizing border-box
  -moz-box-sizing border-box
  -webkit-box-sizing border-box

radius(r)
  border-radius r
  -moz-border-radius r
  -webkit-border-radius r

.auth-view
  #auth-container
    radius(6px)
    border-box()
    background-color white
    max-width 100%
    width $auth-width
    position absolute
    top 50%
    left 50%
    margin-left -($auth-width/2)
    padding 30px
    transform translateY(-50%)
    text-align center
    form
      a
        text-decoration none
      h3
        reset()
        font-size 1.4em
        font-weight bold
      input
        radius(6px)
        border-box()
        background-color #f2f2f2
        border none
        color #999
        font-size 1.2em
        font-weight bold
        margin-bottom 20px
        outline 0
        padding 15px 20px
        text-align center
        width 100%
</style>
