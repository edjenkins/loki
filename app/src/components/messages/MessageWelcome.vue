<template lang="pug">
#welcome
  i.far.fa-envelope-open.fa-3x
  h1 Message Panel
</template>

<script>
export default {
  name: 'message-welcome'
}
</script>

<style lang="stylus" scoped>
@import '~stylus/shared'

#welcome
  padding 160px 20px
  h1, svg
    color $color-text-grey
</style>
