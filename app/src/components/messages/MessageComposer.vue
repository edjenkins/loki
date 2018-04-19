<template lang="pug">
.message-composer
    form
      h2 {{ $route.name === 'compose' ? 'Compose new message' : `Editing '${formData.subject}'` }}

      .form-section

        .input-wrapper
          label Subject
          input(v-model="formData.subject" placeholder="Subject")

        .input-wrapper
          label Message
          input(v-model="formData.text" placeholder="Message")

      .form-section
        .input-wrapper
          label Groups
          .button.subtle(@click="toggleGroup()" :class="{ 'success-button': formData.groups && formData.groups.length === groups.length }") Select/Unselect all
          br
          group-tile(v-for="(group, index) in groups" :key="index" :group="group" :view="'mini'" :padded="true" :selected="isSelected(group)" @click="toggleGroup(group)")
          .clearfix

      .form-section
        .input-wrapper
          label Recipients
          router-link.tag.recipient(v-for="(recipient, index) in recipients" :key="index" :to="{ name: 'subscribers', params: { id: recipient._id } }") {{ recipient.name }}

      .form-section
        .input-wrapper
          label Type
          .button.info-button(@click="") Announcement
          .button.disabled(@click="") Scheduled

        //- .input-wrapper
          label Schedule Offset
          .button.info-button.disabled(@click="") Daily
          .button.info-button.disabled(@click="") Weekly
          .button.info-button.disabled(@click="") Monthly
          .clearfix #[br]
          .button.info-button.disabled(@click="") Time of day X days before group time
          .clearfix #[br]
          .button.info-button.disabled(@click="") 3 hours before group time
          .button.info-button(@click="") 6 hours before group time
          .button.info-button.disabled(@click="") 9 hours before group time

        //- hr
        //- .input-wrapper
        //-   pre {{ formData }}

        hr

        .input-wrapper
          router-link.button.danger-button(:to="{ name: 'messages' }") Cancel
          .button.success-button.pull-right(v-if="formData._id" @click="update") Update
          .button.success-button.pull-right(v-else="formData._id" @click="create") Schedule
          .clearfix
</template>

<script>
import API from '@/api'
import { mapGetters } from 'vuex'

import _get from 'lodash/get'
import _filter from 'lodash/filter'

import GroupTile from '@/components/groups/GroupTile'

export default {
  name: 'message-composer',
  components: {
    GroupTile
  },
  watch: {
    '$route': {
      handler: function () {
        this.loadMessage()
      },
      deep: true
    }
  },
  created () {
    this.loadMessage()
  },
  data () {
    return {
      formData: this.getFormData()
    }
  },
  computed: {
    ...mapGetters(['groups', 'subscribers']),
    recipients () {
      return _filter(this.subscribers, (subscriber) => {
        return this.formData.groups.indexOf(subscriber.address.group._id) !== -1
      })
    }
  },
  methods: {
    isSelected (group) {
      return this.formData.groups.indexOf(group._id) !== -1
    },
    loadMessage () {
      if (!this.$route.params.id) {
        this.formData = this.getFormData()
      } else {
        API.message.get(
          this.$route.params.id,
          (response) => {
            console.log(response)
            this.formData = response.message
            Object.assign(this.formData, response.message)
          },
          (response) => {
            console.log(response)
            this.formData = this.getFormData()
          }
        )
      }
    },
    getFormData () {
      return {
        subject: '',
        text: '',
        groups: []
      }
    },
    toggleGroup (group) {
      if (!_get(this.formData, 'groups')) {
        this.formData.groups = []
      }
      if (!group) {
        const toggle = this.formData.groups.length === this.groups.length
        this.formData.groups = []
        for (let group of this.groups) {
          if (!toggle) {
            this.formData.groups.push(group._id)
          }
        }
        return
      }
      const index = this.formData.groups.indexOf(group._id)
      if (index !== -1) {
        this.formData.groups.splice(index, 1)
      } else {
        this.formData.groups.push(group._id)
      }
    },
    create () {
      const message = this.formData
      API.message.create(
        message,
        (response) => {
          console.log(response)
          this.$router.push({ name: 'messages' })
        },
        (response) => {
          console.log(response)
        }
      )
    },
    update () {
      const message = this.formData
      API.message.update(
        message,
        (response) => {
          console.log(response)
          this.$router.push({ name: 'messages' })
        },
        (response) => {
          console.log(response)
        }
      )
    }
  }
}
</script>

<style lang="stylus" scoped>

@import '~stylus/shared'

.message-composer
  form
    text-align left
    h2
      padding 10px 30px 0 30px
    .form-section
      radius(10px)
      background-color white
      border $color-border 1px solid
      margin 20px
      padding 20px
      text-align left
      .input-wrapper
        padding 10px
        label
          display block
        .button
          margin 10px 10px 0 0
        input
          box-sizing()
          margin-top 10px
          outline 0
          padding 10px
          max-width 400px
          width calc(100% - 40px)
        .tag.recipient
          radius(15px)
          hover($color-lighter-grey)
          background-color $color-lighter-grey
          color $color-text-grey
          display inline-block
          font-size 0.9em
          font-weight bold
          line-height 30px
          margin 10px 0 10px 0
          padding 0 15px
          text-decoration none

</style>
