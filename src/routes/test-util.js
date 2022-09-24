import server from '../server.js';
import _supertest from 'supertest';

export const supertest = {
  getRequest: (url, statusCode, done) => {
    _supertest(server)
      .get(url)
      .expect(statusCode)
      .end((error) => done(error));
  },
};
