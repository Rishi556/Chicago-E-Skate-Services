const common = require('./jest.common');
module.exports = {
  ...common,
  testMatch: ['**/tests/ui/**/*.test.ts?(x)'],
};
