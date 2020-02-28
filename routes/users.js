const express = require('express');
const router = express.Router();

const UsersControllers = require('../controllers/users'); 

router.route('/')
    .get(UsersControllers.index)
    .post(UsersControllers.newUser);

module.exports = router;