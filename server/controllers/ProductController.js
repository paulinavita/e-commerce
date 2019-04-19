const Product = require('../models/product')
let allProducts;
class ProductController {

    static create (req,res) {
        let url = req.file.cloudStoragePublicUrl  
        Product.create({
            name : req.body.name,
            description : req.body.description,
            stock : req.body.stock,
            price : req.body.price,
            image : url
        })
        .then(data =>{    
            res.status(201).json(data)
        })
        .catch(err => {
            res.status(400).json(err)
        })
    }

    static deductStock(id, amount) {
        Product.findById(id)
        .then(foundProduct => {
            console.log(foundProduct, 'apakah dapat produk tsb');
            console.log('====================-=', foundProduct.stock, '///////' ,amount);
            foundProduct.stock -= +amount
            foundProduct.save()
        })
        .catch(err => {
            res.status(400).json(err)
        })
    }

    static findAllAndUpdateStock() {
        allProducts.forEach(product => {
            product.update()
        })
    }

    static findAll (req,res) {
        Product.find({})
        .then(data =>{
            allProducts = data
            res.status(200).json(data)
        })
        .catch(err => {
            res.status(400).json(err)
        })
    }

    static update(req, res) {
        Product.findOneAndUpdate({_id : req.params.id}, {...req.body,}, {new : true})
        .then(product => {
            if (product) res.status(200).json(product)
            else res.status(400).json({message : 'No such product'})
        })
        .catch(err => {
            res.status(400).json(err)
        })
    }

    static delete (req, res) {
        Product.findOneAndDelete({_id : req.params.id})
        .then(product => {
            if (product) res.status(200).json(product)
            else res.status(400).json({message : 'No such product'})
        })
        .catch(err => {
            res.status(400).json(err)
        })
    }

    static findOne(req,res) {
        
        console.log(req.params, 'INI BENTUKNYA APA?');
        
        Product.findOne({_id :req.params.id})
        .then(product => {
            console.log(product,'///');
            if (product) res.status(200).json(product)
            else res.status(400).json({message : 'No such product'})
        })
        .catch(err => {
            console.log('knp err', err);          
            res.status(400).json(err)
        })
    }


    static editProduct(req,res) {
        let cloudStoragePublicUrl = ''
        if (req.file) cloudStoragePublicUrl = req.file.cloudStoragePublicUrl
        else cloudStoragePublicUrl = req.body.image
        console.log(req.body, 'dan', req.file ,'?????');

        Product.findOneAndUpdate(
            {_id : req.params.id}, 
            {name : req.body.name,
            description : req.body.description,
            stock : req.body.stock,
            price : req.body.price,
             image : cloudStoragePublicUrl
            }, 
            {new : true})
        .then(product => {
            if (product) res.status(200).json(product)
            else res.status(400).json({message : 'No such product'})
        })
        .catch(err => {
            res.status(400).json(err)
        })
    }

    static deleteProduct(req, res) {
        Product.findOneAndDelete({_id : req.params.id})
        .then(product => {
            if (product) res.status(200).json(product)
            else res.status(400).json({message : 'No such product'})
        })
        .catch(err => {
            res.status(400).json(err)
        })
    }

    // static updateMany(req, res) {
    //     Product.update({_id: obj._id}, {$set: {value: obj.value}});
    // }

}

module.exports = ProductController