const CSV_FILE = './sample.csv'
const FAKE_RECORDS = 1000

const csv = require('csvtojson')
const path = require('path')
const Table = require('cli-table')
const faker = require('faker')

const Address = require('../models/address')
const Subscriber = require('../models/subscriber')

let postalcodes = []

const statsTable = new Table({
  head: ['Count', 'Time', 'Process Uptime'],
  colWidths: [20, 20, 40]
})

statsTable.push([0, 0, 0])

const table = new Table({
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
          // Add random rows
          await Subscriber.deleteMany({})
          const generatedRows = await generatedRecords(FAKE_RECORDS)
          rows = rows.concat(generatedRows)
          result = rows.map(async r => await parseRow(r))
          resolve(error ? [] : result)
        })
    })
  }
}

async function generatedRecords(count) {
  let records = []
  let i = 0
  while (i < count) {
    const postalcode = await randomPostalCode()

    // "Date",
    // "Your Name-First",
    // "Your Name-Last",
    // "Type",
    // "Phone",
    // "Address-Street Address",
    // "Address-Region",
    // "Address-Postal / Zip Code",
    // "Email",
    // "Number of people in household",
    // "Number in household registered for the service",
    // "I confirm these details are correct and consent to being contacted with relevant information. Please follow this link for further information-Yes",
    // "Quiz Score",
    // "Reference ID",
    // "IP",
    // "Country",
    // "Payment Amount",
    // "Payment Currency",
    // "Payment Completed",
    // "Coupon codes",
    // "Browser",
    // "Referrer",
    // "Form Host",
    // "Entry ID",
    // "Status"

    records.push({
      "Your Name-First": faker.name.firstName(),
      "Your Name-Last": faker.name.lastName(),
      "Address-Postal / Zip Code": postalcode
    })
    i++
  }
  return records
}

async function parseRow(row) {
  
  let houseNum = getHouseNum(row["Address-Postal / Zip Code"])
  let address = await getAddress(houseNum, row["Address-Postal / Zip Code"])

  let data = {
    name: `${row["Your Name-First"]} ${row["Your Name-Last"]}`,
    email: row["Email"],
    mobile: row["Phone"],
    type: 'student-newcastle',
    address: address._id,
    postalcode: address.postalcode
  }
  
  statsTable[0][0] = result.length
  statsTable[0][1] = `${Date.now() - start}ms`
  statsTable[0][2] = process.uptime()

  const vis = `${statsTable.toString()}\n${table.toString()}`
  console.clear()
  console.log(vis)

  return await new Subscriber(data).saveAndPopulate('address')
}

async function randomPostalCode() {
  
  const count = await Address.count()
  let postalcode = undefined
  while (!postalcode) {
    const random = Math.floor(Math.random() * count)
    const address = await Address.findOne().skip(random)
    postalcode = (postalcodes.indexOf(address.postalcode) === -1) ? address.postalcode : undefined
  }
  return postalcode
}

async function getAddress(houseNum, postalcode) {
  let addresses = await Address.find({ postalcode: postalcode.toUpperCase() })
  if (addresses.length === 0) {
    console.log('Address not found')
    let count = await Address.count()
    const random = Math.floor(Math.random() * count)
    return await Address.findOne.skip(random)
  } else {
    return addresses[0]

    const nums = addresses.map(a => {
      let houseNum = getHouseNum(a.address)
      return {
        num: houseNum,
        address: a
      }
    })
    const address1 = nums.find(a => {
      return a.num === houseNum
    })
    address = address1.address
    address = a.num[0].address
  }
  return address
}

function getHouseNum(address) {
  let num = undefined
  const arr = address.split(' ')
  return arr[0]
}