const User = require('../models/user')
const Cart = require('../models/cart')
const Product = require('../models/product')

class CartController {

    static findOne(req, res) {
        Cart.find({userId : req.authenticatedUser.id})
        .populate('userId')
        .populate('productId')
        .then(found => {
            res.status(200).json(found)
        })
        .catch(err => {
            console.log('err bag findone'); 
            res.status(400).json(err)
        })
    }
    
    static createCart (req, res) {
        console.log('masuk', req.authenticatedUser.id, req.body.productId);
        
        Cart.create({...req.body})
        .then(created => {
            // console.log('emag kebuat??', created);
            req.headers.cartId = created._id

            // console.log(req.headers.cartId, 'KEBUAT GAK HEADERSNYA');
            
            res.status(201).json(created)})
        .catch(err => {
            console.log('err bag addtocart', err);
            res.status(400).json(err)})
        }

    static deleteCart(req,res) {
        // console.log('HALO????');
        
        Cart.findByIdAndDelete({_id : req.params.id})
        .then(found => {
            // console.log(found, '/////');
            
            found ? res.status(200).json(found) : res.status(404).json({message : 'Cart not found'})
        })
        .catch(err => {
            console.log(err, 'bag deletecart');
            res.status(400).json(err)})
        }

    static updateCart(req,res) {
        Cart.findOneAndUpdate({_id : req.params.id}, {amount : req.body.amount,  productId : req.body.productId }, {new : true})
        .then(found => {found ? res.status(200).json(found) : res.status(404).json({message : 'Cart not found'})})
        .catch(err => {
            console.log(err, 'bag update');
            res.status(400).json(err)})
        }
    }


module.exports = CartController