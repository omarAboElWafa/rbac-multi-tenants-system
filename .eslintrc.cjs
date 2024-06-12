/* eslint-env node */
module.exports = {
  parser: "@typescript-eslint/parser",
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:prettier/recommended",
  ],
  plugins: ["@typescript-eslint", "prettier"],
  rules: {
    "prettier/prettier": "error",
    // Add any additional rules here
  },
  env: {
    node: true,
    es6: true,
  },
  settings: {},
};
