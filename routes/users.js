const express = require('express');
//const router = express.Router();
// use the express-promise-router to avoid writing so many try/catch block
// if there is an error, it will automatically throw the error
const router = require('express-promise-router')();

const UsersControllers = require('../controllers/users'); 

router.route('/')
    .get(UsersControllers.index)
    .post(UsersControllers.newUser);

// /users/:id
router.route('/:id')
    // get a particular user
    .get(UsersControllers.getUser)
    // modify a singular resource which is already a part of resources collection. 
    // PUT replaces the resource in its entirety. 
    .put(UsersControllers.replaceUser)
    .patch(UsersControllers.updateUser)
    // .delete()


router.route('/:id/posts')
    .get(UsersControllers.getUserPosts)
    .post(UsersControllers.newUserPost)



module.exports = router;

/*
http method to use for CRUD (Create, Read/Retrieve, Update, Delete) operations.
Create — POST
Read/Retrieve — GET
Update — PUT/PATCH
Delete — DELETE

*/