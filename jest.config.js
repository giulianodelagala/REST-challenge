/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  collectCoverageFrom: [
    './src/services/**/*.ts',
    '!./src/services/**/reports.services.ts',
    '!./src/services/**/LikeUpdateComments.ts',
  ],
  coverageThreshold: {
    './src/services/**/*.ts': {
      statements: 80,
      branches: 50,
      functions: 80,
      lines: 80,
    },
  },
  setupFiles: ['dotenv/config'],
};
