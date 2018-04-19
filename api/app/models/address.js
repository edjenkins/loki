const mongoose = require('mongoose')

const addressSchema = mongoose.Schema({

  identifier: String,
  address: { type: String, text: true },
  coordinates: Object,
  postalcode: { type: String, text: true },
  group: { type: mongoose.Schema.Types.ObjectId, ref: 'Group' },
  meta: Object,
  created: Date,
  destroyed: Date

}, { usePushEach: true })

addressSchema.index({ 'address': 'text' })

addressSchema.pre('save', function (next) {
  if (!this.created) this.created = new Date()
  next()
})

addressSchema.pre('findOne', function (next) {
  this.where({ destroyed: null })
  this.populate('group')
  next()
})

addressSchema.pre('find', function (next) {
  this.where({ destroyed: null })
  this.populate('group')
  next()
})

module.exports = mongoose.model('Address', addressSchema)
