const Subscriber = require('../../app/models/subscriber')
const Group = require('../../app/models/group')

module.exports = function (app, passport) {
  app.get('/subscribers',
    async (req, res) => {
      const subscribers = await Subscriber.find({})
      res.json({ subscribers })
    })
  app.put('/subscriber',
    async (req, res) => {
      let subscriber = await Subscriber.findOneAndUpdate({ _id: req.body._id }, { profile: req.body.profile }, { upsert: true })
      subscriber = await Subscriber.findOne({ _id: subscriber._id })
      res.json({ subscriber })
    })
  app.post('/subscriber',
    async (req, res) => {
      let subscriber = new Subscriber(req.body)
      subscriber = await subscriber.save()
      subscriber = await Subscriber.findOne({ _id: subscriber._id })
      subscriber.groups.push(subscriber.address.group)
      subscriber = await subscriber.save()
      console.log('subscriber')
      console.log(subscriber)
      // Update group subscribers
      let group = await Group.findOneAndUpdate({ _id: subscriber.address.group }, { $push: { subscribers: subscriber } }, { upsert: true })
      console.log(group)
      res.json({ subscriber })
    })
  app.post('/subscriber/destroy',
    async (req, res) => {
      let subscriber = await Subscriber.findOneAndUpdate({ _id: req.body._id }, { destroyed: new Date() }, { upsert: true })
      subscriber = await Subscriber.findOne({ _id: subscriber._id })
      res.json({ subscriber })
    })
  app.get('/subscriber/:id',
    async (req, res) => {
      console.log(req.params.id)
      const subscriber = await Subscriber.findOne({ _id: req.params.id })
      res.json({ subscriber })
    })
}
