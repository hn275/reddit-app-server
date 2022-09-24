import server from '../../../server.js';
// import supertest from 'supertest';
import { supertest } from '../../test-util.js';

describe('/comments endpoint', () => {
  it('returns an error if endpoint is invalid', (done) => {
    supertest.getRequest('/comments', 400, done);
  });

  it('returns 200 with the valid post comment', (done) => {
    const COMMENT_ID = 'xlhu7p';
    supertest.getRequest(`/comments/${COMMENT_ID}`, 200, done);
  });
});
