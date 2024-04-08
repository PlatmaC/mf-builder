var HtmlWebpackPlugin = require('html-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const WebpackBar = require('webpackbar');
const webpack = require('webpack');
const path = require('path');
const CompressionPlugin = require('compression-webpack-plugin');
require('dotenv').config({ path: './.env' });
const hash = require('string-hash');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const deps = require('./package.json').dependencies;
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

const environment = process.env.NODE_ENV === 'production' ? 'production' : 'development';

// const API_URL = {
//   production: process.env.TOOLJET_SERVER_URL || (process.env.SERVE_CLIENT !== 'false' ? '__REPLACE_SUB_PATH__' : ''),
//   development: process.env.TOOLJET_SERVER_URL || `http://localhost:${process.env.TOOLJET_SERVER_PORT || 3000}`,
// };

const MF_URL = {
  production: process.env.MF_URL,
  development: 'http://localhost:3001',
};

const ASSET_PATH = process.env.ASSET_PATH || '';

function stripTrailingSlash(str) {
  return str.replace(/[/]+$/, '');
}

module.exports = {
  mode: environment,
  // optimization: {
  //   minimize: environment === "production",
  //   usedExports: true,
  //   runtimeChunk: "single",
  //   minimizer: [
  //     new TerserPlugin({
  //       minify: TerserPlugin.esbuildMinify,
  //       terserOptions: {
  //         ...(environment === "production" && { drop: ["debugger"] })
  //       },
  //       parallel: environment === "production"
  //     })
  //   ],
  //   splitChunks: {
  //     cacheGroups: {
  //       vendors: {
  //         test: /[\\/]node_modules[\\/]/,
  //         name: "vendor",
  //         chunks: "all"
  //       }
  //     }
  //   }
  // },
  target: 'web',
  resolve: {
    extensions: [
      '.ts',
      '.tsx',
      '.js',
      '.jsx',
      '.png',
      '.wasm',
      '.tar',
      '.data',
      '.svg',
      '.png',
      '.jpg',
      '.jpeg',
      '.gif',
      '.json',
    ],
    alias: {
      '@': path.resolve(__dirname, 'src/'),
      '@ee': path.resolve(__dirname, 'ee/'),
      '@assets': path.resolve(__dirname, 'assets/'),
      '@plugins': path.resolve(__dirname, 'plugins/'),
    },
  },
  devtool: environment === 'development' ? 'source-map' : false,
  module: {
    rules: [
      {
        test: /\.ttf$/,
        use: ['file-loader'],
      },
      {
        test: /\.wasm$/,
        use: ['file-loader'],
      },
      {
        test: /\.tar$/,
        use: ['file-loader'],
      },
      {
        test: /\.data$/,
        use: ['file-loader'],
      },
      {
        test: /\.svg$/,
        use: ({ resource }) => ({
          loader: '@svgr/webpack',
          options: {
            svgoConfig: {
              plugins: [
                {
                  name: 'prefixIds',
                  cleanupIDs: {
                    prefix: `svg-${hash(resource)}`,
                  },
                },
              ],
            },
          },
        }),
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
          },
        ],
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
          },
          {
            loader: 'sass-loader',
          },
        ],
      },
      {
        test: /\.(js|jsx|ts|tsx)$/,
        exclude: /node_modules/,
        resolve: { extensions: ['.js', '.jsx', '.ts', '.tsx'] },
        use: {
          loader: 'babel-loader',
          options: {
            plugins: [
              [
                'import',
                {
                  libraryName: 'lodash',
                  libraryDirectory: '',
                  camel2DashComponentName: false,
                },
                'lodash',
              ],
            ],
          },
        },
      },
      {
        test: /\.html$/,
        loader: 'html-loader',
      },
    ],
  },
  optimization: {
    splitChunks: {
      chunks: 'async',
    },
  },
  plugins: [
    new ForkTsCheckerWebpackPlugin(),
    new WebpackBar(),
    new ESLintPlugin({ extensions: ['js', 'jsx', 'ts', 'tsx'], emitWarning: false }),
    new ModuleFederationPlugin({
      name: 'uibuilder',
      filename: 'remoteEntry.js',
      remotes: {},
      exposes: {
        './App': './mfa/App',
        './Database': './mfa/Database',
        './Editor': './mfa/Editor',
        './GlobalDatasources': './mfa/GlobalDatasources',
        './Viewer': './mfa/Viewer',
        './Oauth2': './mfa/Oauth2',
      },
      shared: {
        ...Object.entries(deps).reduce((acc, [name, version]) => {
          return {
            ...acc,
            [name]: {
              import: name,
              shareKey: name,
              shareScope: 'default',
              singleton: true,
              requiredVersion: version,
            },
          };
        }),
        react: {
          singleton: true,
          requiredVersion: deps.react,
        },
        'react-dom': {
          singleton: true,
          requiredVersion: deps['react-dom'],
        },
      },
    }),
    new HtmlWebpackPlugin({
      template: './src/index.ejs',
      favicon: './assets/images/logo.svg',
      hash: environment === 'production',
    }),
    new CompressionPlugin({
      test: /\.js(\?.*)?$/i,
      algorithm: 'gzip',
    }),
    new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /(en)$/),
    new webpack.DefinePlugin({
      'process.env.ASSET_PATH': JSON.stringify(ASSET_PATH),
      'process.env.SERVE_CLIENT': JSON.stringify(process.env.SERVE_CLIENT),
    }),
  ],
  devServer: {
    port: 3001,
    historyApiFallback: { index: ASSET_PATH },
    static: {
      directory: path.resolve(__dirname, 'assets'),
      publicPath: '/assets/',
    },
  },
  output: {
    publicPath: `${stripTrailingSlash(MF_URL[environment])}/`,
    // path: path.resolve(__dirname, 'build'),
    chunkFilename: '[id].[contenthash].chunk.js',
  },
  externals: {
    // global app config object
    config: JSON.stringify({
      // apiUrl: `${stripTrailingSlash(API_URL[environment]) || ''}`,
      authImplicit: process.env.AUTH_IMPLICIT === 'true',
      SERVER_IP: process.env.SERVER_IP,
      COMMENT_FEATURE_ENABLE: process.env.COMMENT_FEATURE_ENABLE ?? false,
      ENABLE_TOOLJET_DB: process.env.ENABLE_TOOLJET_DB ?? false,
      ENABLE_MULTIPLAYER_EDITING: false,
      ENABLE_MARKETPLACE_FEATURE: process.env.ENABLE_MARKETPLACE_FEATURE ?? false,
      ENABLE_MARKETPLACE_DEV_MODE: process.env.ENABLE_MARKETPLACE_DEV_MODE,
      TOOLJET_MARKETPLACE_URL:
        process.env.TOOLJET_MARKETPLACE_URL || 'https://tooljet-plugins-production.s3.us-east-2.amazonaws.com',
    }),
  },
  stats: {
    warningsFilter: ['deep-object-diff', 'tinycolor2'],
  },
};
