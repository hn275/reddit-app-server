const assert = require('assert');
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');

chai.use(chaiHttp);

describe('/ enpoint', () => {
  it('should return status 200', () => {
    chai
      .request(server)
      .get('/')
      .end((err, res) => {
        assert.strictEqual(res.status, 200);
      });
  });
});
