// const getWhiteSpace = require('../utils/getWhiteSpace');
// const getSearchType = require('../utils/getSearchType');
// const assert = require('chai').assert;
import { getWhiteSpace, getSearchType } from '../util/index.js';
import { assert } from 'chai';

describe('Search routes util functons tests', () => {
  describe('getWhiteSpace tests', () => {
    it('should replace white space with `%20`', () => {
      const searchString = 'hello world';
      const parsedString = getWhiteSpace(searchString);
      const expectedString = 'hello%20world';

      assert.strictEqual(parsedString, expectedString);
    });
  });

  describe('getSearchType tests', () => {
    it('returns `sr` for subreddit', () => {
      const searchType = getSearchType('subreddit');
      assert.strictEqual(searchType, 'sr');
    });

    it('returns `links` for posts', () => {
      const searchType = getSearchType('posts');
      assert.strictEqual(searchType, 'links');
    });

    it('returns false for neither type', () => {
      const searchType = getSearchType('foobar');
      assert.isFalse(searchType);
    });
  });
});
