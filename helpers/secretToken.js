const randomString = require('randomstring');

module.exports = () => {
  const config = {
    length: 7,
    charset: 'alphabetic',
  };
  return randomString.generate(config);
};
