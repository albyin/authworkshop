var path = require("path");
var express = require("express");
var bodyParser = require("body-parser");
var morgan = require("morgan");

var app = express();
module.exports = app;

app.use(morgan("dev"));

var publicPath = path.join(__dirname, "../public");
var indexHtmlPath = path.join(__dirname, "../index.html");
var bowerPath = path.join(__dirname, "../bower_components");

app.use(express.static(publicPath));

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.get('/', function (req, res){
	res.sendFile(indexHtmlPath);
});

app.get('/signup', function (req, res){
	res.redirect("signup.html");
});

app.get('/login', function (req, res){
	res.redirect("login.html");
});

app.get('/success', function (req, res){
	res.redirect("success.html");
});

app.get('/failure', function (req, res){
	res.redirect("failure.html");
});

app.post('/signup', function (req, res){
	
});

app.post('/login', function (req, res){

});

app.get("/*", function (err, req, res, next){
	console.log(err);
	res.error(500);
});