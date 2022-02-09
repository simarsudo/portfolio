var path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
    entry: {
        index: [
            "./static-production/js/components/index.js",
            "./static-production/scss/index.scss",
        ],
        about: ["./static-production/scss/about.scss"],
        skills: [
            "./static-production/js/components/skills.js",
            "./static-production/scss/skills.scss",
        ],
        contact: [
            "./static-production/js/components/contact.js",
            "./static-production/scss/contact.scss",
        ],
        blog: [
            "./static-production/scss/blog.scss",
        ],
        superelder: [
            "./static-production/scss/superelder.scss",
        ],
    },
    output: {
        filename: "[name].js",
        path: path.resolve(__dirname, "static"),
    },
    module: {
        rules: [
            {
                test: /\.s[ac]ss$/i,
                use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
            },
        ],
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: "[name].css",
        }),
    ],
};
