var server = require("./server/app.js");

var mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/authworkshop");

var PORT = 1337;

mongoose.connection.once("open", function () {
	server.listen(PORT, function (){
		console.log("Server started on port " + PORT.toString());
	});
});