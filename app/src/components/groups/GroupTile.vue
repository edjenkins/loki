<template lang="pug">
.tile(:class="[view, { selected: selected, padded: padded }]" @click="$emit('click')")
  .icon(v-bind:style="{ 'background-color': colorFromId(parseInt(group.identifier, 36)) }")
  h2 {{ group.identifier }}
  h5 {{ group.addresses.length }}
  .check-mark(v-show="selected")
    i.fas.fa-check
</template>

<script>
import ColorGenerator from '@/mixins/ColorGenerator'

export default {
  name: 'group-tile',
  props: ['group', 'view', 'selected', 'padded'],
  mixins: [ColorGenerator]
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
  min-width 200px
  padding 20px
  position relative
  &.padded
    margin 10px
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
  .check-mark
    abstr(10px)
    color white

  &.mini
    radius(20px)
    background-color white
    border transparent 1px solid
    min-width 160px
    padding 0 10px 0 30px
    .icon
      top 15px
    h2
      color $color-text-grey
      font-size 1em
      line-height 40px
    h5
      display none
    &.padded
      margin 5px
    &.selected
      border-color $color-success
      .check-mark
        color $color-success
      h2
        color darken($color-text-grey, 10%)

  &.tag
    radius(15px)
    background-color lighten($color-darkest-grey, 10%)
    border transparent 2px solid
    line-height 30px
    margin -10px 10px 20px 0
    min-width 0
    padding 0 15px 0 30px
    .icon
      top 10px
    h2
      color $color-text-grey
      font-size 1em
    h5
      display none
</style>
