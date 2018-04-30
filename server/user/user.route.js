const express = require('express');
const validate = require('express-validation');

const userValidation = require('../../config/validation/user');
const userController = require('./user.controller');

const router = express.Router();

router.route('/')
	.get(userController.list)
	.post(validate(userValidation.createUser), userController.create);

router.route('/:userId')
	.get(userController.get)
	.put(validate(userValidation.updateUser), userController.update)
	.delete(userController.remove);

router.param('userId', userController.load);

module.exports = router;
