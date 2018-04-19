<template lang="pug">
.subscribers-view
  nav-header
  .view-controls
    router-link.button.info-button.pull-left(:to="{ name: 'dashboard' }")
      i.fas.fa-arrow-left
    .button.info-button.pull-left(@click="toggleViewMode")
      i.fas.fa-window-maximize
    router-link.button.success-button.pull-right(:to="{ name: 'subscribe' }")
      i.fas.fa-plus
    .clearfix

  .subscriber-tiles(v-if="viewMode === 'tiles'")
    subscriber-tile(v-for="(subscriber, index) in subscribers" :key="index" :subscriber="subscriber" v-on:destroyed="getSubscribers")
  .clearfix
  .subscriber-table(v-if="viewMode === 'rows'")
    subscriber-row(v-for="(subscriber, index) in subscribers" :key="index" :subscriber="subscriber" v-on:destroyed="getSubscribers")
</template>

<script>
import API from '@/api'

import ViewModeMixin from '@/mixins/ViewModeMixin'

import NavHeader from '@/components/NavHeader'
import SubscriberTile from '@/components/subscribers/SubscriberTile'
import SubscriberRow from '@/components/subscribers/SubscriberRow'

export default {
  name: 'subscribers',
  mixins: [ ViewModeMixin ],
  components: {
    NavHeader,
    SubscriberTile,
    SubscriberRow
  },
  mounted () {
    this.getSubscribers()
  },
  data () {
    return {
      viewMode: 'rows',
      subscribers: []
    }
  },
  methods: {
    getSubscribers () {
      API.subscriber.all(
        (response) => {
          console.log(response)
          this.subscribers = response.subscribers
        },
        (response) => {
          console.log(response)
        }
      )
    }
  }
}
</script>

<style lang="stylus">

@import '~stylus/shared'

.subscribers-view
  pinned()
  background-color $color-darkest-grey
  overflow scroll
  position fixed
  top $nav-height
  .subscriber-tiles
    padding 10px
</style>
