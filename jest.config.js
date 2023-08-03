const nextJest = require("next/jest");

const createJestConfig = nextJest({
  // Your NextJS config
  dir: "./",
});

const customJestConfig = {
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
  moduleNameMapper: {
    "^config/(.*)$": "<rootDir>/config/$1",
    "^hooks/(.*)$": "<rootDir>/hooks/$1",
    "^services/(.*)$": "<rootDir>/services/$1",
    "^components/(.*)$": "<rootDir>/components/$1",
    "^pages/(.*)$": "<rootDir>/pages/$1",
    "^utils/(.*)$": "<rootDir>/utils/$1",
    "^requests/(.*)$": "<rootDir>/requests/$1",
  },

  testEnvironment: "jsdom",
};

module.exports = createJestConfig(customJestConfig);
