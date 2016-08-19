var restify = require('restify');

var server = restify.createServer();
server.use(restify.bodyParser());

var messages = {}

server.get("/users/:name/messages", function(req, res, next){
	console.log('GETTING MESSAGES')
	msgs = messages[req.params.name]
	res.send(msgs && msgs.length > 0 ? msgs.shift() : [])
	next()
});

server.post("/users/:name/messages", function(req, res, next){
	console.log('SETTING MESSAGES')
	if(messages[req.params.name]) {
		messages[req.params.name].push(req.params.message)
	} else {
		messages[req.params.name] = [req.params.message]
	}

	res.send("Posted to " + req.params.name)
	next()
});


server.listen(process.env.PORT || 5000, function() {
  console.log('%s listening at %s', server.name, server.url);
});
