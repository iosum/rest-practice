const express = require('express');
//const router = express.Router();
// use the express-promise-router to avoid writing so many try/catch block
// if there is an error, it will automatically throw the error
const router = require('express-promise-router')();

const UsersControllers = require('../controllers/users');

const { validateParam, validateBody, schemas } = require('../helpers/routeHelpers');

router.route('/')
    .get(UsersControllers.index)
    .post(validateBody(schemas.userSchema), UsersControllers.newUser);

// /users/:id
router.route('/:id')
    // get a particular user

    // whenever the get request is sent, first it will execute the validateParam() and if everything is fine
    // we go to the UsersControllers.getUser
    .get(validateParam(schemas.idSchema, 'id'), UsersControllers.getUser)

    // modify a singular resource which is already a part of resources collection. 
    // PUT replaces the resource in its entirety. 
    .put([validateParam(schemas.idSchema, 'id'), validateBody(schemas.userSchema)], UsersControllers.replaceUser)

    // as patch() can only update 1 or more fields, so we need to design another schema validation for patch()
    .patch([validateParam(schemas.idSchema, 'id'), validateBody(schemas.userOptionalSchema)], UsersControllers.updateUser)
// .delete()


router.route('/:id/posts')
    .get(validateParam(schemas.idSchema, 'id'), UsersControllers.getUserPosts)
    .post([validateParam(schemas.idSchema, 'id'), validateBody(schemas.postSchema)], 
    UsersControllers.newUserPost)



module.exports = router;

/*
http method to use for CRUD (Create, Read/Retrieve, Update, Delete) operations.
Create — POST
Read/Retrieve — GET
Update — PUT/PATCH
Delete — DELETE

*/