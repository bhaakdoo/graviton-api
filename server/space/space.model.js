const httpStatus = require('http-status');
const Promise = require('bluebird');
const mongoose = require('mongoose');

const APIError = require('../helpers/api-error');

const SpaceSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	location: {
		type: [Number],
		index: '2d',
		required: true,
	},
	address: {
		type: String,
		required: true,
	},
	createdAt: {
		type: Date,
		default: Date.now,
	},
});

SpaceSchema.method({

});

SpaceSchema.statics = {
	get(id) {
		return this.findById(id)
			.exec()
			.then((space) => {
				if (space) {
					return space;
				}
				const err = new APIError('No such space exists!', httpStatus.NOT_FOUND);
				return Promise.reject(err);
			});
	},

	list({ skip = 0, limit = 50 } = {}) {
		return this.find()
			.sort({ createdAt: -1 })
			.skip(+skip)
			.limit(+limit)
			.exec();
	},
};

module.exports = mongoose.model('Space', SpaceSchema);
