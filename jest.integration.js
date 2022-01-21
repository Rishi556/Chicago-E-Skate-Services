const common = require('./jest.common');
module.exports = {
  ...common,
  testMatch: ['**/tests/integration/**/*.test.ts?(x)'],
};
