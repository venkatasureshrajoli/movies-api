const express = require('express'),
    mongoose = require('mongoose'),
    app = express(),
    bodyParser = require('body-parser'),
    cors = require('cors'),
    PORT = process.env.PORT||3000,
    MONGO_USERNAME = process.env.MONGO_USERNAME,
    MONGO_PASSWORD = process.env.MONGO_PASSWORD,
    MONGO_URI= `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD} @cluster0-kdgl5.mongodb.net/movies-db?retryWrites=true&w=majority`,
    routes = require('./routes');

app.listen(PORT, ()=>{
    console.log(`SERVER STARTED RUNNING ON PORT ${PORT}`);
    console.log(`Access using http://localhost:${PORT}/<api>`);
});


/* Mongoose connection */
mongoose.set('debug', true);
mongoose.connect(MONGO_URI, {
    useNewUrlParser:true,
    useUnifiedTopology:true
}).catch((hasBeenFailed)=>{
    console.log(`Mongo connection failed`);
});

mongoose.connection.on('connection', ()=>{
    console.log(`Mongo connection successful.`);
});

mongoose.connection.on('error', (error)=>{
    console.log(`Mongo connection failed.`, error);
});

mongoose.Promise = Promise;


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(routes);
app.use(cors());

module.exports = app;

