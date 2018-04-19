<template lang="pug">
  .date-input
    .input-wrapper
      datepicker(v-bind:placeholder="placeholder" v-bind:format="customFormatter" v-model="dateValue" v-on:input="updateValue" initial-view="year")
</template>

<script>
import Moment from 'moment'
import Datepicker from 'vuejs-datepicker'

export default {
  name: 'date-input',
  props: ['value', 'placeholder'],
  components: {
    Datepicker
  },
  data () {
    return {
      dateValue: undefined
    }
  },
  methods: {
    updateValue () {
      this.dateValue = Moment(this.dateValue).format('YYYY-MM-DD')
      this.$emit('input', this.dateValue)
    },
    customFormatter (date) {
      return Moment(date).format('LL')
    }
  }
}
</script>

<style lang="stylus">

@import '~stylus/shared'

.date-input

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
    .vdp-datepicker
      input
        radius(22px)
        border $color-border 1px solid
        height 44px
        width 100%
        outline 0
        padding 0 20px !important
        &:hover
          cursor pointer
</style>
