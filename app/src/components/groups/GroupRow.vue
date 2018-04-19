<template lang="pug">
.row
  .icon(v-bind:style="{ 'background-color': colorFromId(parseInt(group.identifier, 36)) }")
  h2 {{ group.identifier }}
  h5 {{ group.addresses.length }}
</template>

<script>
import ColorGenerator from '@/mixins/ColorGenerator'

export default {
  name: 'group-row',
  props: ['group'],
  mixins: [ColorGenerator]
}
</script>

<style lang="stylus" scoped>

@import '~stylus/shared'

$color-row = lighten($color-darkest-grey, 5%)

.row
  hover($color-row)
  border-bottom $color-row 1px solid
  padding 30px
  position relative
  text-align left
  h2, h5
    reset()
    color white
  .icon
    abstl(10px)
    radius(50%)
    background-color white
    content ''
    height 10px
    width 10px
</style>
