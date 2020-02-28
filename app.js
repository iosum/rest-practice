const express = require('express');
const logger = require('morgan');

// import routes
const usersRoute = require('./routes/users');


const app = express();

// Middleware
app.use(logger('dev'));

// use the certain route
app.use('/users', usersRoute)

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