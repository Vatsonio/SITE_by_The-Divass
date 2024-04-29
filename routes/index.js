//routes/index.js
var express = require('express');
var router = express.Router();
var User = require('../models/user');
var Requests = require('../models/requestSchema');

// Функція для обробки помилок
function handleError(res, err, message) {
	console.error(err);
	res.status(500).send(message);
}

// Головна сторінка
router.get('/', function (req, res) {
	User.findOne({unique_id:req.session.userId},function(err,user){а
		if(err){
			console.error(err);
			user = null; // Встановити користувача як null, якщо виникла помилка
		}
		Requests.find({}, function(err, requests) {
			if (err) {
				return handleError(res, err, "Помилка при отриманні заявок.");
			}
			// Рендер сторінки з даними користувача (якщо він залогінений) та заявками
			res.render('index', { user: user, requests: requests });
		});
	});
});



router.get('/register', function (req, res, next) {
	User.findOne({unique_id:req.session.userId},function(err,user){
		if(err){
			console.error(err);
			user = null; // Встановити користувача як null, якщо виникла помилка
		}
		Requests.find({}, function(err, requests) {
			if (err) {
				return handleError(res, err, "Помилка при отриманні заявок.");
			}
			// Рендер сторінки з даними користувача (якщо він залогінений) та заявками
			res.render('register.ejs', { user: user, requests: requests });
		});
	});
});


// Реєстрація
router.post('/register', function(req, res) {
	var personInfo = req.body;

	if(!personInfo.email || !personInfo.username || !personInfo.password || !personInfo.passwordConf || !personInfo.role){
		return res.send();
	}

	if (personInfo.password != personInfo.passwordConf) {
		return res.send({"Success":"password is not matched"});
	}

	User.findOne({email:personInfo.email},function(err,data){
		if(err){
			return handleError(res, err, "Помилка при реєстрації.");
		}
		if(data){
			return res.redirect('/register');
		}

		var c;
		User.findOne({},function(err,data){
			if (data) {
				c = data.unique_id + 1;
			}else{
				c=1;
			}

			var newPerson = new User({
				unique_id:c,
				email:personInfo.email,
				username: personInfo.username,
				password: personInfo.password,
				passwordConf: personInfo.passwordConf,
				role: personInfo.role
			});

			newPerson.save(function(err){
				if(err){
					return handleError(res, err, "Помилка при реєстрації.");
				}
				res.redirect('/login');
			});
		}).sort({_id: -1}).limit(1);
	});
});

// Логін
router.get('/login', function (req, res) {
	User.findOne({unique_id:req.session.userId},function(err,user){
		if(err){
			console.error(err);
			user = null; // Встановити користувача як null, якщо виникла помилка
		}
		Requests.find({}, function(err, requests) {
			if (err) {
				return handleError(res, err, "Помилка при отриманні заявок.");
			}
			// Рендер сторінки з даними користувача (якщо він залогінений) та заявками
			res.render('login.ejs', { user: user, requests: requests });
		});
	});
});

router.post('/login', function (req, res) {
	User.findOne({email:req.body.email},function(err,data){
		if(err){
			return handleError(res, err, "Помилка при вході.");
		}
		if(!data){
			return res.send({"Success":"This Email Is not regestered!"});
		}
		if(data.password != req.body.password){
			return res.send({"Success":"Wrong password!"});
		}
		req.session.userId = data.unique_id;
		res.redirect('/profile');
	});
});


// Створення нової заявки
router.post('/submit-request', function(req, res) {
	var newRequest = new Requests({
		unique_id: req.body.unique_id,
		tg: req.body.tg,
		title: req.body.title,
		location: req.body.location,
		description: req.body.description,
		status: 'Open'
	});

	newRequest.save(function(err) {
		if (err) {
			return handleError(res, err, "Помилка при створенні заявки.");
		}
		// Перенаправлення користувача на головну сторінку
		res.redirect('/');
	});
});


// Отримання всіх заявок
router.get('/requests', function(req, res) {
	Requests.find({}, function(err, requests) {
		if (err) {
			return handleError(res, err, "Помилка при отриманні заявок.");
		}
		res.json(requests);
	});
});


