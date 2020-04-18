const express = require('express'),
    Router = express.Router(),
    MoviesRoute = require('./movies.route');


Router.use('/api', MoviesRoute);



module.exports = exports = Router;