const chai = require('chai')
const chaiHttp = require('chai-http')
const should = chai.should()
const app = require('../app')
const { User } = require('../models')

chai.use(chaiHttp)

before(function (done) {
    User
        .deleteMany({})
        .then(function () {
            done();
        })
        .catch(function (err) {
            console.log(err);
        });
});

after(function (done) {
    User
        .deleteMany({})
        .then(function () {
            done();
        })
        .catch(function (err) {
            console.log(err);
        });
});

let idUser = ''
let idAdmin = ''
let tokenUser = ''
let tokenAdmin = ''

describe('REGISTER USER TEST', function () {
    describe('success', () => {
        it('Should make sure that customers must be register /register with POST request', function (done) {
            const user = {
                name: 'willy',
                email: 'willy@gmail.com',
                password: '1Qazxc'
            }

            chai
                .request(app)
                .post('/register')
                .send(user)
                .end(function (err, res) {
                    should.not.exist(err)
                    res.should.have.status(201)
                    res.body.should.be.an('object')
                    res.body.should.have.property('_id')
                    res.body.should.have.property('name')
                    res.body.should.have.property('email')
                    res.body.should.have.property('password')
                    res.body.should.have.property('role')
                    res.body.should.have.property('createdAt')
                    res.body.should.have.property('updatedAt')
                    res.body._id.should.to.be.a('string')
                    res.body.name.should.to.be.a('string')
                    res.body.email.should.to.be.a('string')
                    res.body.role.should.to.be.a('string')
                    res.body.createdAt.should.to.be.a('string')
                    res.body.updatedAt.should.to.be.a('string')
                    res.body.name.should.not.equal(null)
                    res.body.email.should.not.equal(null)
                    res.body.password.should.not.equal(null)
                    res.body.role.should.not.equal(null)
                    res.body.role.should.equal('user')
                    res.body.password.should.have.lengthOf.above(5)
                    done()
                })
        })

        it('Should make sure that admin must be register /registerAdmin with POST request', function (done) {
            const user = {
                name: 'willy1',
                email: 'willy1@gmail.com',
                password: '1Qazxc'
            }
            chai
                .request(app)
                .post('/registerAdmin')
                .send(user)
                .end(function (err, res) {
                    should.not.exist(err)
                    res.should.have.status(201)
                    res.body.should.be.an('object')
                    res.body.should.have.property('_id')
                    res.body.should.have.property('name')
                    res.body.should.have.property('email')
                    res.body.should.have.property('password')
                    res.body.should.have.property('role')
                    res.body._id.should.to.be.a('string')
                    res.body.name.should.to.be.a('string')
                    res.body.email.should.to.be.a('string')
                    res.body.role.should.to.be.a('string')
                    res.body.name.should.not.equal(null)
                    res.body.email.should.not.equal(null)
                    res.body.password.should.not.equal(null)
                    res.body.role.should.not.equal(null)
                    res.body.role.should.equal('admin')
                    res.body.password.should.have.lengthOf.above(5)
                    done()
                })
        })
    })

    describe('failed', () => {
        it(`Should make sure that somebody can't be register if name empty /register with POST request`, function (done) {
            const user = {
                name: '',
                email: 'willypray@gmail.com',
                password: '1Qazxc'
            }
            chai
                .request(app)
                .post('/register')
                .send(user)
                .end(function (err, res) {
                    res.body.should.to.be.an('object')
                    res.body.should.be.have.property('message')
                    res.body.message.should.equal('Please input your name')
                    res.should.have.status(400)
                    done()
                })
        })
        it(`Should make sure that somebody can't be register if email not using email format /register with POST request`, function (done) {
            const user = {
                name: 'willy',
                email: 'aasada',
                password: '1Qazxc'
            }
            chai
                .request(app)
                .post('/register')
                .send(user)
                .end(function (err, res) {
                    res.body.should.to.be.an('object')
                    res.body.should.be.have.property('message')
                    res.body.message.should.equal('Invalid Email')
                    res.should.have.status(400)
                    done()
                })
        })
        it(`Should make sure that somebody can't be register if email has been taken /register with POST request`, function (done) {
            const user = {
                name: 'willy',
                email: 'willy@gmail.com',
                password: '1Qazxc'
            }
            chai
                .request(app)
                .post('/register')
                .send(user)
                .end(function (err, res) {
                    res.body.should.to.be.an('object')
                    res.body.should.be.have.property('message')
                    res.body.message.should.equal('Email has been used')
                    res.should.have.status(400)
                    done()
                })
        })
        it(`Should make sure that somebody can't be register if password is not good /register with POST request`, function (done) {
            const user = {
                name: 'willy',
                email: 'willy2@gmail.com',
                password: 'abc'
            }
            chai
                .request(app)
                .post('/register')
                .send(user)
                .end(function (err, res) {
                    res.body.should.to.be.an('object')
                    res.body.should.be.have.property('message')
                    res.body.message.should.equal('Password must contain at least one letter, one number, and minimum six characters')
                    res.should.have.status(400)
                    done()
                })
        })
    })
})