router.get('/request-help', function (req, res, next) {
	User.findOne({unique_id:req.session.userId},function(err,user){
		if(err){
			console.error(err);
			user = null; // Встановити користувача як null, якщо виникла помилка
		}
		Requests.find({}, function(err, requests) {
			if (err) {
				return handleError(res, err, "Помилка при отриманні заявок.");
			}
			// Рендер сторінки з даними користувача (якщо він залогінений) та заявками
			res.render('request-help.ejs', { user: user});
		});
	});
});




router.get('/contact', function (req, res, next) {
	User.findOne({unique_id:req.session.userId},function(err,user){
		if(err){
			console.error(err);
			user = null; // Встановити користувача як null, якщо виникла помилка
		}
		Requests.find({}, function(err, requests) {
			if (err) {
				return handleError(res, err, "Помилка при отриманні заявок.");
			}
			// Рендер сторінки з даними користувача (якщо він залогінений) та заявками
			res.render('contact.ejs', { user: user, requests: requests });
		});
	});
});

router.get('/about', function (req, res, next) {
	User.findOne({unique_id:req.session.userId},function(err,user){
		if(err){
			console.error(err);
			user = null; // Встановити користувача як null, якщо виникла помилка
		}
		Requests.find({}, function(err, requests) {
			if (err) {
				return handleError(res, err, "Помилка при отриманні заявок.");
			}
			// Рендер сторінки з даними користувача (якщо він залогінений) та заявками
			res.render('about.ejs', { user: user, requests: requests });
		});
	});
});


function calculateRequestsTaken(user) {
	return new Promise((resolve, reject) => {
		Requests.countDocuments({ volunteer_id: user._id }, function(err, count) {
			if (err) {
				console.error(err);
				reject(0);
			} else {
				resolve(count);
			}
		});
	});
}

function calculateRequestsSubmitted(user) {
	return new Promise((resolve, reject) => {
		Requests.countDocuments({ user_id: user._id }, function(err, count) {
			if (err) {
				console.error(err);
				reject(0);
			} else {
				resolve(count);
			}
		});
	});
}


router.get('/profile', function (req, res, next) {
	console.log("profile");
	User.findOne({unique_id:req.session.userId},function(err,data){
		console.log("data");
		console.log(data);
		if(!data){
			res.redirect('/');
		}else{
			Promise.all([calculateRequestsTaken(data), calculateRequestsSubmitted(data)]).then(function(results) {
				var requestsTaken = results[0];
				var requestsSubmitted = results[1];

				return res.render('data.ejs', {
					"name": data.username,
					"email": data.email,
					"role": data.role,
					"requestsTaken": requestsTaken,
					"requestsSubmitted": requestsSubmitted
				});
			}).catch(function(err) {
				console.error(err);
				res.status(500).send("Помилка при отриманні даних заявок.");
			});
		}
	});
});


router.get('/logout', function (req, res, next) {
	console.log("logout")
	if (req.session) {
    // delete session object
    req.session.destroy(function (err) {
    	if (err) {
    		return next(err);
    	} else {
    		return res.redirect('/login');
    	}
    });
}
});

router.get('/forgetpass', function (req, res, next) {
	User.findOne({unique_id:req.session.userId},function(err,user){
		if(err){
			console.error(err);
			user = null; // Встановити користувача як null, якщо виникла помилка
		}
		Requests.find({}, function(err, requests) {
			if (err) {
				return handleError(res, err, "Помилка при отриманні заявок.");
			}
			// Рендер сторінки з даними користувача (якщо він залогінений) та заявками
			res.render('forget.ejs', { user: user, requests: requests });
		});
	});
});

router.post('/forgetpass', function (req, res, next) {
	//console.log('req.body');
	//console.log(req.body);
	User.findOne({email:req.body.email},function(err,data){
		console.log(data);
		if(!data){
			res.send({"Success":"This Email Is not regestered!"});
		}else{
			// res.send({"Success":"Success!"});
			if (req.body.password==req.body.passwordConf) {
			data.password=req.body.password;
			data.passwordConf=req.body.passwordConf;

			data.save(function(err, Person){
				if(err)
					console.log(err);
				else
					console.log('Success');
					res.send({"Success":"Password changed!"});
			});
		}else{
			res.send({"Success":"Password does not matched! Both Password should be same."});
		}
		}
	});
	
});

module.exports = router;