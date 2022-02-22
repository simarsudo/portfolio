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
        superelder: [
            "./static-production/js/components/superelder.js",
            "./static-production/scss/superelder.scss",
        ],
        detailed_post: ["./static-production/scss/detailed_post.scss"],
        tiny_mce: ["./static-production/js/components/tiny_mce.js"],
        bundle: [
            "./static-production/scss/bundle.scss",
            "./static-production/js/components/bundle.js",
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
                {
                    from: "./static-production/js/components/swup.min.js",
                    to: path.resolve(__dirname, "static"),
                },
            ],
        }),
    ],
};
