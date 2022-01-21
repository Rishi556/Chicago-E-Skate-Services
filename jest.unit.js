const common = require('./jest.common');
module.exports = {
  ...common,
  testMatch: ['**/__test__/**/*.test.ts?(x)'],
};
