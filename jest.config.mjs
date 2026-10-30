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

// htmlparser2 (dependencia de sanitize-html) y sus paquetes solo se publican
// como ESM; Jest debe transformarlos. El resto de node_modules no se toca.
const ESM_EN_NODE_MODULES = "htmlparser2|domhandler|domutils|dom-serializer|domelementtype|entities";

const jestConfig = async () => {
  const final = await createJestConfig(config)();
  final.transformIgnorePatterns = [
    `/node_modules/(?!(.*/)?(${ESM_EN_NODE_MODULES})/)`,
    "^.+\\.module\\.(css|sass|scss)$",
  ];
  return final;
};

export default jestConfig;
