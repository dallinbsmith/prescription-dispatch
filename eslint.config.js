import baseConfig from "@rx/eslint-config/base";

export default [
  ...baseConfig,
  {
    ignores: [
      "**/node_modules/**",
      "**/dist/**",
      "**/.turbo/**",
      "**/coverage/**",
      "**/.next/**",
    ],
  },
];
