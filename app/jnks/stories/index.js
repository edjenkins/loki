import Vue from 'vue'

import { storiesOf } from '@storybook/vue'

import CustomToggle from '../components/buttons/CustomToggle.vue'

import CustomSlider from '../components/inputs/CustomSlider.vue'
import CustomSelector from '../components/inputs/CustomSelector.vue'
import DateInput from '../components/inputs/DateInput.vue'
import NumericInput from '../components/inputs/NumericInput.vue'

storiesOf('Buttons/CustomToggle', module)
  .add('Boolean toggle', () => ({
    components: { CustomToggle },
    template: '<custom-toggle v-model="value"></custom-toggle>',
    data() {
      return {
        value: false
      }
    }
  }))

storiesOf('Inputs/CustomSlider', module)
  .add('Accuracy slider', () => ({
    components: { CustomSlider },
    template: '<custom-slider v-model="value" v-bind:min-label="minLabel" v-bind:max-label="maxLabel"></custom-slider>',
    data() {
      return {
        value: undefined,
        minLabel: 'Guess',
        maxLabel: 'Accurate'
      }
    }
  }))

storiesOf('Inputs/CustomSelector', module)
  .add('Gender selection', () => ({
    components: { CustomSelector },
    template: '<custom-selector v-bind:title="title" v-bind:options="options" v-model="value"></custom-selector>',
    data() {
      return {
        value: undefined,
        title: 'Gender',
        options: [
          { label: 'Rather Not Say', value: 'Rather Not Say' },
          { label: 'Female', value: 'Female' },
          { label: 'Male', value: 'Male' },
          { label: 'Other', value: 'Other' }
        ]
      }
    }
  }))

storiesOf('Inputs/DateInput', module)
  .add('Date picker', () => ({
    components: { DateInput },
    template: '<date-input v-model="value" v-bind:placeholder="placeholder"></date-input>',
    data() {
      return {
        value: undefined,
        placeholder: 'Select a Date'
      }
    }
  }))

storiesOf('Inputs/NumericInput', module)
  .add('Height input', () => ({
    components: { NumericInput },
    template: '<numeric-input v-model="value" v-bind:placeholder="placeholder" v-bind:input-label="label"></numeric-input>',
    data() {
      return {
        value: undefined,
        label: 'cm',
        placeholder: '180'
      }
    }
  }))
  .add('Weight input', () => ({
    components: { NumericInput },
    template: '<numeric-input v-model="value" v-bind:placeholder="placeholder" v-bind:input-label="label"></numeric-input>',
    data() {
      return {
        value: undefined,
        label: 'kg',
        placeholder: '60'
      }
    }
  }))