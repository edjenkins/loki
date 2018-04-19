import _ from 'lodash'
import geolib from 'geolib'

export default {
  methods: {
    orderPoints (points) {
      let remainingPoints = _.map(points, (value, key) => {
        return {
          index: key,
          latitude: value.LAT,
          longitude: value.LNG
        }
      })
      remainingPoints = _.keyBy(remainingPoints, (o) => {
        return `index-${o.index}`
      })

      let sortedPoints = []
      sortedPoints.push(remainingPoints['index-0'])
      delete remainingPoints['index-0']
      let sortIndex = 0
      while (sortIndex < (Object.keys(remainingPoints).length - 1)) {
        let nearest = geolib.findNearest(sortedPoints[sortIndex], remainingPoints, 0)
        // Push nearest
        sortedPoints.push(remainingPoints[nearest.key])
        // Remove nearest
        delete remainingPoints[nearest.key]
        sortIndex = sortIndex + 1
      }
      sortedPoints = _.map(sortedPoints, (value, key) => {
        return points[key]
      })
      return _.orderBy(sortedPoints, (point) => {
        return point.LAT * point.LNG
      })
      // return sortedPoints
    },
    getPoints (route) {
      let features = []
      let points = this.orderPoints(this.routes[route])
      points.forEach((data, index) => {
        const feature = {
          'type': 'Feature',
          'geometry': {
            'type': 'Point',
            'coordinates': [data.LNG, data.LAT]
          },
          'route': data.ROUTE,
          'properties': {
            'size': 5
            // ((index * 10) / points.length)
          }
        }
        features.push(feature)
      })

      return features
    }
  }
}
