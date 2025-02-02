module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  clearMocks: true,
  verbose: true,
  testMatch: ["**/?(*.)+(spec|test).[t]s?(x)"],
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
};
