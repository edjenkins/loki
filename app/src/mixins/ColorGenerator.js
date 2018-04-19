/*
 * A mixin for components that want to generate a color based on an id
 * - Uses a modulus function to generate colors for any number (a record id)
 */

const randomizer = 47

export default {
  methods: {
    colorFromId (id) {
      let hue = ((id + 1) * randomizer) % 360
      return `hsl(${hue}, 70%, 50%)`
    }
  }
}
