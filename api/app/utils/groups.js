const CSV_FILE = './coord-full.csv'

const csv = require('csvtojson')
const path = require('path')
const Table = require('cli-table')
const _ = require('lodash')

const Address = require('../models/address')
const Group = require('../models/group')

let statsTable = new Table({
  head: ['Count', 'Time', 'Process Uptime'],
  colWidths: [20, 20, 40]
})

statsTable.push([0,0,0])

let table = new Table({
  head: ['Group', 'Count'],
  colWidths: [20, 20]
})

let result = []
let start = Date.now()

module.exports = {
  parseCSV: async () => {
    return new Promise(function (resolve, reject) {
      const csvFilePath = path.join(__dirname, CSV_FILE)
      start = Date.now()
      result = []
      let rows = []
      csv().fromFile(csvFilePath)
        .on('json', o => {
          rows.push(o)
        })
        .on('done', async error => {
          if (error) reject(error)
          await Address.deleteMany({})
          await Group.deleteMany({})
          const byGroup = _.groupBy(rows, o => {
            return o.ROUTE
          })
          
          // console.log('rows.length', rows.length)
          // console.log('byGroup', byGroup["D0601"])
          
          const groups = await storeGroups(Object.keys(byGroup))

          console.log('groups', groups)
          
          // for (const r in rows) {
          //   let obj = await parseRow(rows[r])
          //   result.push(obj)
          //   global.gc()
          // }
          resolve(error ? [] : result)
        })
    })
  }
}

async function storeGroups(groups) {
  const data = groups.map(g => {
    return { identifier: g }
  })
  return await Group.insertMany(data)
}

async function parseRow(row) {

  let index = table.indexOf(table.find(r => r[0] === row.ROUTE))
  
  if (index === -1) {
    table.push([row.ROUTE, 1])
  } else {
    table[index][1] = table[index][1] + 1
  }
  statsTable[0][0] = result.length
  statsTable[0][1] = `${Date.now() - start}ms`
  statsTable[0][2] = process.uptime()
  
  const vis = `${statsTable.toString()}\n${table.toString()}`
  console.clear()
  console.log(vis)

  let group = await Group.findOne({ identifier: row.ROUTE })

  let address = await new Address({
    identifier: row.ADDRESS_ID,
    address: row.ADDRESS,
    coordinates: { LAT: row.LAT, LNG: row.LNG },
    postalcode: row.POSTAL_COD,
    group: group,
    meta: row

  })

  address = address.save()

  group.addresses.push(address._id)

  group = await group.save()

  return { address: address, group: group }
}
