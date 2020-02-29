const User = require('../models/user');

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
        const newUser = new User(req.body);
        // save the new user to the db
        const user = await newUser.save({});
        res.status(201).json(user);


    }
};


/**
 * we can interact w/ mongoose in 3 different ways:
 * 1. callbacks
 * 2. promisis
 * 3. async / await
 */