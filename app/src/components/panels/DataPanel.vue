<template lang="pug">

  #data-container(v-bind:class="{ visible: visible }")
    .controls
      .button.info-button.pull-left(@click="togglePanel('controls')") {{ controlsPanel ? 'Hide' : 'Show' }} Controls
      .button.info-button.pull-right(@click="togglePanel('data')") {{ dataPanel ? 'Hide' : 'Show' }} Panel
      .clearfix
    .col.left-col.pull-left
      pre {{ routes }}
    .col.right-col.pull-right
    .clearfix

</template>

<script>
// import axios from 'axios'

export default {
  name: 'data-panel',
  props: [ 'routes', 'visible', 'controlsPanel', 'dataPanel' ],
  methods: {
    togglePanel (panel) {
      switch (panel) {
        case 'controls':
          this.$emit('update:controlsPanel', !this.controlsPanel)
          break
        case 'data':
          this.$emit('update:dataPanel', !this.dataPanel)
          break
      }
    },
    loadAddresses () {
      // routes.forEach(data => {
      //   let address = encodeURIComponent(data.ADDRESS)
      //   if (address.length > 10) {
      //     const query = `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${this.googleKey}`
      //     axios.get(query).then((response) => {
      //       const results = response.data.results
      //       const location = results[0].geometry.location
      //       this.coreResults.push({
      //         route: data.ROUTE,
      //         addr: data.ADDRESS,
      //         location: location,
      //         results: results
      //       })
      //     })
      //   }
      // })
    }
  }
}
</script>

<style lang="stylus" scoped>

@import '~stylus/shared'

#data-container
  pinned()
  animate()
  background-color white
  border-top $color-info 2px solid
  overflow auto
  position fixed
  text-align left
  top auto
  bottom -($data-height - $data-peek-height)
  height $data-height
  z-index 500
  &.visible
    bottom 0
  .controls
    background-color $color-info
    padding 10px
  .col
    width 50%

</style>
