<template lang="pug">
  .custom-selector
    //- https://brandquad.github.io/bp-vuejs-demo/#/dropdown
    dropdown(v-bind:align="'bottom'" v-bind:class-name="'custom'" v-bind:close-on-click="true")
      template(slot="btn") {{ buttonTitle }}
      template(slot="body")
        .category(v-if="clear" @click="updateValue(undefined)")
          label {{ clear }}
        .category(v-for="(option, index) in filteredOptions" @click="updateValue(option.value)")
          label {{ option.label }}
</template>

<script>
import Dropdown from 'bp-vuejs-dropdown'

import _find from 'lodash/find'
import _uniqBy from 'lodash/uniqBy'

export default {
  name: 'custom-selector',
  props: ['title', 'clear', 'options', 'value'],
  components: {
    Dropdown
  },
  methods: {
    updateValue (value) {
      this.$emit('input', value)
    }
  },
  computed: {
    buttonTitle () {
      return this.value ? _find(this.options, { value: this.value }).label : this.title
    },
    filteredOptions () {
      return _uniqBy(this.options, 'label')
    }
  }
}
</script>

<style lang="stylus">

@import '~stylus/shared'

.custom-bp__btn, .bp-dropdown__btn.custom-bp__btn
  radius(22px)
  background-color white !important
  padding 8px 15px 8px 20px !important

  .bp-dropdown__icon.bp-dropdown__icon--bottom
    margin-left 10px

.custom-bp__body
  radius(6px)
  margin-top 10px
  max-height 170px
  overflow scroll
  padding 0 !important
  width 180px
  .category
    border-bottom 1px solid $color-border
    padding 8px 15px
    label
      reset()
    &:hover, label:hover
      background-color $color-lightest-grey
      cursor pointer
</style>
