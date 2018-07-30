<template lang="pug">
  #app
    flash-message
    router-view
</template>

<script>
import FlashMessage from '@/components/FlashMessage'

export default {
  name: 'App',
  components: {
    FlashMessage
  },
  mounted () {
    this.$store.dispatch('getGroups')
    this.$store.dispatch('getSubscribers')
  }
}
</script>

<style lang="stylus">

@import '~stylus/shared'

html, body
  reset()
  gradient()
#app
  font-family 'Avenir', Helvetica, Arial, sans-serif
  -webkit-font-smoothing antialiased
  -moz-osx-font-smoothing grayscale
  text-align center
  color #2c3e50
</style>
