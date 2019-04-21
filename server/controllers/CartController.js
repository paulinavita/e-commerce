const User = require('../models/user')
const Cart = require('../models/cart')
const Product = require('../models/product')
const deductStock = require('../controllers/ProductController').deductStock
// console.log(deductStock, '/////')
const Transaction = require('../models/transaction')
class CartController {

    static findOne(req, res) {
        // console.log('masuk 1');
        
        Cart.find({userId : req.authenticatedUser.id})
        .populate('productId')
        .then(found => {
            console.log(found, 'found datanya');
            
            res.status(200).json(found)
        })
        .catch(err => {
            console.log('err bag findone'); 
            res.status(400).json(err)
        })
    }

    // [
    //     {
    //      productId : {
    //          type : Schema.Types.ObjectId,
    //          ref : 'Product'
    //          }
    //      }
    //  ]
    static checkoutDelete(req,res) {
        let prodToPopulate = []
        Cart.find({userId : req.authenticatedUser.id})
        .then((arrFound) => {
            console.log(arrFound ,'/////');
            let updateProduct = async function(id, amount) {
                await deductStock(id, amount)
            }
            arrFound.forEach(e => {
                prodToPopulate.push({productId : e.productId})
                return updateProduct(e.productId, e.amount)
            })
        })
        .then(() => {
            // console.log(req.body.total, 'BERAPA HARGA NYA');
            // console.log('MASUK BIKIN TRANSAKSI');     
            return Transaction.create({userId : req.authenticatedUser.id, carts : prodToPopulate, total : req.body.total})
        })
        .then(() => {
            Cart.deleteMany({userId : req.authenticatedUser.id})
            .then(details => {
                res.status(200).json(details)
            })
            .catch(err => {
                console.log(err,'ats');

                res.status(400).json(err)
            })
        })
        .catch(err => {
            console.log(err,'bwh');
            
            res.status(400).json(err)
        })
    }

    static createCart (req, res) {
        
        console.log('masuk', req.authenticatedUser.id, req.body.productId);
        Cart.findOneAndUpdate(
            {productId : req.body.productId, userId : req.authenticatedUser.id}, 
            {amount : req.body.amount}, 
            {upsert : true, new : true})

        .then(created => {
            req.headers.cartId = created._id
            res.status(201).json(created)})
        .catch(err => {
            console.log('err bag addtocart', err);
            res.status(400).json(err)})
    }

    static deleteIndividualCart(req,res) {      
        // console.log((req.body.id, 'dpt gak?'));
          
        Cart.findByIdAndDelete({_id : req.params.id})
        .then(found => {
            
            found ? res.status(200).json(found) : res.status(404).json({message : 'Cart not found'})
        })
        .catch(err => {
            console.log(err, 'bag deletecart');
            res.status(400).json(err)})
        }

    static updateCart(req,res) {
        if (req.body.type == 'inc') {
            Cart.findOneAndUpdate(
                {_id : req.params.id}, 
                { $inc : { amount : 1} }, 
                {new : true})
            .then(found => {found ? res.status(200).json(found) : res.status(404).json({message : 'Cart not found'})})
            .catch(err => {
                console.log(err, 'bag update');
                res.status(400).json(err)})
        } else if (req.body.type == 'dec') {
            Cart.findOneAndUpdate(
                {_id : req.params.id}, 
                { $inc : { amount : -1} }, 
                {new : true})
            .then(found => {found ? res.status(200).json(found) : res.status(404).json({message : 'Cart not found'})})
            .catch(err => {
                console.log(err, 'bag update');
                res.status(400).json(err)})
        }
    }
}
    


module.exports = CartController