<template lang="pug">

.dashboard-view
  nav-header

  #map
  controls-panel(v-bind:visible="controlsPanel" v-bind:messages="messages" v-bind:subscribers="subscribers")

</template>

<script>
import mapboxgl from 'mapbox-gl'

import API from '@/api'
import * as config from '@/config'
import { mapGetters } from 'vuex'

import ColorGenerator from '@/mixins/ColorGenerator'
import LocationPoints from '@/mixins/LocationPoints'

import NavHeader from '@/components/NavHeader'
import ControlsPanel from '@/components/panels/ControlsPanel'

export default {
  name: 'Dashboard',
  mixins: [ ColorGenerator, LocationPoints ],
  components: {
    NavHeader,
    ControlsPanel
  },
  mounted () {
    this.loadMessages()
    this.loadSubscribers()
    mapboxgl.accessToken = this.accessToken
    window.map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/dark-v9',
      center: [-1.605359, 54.990937],
      zoom: 14
    })
    window.map.on('load', (e) => {
      this.loadSources()
      this.mapLoaded()
      // Animate markers
      this.animateMarker()
    })
  },
  beforeDestroy () {
    clearTimeout(window.subscriberAnimationTimeout)
  },
  data () {
    return {
      accessToken: config.MAPBOX_TOKEN,
      showPoints: true,
      controlsPanel: true,
      messages: [],
      subscribers: [],
      timeout: undefined
    }
  },
  computed: {
    ...mapGetters(['groups'])
  },
  methods: {
    animateMarker () {
      const framesPerSecond = 30
      const initialOpacity = 0.8
      const initialRadius = 2
      const maxRadius = 30
      setTimeout(() => {
        for (let layer of window.map.getStyle().layers) {
          if (layer.id.startsWith('subscribers-')) {
            let radius = parseFloat(window.map.getPaintProperty(layer.id, 'circle-radius')) || initialRadius
            let opacity = parseFloat(window.map.getPaintProperty(layer.id, 'circle-opacity')) || initialOpacity
            radius += (maxRadius - radius) / framesPerSecond
            opacity -= (1.0 / framesPerSecond)

            window.map.setPaintProperty(layer.id, 'circle-radius', (opacity <= 0) ? initialRadius : radius)
            window.map.setPaintProperty(layer.id, 'circle-opacity', (opacity <= 0) ? 0 : opacity)
          }
        }
        this.animateMarker()
      }, 1500 / framesPerSecond)
    },
    loadMessages () {
      API.message.all(
        (response) => {
          this.messages = response.messages
        }, (response) => {
          this.messages = []
        }
      )
    },
    loadSubscribers () {
      API.subscriber.all(
        0,
        100000,
        (response) => {
          this.subscribers = response.subscribers
        }, (response) => {
          this.subscribers = []
        }
      )
    },
    mapLoaded (map) {
      this.loadLayers()
    },
    mapResized (map) {
    },
    loadLayers () {
      for (let group of this.groups) {
        window.map.addSource(`source-addresses-${group._id}`, { type: 'geojson', data: { type: 'FeatureCollection', features: [] } })
        window.map.addSource(`source-subscribers-${group._id}`, { type: 'geojson', data: { type: 'FeatureCollection', features: [] } })

        let addressesLayer = {
          'id': `addresses-${group._id}`,
          'type': 'circle',
          'paint': {
            'circle-radius': [
              'interpolate', ['linear'], ['zoom'],
              2, 0.2,
              5, 0.5,
              10, 1,
              15, 2,
              20, 8
            ],
            'circle-color': this.colorFromId(parseInt(group.identifier, 36)),
            'circle-opacity': 1.0
          },
          'source': `source-addresses-${group._id}`
        }

        let subscribersLayer = {
          'id': `subscribers-${group._id}`,
          'type': 'circle',
          'paint': {
            'circle-radius': [
              'interpolate', ['linear'], ['zoom'],
              2, 0.4,
              5, 1,
              10, 2,
              15, 4,
              20, 16
            ],
            'circle-color': 'red',
            'circle-opacity': 1.0
          },
          'source': `source-subscribers-${group._id}`
        }

        window.map.addLayer(addressesLayer)
        window.map.addLayer(subscribersLayer)
      }
    },
    loadSources () {
      for (let group of this.groups) {
        // Points layer
        API.group.source(
          group._id,
          (response) => {
            window.map.getSource(`source-addresses-${group._id}`).setData(response.addresses)
            window.map.getSource(`source-subscribers-${group._id}`).setData(response.subscribers)
          },
          (response) => {
            console.error(response)
          })
      }
    }
  }
}
</script>

<style lang="stylus">

@import '~stylus/shared'

.dashboard-view

  #map
    animate()
    pinned()
    background-color $color-darkest-grey
    position fixed
    top $nav-height

    &.controls-visible { left: $controls-width }

  .mapboxgl-canvas
    left 0 !important
    right 0 !important
    top 0 !important
    bottom 0 !important
    width 100%

</style>
