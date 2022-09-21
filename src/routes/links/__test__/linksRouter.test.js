const assert = require('assert');
const server = require('../../../server');
const chai = require('chai');
const chaiHttp = require('chai-http');

chai.use(chaiHttp);

const validEndpoint = ['hot', 'rising', 'top', 'new'];

const expect = chai.expect;
describe('/posts endpoint', () => {
  it('should return an error if the endpoint is invalid', (done) => {
    chai
      .request(server)
      .get('/posts/asdf')
      .end((error, response) => {
        expect(response).to.have.status(400);
        done();
      });
  });

  describe('it should return status 200 and some data', () => {
    it('tests /hot endpoint', (done) => {
      chai
        .request(server)
        .get('/posts/hot')
        .end((error, response) => {
          expect(response).to.have.status(200);
          expect(response).to.have.json;
          done();
        });
    });

    it('tests /rising endpoint', (done) => {
      chai
        .request(server)
        .get('/posts/rising')
        .end((error, response) => {
          expect(response).to.have.status(200);
          expect(response).to.have.json;
          done();
        });
    });

    it('tests /top endpoint', (done) => {
      chai
        .request(server)
        .get('/posts/top')
        .end((error, response) => {
          expect(response).to.have.status(200);
          expect(response).to.have.json;
          done();
        });
    });

    it('tests /new endpoint', (done) => {
      chai
        .request(server)
        .get('/posts/new')
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res).to.have.json;
          done();
        });
    });
  });

  describe('nested `more` endpoint', () => {
    it('returns success', (done) => {
      const after = 't3_xi03po';
      const type = 'hot';
      const count = 5;
      chai
        .request(server)
        .get('/posts/more')
        .send({
          after: after,
          type: type,
          count: count,
        })
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res).to.have.json;
          done();
        });
    });

    it('returns fails for missing body params', (done) => {
      chai
        .request(server)
        .get('/posts/more')
        .end((err, res) => {
          expect(res).to.have.status(400);
          done();
        });
    });
  });
});
