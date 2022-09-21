const getWhiteSpace = (queryString) => {
  return queryString.replace(/\s/g, '%20');
};

module.exports = getWhiteSpace;
