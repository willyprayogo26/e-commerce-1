const chai = require('chai')
const chaiHttp = require('chai-http')
const should = chai.should()
const app = require('../app')
const { User, Product } = require('../models')

chai.use(chaiHttp)

before(function (done) {
    User
        .deleteMany({})
        .then(function () {
            return Product
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
            return Product
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


describe('REGISTER PRODUCT TEST', function () {
    describe('success', () => {
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
                    should.not.exist(err)
                    res.should.have.status(201)
                    res.body.should.be.an('object')
                    res.body.should.have.property('_id')
                    res.body.should.have.property('name')
                    res.body.should.have.property('amount')
                    res.body.should.have.property('price')
                    res.body.should.have.property('pictureUrl')
                    res.body.should.have.property('views')
                    res.body.should.have.property('rating')
                    res.body.should.have.property('createdAt')
                    res.body.should.have.property('updatedAt')
                    res.body._id.should.to.be.a('string')
                    res.body.name.should.to.be.a('string')
                    res.body.amount.should.to.be.a('number')
                    res.body.price.should.to.be.a('number')
                    res.body.pictureUrl.should.to.be.a('string')
                    res.body.views.should.to.be.a('number')
                    res.body.rating.should.to.be.an('array')
                    res.body.createdAt.should.to.be.a('string')
                    res.body.updatedAt.should.to.be.a('string')
                    res.body.name.should.not.equal(null)
                    res.body.amount.should.not.equal(0)
                    res.body.price.should.not.equal(0)
                    res.body.views.should.equal(0)
                    idProduct = res.body._id
                    done()
                })
        })
    })

    describe('failed', () => {
        it(`Should make sure that role === 'user' can't be register a product /products with POST request`, function (done) {
            const product = {
                name: 'Sepatu',
                amount: 8,
                price: 1000000,
                image: '',
            }

            chai
                .request(app)
                .post('/products')
                .set({ token: tokenUser })
                .send(product)
                .end(function (err, res) {
                    res.body.should.to.be.an('object')
                    res.body.should.be.have.property('message')
                    res.body.message.should.equal('Unauthorized')
                    res.should.have.status(401)
                    done()
                })
        })
        it(`Should make sure that admin can't be register product if name of product empty /product with POST request`, function (done) {
            const product = {
                name: '',
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
                    res.body.should.to.be.an('object')
                    res.body.should.be.have.property('message')
                    res.body.message.should.equal('Please input product name')
                    res.should.have.status(400)
                    done()
                })
        })
        it(`Should make sure that admin can't be register product if amount of product is less than 0 /products with POST request`, function (done) {
            const product = {
                name: 'Sepatu',
                amount: -1,
                price: 1000000,
                image: '',
            }

            chai
                .request(app)
                .post('/products')
                .set({ token: tokenAdmin })
                .send(product)
                .end(function (err, res) {
                    res.body.should.to.be.an('object')
                    res.body.should.be.have.property('message')
                    res.body.message.should.equal('Amount must be higher than equals 0')
                    res.should.have.status(400)
                    done()
                })
        })
        it(`Should make sure that admin can't be register product if price of product is 0 /products with POST request`, function (done) {
            const product = {
                name: 'Sepatu',
                amount: 8,
                price: 0,
                image: '',
            }

            chai
                .request(app)
                .post('/products')
                .set({ token: tokenAdmin })
                .send(product)
                .end(function (err, res) {
                    res.body.should.to.be.an('object')
                    res.body.should.be.have.property('message')
                    res.body.message.should.equal('Price must be higher than 0')
                    res.should.have.status(400)
                    done()
                })
        })
    })
})

describe('GET ALL PRODUCT TEST', () => {
    describe('success', () => {
        it(`Should make sure that user can get all product /products with GET request`, function (done) {
            chai
                .request(app)
                .get(`/products`)
                .set({ token: tokenUser })
                .end(function (err, res) {
                    should.not.exist(err)
                    res.should.have.status(200)
                    res.body.should.to.be.an('array')
                    res.body[0].should.have.property('_id')
                    res.body[0].should.have.property('name')
                    res.body[0].should.have.property('amount')
                    res.body[0].should.have.property('price')
                    res.body[0].should.have.property('pictureUrl')
                    res.body[0].should.have.property('views')
                    res.body[0].should.have.property('rating')
                    res.body[0]._id.should.to.be.a('string')
                    res.body[0].name.should.to.be.a('string')
                    res.body[0].amount.should.to.be.a('number')
                    res.body[0].price.should.to.be.a('number')
                    res.body[0].pictureUrl.should.to.be.a('string')
                    res.body[0].views.should.to.be.a('number')
                    res.body[0].rating.should.be.an('array')
                    done()
                })
        })
    })
})

