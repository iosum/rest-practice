const express = require('express');
const logger = require('morgan');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

mongoose.connect('mongodb+srv://comp2106:castle0118joyce@cluster-4ot4y.mongodb.net/postsdb?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(
    (res) => {
        console.log('connect to db');
    }
).catch(() => {
    console.log('404');
});

// import routes
const usersRoute = require('./routes/users');
const postsRoute = require('./routes/posts');

const app = express();

// Middleware
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// use the certain route
app.use('/users', usersRoute);
app.use('/posts', postsRoute);

// Controllers
app.get('/', (req, res, next) => {
    res.status(200).json({
        message: 'index page'
    });
});


// catch 404 error
app.use((req, res, next) => {
    const err = new Error('not found');
    err.status = 404;
    next(err);
});


// Error handler function
app.use((err, req, res,next) => {
    // set locals, only providing error in development
    const error = app.get('env') === 'development' ? err : {};
    const status = error.status || 500;
    
    // respond to clients
    res.status(status).json({
        error: {
            message: error.message
        }
    });

    // response to me
    console.error(err);
})

// start the server

app.listen(2222,() => {
    console.log('the server is listening on port 2222');
})