const mongoose= require('mongoose')
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs')

const userSchema = new Schema({
    name : {
        type : String,
        required : [true, 'Name must be filled'],
        minlength : [4,  'Minimum 4 characters']
    },
    password : {
        type : String,
        required : [true,  'Password must be filled'],
        minlength : [6,  'Minimum  characters']
    },
    address : {
        type : String,
        required : [true, 'Address must be filled'],
        minlength : [9,  'Minimum 9 characters']
    },
    email : {
        type  :  String,
        validate: [
            {
                validator:
                    function isEmail(email) {
                        return /^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/i.test(email)
                    }, message: 'Email not valid'
            },
            {
                validator:
                    function isUnique(email) {
                        return User.findOne({_id : {$ne : this.id}, email : this.email})
                        .then(found => {
                            if (found) return false
                        })
                    }, message : 'Email has been taken'
            }
        ]
    },
    role : {
        type  : String,
        default : 'Customer'
    },
    createdAt : {
        type: Date,
        default : new Date()
    }
    
})

userSchema.pre('save', function (next) {
    console.log(('ada disiniii masuk model'));
    
    if (this.password) {
        var salt = bcrypt.genSaltSync(10)
        var hash = bcrypt.hashSync(this.password, salt)
        this.password = hash
        next()
    }
})

const User = new mongoose.model ('User', userSchema)
module.exports = User