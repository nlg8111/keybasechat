"use strict"

const Promise = require('bluebird')
const exec = Promise.promisify(require('child_process').exec)
const log = Promise.promisify(console.log)
const restify = require('restify')
const messageServer = process.env.SERVER || "http://localhost:5000"
const client = restify.createStringClient({url: messageServer});

const ACTION = process.argv[2]
const RECIPIENT = process.argv[3]
const MESSAGE = process.argv[4]

function createKeybasePgpEncryptMessageCmd(message, recipient) {
  return `keybase pgp encrypt -m "${message}" ${recipient}`
}

function createKeybasePgpDecryptMessageCmd(message) {
  return `keybase pgp decrypt -m "${message}"`
}


const actions = {
  get() {
    return client.get(`/users/${RECIPIENT}/messages`, (err, req, res, data) => {
      exec(createKeybasePgpDecryptMessageCmd(data))
        .then(console.log)
        .then(() => console.log('done.'))
    })
  },

  msg() {
    exec(createKeybasePgpEncryptMessageCmd(MESSAGE, RECIPIENT))
      .then((encryptedMessage) => {
        return client.post(`/users/${RECIPIENT}/messages`, {message: encryptedMessage}, (err, req, res, data) => {
          console.log(`Sent mesage to ${RECIPIENT}`)
        })
      })
  }
}

actions[ACTION]()
