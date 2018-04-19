const Address = require('../../app/models/address')
const Group = require('../../app/models/group')
const Subscriber = require('../../app/models/subscriber')

const async = require('async')
const path = require('path')
const csv = require('csvtojson')

const _find = require('lodash/find')

const inputFile = '../../static/coord.csv'

function to (promise) {
  return promise.then(data => {
    return [null, data]
  }).catch(err => [err, undefined])
}

function getFeatures(group, coordinates) {
  let features = []
  
  coordinates.forEach((coordinate) => {
    const feature = {
      'type': 'Feature',
      'geometry': {
        'type': 'Point',
        'coordinates': [coordinate.LNG, coordinate.LAT]
      },
      'group': group
    }
    features.push(feature)
  })
  return features
}

async function parseObject(object) {
  let err, address, group

  if (!object) return

  try {
    [err, group] = await to(Group.findOne({ identifier: object.ROUTE }))
    
    if (!group) {
      group = await Group.create({
        identifier: object.ROUTE,
        meta: {
          coordinates: {}
        }
      })
    }
    address = await Address.findOneAndUpdate({ identifier: object.ADDRESS_ID }, {
      identifier: object.ADDRESS_ID,
      address: object.ADDRESS,
      coordinates: { LAT: object.LAT, LNG: object.LNG },
      postalcode: object.POSTAL_COD,
      group: group,
      meta: object
    }, { upsert: true, new: true, setDefaultsOnInsert: true })
  
    group.addresses.push(address)
  
    group = await group.save()
    return { address: address, group: group }
  } catch (error) {
    console.error(error)
  }
}
module.exports = function (app, passport) {
  app.get('/parse',
  (req, res) => {
      const csvFilePath = path.join(__dirname, inputFile)
      let rows = []

      csv().fromFile(csvFilePath)
        .on('json', jsonObj => {
          rows.push(jsonObj)
        })
        .on('done', async error => {
          let parseOperations = []
          let results = []
          for (let row of rows) {
            results.push(await parseObject(row))
          }
          res.json({ status: 'complete', results: results })
        })
    })
  app.get('/source/:id',
    async (req, res) => {
      let err, group, subscribers

      [err, group] = await to(Group.findOne({ _id: req.params.id }).populate('addresses'))
      if (err) console.error(err)

      subscribers = await Subscriber.find({ groups: { $in: [req.params.id] } })
      if (err) console.error(err)
      
      let coordinates = {
        subscribers: [],
        addresses: []
      }

      coordinates.addresses = coordinates.addresses.concat(group.addresses.map(address => {
        return address.coordinates
      }))
      if (subscribers) {
        coordinates.subscribers = coordinates.subscribers.concat(subscribers.map(subscriber => {
          return subscriber.address.coordinates
        }))
      }

      res.json({
        subscribers: {
          'type': 'FeatureCollection',
          'features': getFeatures(group.identifier, coordinates.subscribers)
        },
        addresses: {
          'type': 'FeatureCollection',
          'features': getFeatures(group.identifier, coordinates.addresses)
        }
      })
    })
}
