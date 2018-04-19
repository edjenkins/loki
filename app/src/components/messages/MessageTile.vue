<template lang="pug">
.tile
  p {{ message.text }}
</template>

<script>
export default {
  name: 'message-tile',
  props: ['message']
}
</script>

<style lang="stylus" scoped>

@import '~stylus/shared'

$color-tile = lighten($color-darkest-grey, 5%)

.tile
  radius(10px)
  hover($color-tile)
  background-color $color-tile
  float left
  margin 10px
  min-width 200px
  padding 20px
  position relative
  p
    reset()
    color white
</style>
