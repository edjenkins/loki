<template lang="pug">
.groups-view
  nav-header

  .view-controls
    router-link.button.info-button.pull-left(:to="{ name: 'dashboard' }" tag="div")
      i.fas.fa-arrow-left
    .button.info-button.pull-left(@click="toggleViewMode")
      i.fas.fa-window-maximize
    .button.success-button.pull-right(@click="parseCSV" title="Parse CSV")
      i.fas.fa-sync-alt
    .clearfix

  .group-tiles(v-if="viewMode === 'tiles'")
    group-tile(v-for="(group, index) in groups" :key="index" :group="group" :padded="true")
  .clearfix
  .group-table(v-if="viewMode === 'rows'")
    group-row(v-for="(group, index) in groups" :key="index" :group="group")
    .clearfix
</template>

<script>
import { mapGetters } from 'vuex'

import axios from 'axios'

import ViewModeMixin from '@/mixins/ViewModeMixin'

import NavHeader from '@/components/NavHeader'
import GroupTile from '@/components/groups/GroupTile'
import GroupRow from '@/components/groups/GroupRow'

export default {
  name: 'Groups',
  mixins: [ ViewModeMixin ],
  components: {
    NavHeader,
    GroupTile,
    GroupRow
  },
  computed: {
    ...mapGetters(['groups'])
  },
  methods: {
    parseCSV () {
      axios.get('http://localhost:3000/parse')
    }
  }
}
</script>

<style lang="stylus">

@import '~stylus/shared'

.groups-view
  pinned()
  background-color $color-darkest-grey
  overflow scroll
  position fixed
  top $nav-height
  .group-tiles
    padding 10px
</style>
