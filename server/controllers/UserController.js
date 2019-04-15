const User = require('../models/user')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

class UserController {

    static create (req,res) {        
        User.create({
            name : req.body.name,
            address : req.body.address,
            email : req.body.email,
            role  : req.body.role,
            password : req.body.password
        })
        .then(data =>{           
            res.status(201).json(data)
        })
        .catch(err => {
            res.status(400).json(err)
        })
    }

    static findAll (req,res) {
        User.find({})
        .then(data =>{       
            // console.log((data, 'ada ga datanya'));
                 
            res.status(200).json(data)
        })
        .catch(err => {
            res.status(400).json(err)
        })
    }

    static loginUser(req, res) {
        
        User.findOne({email : req.body.email})
        .then(found => {
            if (!found) {
                res.status(400).json({message : 'User not found'})
            } else {
                if (!bcrypt.compareSync(req.body.password, found.password)) {
                    console.log('error sync');
                    
                    res.status(400).json({ msg: 'Email/Password invalid' })
                 } else {
                    const { name, email, _id } = found
                    let token = jwt.sign({
                        id: _id,
                        email,
                        name
                    }, process.env.JWT_SECRET);
                    // console.log(token, 'dpt tokeeen')
                    res.status(200).json({ token, _id, name, email })
                 }
            }
        })
        .catch(err => {
            console.log(err, 'err di login');
            res.status(400).json(err)
            
        })
    }
}

module.exports = UserController