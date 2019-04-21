require('dotenv').config()

const express = require('express')
const app = express()
const routes = require('./routes')
const mongoose = require('mongoose')
const cors = require('cors')
app.use(cors())


// Run this database UNDER TESTING MODE
//========================== FOR TESTING PURPOSE =========================//
/*
let localurl = process.env.MONGO_LOCAL_TEST_URL
mongoose.connect(localurl, {
        useNewUrlParser: true
    })
    .then(() => {
        console.log('====Mongo LOCAL Connected====');
    })
    .catch(err => {
        console.log(err);
    })
*/

// Run this database TO VIEW THE APPLICATION
//==================== NOT FOR TESTING PURPOSE =========================//
/* let uri = process.env.MONGO_DB_URL
mongoose.connect(uri, {
        useNewUrlParser: true
    })
    .then(() => {
        console.log('====Mongo ATLAS Connected====');
    })
    .catch(err => {
        console.log(err);
    }) */


app.use(express.json());
app.use(express.urlencoded({
    extended: false
}));

app.use('/', routes)

app.listen(3000)
console.log('listening on 3000');


module.exports = app