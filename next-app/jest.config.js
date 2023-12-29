module.exports = {
  roots: ["<rootDir>/__tests__"],
  testMatch: [
    "**/__tests__/**/*.+(ts|tsx|js)",
    // "**/?(*.)+(spec|test).+(ts|tsx|js)",
  ],
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest",
  },
  moduleNameMapper: {
    "^@utils/(.+)$": "<rootDir>/utils/$1",
  },
  // https://jest-archive-august-2023.netlify.app/docs/28.x/configuration/#testpathignorepatterns-arraystring
  testPathIgnorePatterns: ["<rootDir>/cypress/"],
};
