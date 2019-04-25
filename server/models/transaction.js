const mongoose= require('mongoose')
const Schema = mongoose.Schema;

const transactionSchema = new Schema({
    userId : {
        type : Schema.Types.ObjectId,
        ref : 'User'
    },
   carts : [
       {
        productId : {
            type : Schema.Types.ObjectId,
            ref : 'Product'
            }
        }
    ],
   total : {
       type : Number,
       min : [1, 'Total(price) cannot be less than 1']
   },
   createdAt : {
       type : Date,
       default : new Date()
   }
})

const Transaction = new mongoose.model('Transaction', transactionSchema)
module.exports = Transaction

