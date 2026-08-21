import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = [
  {
    ignores: ["convex/_generated/**", "scripts/**"]
  },
  ...nextVitals,
  ...nextTs
];

export default eslintConfig;