describe('GET PRODUCT BY ID TEST', () => {
    describe('success', () => {
        it(`Should make sure that user can get product by productId /products/:id/:productId with GET request`, function (done) {
            chai
                .request(app)
                .get(`/products/${idUser}/${idProduct}`)
                .set({ token: tokenUser })
                .end(function (err, res) {
                    should.not.exist(err)
                    res.should.have.status(200)
                    res.body.should.be.an('object')
                    res.body.should.have.property('_id')
                    res.body.should.have.property('name')
                    res.body.should.have.property('amount')
                    res.body.should.have.property('price')
                    res.body.should.have.property('pictureUrl')
                    res.body.should.have.property('views')
                    res.body.should.have.property('rating')
                    res.body.should.have.property('createdAt')
                    res.body.should.have.property('updatedAt')
                    res.body._id.should.to.be.a('string')
                    res.body.name.should.to.be.a('string')
                    res.body.amount.should.to.be.a('number')
                    res.body.price.should.to.be.a('number')
                    res.body.pictureUrl.should.to.be.a('string')
                    res.body.views.should.to.be.a('number')
                    res.body.rating.should.to.be.an('array')
                    res.body.createdAt.should.to.be.a('string')
                    res.body.updatedAt.should.to.be.a('string')
                    done()
                })
        })
    })
})

describe('PUT PRODUCT BY ID TEST', () => {
    describe('success', () => {
        it(`Should make sure that admin can update info /products/:productId with PUT request`, function (done) {
            const product = {
                name: 'Sepatu',
                amount: 8,
                price: 1000000,
                image: '',
            }

            chai
                .request(app)
                .put(`/products/${idProduct}`)
                .set({ token: tokenAdmin })
                .send(product)
                .end(function (err, res) {
                    should.not.exist(err)
                    res.should.have.status(200)
                    res.body.should.be.an('object')
                    res.body.should.have.property('_id')
                    res.body.should.have.property('name')
                    res.body.should.have.property('amount')
                    res.body.should.have.property('price')
                    res.body.should.have.property('pictureUrl')
                    res.body.should.have.property('views')
                    res.body.should.have.property('rating')
                    res.body.should.have.property('createdAt')
                    res.body.should.have.property('updatedAt')
                    res.body._id.should.to.be.a('string')
                    res.body.name.should.to.be.a('string')
                    res.body.amount.should.to.be.a('number')
                    res.body.price.should.to.be.a('number')
                    res.body.pictureUrl.should.to.be.a('string')
                    res.body.views.should.to.be.a('number')
                    res.body.rating.should.to.be.an('array')
                    res.body.createdAt.should.to.be.a('string')
                    res.body.updatedAt.should.to.be.a('string')
                    done()
                })
        })
    })

    describe('failed', () => {
        it(`Should make sure that user cannot update info /products/:productId with PUT request`, function (done) {
            const product = {
                name: 'Sepatu',
                amount: 8,
                price: 1000000,
                image: '',
            }

            chai
                .request(app)
                .put(`/products/${idProduct}`)
                .set({ token: tokenUser })
                .send(product)
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

describe('DELETE PRODUCT TEST', () => {
    describe('success', () => {
        it(`Should make sure that just role === 'admin' can delete product /products/:productId with DELETE request`, function (done) {
            chai
                .request(app)
                .delete(`/products/${idProduct}`)
                .set({ token: tokenAdmin })
                .end(function (err, res) {
                    should.not.exist(err)
                    res.should.have.status(200)
                    res.body.should.be.an('object')
                    res.body.should.have.property('message')
                    res.body.message.should.to.be.a('string')
                    res.body.message.should.not.equal(null)
                    res.body.message.should.equal('Product successfully deleted')
                    done()
                })
        })
    })

    describe('failed', () => {
        it(`Should make sure that just role === 'user' cannot delete product /products/:productId with DELETE request`, function (done) {
            chai
                .request(app)
                .delete(`/products/${idProduct}`)
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