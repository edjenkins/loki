const mongoose = require('mongoose')

const messageSchema = mongoose.Schema({

  subject: String,
  text: String,
  groups: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Group' }],
  state: {
    type: String,
    default: 'PENDING'
  },
  created: Date,
  destroyed: Date

})

messageSchema.index({ 'text': 'text', 'subject': 'text' })

messageSchema.pre('save', function (next) {
  if (!this.created) this.created = new Date()
  next()
})

messageSchema.pre('findOne', function (next) {
  this.where({ destroyed: null })
  next()
})

messageSchema.pre('find', function (next) {
  this.where({ destroyed: null })
  next()
})

module.exports = mongoose.model('Message', messageSchema)
