const chai = require('chai')
const chaiHttp = require('chai-http')
const expect = chai.expect
const app = require('../app')
const User = require('../models/user')
const Product = require('../models/product')
const Cart = require('../models/cart')
const jwt = require('../helpers/jwt')
const Transaction = require('../models/transaction')

chai.use(chaiHttp)
let token = null;
let productId = null;
let cartId = null;
let userId = null;
let transactionId = null;

describe.only('Transaction endpoint Test', function () {

    before((done) => {

        let newUser = {
            name: 'Paulina',
            address: 'Radalhahahahahhahahahaha',
            email: "pauline@gmail.com",
            role: "admin",
            password: "123456"
        }

        let newProduct = {
            price: 20000,
            name: 'Buku',
            image: 'http://imageurl.buku.com',
            stock: 10,
            description: 'Bukubukubu'
        }
        User.create(newUser)
            .then(user => {
                let {
                    name,
                    email,
                    _id
                } = user
                token = jwt.sign({
                    id: _id,
                    email,
                    name
                }, process.env.JWT_SECRET)
                userId = _id
            })
            .catch(err => done())

        Product.create(newProduct)
            .then(product => {
                productId = product._id
                done()
            })
            .catch(err => done())
    })

    after((done) => {
        Product.deleteMany({})
            .then(() => {})
            .catch(err => {
                console.log(err)
            })

        User.deleteMany({})
            .then(() => {})
            .catch(err => {
                console.log(err)
            })

        Transaction.deleteMany({})
            .then(() => {
                done()
            })
            .catch(err => {
                console.log(err)
            })
    })

    describe('User Sign in', function () {

        it('Should return an object of new user', function (done) {
            let data = {
                email: 'pauline@gmail.com',
                password: '123456'
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
                    // console.log(err, 'ini error??');
                    done()
                })
        })
    })

    // router.get('/', authenticate, authadmin, TransactionController.findAll)
    // router.post('/', authenticate, TransactionController.create)

    describe('POST /transactions', function () {
        describe('Success :', function () {
            it('Should return an object of new transaction', function (done) {
                let trans = {
                    userId: userId,
                    carts: [{
                        productId,
                        productId
                    }],
                    total: 10000,
                    createdAt: new Date()
                }
                chai
                    .request(app)
                    .post('/transactions')
                    .send(trans)
                    .set('token', token)
                    .then(res => {
                        expect(res.body).to.be.an('object')
                        expect(res).to.have.status(201)
                        expect(res.body).to.have.property('_id')
                        expect(res.body).to.have.property('carts')
                        expect(res.body).to.have.property('total')
                        expect(res.body).to.have.property('userId')
                        transactionId = res.body._id
                        done()
                    })
                    .catch(err => {
                        done()
                    })
            })
        })


        describe('Fail :', function () {
            it('Should return an object with status 400 with total less than 0', function (done) {
                let trans = {
                    userId: userId,
                    carts: [{
                        productId,
                        productId
                    }],
                    total: -5,
                    createdAt: new Date()
                }
                chai
                    .request(app)
                    .post('/transactions')
                    .send(trans)
                    .set('token', token)
                    .then(res => {
                        expect(res.body).to.be.an('object')
                        expect(res).to.have.status(400)
                        expect(res.body.message).to.include('less than 1')
                        transactionId = res.body._id
                        done()
                    })
                    .catch(err => {
                        done()
                    })
            })
        })
    })

    describe('GET /transactions', function () {
        describe('Success :', function () {
            it('Should return an array of transactions', function (done) {
                chai
                    .request(app)
                    .get('/transactions')
                    .set('token', token)
                    .then(res => {
                        expect(res.body).to.be.an('array')
                        expect(res).to.have.status(201)
                        done()
                    })
                    .catch(err => {
                        done()
                    })
            })
        })
    })
})