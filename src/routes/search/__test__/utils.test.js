const whiteSpaceParse = require('../utils/whiteSpaceParse');
const assert = require('assert');

describe('Search routes util functons tests', () => {
  describe('whiteSpaceParse tests', () => {
    it('should replace white space with `%20`', () => {
      const searchString = 'hello world';
      const parsedString = whiteSpaceParse(searchString);
      const expectedString = 'hello%20world';

      assert.strictEqual(parsedString, expectedString);
    });
  });
});
