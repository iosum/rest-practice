const User = require('../models/user');
const Post = require('../models/post');




module.exports = {

    /**
     * callback
     */

    /*
    index: (req, res, next) => {
        
        // 1. callback
        User.find({}, (err, users) => {
            if(err) {
                next(err);
            }
            res.status(200).json(users);
        });
        
        // res.status(200).json({
        //     message: 'index page'
        // });
    },
    */


    /**
     * using promisis 
     */

    /*
    index: (req, res, next) => {
        User.find({})
            .then((users) => {
                res.status.json(users);
            })
            .catch((err) => {
                next(err);
            })
    },
    */


    /**
     * callback for saving new users
     */

    /*
   newUser: (req, res, next) => {
       //console.log(req.body);
       const newUser = new User(req.body);
       //console.log(newUser);
       newUser.save((err, user) => {
           res.status(201).json(user);
       });
   },
   */

    /**
     *  using async / await
     * 
     */
    index: async (req, res, next) => {
        // call the method to find the users in the user model but we will wait until we find all users 
        // and store it in the users variable (indacte we get all the users from the db) 
        // instead of executing the next line then coming back to the find function
        const users = await User.find({});
        res.status(200).json(users);
    },

    /**
     * promisis
     */
    /*
    newUser: (req, res, next) => {
        const newUser = new User(req.body);
        // save the user using newUser which is sent by the client
        newUser.save()
            .then((user) => {
                res.status(201).json(user);
            })
            .catch((err) => {
                next(err);
            })
    }
    */

    /**
     * async / await
     */
    newUser: async (req, res, next) => {

        // get the new user
        const newUser = new User(req.value.body);
        // save the new user to the db
        const user = await newUser.save({});
        res.status(201).json(user);

    },

    /**
     *  GET : /users/id
     *  get a particular user via id
     */

    getUser: async (req, res, next) => {
        // validate the userid
       // const result = idSchema.validate(req.params);
        //console.log(result);

        // get the id from the route

        // before es6
        //const id = req.params.id;
        // es6 version, but both perform the same task 
        // old way (w/o validation)
        //const { id } = req.params;
        // console.log(req.params.id);
        const { id } = req.value.params;
        const user = await User.findById(id);
        res.status(200).json(user);

    },

    /**
     * enforce every value needed to provided to work
     */
    replaceUser: async (req, res, next) => {
        // 1. get the id 
        const { id } = req.value.params;
        // 2. fetch the body
        const newUser = req.value.body;
        //console.log("id\n" + id +"user\n" + newUser);

        const result = await User.findByIdAndUpdate(id, newUser)
        //console.log(result);
        res.status(200).json({ success: true });

    },

    /**
     * only needs to provide one field to work 
     */

    updateUser: async (req, res, next) => {
        // 1. get the id 
        const { id } = req.value.params;
        // 2. fetch the body
        const newUser = req.value.body;
        //console.log("id\n" + id +"user\n" + newUser);

        const result = await User.findByIdAndUpdate(id, newUser)
        //console.log(result);
        res.status(200).json({ success: true });

    },

    getUserPosts: async(req, res, next) => {
        const {id} = req.value.params;
        const user = await User.findById(id).populate({
            path: 'posts',
            model: Post
        });
        console.log(user.posts);
        res.status(200).json(user);
    },

    newUserPost: async(req, res, next) => {
        const {id} = req.value.params;
        // create a new post
        const newPost = new Post(req.value.body);
        //console.log(newPost);
        // define the relationship between new post and the user
        const user = await User.findById(id);
        // assign user as the writer of the posts
        newPost.author = user;
        // save the post
        await newPost.save();
        // add the new post to the users's array posts that is inside the user model
        user.posts.push(newPost);
        // save the user
        await user.save();
        res.status(201).json(newPost);
    }






};


/**
 * we can interact w/ mongoose in 3 different ways:
 * 1. callbacks
 * 2. promisis
 * 3. async / await
 */