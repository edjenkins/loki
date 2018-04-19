<template lang="pug">
  .custom-slider
    input.slider(type="range" min="0" max="100" v-bind:value="value" @change="updateValue($event.target.value)")
    .slider-label.min {{ minLabel }}
    .slider-label.max {{ maxLabel }}
</template>

<script>
export default {
  name: 'custom-slider',
  props: ['value', 'minLabel', 'maxLabel'],
  methods: {
    updateValue (value) {
      this.$emit('input', Number(value))
    }
  }
}
</script>

<style lang="stylus" scoped>

@import '~stylus/shared'

.custom-slider
  margin-bottom 20px
  padding 20px 0
  position relative
  width 100%
  .slider-label
    color $color-text-dark-grey
    font-size 0.8em
    position absolute
    text-align center
    width 60px
    &.min
      bottom 0
      left 0
    &.max
      bottom 0
      right 0
  .slider
    radius(5px)
    -webkit-appearance none
    width calc(100% - 10px)
    margin 0 5px
    height 10px
    background $color-border
    outline none
    opacity 0.7
    -webkit-transition .2s
    transition opacity .2s

  .slider::-webkit-slider-thumb {
    radius(50%)
    -webkit-appearance none
    appearance none
    width 25px
    height 25px
    background $color-primary
    cursor pointer
  }

  .slider::-moz-range-thumb {
    width 25px
    height 25px
    border-radius 50%
    background $color-primary
    cursor pointer
  }
</style>
