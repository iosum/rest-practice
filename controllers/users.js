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
    index: (req, res, next) => {
        User.find({})
            .then((users) => {
                res.status.json(users);
            })
            .catch((err) => {
                next(err);
            })
    },


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
};


/**
 * we can interact w/ mongoose in 3 different ways:
 * 1. callbacks
 * 2. promisis
 * 3. async / await
 */