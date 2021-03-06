module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  setupFiles: ["./tests/support/setup.ts"],
  globals: {
    "ts-jest": {
      tsconfig: "tsconfig.es.json",
    },
  },
  collectCoverageFrom: ["src/**/*.ts"],
  testPathIgnorePatterns: ["/node_modules/"],
}
