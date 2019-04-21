const chai = require('chai')
const chaiHttp = require('chai-http')
const should = chai.should()
const app = require('../app')
const { User, Cart } = require('../models')

chai.use(chaiHttp)

before(function (done) {
    User
        .deleteMany({})
        .then(function () {
            return Cart
                .deleteMany({})
        })
        .then(function () {
            done();
        })
        .catch(function (err) {
            console.log(err);
        })
});

after(function (done) {
    User
        .deleteMany({})
        .then(function () {
            return Cart
                .deleteMany({})
        })
        .then(function () {
            done();
        })
        .catch(function (err) {
            console.log(err);
        })
});

let idAdmin = ''
let tokenAdmin = ''
let idUser = ''
let tokenUser = ''
let idProduct = ''
let idCart = ''


describe('REGISTER USER AND ADMIN FIRST', function () {
    it('Should make sure that customers must be register /register with POST request', function (done) {
        const user = {
            name: 'willy5',
            email: 'willy5@gmail.com',
            password: '1Qazxc'
        }

        chai
            .request(app)
            .post('/register')
            .send(user)
            .end(function (err, res) {
                done()
            })
    })

    it('Should make sure that admin must be register /registerAdmin with POST request', function (done) {
        const user = {
            name: 'willy6',
            email: 'willy6@gmail.com',
            password: '1Qazxc'
        }
        chai
            .request(app)
            .post('/registerAdmin')
            .send(user)
            .end(function (err, res) {
                done()
            })
    })
})

describe('LOGIN FIRST', () => {
    it(`Should make sure that customer login /login with POST request`, function (done) {
        const user = {
            email: 'willy5@gmail.com',
            password: '1Qazxc'
        }
        chai
            .request(app)
            .post('/login')
            .send(user)
            .end(function (err, res) {
                idUser = res.body.id
                tokenUser = res.body.token
                done()
            })
    })
    it(`Should make sure that admin login /login with POST request`, function (done) {
        const user = {
            email: 'willy6@gmail.com',
            password: '1Qazxc'
        }
        chai
            .request(app)
            .post('/login')
            .send(user)
            .end(function (err, res) {
                idAdmin = res.body.id
                tokenAdmin = res.body.token
                done()
            })
    })
})


describe('REGISTER PRODUCT FIRST', function () {
    it('Should make sure that product must be register by admin /products with POST request', function (done) {
        const product = {
            name: 'Sepatu',
            amount: 8,
            price: 1000000,
            image: '',
        }

        chai
            .request(app)
            .post('/products')
            .set({ token: tokenAdmin })
            .send(product)
            .end(function (err, res) {
                idProduct = res.body._id
                done()
            })
    })
})

describe('CREATE CART', function () {
    it('Should make sure that user have one cart /carts/:id with POST request', function (done) {
        const product = {
            userId: idUser
        }

        chai
            .request(app)
            .post(`/carts/${idUser}`)
            .send(product)
            .end(function (err, res) {
                should.not.exist(err)
                res.should.have.status(201)
                res.body.should.be.an('object')
                res.body.should.have.property('_id')
                res.body.should.have.property('product')
                res.body.should.have.property('userId')
                res.body.should.have.property('createdAt')
                res.body.should.have.property('updatedAt')
                res.body._id.should.to.be.a('string')
                res.body.product.should.to.be.an('array')
                res.body.userId.should.to.be.a('string')
                res.body.createdAt.should.to.be.a('string')
                res.body.updatedAt.should.to.be.a('string')
                idCart = res.body._id
                done()
            })
    })
})

describe('ADD PRODUCT TO CART', function () {
    it('Should make sure that user can add product to cart /carts/add/:id with POST request', function (done) {
        chai
            .request(app)
            .patch(`/carts/add/${idUser}`)
            .set({ token: tokenUser })
            .send({
                product: {
                    productId: idProduct,
                    amount: 1
                }
            })
            .end(function (err, res) {
                should.not.exist(err)
                res.should.have.status(201)
                res.body.should.be.an('object')
                res.body.should.have.property('_id')
                res.body.should.have.property('product')
                res.body.should.have.property('userId')
                res.body.should.have.property('createdAt')
                res.body.should.have.property('updatedAt')
                res.body._id.should.to.be.a('string')
                res.body.product.should.to.be.an('array')
                res.body.userId.should.to.be.a('string')
                res.body.createdAt.should.to.be.a('string')
                res.body.updatedAt.should.to.be.a('string')
                idCart = res.body._id
                done()
            })
    })
})

