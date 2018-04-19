const Address = require('../../app/models/address')

const async = require('async')
const path = require('path')
const csv = require('csvtojson')

const _find = require('lodash/find')

const inputFile = '../../static/coord.csv'

module.exports = function (app, passport) {
  app.get('/addresses',
    async (req, res) => {
      const addresses = await Address.find({})
      res.json({ addresses })
    })
  app.post('/address/search',
    async (req, res) => {
      let addresses = await Address.find({ $text: { $search: "\"" + req.body.query + "\"" } })
      res.json({ addresses })
    })
}
