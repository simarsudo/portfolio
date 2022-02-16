var path = require("path");
const TerserPlugin = require("terser-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
    optimization: {
        minimize: true,
        minimizer: [
            new TerserPlugin({
                parallel: true,
            }),
        ],
    },
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
            "./static-production/js/components/blog.js",
            "./static-production/scss/blog.scss",
        ],
        superelder: [
            "./static-production/js/components/superelder.js",
            "./static-production/scss/superelder.scss",
        ],
        detailed_post: [
            "./static-production/scss/detailed_post.scss"
        ],
        tiny_mce: ["./static-production/js/components/tiny_mce.js"],
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
        new CopyPlugin({
            patterns: [
                {
                    from: "./static-production/tinymce",
                    to: path.resolve(__dirname, "static/tinymce"),
                },
                {
                    from: "./static-production/prism",
                    to: path.resolve(__dirname, "static"),
                },
            ],
        }),
    ],
};
