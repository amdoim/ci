import globals from "globals";
import pluginJs from "@eslint/js";

export default [
  {
    files: ["app/**/*.js"],
    languageOptions: {
      globals: globals.browser,
    },
    rules: {
      "no-console": "off",
      curly: "off",
      semi: ["error", "always"],
    },
  },
  pluginJs.configs.recommended,
];
