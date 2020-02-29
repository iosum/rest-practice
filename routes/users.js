const express = require('express');
//const router = express.Router();
// use the express-promise-router to avoid writing so many try/catch block
// if there is an error, it will automatically throw the error
const router = require('express-promise-router')();

const UsersControllers = require('../controllers/users'); 

router.route('/')
    .get(UsersControllers.index)
    .post(UsersControllers.newUser);

module.exports = router;