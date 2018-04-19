const mongoose = require('mongoose')

const groupSchema = mongoose.Schema({

  name: String,
  identifier: String,
  meta: Object,
  addresses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Address' }],
  subscribers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Subscriber' }],
  created: Date,
  destroyed: Date

}, { usePushEach: true })

groupSchema.index({ 'name': 'text' })

groupSchema.pre('save', function (next) {
  if (!this.created) this.created = new Date()
  next()
})

groupSchema.pre('findOne', function (next) {
  this.where({ destroyed: null })
  next()
})

groupSchema.pre('find', function (next) {
  this.where({ destroyed: null })
  next()
})

module.exports = mongoose.model('Group', groupSchema)
