<template lang="pug">
.custom-toggle(@click="toggleState" v-bind:class="{ on: value }")
</template>

<script>
export default {
  name: 'custom-toggle',
  props: ['value'],
  methods: {
    toggleState () {
      this.$emit('input', Boolean(!this.value))
    }
  }
}
</script>

<style lang="stylus" scoped>

@import '~stylus/shared'

$toggle-on-color = $color-success
$toggle-off-color = $color-border
$knob-on-color = white
$knob-off-color = white

$toggle-height = 20px
$toggle-width = 30px
$knob-size = 16px
$knob-margin = (($toggle-height - $knob-size) / 2)

.custom-toggle
  animate()
  radius($toggle-height / 2)
  background-color $toggle-off-color
  height $toggle-height
  position relative
  width $toggle-width
  &:hover
    cursor pointer
  &:before
    animate()
    radius($knob-size / 2)
    background-color $knob-off-color
    border-box()
    content ''
    height $knob-size
    position absolute
    right $toggle-width - $knob-size - $knob-margin
    top $knob-margin
    width $knob-size
  &.on
    background-color $toggle-on-color
    &:before
      background-color $knob-on-color
      right $knob-margin
    

</style>
