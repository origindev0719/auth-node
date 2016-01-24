var express = require('express');
var router = express.Router();
var multer = require('multer');
var expressValidator = require('express-validator');
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/register', function(req, res, next) {
  res.render('register', {
  	'title': 'Register'
  });
});

router.get('/login', function(req, res, next) {
  res.render('login', {
  	'title': 'Login'
  });
});

router.post('/', function(req, res, next) {
	console.log(req.body);
})
router.post('/register', multer({ dest: './uploads/'}).single('profileimage'), function(req, res, next) {
	// Get the Form Values
	//console.log(req.headers);
	console.log(req.body);
	console.log(req.file);
	var name = req.body.name2;
	var email = req.body.email;
	var username = req.body.username;
	var password = req.body.password;
	var password2 = req.body.password2;


	// Check for Image Field
	if (req.file) {
		console.log("Uploading File...");
		var profileImageOriginalName = req.file.originalName;
		var profileImageName = req.file.filename;
		var profileImageName = req.file.mimetype;
		var profileImageName = req.file.path;
		//var profileImageName = req.file.profileimage.extension;
		var profileImageName = req.file.size;
	} else {
		// Set default Image
		var profileImageName = 'noimage.png';
	}

	// Form Validation
	req.checkBody('name', 'Name filed is required').notEmpty();
	req.checkBody('email', 'Name filed is required').notEmpty();
	req.checkBody('email', 'Email is not not valid').isEmail();
	req.checkBody('username', 'Username filed is required').notEmpty();
	req.checkBody('password', 'Password filed is required').equal(req.body.password);
	req.checkBody('password2', 'Password do not match').notEmpty();

	// Check for users
	var errors = req.validationErrors();
	if (errors) {
		res.render('register', {
			errors: errors,
			name: name,
			email: email,
			username:  username,
			password: password,
			password2: password2
		});
	} else {
		var newUser = new User({
			name: name,
			email: email,
			username:  username,
			password: password,
			profileimage: profileImageName
		});

		// Create User
		// User.createUser(newUser, function(err, user) {
		// 	if (err) throw err;
		// 	console.log(user);
		// });

		//Success Message
		req.flash('sucess', 'You know registered and may log in');
		res.location('/');
		res.redirect('/');
	}
});

module.exports = router;