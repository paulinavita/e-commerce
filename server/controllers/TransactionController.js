const Transaction = require('../models/transaction')
class TransactionController {

    static create(req,res) {
        Transaction.create({...req.body})
        .then(created => {
            console.log('kebuat??');
            console.log(created);
            res.status(201).json(created)
        })
        .catch(err =>{
            res.status(400).json(err)
        })
    }

    static findAll(req,res) {
        Transaction.find({})
        .populate("userId")
        .populate("carts.productId")
        .then(allTrans =>  {
            console.log(allTrans[0].carts[0].productId.name, 'APA SISINYA??!?!??!');
            
            res.status(200).json(allTrans)
        })
        .catch(err => {
            res.status(400).json(err)
        })
    }
}

module.exports = TransactionController