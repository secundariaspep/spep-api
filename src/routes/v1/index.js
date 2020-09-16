const express = require('express');
const authRoute = require('./auth.route');
const userRoute = require('./user.route');
const docsRoute = require('./docs.route');
// modulos
const modulesRoute = require('../../app/modules.route');

const router = express.Router();

router.use('/auth', authRoute);
router.use('/users', userRoute);
router.use('/docs', docsRoute);
// modulos
router.use('/', modulesRoute);

module.exports = router;
