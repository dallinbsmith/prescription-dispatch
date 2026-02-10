import reactConfig from "./react.js";

export default [
  ...reactConfig,
  {
    rules: {
      "@typescript-eslint/require-await": "off",
    },
  },
];
