const chai = require('chai')
const chaiHttp = require('chai-http')
const expect = chai.expect
const app = require('../app')
const User = require('../models/user')
const Product = require('../models/product')
const jwt = require('../helpers/jwt')

chai.use(chaiHttp)
let token = null;
let productId = null;


before(function (done) {
    let newUser = {
        name: 'Paulina',
        address: 'Radalhahahahahhahahahaha',
        email: "pauline@gmail.com",
        role: "admin",
        password: "123456"
    }
    
    User.create(newUser)
    .then(user => {
        // console.log('berhasil create');
            let { name, email, _id } = user
            token = jwt.sign({  id: _id, email, name
            }, process.env.JWT_SECRET)
            done()
        })
    .catch(err => {
        done()
        })
    })



after(function (done) {   
    Product.deleteMany({})
    .then(() => {
       
    })
    .catch(err => {
        done()

    })

    User.deleteMany({})
    .then(() => {
        done()
    })
    .catch(err => {
        done()
        
    })


})

describe('Product end point test', function () {
    // console.log('disini');


    describe('User Sign in',  function() {
        
        it ('Should return an object of new user', function (done) {   
            let data = {
                email : 'pauline@gmail.com',
                password : '123456'
            }
            chai
            .request(app)
            .post('/users/signin/local')
            .send(data)
            .then(res => {
                expect(res.body).to.be.an('object')
                expect(res).to.have.status(200)
                token = res.body.token   
                done()
            })
            .catch(err => {
                console.log(err, 'ini error??');
                done(err)
            })
        })
    })
    
    describe('POST /products', function () {
        describe('Success: ', function () {
            it('App return an object of new product with status 201', function (done) {
                let newProduct = {
                    price: 20000,
                    name: 'Buku',
                    image: 'http://imageurl.buku.com',
                    stock: 10,
                    description : 'Bukubukubu'
                }
                chai
                    .request(app)
                    .post('/products')
                    .send(newProduct)
                    .set('token', token)
                    .then(res => {
                        // console.log(( 'ini barangnya', res.body.name));
                        expect(res.body).to.be.an('object')
                        expect(res.body).to.have.property('_id')
                        expect(res.body).to.have.property('name')
                        expect(res.body).to.have.property('image')

                        expect(res.body).to.have.property('stock')
                        expect(res.body).to.have.property('description')
                        productId = res.body._id
                        // console.log(productId, 'DAPAT PRODUCT AIDI');
                        done()
                    })
                    .catch(err => {
                        console.log(err);
                    })
                })
            })

            describe('Fail: ', function () {
                let newProduct = {
                    price: 20000,
                    name: 'Roti',
                    image: 'http://imageurl.roti.com',
                    stock: 10,
                    description : 'Rooooti'
                }
                it('User not logged in; should return status 401', function (done) {
                    chai
                        .request(app)
                        .post(`/products`)
                        .send(newProduct)
                        .then(res => {
                            expect(res).to.have.status(401)
                            expect(res.error).to.have.property('message')                            
                            done()
                        })
                        .catch(err => console.log((err)))
                })

                it('Should return status 400 with error price type is a string', function(done) {
                    let newProduct = {
                        price: 'abbabc',
                        name: 'Roti',
                        image: 'http://imageurl.roti.com',
                        stock: 10,
                        description : 'Rooooti'
                    }
                    chai
                    .request(app)
                    .post(`/products`)
                    .send(newProduct)
                    .set('token', token)
                    .then((res) => {  
                        expect(res.body.errors.price).to.have.property('message'); 
                        expect(res).to.have.status(400)
                        done()
                    })
                    .catch(err => console.log((err)))
                })


                it('Should return status 400 with error price input is less than 0', function(done) {
                    let newProduct = {
                        price: -5,
                        name: 'Roti',
                        image: 'http://imageurl.roti.com',
                        stock: 10,
                        description : 'Rooooti'
                    }
                    chai
                    .request(app)
                    .post(`/products`)
                    .send(newProduct)
                    .set('token', token)
                    .then((res) => {  
                        expect(res.body.errors.price).to.have.property('message'); 
                        expect(res).to.have.status(400)
                        done()
                    })
                    .catch(err => console.log((err)))
                })

                it('Should return status 400 with error stock input is less than 0', function(done) {
                    let newProduct = {
                        price: 1,
                        name: 'Roti',
                        image: 'http://imageurl.roti.com',
                        stock: -10,
                        description : 'Rooooti'
                    }
                    chai
                    .request(app)
                    .post(`/products`)
                    .send(newProduct)
                    .set('token', token)
                    .then((res) => {  
                        expect(res.body.errors.stock).to.have.property('message'); 
                        expect(res).to.have.status(400)
                        done()
                    })
                    .catch(err => console.log((err)))
                })

                it('Should return status 400 with error stock input is not an integer', function(done) {
                    let newProduct = {
                        price: 1,
                        name: 'Roti',
                        image: 'http://imageurl.roti.com',
                        stock: 'aaaa',
                        description : 'Rooooti'
                    }
                    chai
                    .request(app)
                    .post(`/products`)
                    .send(newProduct)
                    .set('token', token)
                    .then((res) => {  
                        expect(res.body.errors.stock).to.have.property('message'); 
                        expect(res).to.have.status(400)
                        done()
                    })
                    .catch(err => console.log((err)))
                })

                it('Should return status 400 with error name is empty', function(done) {
                    let newProduct = {
                        price: 1,
                        name: '',
                        image: 'http://imageurl.roti.com',
                        stock: 'aaaa',
                        description : 'Rooooti'
                    }
                    chai
                    .request(app)
                    .post(`/products`)
                    .send(newProduct)
                    .set('token', token)
                    .then((res) => {  
                        expect(res.body.errors.name).to.have.property('message'); 
                        expect(res).to.have.status(400)
                        done()
                    })
                    .catch(err => console.log((err)))
                })

                it('Should return status 400 with error description is empty', function(done) {
                    let newProduct = {
                        price: 1,
                        name: 'Totaoi',
                        image: 'http://imageurl.roti.com',
                        stock: 'aaaa',
                        description : ''
                    }
                    chai
                    .request(app)
                    .post(`/products`)
                    .send(newProduct)
                    .set('token', token)
                    .then((res) => {                    
                        expect(res.body.errors.description).to.have.property('message'); 
                        expect(res).to.have.status(400)
                        done()
                    })
                    .catch(err => console.log((err)))
                })
            })
        })


    describe('GET /products', function () {
        describe('Success: ', function () {
            it('Should return array with all of products', function(done) {
                chai
                .request(app)
                .get('/products')
                .set('token', token)
                .then((res) => {
                    expect(res).to.have.status(200)
                    expect(res.body).to.be.an('array')
                    expect(res.body[0]).to.have.property('_id')
                    expect(res.body[0]).to.have.property('price')
                    expect(res.body[0]).to.have.property('image')
                    expect(res.body[0]).to.have.property('stock')
                    expect(res.body[0]).to.have.property('description')
                    done()
                    
                })
                .catch(err => {
                    console.log((err), 'ini??');
                    
                })
            })
        })
    })

    describe('GET /products/:id', function () {
        describe('Success: ', function () {
            it('Should return object with the selected id', function(done) {
                chai
                .request(app)
                .get(`/products/${productId}`)
                .set('token', token)
                .then((res) => {
                    expect(res).to.have.status(200)
                    expect(res.body).to.be.an('object')
                    expect(res.body).to.have.property('_id')
                    expect(res.body).to.have.property('price')
                    expect(res.body).to.have.property('image')
                    expect(res.body).to.have.property('stock')
                    expect(res.body).to.have.property('description')
                    done()
                    
                })
                .catch(err => {
                    console.log((err), 'ini??');
                    
                })
            })
        })
    })
    
    describe('PUT /products/:id', function () {
        describe('Success: ', function () {
            it('Should return object with the selected id that has been updated', function(done) {
                let editedProduct  = {
                    price: 20200220,
                    name: 'Buku',
                    image: 'http://imageurl.buku.com',
                    stock: 2,
                    description : 'Bukubauauauaukubu'
                }

                chai
                .request(app)
                .get(`/products/${productId}`)
                .send(editedProduct)
                .set('token', token)
                .then((res) => {
                    expect(res).to.have.status(200)
                    expect(res.body).to.be.an('object')
                    expect(res.body).to.have.property('_id')
                    expect(res.body).to.have.property('price')
                    expect(res.body).to.have.property('image')
                    expect(res.body).to.have.property('stock')
                    expect(res.body).to.have.property('description')
                    done()
                })
                .catch(err => {
                    console.log((err), 'ini??');
                    
                })
            })
        })
    })

    describe('DELETE /products/:id', function () {
        describe('Success: ', function () {
            it('Should return object with the selected id that has been deleted', function(done) {
                chai
                .request(app)
                .delete(`/products/${productId}`)
                .set('token', token)
                .then((res) => {
                    expect(res).to.have.status(200)
                    expect(res.body).to.have.property('_id')
                    expect(res.body).to.have.property('price')
                    expect(res.body).to.have.property('image')
                    expect(res.body).to.have.property('stock')
                    expect(res.body).to.have.property('description')
                    done()
                })
                .catch(err => {
                    console.log((err), 'ini??');
                    
                })
            })
        })
    })
})


