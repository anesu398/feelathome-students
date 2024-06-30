const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');
const should = chai.should();

chai.use(chaiHttp);

describe('Properties', () => {
  let token;

  before((done) => {
    let user = {
      email: 'landlord@example.com',
      password: '123456',
      role: 'landlord'
    };
    chai.request(server)
      .post('/api/auth/register')
      .send(user)
      .end((err, res) => {
        token = res.body.data.token;
        done();
      });
  });

  describe('/POST add property', () => {
    it('it should add a property', (done) => {
      let property = {
        title: 'Test Property',
        description: 'This is a test property',
        price: 1000
      };
      chai.request(server)
        .post('/api/properties/add')
        .set('Authorization', `Bearer ${token}`)
        .send(property)
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.be.a('object');
          res.body.should.have.property('message').eql('Property added successfully');
          res.body.data.should.have.property('title').eql('Test Property');
          done();
        });
    });
  });
});
