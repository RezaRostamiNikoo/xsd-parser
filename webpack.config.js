/** path */
const path = require("path");

/** @type {import('webpack').Configuration} */
module.exports = {
    entry: "./src/index.ts",
    mode: "none",
    devtool: 'inline-source-map',
    output: {
        filename: "index.js",
        path: path.resolve(__dirname, "dist"),
        library: {
            type: "umd",
            name: "XsdParser",
            export: "default",
        }
    },
    resolve: {
        extensions: ["ts", "js"],
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                loader: 'ts-loader',
                exclude: /node_modules/,
            }
        ]
    }
}