<template lang="pug">

  #container(v-bind:class="{ visible: visible }")

    .section
      .header
        .title Groups
        router-link.action(v-bind:to="{ name: 'groups' }" tag="div" title="Manage groups") #[i.fas.fa-cog]
      .content
        p(v-if="groups.length === 0") No groups
        ul(v-else)
          li(v-for="(group, index) in groups" v-bind:key="index" @click="selectLayer(group._id, true)" :class="{ 'active': activeGroup === group._id }")
            i.fas.fa-circle(v-bind:style="{ 'color': getColor(group.identifier) }" data-fa-transform="shrink-5")
            h4 {{ group.identifier }}
            p {{ pluralise('location', Object.keys(group.addresses).length) }}
            p {{ pluralise('subscriber', Object.keys(group.subscribers).length) }}

    .section
      router-link.header(v-bind:to="{ name: 'messages' }" tag="div" title="Manage messages")
        .title Messages
        .action
          i.fas.fa-cog
      .content
        p {{ `${messages.length} messages` }}
      .content.hidden
        p(v-if="messages.length === 0") No messages
        ul(v-else)
          router-link(v-for="(message, index) in messages" v-bind:key="index" tag="li" :to="{ name: 'messages', params: { id: message._id } }")
            h4 {{ message.text }}

    .section
      router-link.header(v-bind:to="{ name: 'subscribers' }" tag="div" title="Manage subscribers")
        .title Subscribers
        .action
          i.fas.fa-cog
      .content
        p {{ `${subscribers.length} subscribers` }}
      .content.hidden
        p(v-if="subscribers.length === 0") No subscribers
        ul(v-else)
          router-link(v-for="(subscriber, index) in subscribers" v-bind:key="index" tag="li" :to="{ name: 'subscribers', params: { id: subscriber._id } }")
            i.fas.fa-user(data-fa-transform="shrink-5")
            h4 {{ subscriber.name }}

</template>

<script>
import { mapGetters } from 'vuex'

import mapboxgl from 'mapbox-gl'
import _get from 'lodash/get'

import ColorGenerator from '@/mixins/ColorGenerator'

export default {
  name: 'controls-panel',
  props: [ 'messages', 'subscribers', 'visible' ],
  mixins: [ ColorGenerator ],
  watch: {
    groups () {
      this.selectLayer(this.activeGroup, false)
    }
  },
  mounted () {
    this.selectLayer(this.$route.params.group, false)
  },
  data () {
    return {
      activeGroup: undefined
    }
  },
  computed: {
    ...mapGetters(['groups'])
  },
  methods: {
    pluralise (string, count) {
      string = `${count !== 0 ? count : 'No'} ${string}`
      string += count !== 1 ? 's' : ''
      return string
    },
    getColor (group) {
      return this.colorFromId(parseInt(group, 36))
    },
    selectLayer (groupId, clicked) {
      let bounds = new mapboxgl.LngLatBounds()
      if (clicked && groupId === this.activeGroup) {
        window.map.flyTo({center: [-1.605359, 54.990937], zoom: 14})
        this.activeGroup = undefined
        this.$router.replace({ name: 'dashboard' })
        return
      }

      this.activeGroup = groupId
      if (typeof window.map.getSource !== 'function') return

      try {
        const source = window.map.getSource(`source-addresses-${groupId}`)
        let features = _get(source, '_data.features', [])
        this.$router.replace({ name: 'dashboard', params: { group: groupId } })
        if (!features) throw Error('No Features')
        for (let feature of features) { bounds.extend(feature.geometry.coordinates) }
        if (features.length) {
          window.map.fitBounds(bounds, {
            padding: { top: 40, bottom: 40, left: this.visible ? 340 : 40, right: 40 }
          })
        }
      } catch (error) {
        console.error(error)
        setTimeout(() => {
          this.selectLayer(groupId, clicked)
        }, 1000)
      }
    }
  }
}
</script>

<style lang="stylus" scoped>

@import '~stylus/shared'

#container
  pinned()
  animate()
  background-color $color-darkest-grey
  border-right $color-info 2px solid
  overflow auto
  position fixed
  text-align left
  left - ($controls-width + 2px)
  right auto
  top $nav-height
  width $controls-width
  z-index 500
  &.visible
    left 0
  p
    reset()
    color alpha(white, 0.3)
    font-size .9em
    padding 0px 20px 0 20px
  ul
    resetlist()
    li
      resetlist()
      hover($color-darkest-grey)
      border-bottom alpha(white, 0.05) 1px solid
      border-left transparent 3px solid
      color white
      padding 20px 20px 20px 16px
      &.active
        border-left-color $color-info
        background-color darken($color-darkest-grey, 10%)
      &:first-child
        margin-top -10px
      svg
        margin-right 6px
      h4
        reset()
        display inline-block

#container
  .section
    .header
      position relative
      .title
        reset()
        color alpha(white, 0.6)
        line-height 50px
        padding 0 20px
      .action
        animate()
        opacity 0
        position absolute
        top 0
        right 0
        width 50px
        text-align center
        svg
          color white
          height 50px
      &:hover
        cursor pointer
        .action
          opacity .5
    .content
      min-height 50px

</style>
