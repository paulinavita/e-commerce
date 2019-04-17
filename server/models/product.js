const mongoose= require('mongoose')
const Schema = mongoose.Schema;

const productSchema = new Schema({
    price : {
        type : Number,
        required : [true, 'Price must be filled'],
        min : [0, 'Invalid input']
    },
    name : {
        type : String,
        required : [true, 'Name must be filled'],
        minlength : [4,  'Minimum 4 characters']
    },
    image : {
        type : String
    },
    description : {
        type : String,
        required : [true, 'Description must be filled'],
        minlength : [4,  'Minimum 4 characters']
    },
    stock : {
        type : Number,
        required : [true, 'Stock must be filled'],
        min : [0, 'Invalid input']
    }
})

const Product = new mongoose.model('Product', productSchema)
module.exports = Product

