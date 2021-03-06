var express = require('express'),
	logger = require('morgan'),
	bodyParser = require('body-parser'),
	swig = require('swig'),
	https = require("https"),
	fs = require("fs");

var options = {
	key: fs.readFileSync("./key.pem").toString(),
	cert: fs.readFileSync("./cert.pem").toString()
};

console.log(options);

var app = express();

app.set('views', __dirname + '/pages');
app.set('view engine', 'html');
app.engine('html', swig.renderFile);
swig.setDefaults({cache: false});

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use(require('./routes'));

app.use(function (req, res, next) {
	var err = new Error('Not Found');
	err.status = 404;
	next(err);
});

app.use(function (err, req, res, next) {
	err.status = err.status || 500;
	res.render('error', {
		error: err
	});
});

var port = 1337;
// https.createServer(options, app).listen(port, function () {
// 	console.log('Listening now on port', port);
// });

app.listen(port, function () {
	console.log('Listening now on port', port);
});