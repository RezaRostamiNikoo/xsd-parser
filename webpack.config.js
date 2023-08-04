/** path */
const path = require("path");

/** @type {import('webpack').Configuration} */
module.exports = {
    mode: "none",
    entry: "./src/index.ts",
    module: {
        rules: [
            {
                test: /\.ts$/,
                loader: 'ts-loader',
                exclude: /node_modules/,
            }
        ]
    },
    devtool: 'source-map',
    resolve: {
        extensions: [".ts", ".js"],
    },
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "index.js",
        library: {
            name: {
                root: 'XsdParser',
                amd: 'XsdParser',
                commonjs: 'XsdParser',
            },
            type: "umd",
        },
        // prevent error: `Uncaught ReferenceError: self is not define`
        globalObject: "globalThis"
    }
}