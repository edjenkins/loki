const mail = require('../../app/services/mail')
const sms = require('../../app/services/sms')

const Message = require('../../app/models/message')
const Subscriber = require('../../app/models/subscriber')
const Group = require('../../app/models/group')

module.exports = function (app, passport) {
  app.get('/messages',
    async (req, res) => {
      const messages = await Message.find({})
      res.json({ messages })
    })
  app.post('/message',
    async (req, res) => {
      let { text, subject, groups } = req.body
      let message = new Message({ text, subject, groups })
      message = await message.save()
      res.json({ message })
    })
  app.put('/message',
    async (req, res) => {
      let { text, subject, groups } = req.body
      let state = 'PENDING'
      const message = await Message.findOneAndUpdate({ _id: req.body._id }, { text, subject, groups, state }, { upsert: true, new: true })
      res.json({ message })
    })
  app.post('/message/destroy',
    async (req, res) => {
      let message = await Message.findOneAndUpdate({ _id: req.body._id }, { destroyed: new Date() }, { upsert: true, new: true })
      res.json({ message })
    })
  app.post('/messages/process',
    async (req, res) => {
      let messages = await Message.find({ state: 'PENDING' }).populate('groups')
      let messageStates = []
      for (let message of messages) {
        // Loop groups
        for (let group of message.groups) {
          // Loop subscribers
          if (group.subscribers) {
            for (let subscriber of group.subscribers) {
              subscriber = await Subscriber.findOne({ _id: subscriber })
              mail.sendMail(subscriber.email, 'Loki Message', 'loki-message', { subject: message.subject, text: message.text })
              sms.sendSMS(subscriber.mobile, message.text)
            }
          }
        }
        // Update message state
        message.state = 'SENT'
        message = await message.save()
        messageStates.push(message)
      }

      res.json({ messages: messageStates })
    })
  app.get('/message/:id',
    async (req, res) => {
      console.log(req.params.id)
      const message = await Message.findOne({ _id: req.params.id })
      res.json({ message })
    })
}
