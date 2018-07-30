const Subscriber = require('../../app/models/subscriber')

module.exports = function (app, passport) {
  app.get('/subscribers',
    async (req, res) => {
      const skip = parseInt(req.query.skip || 0)
      const limit = parseInt(req.query.limit || 50)
      const subscribers = await Subscriber.find({}).populate('address').limit(limit).skip(skip)
      const count = await Subscriber.count()
      res.json({ subscribers: subscribers, count: count, skip: skip })
    })
  app.put('/subscriber',
    async (req, res) => {
      let subscriber = await Subscriber.findOneAndUpdate({ _id: req.body._id }, { profile: req.body.profile }, { upsert: true })
      subscriber = await Subscriber.findOne({ _id: subscriber._id })
      res.json({ subscriber })
    })
  app.post('/subscriber',
    async (req, res) => {      
      let subscriber = await new Subscriber(req.body).saveAndPopulate('address')
      res.json({ subscriber })
    })
  app.post('/subscriber/destroy',
  async (req, res) => {
    let subscriber = await Subscriber.findOneAndUpdate({ _id: req.body._id }, { destroyed: new Date() }, { upsert: true })
    subscriber = await Subscriber.findOne({ _id: subscriber._id })
    res.json({ subscriber })
  })
  app.post('/subscriber/destroy/all',
    async (req, res) => {
      const subscribers = await Subscriber.deleteMany({})
      res.json({ subscribers })
    })
  app.get('/subscriber/:id',
    async (req, res) => {
      console.log(req.params.id)
      const subscriber = await Subscriber.findOne({ _id: req.params.id })
      res.json({ subscriber })
    })
}
