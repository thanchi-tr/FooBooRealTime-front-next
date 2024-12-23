import nextJest from "next/jest";

// Create Jest configuration
const createJestConfig = nextJest({
  dir: "./", // Path to your Next.js app
});

const customJestConfig = {
  preset: "ts-jest", // For TypeScript support
  testEnvironment: "jsdom", // Mimics browser environment
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/$1", // Support for alias paths like @/components
  },
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"], // Path to setup file (optional)
};

export default createJestConfig(customJestConfig);
