module.exports = {
    root: true,
    parserOptions: {
        parser: "babel-eslint",
    },
    env: {
        browser: true,
    },
    extends: ["plugin:vue/essential", "standard"],
    plugins: ["vue"],
    rules: {
        indent: ["off", 2],
        quotes: [0, "single"],
        "no-mixed-spaces-and-tabs": [2, false], // Do not mix tabs and spaces
        "generator-star-spacing": "off",
        "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off",
        "no-console": process.env.NODE_ENV === "production" ? "error" : "off",
        "space-before-function-paren": "off",
        "no-var": "off", // Use let and const instead of var
        "no-new-func": "error", // The use of new Function is not allowed
        camelcase: [0, { properties: "never" }],
        "comma-dangle": ["error", "only-multiline"],
        semi: [2, "always"], // Statements must end with a semicolon
        "prettier/prettier": [
            "off",
            {
                singleQuote: false,
                semi: false,
                trailingComma: "none",
                bracketSpacing: true,
                jsxBracketSameLine: true,
            },
        ],
    },
};
