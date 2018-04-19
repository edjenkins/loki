const mongoose = require('mongoose')
const bcrypt = require('bcrypt-nodejs')

const subscriberSchema = mongoose.Schema({

  name: String,
  type: String,
  email: String,
  mobile: String,
  postcode: String,
  groups: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Group' }],
  address: { type: mongoose.Schema.Types.ObjectId, ref: 'Address' },
  created: Date,
  destroyed: Date

}, { usePushEach: true })

subscriberSchema.index({ 'name': 'text' })

subscriberSchema.pre('save', function (next) {
  if (!this.created) this.created = new Date()
  next()
})

subscriberSchema.pre('findOne', function (next) {
  this.where({ destroyed: null })
  this.populate('address')
  next()
})

subscriberSchema.pre('find', function (next) {
  this.where({ destroyed: null })
  this.populate('address')
  next()
})

subscriberSchema.methods.generateHash = function (password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null)
}

subscriberSchema.methods.validPassword = function (password) {
  return bcrypt.compareSync(password, this.local.password)
}

module.exports = mongoose.model('Subscriber', subscriberSchema)
