const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");
const fs = require("fs");
const TerserPlugin = require("terser-webpack-plugin");
const createStyledComponentsTransformer =
  require("typescript-plugin-styled-components").default;
const styledComponentsTransformer = createStyledComponentsTransformer();


module.exports = {
  target: ["browserslist"],
  entry: path.resolve(__dirname, "./src/index.js"),
  experiments: {
    asyncWebAssembly: true,
    syncWebAssembly: true,
  },
  module: {
    strictExportPresence: false,

    rules: [
      {
        test: /\.txt$/i,
        use: "raw-loader",
      },
      {
        test: /\.ts|tsx?$/,
        loader: "ts-loader",
        exclude: /node_modules/,
        options: {
          getCustomTransformers: () => ({
            before: [styledComponentsTransformer],
          }),
        },
      },
      {
        test: /\.(sass|css|scss)$/,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
      {
        test: /\.(woff|woff2|ttf)$/,
        use: {
          loader: "url-loader",
        },
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ["babel-loader"],
      },
      {
        test: /\.(png|svg|jpg|jpeg|eot|gif|wasm)$/i,
        type: "asset/resource",
      },
    ],
  },

  resolve: {
    extensions: ["*", ".js", ".jsx", ".tsx", ".ts", ".d.ts"],
    alias: {
      Root: path.resolve(__dirname, "/src"),
    },
  },
  output: {
    path: path.resolve(__dirname, "./dist"),
    filename: "[contenthash].bundle.js",
  },

  optimization: {
    runtimeChunk: "single",
    minimize: true,
    minimizer: [
      new TerserPlugin({
        parallel: 10,
      }),
    ],
    splitChunks: {
      chunks: "all",
      maxInitialRequests: Infinity,
      minSize: 0,
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name(module) {
            // get the name. E.g. node_modules/packageName/not/this/part.js
            // or node_modules/packageName
            const packageName = module.context.match(
              /[\\/]node_modules[\\/](.*?)([\\/]|$)/
            )[1];
          },
        },
      },
    },
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      publicPath: "/",
    }),
  ],

  devServer: {
    client: {
      overlay: {
        errors: true,
        warnings: false,
      },
      progress: true,
    },
    hot: false,
    static: {
      serveIndex: true,
      directory: path.resolve(__dirname, "./dist"),
      publicPath: "/",
      watch: true,
    },

    port: 8080,
    historyApiFallback: true,
    allowedHosts: "all",
    proxy: {
      // Updated as needed for development purposes
      //   "/api/": {
      //     target: "http://localhost:1323",
      //     changeOrigin: false,
      //     clientLogLevel: "debug",
      //     secure: false,
      //   }, //,
    },
  },
};
