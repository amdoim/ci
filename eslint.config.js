import globals from "globals"
import pluginJs from "@eslint/js"


export default [
  {
    languageOptions: { globals: globals.browser }
  },
  pluginJs.configs.recommended,
  {
    files: ["app/**/*.js"],
    rules: {
        "no-trailing-spaces": "error",
        semi: ["error", "never"]
    }
},
]