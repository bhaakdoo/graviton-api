const Space = require('./space.model');

function load(req, res, next, id) {
	Space.get(id)
		.then((space) => {
			req.space = space;
			return next();
		})
		.catch(err => next(err));
}

function get(req, res) {
	return res.json(req.space);
}

function create(req, res, next) {
	const space = new Space({
		name: req.body.name,
		location: [req.body.location.longitude, req.body.location.latitude],
		address: req.body.address,
	});

	space.save()
		.then(savedPlace => res.json(savedPlace))
		.catch(err => next(err));
}

function update(req, res, next) {
	const { space } = req.space;
	space.name = space;
	space.location = [req.body.longitude, req.body.latitude];
	space.address = req.body.address;

	space.save()
		.then(savedSpace => res.json(savedSpace))
		.catch(err => next(err));
}

function list(req, res, next) {
	const { limit = 50, skip = 0 } = req.query;
	Space.list({ limit, skip })
		.then(spaces => res.json(spaces))
		.catch(err => next(err));
}

function listNearby(req, res, next) {
	const location = [req.query.longitude, req.query.latitude] || [0, 0];
	let { maxDistance } = req.query || 10;
	maxDistance /= 111.12;
	Space.find({ location: { $near: location, $maxDistance: maxDistance } })
		.exec()
		.then(nearbySpaces => res.json(nearbySpaces))
		.catch(err => next(err));
}

function remove(req, res, next) {
	const { space } = req.space;
	space.remove()
		.then(deletedSpace => res.json(deletedSpace))
		.catch(err => next(err));
}

module.exports = {
	load, get, create, update, list, listNearby, remove,
};