describe('LOGIN TEST', () => {
    describe('success', () => {
        it(`Should make sure that customer login /login with POST request`, function (done) {
            const user = {
                email: 'willy@gmail.com',
                password: '1Qazxc'
            }
            chai
                .request(app)
                .post('/login')
                .send(user)
                .end(function (err, res) {
                    should.not.exist(err)
                    res.should.have.status(200)
                    res.body.should.to.be.an('object')
                    res.body.should.have.property('id')
                    res.body.should.have.property('name')
                    res.body.should.have.property('email')
                    res.body.should.have.property('role')
                    res.body.should.have.property('token')
                    res.body.id.should.to.be.a('string')
                    res.body.name.should.to.be.a('string')
                    res.body.email.should.to.be.a('string')
                    res.body.role.should.to.be.a('string')
                    res.body.token.should.to.be.a('string')
                    res.body.role.should.equal('user')
                    idUser = res.body.id
                    tokenUser = res.body.token
                    done()
                })
        })
        it(`Should make sure that admin login /login with POST request`, function (done) {
            const user = {
                email: 'willy1@gmail.com',
                password: '1Qazxc'
            }
            chai
                .request(app)
                .post('/login')
                .send(user)
                .end(function (err, res) {
                    should.not.exist(err)
                    res.should.have.status(200)
                    res.body.should.to.be.an('object')
                    res.body.should.have.property('id')
                    res.body.should.have.property('name')
                    res.body.should.have.property('email')
                    res.body.should.have.property('role')
                    res.body.should.have.property('token')
                    res.body.id.should.to.be.a('string')
                    res.body.name.should.to.be.a('string')
                    res.body.email.should.to.be.a('string')
                    res.body.role.should.to.be.a('string')
                    res.body.token.should.to.be.a('string')
                    res.body.role.should.equal('admin')
                    idAdmin = res.body.id
                    tokenAdmin = res.body.token
                    done()
                })
        })
    })

    describe('failed', () => {
        it(`Should make sure that email can't login if have wrong or empty email /login with POST request`, function (done) {
            const user = {
                email: 'willy@ma.com',
                password: '1Qazxc'
            }
            chai
                .request(app)
                .post('/login')
                .send(user)
                .end(function (err, res) {
                    res.body.should.to.be.an('object')
                    res.body.should.be.have.property('message')
                    res.body.message.should.equal('Invalid email/password')
                    res.should.have.status(400)
                    done()
                })
        })
    })
})

describe('GET USER BY ID TEST', () => {
    describe('success', () => {
        it(`Should make sure that user can get user by id /users/:id/:userId with GET request`, function (done) {
            chai
                .request(app)
                .get(`/users/${idAdmin}/${idUser}`)
                .set({ token: tokenAdmin })
                .end(function (err, res) {
                    should.not.exist(err)
                    res.should.have.status(200)
                    res.body.should.to.be.an('object')
                    res.body.should.have.property('_id')
                    res.body.should.have.property('name')
                    res.body.should.have.property('email')
                    res.body.should.have.property('role')
                    res.body._id.should.to.be.a('string')
                    res.body.name.should.to.be.a('string')
                    res.body.email.should.to.be.a('string')
                    res.body.role.should.to.be.a('string')
                    res.body.role.should.equal('user')
                    done()
                })
        })
    })

    describe('failed', () => {
        it(`Should make sure that user must authorized /users/:id/:userId with GET request`, function (done) {
            chai
                .request(app)
                .get('/users/12345')
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

describe('PUT USER BY ID TEST', () => {
    describe('success', () => {
        it(`Should make sure that user can update info /users/:id with PUT request`, function (done) {
            const user = {
                name: 'willy3',
                email: 'willy3@gmail.com',
                password: '1Qazxc'
            }
            chai
                .request(app)
                .put(`/users/${idUser}`)
                .set({ token: tokenUser })
                .send(user)
                .end(function (err, res) {
                    should.not.exist(err)
                    res.should.have.status(200)
                    res.body.should.to.be.an('object')
                    res.body.should.have.property('_id')
                    res.body.should.have.property('name')
                    res.body.should.have.property('email')
                    res.body.should.have.property('password')
                    res.body.should.have.property('role')
                    res.body._id.should.to.be.a('string')
                    res.body.name.should.to.be.a('string')
                    res.body.email.should.to.be.a('string')
                    res.body.password.should.to.be.a('string')
                    res.body.role.should.to.be.a('string')
                    done()
                })
        })
    })

    describe('failed', () => {
        it(`Should make sure that user must authorized /users/:id with PUT request`, function (done) {
            chai
                .request(app)
                .get('/users/12345')
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

describe('GET ALL USER TEST', () => {
    describe('success', () => {
        it(`Should make sure that just role === 'admin' can get all user /users with GET request`, function (done) {
            chai
                .request(app)
                .get(`/users`)
                .set({ token: tokenAdmin })
                .end(function (err, res) {
                    should.not.exist(err)
                    res.should.have.status(200)
                    res.body.should.to.be.an('array')
                    res.body[0].should.have.property('_id')
                    res.body[0].should.have.property('name')
                    res.body[0].should.have.property('email')
                    res.body[0].should.have.property('role')
                    res.body[0]._id.should.to.be.a('string')
                    res.body[0].name.should.to.be.a('string')
                    res.body[0].email.should.to.be.a('string')
                    res.body[0].role.should.to.be.a('string')
                    done()
                })
        })
    })

    describe('failed', () => {
        it(`Should make sure that user must authorized /users/:id/:userId with GET request`, function (done) {
            chai
                .request(app)
                .get('/users/12345')
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

describe('DELETE USER TEST', () => {
    describe('success', () => {
        it(`Should make sure that just role === 'admin' can delete user /users/:id with DELETE request`, function (done) {
            chai
                .request(app)
                .delete(`/users/${idUser}`)
                .set({ token: tokenAdmin })
                .end(function (err, res) {
                    should.not.exist(err)
                    res.should.have.status(200)
                    res.body.should.be.an('object')
                    res.body.should.have.property('message')
                    res.body.message.should.to.be.a('string')
                    res.body.message.should.not.equal(null)
                    res.body.message.should.equal('User successfully deleted')
                    done()
                })
        })
    })

    describe('failed', () => {
        it(`Should make sure that user must authorized /users/:id with DELETE request`, function (done) {
            chai
                .request(app)
                .delete(`/users/${idUser}`)
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