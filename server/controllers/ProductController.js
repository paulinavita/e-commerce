const Product = require('../models/product')

class ProductController {

    static create (req,res) {
        let url;    
        if (req.file) url = req.file.cloudStoragePublicUrl
        else url = `https://www.google.com/url?sa=i&source=images&cd=&cad=rja&uact=8&ved=2ahUKEwjVjeWhrNnhAhWRfisKHWnGBLoQjRx6BAgBEAU&url=http%3A%2F%2Frebloggy.com%2Fpost%2Fgalaxy-nature-crystal-witch-crystals-witchcraft-new-age-paganism-wiccan-pagan-ta%2F114001905018&psig=AOvVaw3UbzlKZM3HOqC6gk19up1g&ust=1555666709096371`
        Product.create({
            ...req.body,
            image : url
        })
        .then(data =>{    
            res.status(201).json(data)
        })
        .catch(err => {
            res.status(400).json(err)
        })
    }

    static findAll (req,res) {
        Product.find({})
        .then(data =>{
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
        Product.findOne({_id : req.params.id})
        .then(product => {
            if (product) res.status(200).json(product)
            else res.status(400).json({message : 'No such product'})
        })
        .catch(err => {
            res.status(400).json(err)
        })
    }

    static editProduct(req,res) {
        let url;
        if (req.file) url = req.file.cloudStoragePublicUrl
        else url = `https://www.google.com/url?sa=i&source=images&cd=&cad=rja&uact=8&ved=2ahUKEwjVjeWhrNnhAhWRfisKHWnGBLoQjRx6BAgBEAU&url=http%3A%2F%2Frebloggy.com%2Fpost%2Fgalaxy-nature-crystal-witch-crystals-witchcraft-new-age-paganism-wiccan-pagan-ta%2F114001905018&psig=AOvVaw3UbzlKZM3HOqC6gk19up1g&ust=1555666709096371`

        Product.findOneAndUpdate(
            {_id : req.params.id}, 
            {...req.body,
             image : url
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