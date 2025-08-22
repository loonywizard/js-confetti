import tseslint from "typescript-eslint"
import eslint from "@eslint/js"


export default tseslint.config(
  {
    ignores: ["node_modules", "dist", "site_dist"],
  },
  {
    extends: [
      eslint.configs.recommended,
      ...tseslint.configs.recommended,
    ],
    rules: {
      semi: ["error", "never"],
      "no-trailing-spaces": "error",
    },
  },
)
