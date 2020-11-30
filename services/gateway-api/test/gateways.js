process.env.NODE_ENV = 'test';

let mongoose = require("mongoose");
let Gateway = require('../models/Gateway');
let Peripheral = require('../models/Peripheral');

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../index');
var expect = chai.expect;

chai.use(chaiHttp);
describe('Gateways', () => {
    beforeEach((done) => {
        Gateway.deleteMany({}, (err) => {
            done();
        });
    });

    describe('/GET gateway', () => {
        it('should return an empty array when no gateways', (done) => {
            chai.request(server)
                .get('/api/gateways')
                .end((err, res) => {
                    expect(err).to.be.null;
                    expect(res.status).to.be.eql(200);
                    expect(res.body).to.be.a('array');
                    expect(res.body.length).to.be.eql(0);
                    done();
                });
        });

        describe('with a single new gateway', () => {
            beforeEach((done) => {
                Gateway.deleteMany({}).then(succ => {
                    Gateway.create({ serialNumber: "GOHO", ipv4: "192.168.1.1", name: "pesho" }).then(succ => {
                        done()
                    });
                });
            })

            it('should return an array with one gateway', (done) => {
                chai.request(server)
                    .get('/api/gateways')
                    .end((err, res) => {
                        expect(err).to.be.null;
                        expect(res.status).to.be.eql(200);
                        expect(res.body).to.be.a('array');
                        expect(res.body.length).to.be.eql(1);
                        done();
                    });
            });

            describe('with no peripherals', () => {
                it('should return one gateway with no peripherals', (done) => {
                    chai.request(server)
                        .get('/api/gateways')
                        .end((err, res) => {
                            expect(err).to.be.null;
                            expect(res.status).to.be.eql(200);
                            expect(res.body).to.be.a('array');
                            expect(res.body.length).to.be.eql(1);
                            expect(res.body[0].peripherals).to.be.a('array');
                            expect(res.body[0].peripherals.length).to.be.eql(0);
                            done();
                        });
                });
            });
        })
    });

    describe('/POST gateway', () => {
        it('should create a new gateway when valid input', (done) => {
            chai.request(server)
                .post('/api/gateways')
                .send({ serialNumber: "GOHO", ipv4: "192.168.1.1", name: "pesho" })
                .end((err, res) => {
                    expect(err).to.be.null;
                    expect(res.status).to.be.eql(201);
                    expect(res.body._id).to.not.be.undefined;
                    done();
                })
        });

        describe('should return an error when empty', () => {
            it('name', (done) => {
                chai.request(server)
                    .post('/api/gateways')
                    .send({ serialNumber: "GOHO", ipv4: "192.168.1.1", name: "" })
                    .end((err, res) => {
                        expect(res.status).to.be.eql(500)
                        expect(res.body.message).to.not.be.undefined;
                        done();
                    })
            });

            it('serial number', (done) => {
                chai.request(server)
                    .post('/api/gateways')
                    .send({ serialNumber: "", ipv4: "192.168.1.1", name: "Home Router" })
                    .end((err, res) => {
                        expect(res.status).to.be.eql(500)
                        expect(res.body.message).to.not.be.undefined;
                        done();
                    })
            });

            it('ivp4', (done) => {
                chai.request(server)
                    .post('/api/gateways')
                    .send({ serialNumber: "G3OH1O5", ipv4: "", name: "Home Router" })
                    .end((err, res) => {
                        expect(res.status).to.be.eql(500)
                        expect(res.body.message).to.not.be.undefined;
                        done();
                    })
            });
        })

        describe('should retun an error when invalid', () => {

            it('ipv4 with wrong number', (done) => {
                chai.request(server)
                    .post('/api/gateways')
                    .send({ serialNumber: "G3OH1O5", ipv4: "192.168.1.256", name: "Home Router" })
                    .end((err, res) => {
                        expect(res.status).to.be.eql(500)
                        expect(res.body.message).to.not.be.undefined;
                        done();
                    })
            });

            it('ipv4 that contains non-number chars', (done) => {
                chai.request(server)
                    .post('/api/gateways')
                    .send({ serialNumber: "G3OH1O5", ipv4: "192.168.1.gosho", name: "Home Router" })
                    .end((err, res) => {
                        expect(res.status).to.be.eql(500)
                        expect(res.body.message).to.not.be.undefined;
                        done();
                    })
            });
        })
    });
});

