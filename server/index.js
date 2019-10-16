require('dotenv').config();
const express = require('express')
const session = require('express-session')
const massive = require('massive')
const authController = require('./controllers/authController')
let {SERVER_PORT, CONNECTION_STRING, SESSION_SECRET} = process.env;
const app = express();

const port = SERVER_PORT
//use the json method of express package as top levle middleware
app.use(express.json())

//Set up session as top-level middleware by invoking app.use and passing in session invoked with a configuration object.
//The session configuration object should have properties resave set to true, saveUninitialized set to false, and secret set to SESSION_SECRET.
app.use(
    session({
        resave: true,
        saveUninitialized: false,
        secret: SESSION_SECRET
    })
)
//Add a .then on the massive invocation passing in a function, and store the resulting database connection using app.set.
massive(CONNECTION_STRING).then(db => {
    app.set('db', db);
    console.log('db connected')
})
//Create a POST endpoint with '/auth/register' as the URL and authCtrl.register as the controller function.
app.post('/auth/register', authController.register)

    
app.listen(port, () => {
    console.log(`port on ${port}`)
})