// ============= TESTING FAIL ON CUSTOMER ==============


describe('Product end point test for user', function () {


    before(function (done) {
    let newUser = {
        name: 'Paulina',
        address: 'Radalhahahahahhahahahaha',
        email: "pauline@gmail.com",
        role: "customer",
        password: "123456"
    }
    
    User.create(newUser)
    .then(user => {
            let { name, email, _id } = user
            token = jwt.sign({  id: _id, email, name
            }, process.env.JWT_SECRET)
            done()
        })
    .catch(err => { done() }) })



    after(function (done) {   
        Product.deleteMany({})
        .then(() => { })
        .catch(err => { done() })

        User.deleteMany({})
        .then(() => { done() })
        .catch(err => { done() })
    })

    // console.log('disini');
    describe('User Sign in',  function() {
        
        it ('Should return an object of new user', function (done) {   
            let data = {
                email : 'pauline@gmail.com',
                password : '123456'
            }
            chai
            .request(app)
            .post('/users/signin/local')
            .send(data)
            .then(res => {
                expect(res.body).to.be.an('object')
                expect(res).to.have.status(200)
                token = res.body.token   
                done()
            })
            .catch(err => {
                console.log(err, 'ini error??');
                done(err)
            })
        })
    })
    
    describe('POST /products', function () {
        describe('Fail: ', function () {
            it('App return an object of new product with status 401 unauthorized', function (done) {
                let newProduct = {
                    price: 20000,
                    name: 'Buku',
                    image: 'http://imageurl.buku.com',
                    stock: 10,
                    description : 'Bukubukubu'
                }
                chai
                    .request(app)
                    .post('/products')
                    .send(newProduct)
                    .set('token', token)
                    .then(res => {
                        expect(res).to.have.status(401)
                        expect(res.body).to.be.an('object')
                        expect(res.body).to.have.property('message')
                        done()
                    })
                    .catch(err => {
                        console.log(err);
                    })
                })
            })

        })
    })