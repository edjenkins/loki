import Papa from 'papaparse'

const CSV_LOCATION = '/static/coord.csv'

export default {
  methods: {
    loadCsv (map) {
      Papa.parse(CSV_LOCATION, {
        worker: false,
        download: true,
        header: true,
        step: (row) => {
          let group = 'undefined'
          row.data.forEach(data => {
            group = data.ROUTE
            const feature = {
              'type': 'Feature',
              'geometry': {
                'type': 'Point',
                'coordinates': [data.LNG, data.LAT]
              },
              'group': group
            }
            if (group) {
              if (!this.groups[group]) {
                this.$set(this.groups, group, { features: [], group: group })
              }
              this.groups[group].features.push(feature)
            }
          })
        },
        complete: () => {
          for (const group in this.groups) {
            // Points layer
            const pointsLayer = {
              'id': `addresses-${group}`,
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
                'circle-color': this.colorFromId(parseInt(group, 36))
              },
              'source': {
                'type': 'geojson',
                'data': {
                  'type': 'FeatureCollection',
                  'features': this.groups[group].features
                }
              }
            }
            if (this.groups[group].group) {
              map.addLayer(pointsLayer)
            }
          }
          console.log('All done!')
        }
      })
    }
  }
}
