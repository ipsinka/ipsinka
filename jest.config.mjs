import nextJest from "next/jest.js";

// Las fechas del sitio se calculan en hora de Colombia.
process.env.TZ = "America/Bogota";

const createJestConfig = nextJest({ dir: "./" });

/** @type {import('jest').Config} */
const config = {
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
  },
  testMatch: ["<rootDir>/src/**/__tests__/**/*.test.{js,jsx,ts,tsx}"],
  collectCoverageFrom: [
    "src/**/*.{js,jsx,ts,tsx}",
    "!src/**/__tests__/**",
    "!src/**/*.d.ts",
  ],
};

export default createJestConfig(config);
