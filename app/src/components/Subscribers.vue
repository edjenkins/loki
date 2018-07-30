<template lang="pug">
.subscribers-view
  nav-header
  .view-controls
    router-link.button.info-button.pull-left(:to="{ name: 'dashboard' }")
      i.fas.fa-arrow-left
    .button.info-button.pull-left(@click="toggleViewMode")
      i.fas.fa-window-maximize
    .button.danger-button.pull-right(@click="destroyAllSubscribers")
      i.fas.fa-exclamation-circle
    .button.success-button.pull-right(@click="parseSubscribersCSV" title="Parse Subscribers CSV")
      i.fas.fa-sync-alt
    .button.success-button.pull-right(@click="getSubscribers" title="Fetch Subscribers")
      i.fas.fa-download
    router-link.button.success-button.pull-right(:to="{ name: 'subscribe' }")
      i.fas.fa-plus
    .clearfix

  .pagination-control(:class="{ 'loading': loading, 'has-previous': (skip > 0), 'has-next': (skip < (count - limit)) }")
    .control.previous(@click="page('previous')") #[i.fas.fa-arrow-left]
    .control.title
      span(v-show="loading")
        .fa.fas.fa-pulse.fa-spinner
      span(v-show="!loading") {{ currentPage }}
    .control.next(@click="page('next')") #[i.fas.fa-arrow-right]

  .subscriber-tiles(v-if="viewMode === 'tiles'")
    subscriber-tile(v-for="(subscriber, index) in subscribers" :key="index" :subscriber="subscriber" v-on:destroyed="getSubscribers")
  .clearfix
  .subscriber-table(v-if="viewMode === 'rows'")
    subscriber-row(v-for="(subscriber, index) in subscribers" :key="index" :subscriber="subscriber" v-on:destroyed="getSubscribers")
</template>

<script>
import API from '@/api'
import axios from 'axios'

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
      subscribers: [],
      loading: false,
      skip: 0,
      count: 0,
      limit: 10
    }
  },
  computed: {
    currentPage () {
      return (this.skip / this.limit) + 1
    }
  },
  methods: {
    parseSubscribersCSV () {
      axios.get('http://localhost:3000/parse/subscribers').then(response => {
        this.getSubscribers()
      })
    },
    page (direction) {
      switch (direction) {
        case 'next':
          this.skip += this.limit
          this.getSubscribers()
          break
        case 'previous':
          this.skip -= this.limit
          this.getSubscribers()
          break
      }
    },
    getSubscribers () {
      this.loading = true
      API.subscriber.all(
        this.skip,
        this.limit,
        (response) => {
          console.log(response)
          ;({ subscribers: this.subscribers, skip: this.skip, count: this.count } = response)
          this.loading = false
        },
        (response) => {
          console.log(response)
          this.loading = false
        }
      )
    },
    destroyAllSubscribers () {
      API.subscriber.destroyAll(
        (response) => {
          console.log(response)
          this.subscribers = []
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

.pagination-control
  radius(20px)
  display inline-block
  user-select none
  &.loading
    pointer-events none
  .control
    color alpha(white, 0.5)
    display inline-block
    line-height 40px
    padding 0 20px
    pointer-events none
    &.title
      color white
      font-weight bold
      padding 0 10px
      width 30px
      svg
        color white
  &.has-previous
    .previous
      color white
      cursor pointer
      pointer-events all
  &.has-next
    .next
      color white
      cursor pointer
      pointer-events all
</style>
