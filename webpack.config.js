/** path */
const path = require("path");

/** @type {import('webpack').Configuration} */
module.exports = {
    entry: "./src/index.ys",
    mode: "development",
    output: {
        filename: "index.js",
        path: path.resolve(__dirname, "dist"),
        library: {
            type: "umd",
            name: "XsdParser"
        }
    },
    resolve: ["ts", "js"],
    module: [
        {
            rules: {
                test: /\.ts$/,
                loader: ["ts-loader"],
                exclude: ["node_modules"]
            }


        }
    ]
}