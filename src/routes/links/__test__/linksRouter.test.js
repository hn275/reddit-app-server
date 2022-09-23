import { supertest } from '../../test-util.js';

describe('/posts endpoint', () => {
  it('should return an error if the endpoint is invalid', (done) => {
    supertest.getRequest('/posts/asdf', 400, done);
  });

  describe('valid endpoints should return 200', () => {
    it('tests /hot endpoint', (done) => {
      supertest.getRequest('/posts/hot', 200, done);
    });

    it('tests /rising endpoint', (done) => {
      supertest.getRequest('/posts/rising', 200, done);
    });

    it('tests /top endpoint', (done) => {
      supertest.getRequest('/posts/top', 200, done);
    });

    it('tests /new endpoint', (done) => {
      supertest.getRequest('/posts/new', 200, done);
    });
  });

  describe('nested `more` endpoint', () => {
    const after = 't3_xi03po';
    const type = 'hot';
    const count = 5;
    const FETCH_URL = '/posts/more';

    it('returns 200', (done) => {
      let endpoint = FETCH_URL;
      endpoint += `?after=${after}`;
      endpoint += `&type=${type}`;
      endpoint += `&count=${count}`;

      supertest.getRequest(endpoint, 200, done);
    });

    it('returns 400 for missing `after`', (done) => {
      let endpoint = FETCH_URL;
      endpoint += `&type=${type}`;
      endpoint += `&count=${count}`;

      supertest.getRequest(endpoint, 400, done);
    });

    it('returns 400 for missing `type`', (done) => {
      let endpoint = FETCH_URL;
      endpoint += `?after=${after}`;
      endpoint += `&count=${count}`;

      supertest.getRequest(endpoint, 400, done);
    });

    it('returns 400 for missing `type`', (done) => {
      let endpoint = FETCH_URL;
      endpoint += `?after=${after}`;
      endpoint += `&count=${count}`;

      supertest.getRequest(endpoint, 400, done);
    });
  });
});
