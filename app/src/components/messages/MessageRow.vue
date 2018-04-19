<template lang="pug">
router-link.row(:to="{ name: 'message', params: { id: message._id } }" tag="div")
  h5(:title="message._id") {{ message.subject || 'No Subject' }}
  p {{ message.text }}
  p.state {{ message.state }}
  .controls
    .control#destroy(@click="destroy")
      i.fas.fa-trash
</template>

<script>
import API from '@/api'

export default {
  name: 'message-row',
  props: ['message'],
  methods: {
    destroy () {
      API.message.destroy(
        this.message._id,
        (response) => {
          this.$emit('destroyed')
        },
        (response) => {}
      )
    }
  }
}
</script>

<style lang="stylus" scoped>

@import '~stylus/shared'

$color-row = lighten($color-darkest-grey, 5%)

.row
  hover($color-row)
  border-bottom $color-row 1px solid
  padding 20px
  position relative
  text-align left
  &.router-link-exact-active
    border-left $color-info 2px solid
  h5, p
    reset()
    color white
    &.state
      font-size 0.6em
      text-transform capitalize

  .controls
    position absolute
    right 20px
    top 0
    .control
      animate()
      opacity 0.5
      &:hover
        cursor pointer
        opacity 1
      svg
        color white
        height 60px
</style>
