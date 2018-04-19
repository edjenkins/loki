export default {
  data () {
    return {
      viewMode: 'rows'
    }
  },
  methods: {
    toggleViewMode () {
      this.viewMode = (this.viewMode === 'rows') ? 'tiles' : 'rows'
    }
  }
}
