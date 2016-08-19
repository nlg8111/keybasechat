"use strict"
var fs = require('fs')

var Messages = function(messagesFilePath) {
	this.messagesFilePath = messagesFilePath
	this.messages = this.loadMessages() || {}
}

Messages.prototype.loadMessages = function() {
	if (!fs.existsSync(this.messagesFilePath)) return false
	return JSON.parse(fs.readFileSync(this.messagesFilePath, 'utf8')) || false
}

Messages.prototype.saveMessages = function() {
	fs.writeFileSync(this.messagesFilePath, JSON.stringify(this.messages))
}

Messages.prototype.getNextMessageForUser = function(user) {
	var msgs = this.messages[user]
	var message = msgs && msgs.length > 0 ? msgs.shift() : ""
	this.saveMessages()
	return message
}

Messages.prototype.addMessageForUser = function(user, message) {
	if(this.messages[user]) {
		this.messages[user].push(message)
	} else {
		this.messages[user] = [message]
	}
	this.saveMessages()
}

module.exports = Messages
