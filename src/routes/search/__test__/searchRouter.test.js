const server = require('../../../server');
const chai = require('chai');
const chaiHttp = require('chai-http');
const assert = require('assert');
const expect = chai.expect;

chai.use(chaiHttp);

describe('/search endpoint', () => {
  it('returns status 400 if missing search query', (done) => {
    chai
      .request(server)
      .get('/search')
      .end((err, res) => {
        expect(res).to.have.status(400);
        done();
      });
  });

  it('made searches successfully', () => {
    chai
      .request(server)
      .get('/search')
      .send({
        search: 'foobar',
      })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res).to.have.json;
        done();
      });
  });
});