describe('GET ALL CART TEST', () => {
    describe('success', () => {
        it(`Should make sure that admin can get all cart /carts with GET request`, function (done) {
            chai
                .request(app)
                .get(`/carts`)
                .set({ token: tokenAdmin })
                .end(function (err, res) {
                    should.not.exist(err)
                    res.should.have.status(200)
                    res.body.should.be.an('array')
                    res.body[0].should.have.property('_id')
                    res.body[0].should.have.property('product')
                    res.body[0].should.have.property('userId')
                    res.body[0].product[0].should.have.property('productId')
                    res.body[0].product[0].should.have.property('amount')
                    res.body[0].should.have.property('createdAt')
                    res.body[0].should.have.property('updatedAt')
                    res.body[0]._id.should.to.be.a('string')
                    res.body[0].product.should.to.be.an('array')
                    res.body[0].userId.should.to.be.a('object')
                    res.body[0].product[0].productId.should.to.be.an('object')
                    res.body[0].product[0].amount.should.to.be.a('number')
                    res.body[0].createdAt.should.to.be.a('string')
                    res.body[0].updatedAt.should.to.be.a('string')
                    done()
                })
        })
    })

    describe('failed', () => {
        it(`Should make sure that role === 'user' cannot get all cart /carts with GET request`, function (done) {
            chai
                .request(app)
                .get(`/carts`)
                .set({ token: tokenUser })
                .end(function (err, res) {
                    res.body.should.to.be.an('object')
                    res.body.should.be.have.property('message')
                    res.body.message.should.equal('Unauthorized')
                    res.should.have.status(401)
                    done()
                })
        })
    })
})

describe('GET CART BY USER TEST', () => {
    describe('success', () => {
        it(`Should make sure that user can get cart /carts/:id with GET request`, function (done) {
            chai
                .request(app)
                .get(`/carts/${idUser}`)
                .set({ token: tokenUser })
                .end(function (err, res) {
                    should.not.exist(err)
                    res.should.have.status(200)
                    res.body.should.be.an('object')
                    res.body.should.have.property('_id')
                    res.body.should.have.property('product')
                    res.body.should.have.property('userId')
                    res.body.product[0].should.have.property('productId')
                    res.body.product[0].should.have.property('amount')
                    res.body.should.have.property('createdAt')
                    res.body.should.have.property('updatedAt')
                    res.body._id.should.to.be.a('string')
                    res.body.product.should.to.be.an('array')
                    res.body.userId.should.to.be.a('object')
                    res.body.product[0].productId.should.to.be.an('object')
                    res.body.product[0].amount.should.to.be.a('number')
                    res.body.createdAt.should.to.be.a('string')
                    res.body.updatedAt.should.to.be.a('string')
                    done()
                })
        })
    })
})

describe('REMOVE PRODUCT FROM CART TEST', () => {
    describe('success', () => {
        it(`Should make sure that user can remove product from cart /carts/delete/:id with PUT request`, function (done) {
            chai
                .request(app)
                .patch(`/carts/delete/${idUser}`)
                .set({ token: tokenUser })
                .send({
                    productId: idProduct
                })
                .end(function (err, res) {
                    should.not.exist(err)
                    res.should.have.status(200)
                    res.body.should.be.an('object')
                    res.body.should.have.property('_id')
                    res.body.should.have.property('product')
                    res.body.should.have.property('userId')
                    res.body.product[0].should.have.property('productId')
                    res.body.product[0].should.have.property('amount')
                    res.body.should.have.property('createdAt')
                    res.body.should.have.property('updatedAt')
                    res.body._id.should.to.be.a('string')
                    res.body.product.should.to.be.an('array')
                    res.body.userId.should.to.be.a('string')
                    res.body.product[0].productId.should.to.be.a('string')
                    res.body.product[0].amount.should.to.be.a('number')
                    res.body.createdAt.should.to.be.a('string')
                    res.body.updatedAt.should.to.be.a('string')
                    done()
                })
        })
    })
})