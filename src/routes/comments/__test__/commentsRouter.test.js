const assert = require('chai').assert;
const chaiHttp = require('chai-http');
const chai = require('chai');
const server = require('../../../server');

chai.use(chaiHttp);

describe('/comments endpoint', () => {
  it('returns an error if endpoint is invalid', (done) => {
    chai
      .request(server)
      .get('/comments')
      .end((err, res) => {
        assert.strictEqual(res.status, 400);
        done();
      });
  });
});
