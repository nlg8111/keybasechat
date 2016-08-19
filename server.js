"use strict"

var restify = require('restify');
var fs = require('fs')
const Messages = require('./messages')

var server = restify.createServer();
server.use(restify.bodyParser());

var messages = new Messages('./messages/messages.json')

server.get("/users/:name/messages", function(req, res, next){
	console.log(`GETTING MESSAGES FOR ${req.params.name}`)
	res.send(messages.getNextMessageForUser(req.params.name))
	next()
});

server.post("/users/:name/messages", function(req, res, next){
	console.log(`ADDING MESSAGES FOR ${req.params.name}`)
	messages.addMessageForUser(req.params.name, req.params.message)
	res.send("Posted to " + req.params.name)
	next()
});


server.listen(process.env.PORT || 5000, function() {
  console.log('%s listening at %s', server.name, server.url);
});
