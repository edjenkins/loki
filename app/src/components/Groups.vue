<template lang="pug">
.groups-view
  nav-header

  .view-controls
    router-link.button.info-button.pull-left(:to="{ name: 'dashboard' }" tag="div")
      i.fas.fa-arrow-left
    .button.info-button.pull-left(@click="toggleViewMode")
      i.fas.fa-window-maximize
    .button.danger-button.pull-right(@click="destroyAllGroups")
      i.fas.fa-exclamation-circle
    .button.success-button.pull-right(@click="parseGroupsCSV" title="Parse Groups CSV")
      i.fas.fa-sync-alt
    .button.success-button.pull-right(@click="getGroups" title="Fetch Groups")
      i.fas.fa-download
    .clearfix

  .group-tiles(v-if="viewMode === 'tiles'")
    group-tile(v-for="(group, index) in groups" :key="index" :group="group" :padded="true")
  .clearfix
  .group-table(v-if="viewMode === 'rows'")
    group-row(v-for="(group, index) in groups" :key="index" :group="group")
    .clearfix
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import API from '@/api'

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
    ...mapActions(['getGroups']),
    parseGroupsCSV () {
      axios.get('http://localhost:3000/parse/groups').then(response => {
        this.$store.dispatch('getGroups')
      })
    },
    destroyAllGroups () {
      API.group.destroyAll(
        (response) => {
          console.log(response)
          this.$store.dispatch('getGroups')
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

.groups-view
  pinned()
  background-color $color-darkest-grey
  overflow scroll
  position fixed
  top $nav-height
  .group-tiles
    padding 10px
</style>
