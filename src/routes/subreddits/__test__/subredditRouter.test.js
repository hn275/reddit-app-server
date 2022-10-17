import { supertest } from '../../test-util.js';

describe('/sr endpoint', () => {
  it('returns status 400 with the wrong request params', (done) => {
    supertest.getRequest('/sr/asdf', 400, done);
  });

  it('returns status 400 with empty param', (done) => {
    supertest.getRequest('/sr/', 400, done);
  });

  it('returns status 200 with `popular`', (done) => {
    supertest.getRequest('/sr/popular', 200, done);
  });

  it('returns status 200 with `new`', (done) => {
    supertest.getRequest('/sr/new', 200, done);
  });

  it('returns status 200 with `gold`', (done) => {
    supertest.getRequest('/sr/gold', 200, done);
  });

  it('returns status 200 with `default`', (done) => {
    supertest.getRequest('/sr/default', 200, done);
  });
});
