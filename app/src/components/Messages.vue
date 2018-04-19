<template lang="pug">
.messages-view
  nav-header

  #left-column
    .view-controls
      router-link.button.info-button.pull-left(:to="{ name: 'dashboard' }" title="Back to dashboard")
        i.fas.fa-arrow-left
      router-link.button.success-button.pull-right(v-if="$route.name !== 'compose'" :to="{ name: 'compose' }" title="Compose message")
        i.fas.fa-plus
      .button.warning-button.pull-right(@click="processMessages" title="Send all pending messages")
        i.fas.fa-paper-plane
      .clearfix

    #message-table(v-if="viewMode === 'rows'")
      message-row(v-for="(message, index) in messages" :key="index" :message="message" v-on:destroyed="getMessages")
      p.no-messages(v-if="!messages.length") No messages yet

  #center-column
    router-view

</template>

<script>
import API from '@/api'

import ViewModeMixin from '@/mixins/ViewModeMixin'

import NavHeader from '@/components/NavHeader'
import MessageTile from '@/components/messages/MessageTile'
import MessageRow from '@/components/messages/MessageRow'

export default {
  name: 'messages',
  mixins: [ ViewModeMixin ],
  components: {
    NavHeader,
    MessageTile,
    MessageRow
  },
  beforeRouteUpdate (to, from, next) {
    this.getMessages()
    next()
  },
  mounted () {
    this.getMessages()
  },
  data () {
    return {
      messages: []
    }
  },
  methods: {
    processMessages () {
      const pendingMessageCount = this.messages.filter(message => message.state === 'PENDING').length
      console.log(`Sending ${pendingMessageCount} message(s)`)
      API.message.process(
        (response) => {
          console.log(response)
          console.log(`Sent ${pendingMessageCount} message(s)`)
          this.getMessages()
        },
        (response) => {
          console.log(response)
          console.log('Failed to send message(s)')
          this.getMessages()
        })
    },
    getMessages () {
      API.message.all(
        (response) => {
          console.log(response)
          this.messages = response.messages
        },
        (response) => {
          console.log(response)
        })
    }
  }
}
</script>

<style lang="stylus">

@import '~stylus/shared'

$left-col-desktop = 400px
$left-col-tablet = 280px
$left-col-mobile = 200px
.messages-view
  pinned()
  background-color $color-darkest-grey
  overflow scroll
  position fixed
  top $nav-height

  #dashboard-button
    color white
    display block
    padding 10px 20px
    text-align left
    text-decoration none
    svg
      margin-right 10px

  #message-table
    .button
      border-box()
      margin 20px
      width calc(100% - 40px)
    p.no-messages
      reset()
      background-color alpha(white, 0.1)
      color alpha(white, 0.5)
      padding 60px 20px

  #left-column
    pinned()
    border-right lighten($color-darkest-grey, 5%) 1px solid
    position fixed
    right calc(100% - $left-col-desktop)
    top $nav-height
    width $left-col-desktop

  #center-column
    pinned()
    background-color $color-lightest-grey
    position fixed
    left $left-col-desktop
    top $nav-height
    overflow-y scroll
    width calc(100% - $left-col-desktop)

  @media(max-width: 600px)
    #left-column
      right calc(100% - $left-col-tablet)
      width $left-col-tablet
    #center-column
      left $left-col-tablet
      width calc(100% - $left-col-tablet)

  @media(max-width: 480px)
    #left-column
      right calc(100% - $left-col-mobile)
      width $left-col-mobile
    #center-column
      left $left-col-mobile
      width calc(100% - $left-col-mobile)
</style>
