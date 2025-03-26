/** @type {import('ts-jest').JestConfigWithTsJest} **/
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['**/__tests__/**/*.test.ts'], // Match test files
  moduleFileExtensions: ['ts', 'js'],
  transform: {
    '^.+.tsx?$': ['ts-jest', {}],
  },
};
