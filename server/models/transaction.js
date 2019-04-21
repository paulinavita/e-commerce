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
       type : Number
   },
   createdAt : {
       type : Date,
       default : new Date()
   }
})

const Transaction = new mongoose.model('Transaction', transactionSchema)
module.exports = Transaction

