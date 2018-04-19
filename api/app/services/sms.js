'use strict'
const twilio = require('twilio')

const configSMS = require('../../config/sms.js')

const SMS_SID = configSMS.sid
const SMS_TOKEN = configSMS.token
const SMS_FROM_NAME = configSMS.fromName
const SMS_FROM_NUMBER = configSMS.fromNumber

const client = new twilio(SMS_SID, SMS_TOKEN)

module.exports = {
  sendSMS: function (to, text) {
    console.log('Sending sms...')

    client.messages.create({
      body: text,
      to: to,
      from: SMS_FROM_NUMBER
    }).then((message) => {
      console.log('SMS sent - %s', message.sid)
      console.log(message)
    })
  }
}
