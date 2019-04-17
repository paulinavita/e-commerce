require('dotenv').config()

const express = require('express')
const app = express()
const NODE_ENV = process.env.NODE_ENV || 'development';
const routes = require('./routes')
const mongoose = require('mongoose')
const cors = require('cors')
app.use(cors())
mongoose.connect(`mongodb://localhost/e_commerce`, {useNewUrlParser : true})
.then(() => {
    console.log('====Mongo Connected====');
})
.catch(err => {
    console.log(err);
})

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/', routes)

app.listen(3000)
console.log('listening on 3000');


module.exports = app