const autoprefixer = require("autoprefixer");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizrCSsAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = (env, argv) => {
  function isDevlopment() {
    return argv.mode === "development";
  }
  var config = {
    entry: { editor: "./src/editor.js", script: "./src/script.js" },
    // entry: "./src/editor.js",
    output: {
      filename: "[name].js",
    },
    optimization: {
      minimizer: [
        new TerserPlugin({ sourceMap: true }),
        new OptimizrCSsAssetsPlugin({
          cssProcessorOptions: {
            map: {
              inline: false,
              annotation: true,
            },
          },
        }),
      ],
    },
    plugins: [
      new CleanWebpackPlugin(),
      new MiniCssExtractPlugin({
        filename: "[name].css",
      }),
    ],
    devtool: isDevlopment() ? "cheap-module-source-map›" : "source-map",
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
            options: {
              plugins: ["@babel/plugin-proposal-class-properties"],
              presets: [
                "@babel/preset-env",
                [
                  "@babel/preset-react",
                  {
                    pragma: "wp.element.createElement",
                    pragmaFrag: "wp.element.Fragment",
                    devlopment: isDevlopment(),
                  },
                ],
              ],
            },
          },
        },
        {
          test: /\.(sa|sc|c)ss$/,
          use: [
            MiniCssExtractPlugin.loader,
            "css-loader",
            "postcss-loader",
            "sass-loader",
          ],
        },
      ],
    },
    externals: {
      "@wordpress/blocks": ["wp", "blocks"],
      "@wordpress/block-editor": ["wp", "blockEditor"],
      "@wordpress/element": ["wp", "element"],
      "@wordpress/components": ["wp", "components"],
      "@wordpress/data": ["wp", "data"],
      "@wordpress/html-entities": ["wp", "htmlEntities"],
      "@wordpress/i18n": ["wp", "i18n"],
    },
  };
  return config;
};
