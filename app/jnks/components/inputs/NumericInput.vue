<template lang="pug">
  .numeric-input
    .input-wrapper
      input(ref="input" type="text" v-bind:placeholder="placeholder" v-bind:value="value" v-on:input="updateValue($event.target.value)")
      .input-label {{ inputLabel }}
</template>

<script>
export default {
  name: 'numeric-input',
  props: ['value', 'placeholder', 'input-label'],
  methods: {
    updateValue (value) {
      value = value.replace(new RegExp('[a-zA-Z]'), '')
      value = (Number(value)) ? Number(value) : 0
      this.$refs.input.value = value
      this.$emit('input', Math.floor(value))
    }
  }
}
</script>

<style lang="stylus" scoped>

@import '~stylus/shared'

.input-wrapper
  padding 0
  position relative
  text-align left
  label
    display block
    font-weight bold
    height 40px
    line-height 40px
    padding 0 10px
  input
    radius(22px)
    border $color-border 1px solid
    height 44px
    width calc(100% - 40px)
    outline 0
    padding 0 20px
  .input-label
    radius(50%)
    background-color $color-border
    border transparent 1px solid
    color $color-text-grey
    font-weight bold
    position absolute
    right -2px
    top 0px
    height 44px
    line-height 44px
    width 44px
    text-align center

</style>
