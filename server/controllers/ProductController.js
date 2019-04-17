const Product = require('../models/product')

class ProductController {

    static create (req,res) {    
        Product.create({...req.body})
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
        Product.findOneAndUpdate({_id : req.params.id}, {...req.body}, {new : true})
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
        Product.findOneAndUpdate({_id : req.params.id}, {...req.body}, {new : true})
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

}

module.exports = ProductController