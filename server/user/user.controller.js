const User = require('./user.model');

function load(req, res, next, id) {
	User.get(id)
		.then((user) => {
			req.user = user;
			return next();
		})
		.catch(err => next(err));
}

function get(req, res) {
	return res.json(req.user);
}

function create(req, res, next) {
	const user = new User({
		username: req.body.username,
		mobileNumber: req.body.mobileNumber,
	});

	user.save()
		.then(savedUser => res.json(savedUser))
		.catch(err => next(err));
}

function update(req, res, next) {
	const { user } = req.user;
	user.username = req.body.username;
	user.mobileNumber = req.body.mobileNumber;

	user.save()
		.then(savedUser => res.json(savedUser))
		.catch(err => next(err));
}

function list(req, res, next) {
	const { limit = 50, skip = 0 } = req.query;
	User.list({ limit, skip })
		.then(users => res.json(users))
		.catch(err => next(err));
}

function remove(req, res, next) {
	const { user } = req.user;
	user.remove()
		.then(deletedUser => res.json(deletedUser))
		.catch(err => next(err));
}

module.exports = {
	load, get, create, update, list, remove,
};
