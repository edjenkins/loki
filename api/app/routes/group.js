const Group = require('../../app/models/group')

module.exports = function (app, passport) {
  app.get('/groups',
    async (req, res) => {
      const groups = await Group.find({}).populate('addresses')
      res.json({ groups })
    })
  app.post('/group',
    async (req, res) => {
      let group = new Group(req.body)
      group = await group.save()
      res.json({ group })
    })
  app.post('/group/destroy',
    async (req, res) => {
      let group = await Group.findOneAndUpdate({ _id: req.body._id }, { destroyed: new Date() }, { upsert: true })
      group = await Group.findOne({ _id: group._id })
      res.json({ group })
    })
  app.post('/group/destroy/all',
    async (req, res) => {
      const groups = await Group.deleteMany({})
      res.json({ groups })
    })
  app.get('/group/:id',
    async (req, res) => {
      console.log(req.params.id)
      const group = await Group.findOne({ _id: req.params.id })
      res.json({ group })
    })
}
