process.env.NODE_ENV = 'test';

let mongoose = require("mongoose");
let Gateway = require('../models/Gateway');

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../index');
var expect = chai.expect;

chai.use(chaiHttp);
describe('Peripherals', () => {
    describe('POST /gateway/peripherals', () => {
        let gatewayID;
        beforeEach((done) => {
            Gateway.deleteMany({}).then(succ => {
                Gateway.create({ serialNumber: "GOHO", ipv4: "192.168.1.1", name: "pesho" }).then(gate => {
                    gatewayID = gate._id;
                    done()
                });
            });
        })

        it('should create a new peripheral when valid input', (done) => {
            chai.request(server)
                .post('/api/gateways/' + gatewayID + '/peripherals')
                .send({ vendor: 'Cisco', status: 'online' })
                .end((err, res) => {
                    expect(res.status).to.be.eql(201)
                    expect(res.body._id).to.not.be.undefined;
                    done();
                })
        });

        describe('should fail when', () => {
            it('no vendor is provided', (done) => {
                chai.request(server)
                    .post('/api/gateways/' + gatewayID + '/peripherals')
                    .send({ vendor: '', status: 'standby' })
                    .end((err, res) => {
                        expect(res.status).to.be.eql(500)
                        expect(res.body.message).to.not.be.undefined;
                        done();
                    })
            });

            it('no status is provided', (done) => {
                chai.request(server)
                    .post('/api/gateways/' + gatewayID + '/peripherals')
                    .send({ vendor: 'Cisco', status: '' })
                    .end((err, res) => {
                        expect(res.status).to.be.eql(500)
                        expect(res.body.message).to.not.be.undefined;
                        done();
                    })
            });

            it('invalid status is provided', (done) => {
                chai.request(server)
                    .post('/api/gateways/' + gatewayID + '/peripherals')
                    .send({ vendor: 'Cisco', status: 'standby' })
                    .end((err, res) => {
                        expect(res.status).to.be.eql(500)
                        expect(res.body.message).to.not.be.undefined;
                        done();
                    })
            });
        })
    })
})