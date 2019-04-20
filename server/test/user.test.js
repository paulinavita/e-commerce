const chai = require('chai')
const chaiHttp = require('chai-http')
const expect = chai.expect
const app = require('../app')
const User = require('../models/user')
const jwt = require('../helpers/jwt')

chai.use(chaiHttp)
let token = ''

after(function (done) {
    User.deleteMany({}, () => {
        done()
    })
});


// SUCCESS
describe('POST /users', function () {
    describe('success create', function () {
        it('app should return status 201 and an object', function (done) {
            let newUser = {
                name: 'Paulina',
                address: 'Radalhahahahahhahahahaha',
                email: "paul@gmail.com",
                role: "customer",
                password: "123456"
            }
            chai
                .request(app)
                .post('/users')
                .send(newUser)
                .end(function (err, res) {
                    expect(err).to.be.null;
                    expect(res).to.have.status(201)
                    expect(res.body).to.be.an('object')
                    expect(res.body).to.have.property('_id')
                    expect(res.body).to.have.property('name')
                    expect(res.body).to.have.property('address')
                    expect(res.body).to.have.property('email')
                    expect(res.body.name).to.equal(newUser.name);
                    expect(res.body.address).to.equal(newUser.address);
                    expect(res.body.email).to.equal(newUser.email);
                    expect(res.body.role).to.equal(newUser.role);
                    done()
                })
        })
    })

    describe('fail create', function () {
        it('app should return 400 and obj empty name', function (done) {
            let newUser = {
                name: '',
                address: 'Radalhahahahahhahahahaha',
                email: "pauli@gmail.com",
                role: "customer",
                password: "123456"

            }
            chai
                .request(app)
                .post('/users')
                .send(newUser)
                .then(res => {
                    expect(res.body.errors.name.message).to.include('filled')
                    expect(res).to.have.status(400)
                    done()
                })
                .catch(err => {
                    console.log(err);
                })
        })


        it('app should return 400 and duplicate email', function (done) {
            let newUser = {
                name: 'pauliiiin',
                address: 'Radalhahahahahhahahahaha',
                email: "paul@gmail.com",
                role: "customer",
                password: "123456"
            }

            chai
                .request(app)
                .post('/users')
                .send(newUser)
                .then(res => {
                    expect(res.body.errors.email.message).to.include('taken')
                    expect(res).to.have.status(400)
                    done()
                })
                .catch(err => {
                    console.log(err);
                })

        })

        it('app should return 400 and address cannot be empty', function (done) {
            let newUser = {
                name: 'pauliiiin',
                address: '',
                email: "padsdaul@gmail.com",
                role: "customer",
                password: "123456"

            }
            chai
                .request(app)
                .post('/users')
                .send(newUser)
                .then(res => {
                    expect(res.body.errors.address.message).to.include('filled')
                    expect(res).to.have.status(400)
                    done()
                })
                .catch(err => {
                    console.log(err);
                })
        })
    })
})

describe('GET /users', function () {
    describe('success create', function () {
        it('get all user return an array with status code 200', function (done) {
            chai
                .request(app)
                .get('/users')
                .then(res => {
                    expect(res.body).to.be.an('array')
                    expect(res).to.have.status(200)
                    done()

                })
                .catch(err => {
                    console.log(err);
                })
        })
    })
})

describe('POST /login', function () {
    describe('success login', function () {
        it('return an obj and status 200', function (done) {
            let data = {
                email: 'paul@gmail.com',
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
                    console.log(err, 'ini error??');
                })
        })
    })

    describe('error login', function () {
        it('return an error obj user not found and status 400', function (done) {
            let data = {
                email: 'hehe',
                password: '123456'
            }
            chai
                .request(app)
                .post('/users/signin/local')
                .send(data)
                .then(res => {
                    expect(res.body).to.be.an('object')
                    expect(res.body.message).to.include('found')
                    expect(res).to.have.status(400)
                    done()
                })
                .catch(err => {
                    console.log(err, 'ini error??');
                })
        })

        it ('return an error obj wrong password/email and status 400', function (done) {
            let data = {
                email: 'paul@gmail.com',
                password: '11111'
            }
            chai
                .request(app)
                .post('/users/signin/local')
                .send(data)
                .then(res => {                    
                    expect(res.body).to.be.an('object')
                    expect(res.body.msg).to.include('invalid')
                    expect(res).to.have.status(400)
                    done()
                })
                .catch(err => {
                    console.log(err, 'ini error??');
                })
        })

    })
})