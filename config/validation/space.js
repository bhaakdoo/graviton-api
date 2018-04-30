const Joi = require('joi');

module.exports = {

	createSpace: {
		body: {
			name: Joi.string().required(),
		},
	},

	updateSpace: {
		body: {
			name: Joi.string().required(),
		},
		params: {
			spaceId: Joi.string().hex().required(),
		},
	},
};
