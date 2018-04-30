const express = require('express');
const validate = require('express-validation');

const spaceValidation = require('../../config/validation/space');
const spaceController = require('./space.controller');

const router = express.Router();

router.route('/')
	.get(spaceController.list)
	.post(validate(spaceValidation.createSpace), spaceController.create);

router.route('/nearby')
	.get(spaceController.listNearby);

router.route('/:spaceId')
	.get(spaceController.get)
	.put(validate(spaceValidation.updateSpace), spaceController.update)
	.delete(spaceController.remove);

router.param('spaceId', spaceController.load);

module.exports = router;
