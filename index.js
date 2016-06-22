var rest = require('restify');

function response(req, res, next) {
	
	var ret = {};

	ret.ipaddress = req.connection.remoteAddress;
	ret.language = req.header('Accept-Language');
	ret.software = req.header('user-agent');
	
	res.send(ret);
	next();
}

var server = rest.createServer();

server.pre(function(req, res, next) {
	req.headers.accept = 'application/json'; // screw you client!
	return next();
});


server.get('/api/whoami', response);

server.listen((process.env.PORT || 5000), function() {
	console.log('%s listening at %s', server.name, server.url);
});