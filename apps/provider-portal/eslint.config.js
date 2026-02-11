import nextConfig from "@rx/eslint-config/nextjs";

export default [
  ...nextConfig,
  {
    ignores: [".next/**"],
  },
];
