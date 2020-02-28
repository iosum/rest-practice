const User = require('../models/user');

module.exports = {
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
    newUser: (req, res, next) => {
        //console.log(req.body);
        const newUser = new User(req.body);
        //console.log(newUser);
        newUser.save((err, user) => {
            res.status(201).json(user);
        });
    }
};


/**
 * we can interact w/ mongoose in 3 different ways:
 * 1. callbacks
 * 2. promisis
 * 3. async / await
 */