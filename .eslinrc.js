module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ["plugin:react/recommended", "standard", "prettier"],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: [
    "import",
    "prettier",
    "react",
    "react-hooks",
    "sort-imports-es6-autofix",
  ],
  rules: {
    "import/no-unresolved": "error",
    "no-console": "warn",
    "no-duplicate-imports": "error",
    "no-shadow": "off",
    "no-unused-vars": "off",
    "no-use-before-define": "off",
    "no-useless-call": "error",
    "no-useless-computed-key": "error",
    "no-useless-concat": "error",
    "no-useless-rename": "error",
    "no-var": "error",
    "prettier/prettier": "error",
    "react/prop-types": "off",
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "warn",
    "sort-imports": "off",
    "sort-imports-es6-autofix/sort-imports-es6": [
      "error",
      {
        ignoreCase: false,
        ignoreMemberSort: false,
        memberSyntaxSortOrder: ["none", "all", "multiple", "single"],
      },
    ],
  },
  settings: {
    "import/resolver": {
      node: {
        extensions: [".js", ".jsx"],
      },
    },
    react: {
      version: "detect",
    },
  },
};
