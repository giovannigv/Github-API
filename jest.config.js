// jest.config.js
// Sync object
/** @type {import('@jest/types').Config.InitialOptions} */
const config = {
    verbose: true,
    transform: {
      "node_modules/variables/.+\\.(j|t)sx?$": "ts-jest"
    },
    preset: 'ts-jest',
  testEnvironment: 'node'
  };
  
  module.exports = config;
  
  // Or async function
  module.exports = async () => {
    return {
      verbose: true,
    };
  };