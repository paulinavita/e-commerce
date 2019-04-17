// const chai = require('chai')
// const chaiHttp = require('chai-http')
// const expect = chai.expect
// const app = require('../app')
// const User = require('../models/user')
// const Product = require('../models/product')
// const Cart = require('../models/cart')
// const jwt = require('../helpers/jwt')

// chai.use(chaiHttp)
// let token = null;
// let productId = null;
// let cartId = null;
// let userId = null;

// before((done) =>{

// let newUser = {
//     name: 'Paulina',
//     address: 'Radalhahahahahhahahahaha',
//     email: "pauline@gmail.com",
//     role: "customer",
//     password: "123456"
// }
  
// let newProduct = {
//     price: 20000,
//     name: 'Buku',
//     image: 'http://imageurl.buku.com',
//     stock: 10,
//     description : 'Bukubukubu'
// }
//     User.create(newUser)
//     .then(user => {
//         let { name, email, _id } = user
//          token = jwt.sign(
//              {  
//                  id: _id, 
//                  email, 
//                  name
//             }, process.env.JWT_SECRET)
//         userId = _id
//     })
//     .catch(err => done())

//     Product.create(newProduct)
//     .then(product => {
//         productId= product._id
//         done()
//     })
//     .catch(err => done())
// })

//     after((done) => {
//         Product.deleteMany({})
//         .then(() => { })
//         .catch(err => { console.log(err) })

//         User.deleteMany({})
//         .then(() => {  })
//         .catch(err => { console.log(err) })

//         Cart.deleteMany({})
//         .then(() => { done() })
//         .catch(err => {console.log(err)})
//     })

// describe ('Cart endpoint Test', function () {

//     describe('User Sign in',  function() {
        
//         it ('Should return an object of new user', function (done) {   
//             let data = {
//                 email : 'pauline@gmail.com',
//                 password : '123456'
//             }
//             chai
//             .request(app)
//             .post('/users/signin/local')
//             .send(data)
//             .then(res => {
//                 expect(res.body).to.be.an('object')
//                 expect(res).to.have.status(200)
//                 token = res.body.token   
//                 done()
//             })
//             .catch(err => {
//                 // console.log(err, 'ini error??');
//                 done()
//             })
//         })
//     })
 
//     describe('POST /carts', function () {
//         describe('Success :', function () {

//         it('Should return an object of new cart with status 201', function (done) {
//             chai
//                 .request(app)
//                 .post('/carts')
//                 .send({
//                     userId : userId,
//                     productId : [productId,productId,productId],
//                 })
//                 .set('token', token)
//                 .set('cartId', cartId)
//                 .then((res) => {       
//                     expect(res.body).to.be.an('object')
//                     expect(res).to.have.status(201)
//                     expect(res.body).to.have.property('_id')                    
//                     expect(res.body).to.have.property('productId')                    
//                     cartId = res.body._id                  
//                     console.log('apakah ada cartid', cartId);                    
//                     done()
//                 })
//                 .catch(err => {
//                     console.log(err, 'error post cart');
//                     done()
//                 })
//             })
//         })

//         describe('Fail :', function () {
//             it('Should return status 401 with message unauthorized', function (done) {
//                 chai
//                     .request(app)
//                     .post('/carts')
//                     .send({
//                         userId : userId,
//                         productId : [productId,productId],
//                     })
//                     .then((res) => { 
//                         // let HASILDECODE =  jwt.verify(token, process.env.JWT_SECRET).id           
//                         expect(res.body).to.be.an('object')
//                         expect(res.body.errors).to.have.property('message')   
//                         done()
//                     })
//                     .catch(err => {
//                         done()
//                     })
//                 })
//          })
//     })


//     describe('DELETE /carts', function () {
//         describe('Success :', function () {
//             it('Should return status 200 as deleted', function (done) {
//                 chai
//                 .request(app)
//                 .delete(`/carts/${cartId}`)
//                 .set('token', token)
//                 .set('cartId', cartId)
//                 .then((res) => {                    
//                     expect(res).to.have.status(200)
//                     done()
//                 })
//                 .catch(err => {
//                     console.log(err, );
                    
//                     done()
//                 })
//             })
//         })

//         describe('Fail :', function () {
//             it('Should return status 401 as unauthorized act', function (done) {
//                 chai
//                 .request(app)
//                 .delete(`/carts/${cartId}`)
//                 .set('token', token)
//                 .set('cartId', '5cb5882a265b5156589b97d1')

//                 .then((res) => {
//                     console.log('MASUK 2');
                    
//                     expect(res).to.have.status(401)
//                     done()
//                 })
//                 .catch(err => {
//                     done()
//                 })
//             })
//         })
//     })


//     describe('Fail :', function () {
//         it('Should return status 401 with message unauthorized', function (done) {
//             chai
//             .request(app)
//             .delete(`/carts/${cartId}`)
//             .then((res) => {
//                 expect(res.body).to.be.an('object')
//                 expect(res.body.errors).to.have.property('message')   

//             })
//             .catch(err => {
//                 done()
//             })
//         })
//     })
// })
