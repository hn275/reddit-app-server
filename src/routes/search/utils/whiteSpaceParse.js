const whiteSpaceParse = (queryString) => {
  return queryString.replace(/\s/g, '%20');
};

module.exports = whiteSpaceParse;
