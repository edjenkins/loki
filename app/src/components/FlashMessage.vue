<template lang="pug">

.flash-message-wrapper
  transition(name="fade")
    .flash-message(v-if="status" v-bind:class="[statuses[status].type]" @click="dismissFlashMessage")
      h3 {{ statuses[status].title }}
      p {{ statuses[status].description }}

</template>

<script>
export default {
  name: 'flash-message',
  mounted () {
    this.timeoutMessage()
  },
  watch: {
    status (nV, oV) {
      if (nV === oV) return
      this.timeoutMessage()
    }
  },
  data () {
    return {
      statuses: {
        'loggedin': {
          title: 'Welcome',
          description: 'You have been logged in!',
          type: 'success'
        },
        'logout': {
          title: 'Goodbye',
          description: 'You have been logged out.',
          type: 'success'
        },
        'fail': {
          title: 'Failed to authenticate',
          description: 'Please request a new link below.',
          type: 'danger'
        },
        'linksent': {
          title: 'Access link sent',
          description: 'Please check your email to access the system.',
          type: 'success'
        },
        'linkfailed': {
          title: 'Failed to Send',
          description: 'Please check your email/ID and try again.',
          type: 'danger'
        }
      }
    }
  },
  computed: {
    status () {
      return this.$route.query.status
    }
  },
  methods: {
    dismissFlashMessage () {
      this.$router.push({ query: { status: undefined } })
    },
    timeoutMessage () {
      setTimeout(() => {
        // Clear flash messages
        this.dismissFlashMessage()
      }, 2000)
    }
  }
}
</script>

<style lang="stylus" scoped>

@import '~stylus/shared'

.flash-message
  background-color #222
  display block
  height 90px
  overflow hidden
  padding 0 10px
  position relative
  width calc(100% - 20px)
  z-index 50
  &.success
    background-color alpha($color-success, 1)
  &.warning
    background-color alpha($color-warning, 1)
  &.danger
    background-color alpha($color-danger, 1)
  h3, p
    reset()
    color white
  h3
    line-height 20px
    margin 20px auto 10px auto
  p
    line-height 20px
    margin 10px auto 20px auto

</style>
