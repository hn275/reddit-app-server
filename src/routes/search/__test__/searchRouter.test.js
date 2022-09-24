import { supertest } from '../../test-util.js';

describe('/search endpoint', () => {
  it('returns status 400 if missing search query', (done) => {
    supertest.getRequest('/search', 400, done);
  });

  it('made searches successfully with __subreddit__', (done) => {
    supertest.getRequest('/search?search=foobar&type=subreddit', 200, done);
  });

  it('made searches successfully with __posts__', (done) => {
    supertest.getRequest('/search?search=foobar&type=posts', 200, done);
  });

  it('returns status 400 if search query is not of the right type', (done) => {
    supertest.getRequest('/search?search=foo&type=bar', 400, done);
  });
});
