<template lang="pug">
#subscribe
  h2 Subscribe to Loki
  form
    .input-wrapper
      label Type
      custom-selector(title="Please choose one" v-bind:options="typeOptions" v-model="formData.type")
    .input-wrapper
      label Name
      input(type="text" placeholder="John Labson" v-model="formData.name")
    .input-wrapper
      label Email
      input(type="text" placeholder="john@example.com" v-model="formData.email")
    .input-wrapper
      label Mobile
      input(type="text" placeholder="07701010010" v-model="formData.mobile")
    .input-wrapper(v-if="!formData.address")
      label Postcode
      input(type="text" placeholder="NE2 3JA" v-on:keyup="searchAddresses" v-model="formData.postcode")
    .input-wrapper(v-if="!formData.address")
      #address-results
        ul
          li(v-for="(result, index) in searchResults" v-bind:key='index' @click="setAddress(result)")
            p {{ result.address }}

    .input-wrapper(v-else)
      group-tile(:group="formData.addressMeta.group" :view="'full'")
      .clearfix
      p {{ formData.addressMeta.address }}
      .button.warning-button(@click="setAddress(undefined)") Clear address selection
    .input-wrapper
      p By subscribing you agree with out terms and conditions.
      .button.success-button(@click="subscribe") Subscribe
</template>

<script>
import API from '@/api'

import CustomSelector from 'jnks/components/inputs/CustomSelector'
import GroupTile from '@/components/groups/GroupTile'

export default {
  name: 'subscribe',
  components: {
    CustomSelector,
    GroupTile
  },
  data () {
    return {
      formData: {
        name: '',
        email: '',
        mobile: '',
        type: '',
        postcode: '',
        address: '',
        group: ''
      },
      typeOptions: [
        { label: 'Resident', value: 'Resident' },
        { label: 'Student (Northumbria)', value: 'student-northumbria' },
        { label: 'Student (Newcastle)', value: 'student-newcastle' }
      ],
      searchResults: [],
      subscribers: [],
      fuseOptions: {
        tokenize: true,
        findAllMatches: true,
        threshold: 0.2,
        distance: 100,
        keys: ['address', 'group']
      }
    }
  },
  methods: {
    subscribe () {
      const subscriber = this.formData
      if (!subscriber.address) return
      this.subscribers.push(subscriber)
      API.subscriber.create(
        subscriber,
        (response) => {
          console.log(response)
          this.$router.push({ name: 'dashboard' })
        },
        (response) => {
          console.log(response)
        }
      )
    },
    setAddress (address) {
      this.formData.addressMeta = address
      this.formData.address = address ? address._id : undefined
    },
    searchAddresses () {
      API.address.search(
        { query: this.formData.postcode },
        (response) => {
          console.log(response)
          this.searchResults = response.addresses
        },
        (response) => {
          console.log(response)
        }
      )
      // this.$search(this.formData.postcode, this.addresses, this.fuseOptions).then(results => {
      //   this.searchResults = _.take(results, 5)
      // })
    }
  }
}
</script>

<style lang="stylus" scoped>

@import '~stylus/shared'

#subscribe
  pinned()
  background-color $color-darkest-grey
  overflow scroll
  position fixed
  h2
    reset()
    color white
    margin-top 60px
  form
    radius(6px)
    background-color white
    min-height 200px
    margin 20px auto
    padding 40px 40px 10px 40px
    position relative
    text-align left
    width 320px
    z-index 2
    .input-wrapper
      margin 0 auto 30px auto
      text-align left
      label
        display block
        margin 5px
      input
        radius(22px)
        box-shadow(none)
        border $color-border 1px solid
        outline 0
        line-height 20px
        padding 10px 15px
        width 240px
    #address-results
      ul
        resetlist()
        li
          resetlist()
          margin-bottom 10px
          padding-bottom 10px
          &:hover
            cursor pointer
          p
            reset()

</style>
