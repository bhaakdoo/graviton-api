const express = require('express');

const authRoutes = require('./server/auth/auth.route');
const spaceRoutes = require('./server/space/space.route');
const userRoutes = require('./server/user/user.route');

const router = express.Router();

router.get('/health-check', (req, res) =>
	res.send('OK'));


router.use('/auth', authRoutes);
router.use('/spaces', spaceRoutes);
router.use('/users', userRoutes);

module.exports = router;
