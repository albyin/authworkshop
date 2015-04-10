var router = require('express').Router();

var User = require('./user.model');

router.get('/', function (req, res) {
	res.render('home');
});

router.get('/signup', function (req, res) {
	res.render('signup');
});

router.post('/signup', function (req, res, next) {

	User.create(req.body, function (err, user) {
		if (err) next(err);
		else res.redirect('/success');
	});
});

router.get('/login', function (req, res) {
	res.render('login');
});

router.post('/login', function (req, res, next) {
	User.findOne({username:req.body.username}, function (err, userObj) {
		if (err) next(err);
		else if (!userObj.authenticate(req.body.password)) res.redirect('/failure');
		else res.redirect('/success');
	});
});

router.get('/success', function (req, res) {
	res.render('success');
});

router.get('/failure', function (req, res, next) {
	var err = new Error('Not Authenticated');
	err.status = 401;
	next(err);
});

module.exports = router;