<template lang="pug">
.row
  p {{ subscriber.name }}
  h5 {{ subscriber.email }}
  h5 {{ subscriber.mobile }}
  .groups
    group-tile(:group="subscriber.address.group" :view="'tag'" @click="$router.push({ name: 'dashboard', params: { group: subscriber.address.group._id } })")
    .clearfix
  .controls
    .control#destroy(@click="destroy")
      i.fas.fa-trash
</template>

<script>
import API from '@/api'

import GroupTile from '@/components/groups/GroupTile'

export default {
  name: 'subscriber-row',
  props: ['subscriber'],
  components: {
    GroupTile
  },
  methods: {
    destroy () {
      API.subscriber.destroy(
        this.subscriber._id,
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
  padding 20px 20px 0 20px
  position relative
  text-align left
  pre
    color white
  p
    reset()
    color white
  h5
    reset()
    color alpha(white, 0.3)
    line-height 30px
  .groups
    padding-top 10px
  .controls
    position absolute
    right 10px
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
