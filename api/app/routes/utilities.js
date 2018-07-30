const groupUtils = require('../utils/groups')
const subscriberUtils = require('../utils/subscribers')

const Group = require('../../app/models/group')
const Subscriber = require('../../app/models/subscriber')

function getFeatures(group, coordinates) {
  return coordinates.map(c => {
    return {
      'type': 'Feature',
      'geometry': {
        'type': 'Point',
        'coordinates': [c.LNG, c.LAT]
      },
      'group': group
    }
  })
}

module.exports = function (app, passport) {
  // Parse subscribers CSV
  app.get('/parse/subscribers',
    async (req, res) => {
      let results = await subscriberUtils.parseCSV()
      res.json({ status: 'complete', results: results })
    })

  // Parse groups CSV
  app.get('/parse/groups',
    async (req, res) => {
      res.json({ status: 'complete', results: await groupUtils.parseCSV() })
    })

  // Load map source
  app.get('/source/:id',
    async (req, res) => {

      let group = await Group.findOne({ _id: req.params.id }).populate('addresses')
      let subscribers = await Subscriber.find({ groups: { $in: [req.params.id] } })

      res.json({
        subscribers: {
          'type': 'FeatureCollection',
          'features': getFeatures(group.identifier, subscribers.map(s => s.address.coordinates))
        },
        addresses: {
          'type': 'FeatureCollection',
          'features': getFeatures(group.identifier, group.addresses.map(a => a.coordinates))
        }
      })
    })
}
