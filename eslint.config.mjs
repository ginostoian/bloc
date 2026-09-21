import { FlatCompat } from "@eslint/eslintrc";
const compat = new FlatCompat({ baseDirectory: import.meta.dirname });
const config = [
  { ignores: [".next*/**", "node_modules/**", "next-env.d.ts"] },
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  { rules: { "react/jsx-no-comment-textnodes": "off", "@next/next/no-page-custom-font": "off" } }
];
export default config;
