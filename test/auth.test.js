const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');
const should = chai.should();

chai.use(chaiHttp);

describe('Auth', () => {
  describe('/POST register', () => {
    it('it should register a user', (done) => {
      let user = {
        email: 'testuser@example.com',
        password: '123456',
        role: 'student',
        nationalId: '123456789',
        studentId: 'S123456'
      };
      chai.request(server)
        .post('/api/auth/register')
        .send(user)
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.be.a('object');
          res.body.should.have.property('message').eql('User registered successfully');
          res.body.data.should.have.property('token');
          done();
        });
    });
  });

  describe('/POST login', () => {
    it('it should login a user', (done) => {
      let user = {
        email: 'testuser@example.com',
        password: '123456'
      };
      chai.request(server)
        .post('/api/auth/login')
        .send(user)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('message').eql('User logged in successfully');
          res.body.data.should.have.property('token');
          done();
        });
    });
  });
});
