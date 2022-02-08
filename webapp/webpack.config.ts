import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';

import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const dirnamePath = dirname(fileURLToPath(import.meta.url));

const config = {
  entry: ['react-hot-loader/patch', './src/index.tsx'],
  output: {
    path: resolve(dirnamePath, 'build'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.(m?js|m?ts|m?tsx)$/,
        include: resolve(dirnamePath),
        resolve: {
          fullySpecified: false,
        },
        use: 'babel-loader',
      },
      {
        test: /\.(m?ts|m?tsx)$/,
        loader: 'ts-loader',
      },
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
      {
        test: /\.svg$/i,
        issuer: /\.tsx?$/,
        use: [{ loader: '@svgr/webpack', options: { icon: true } }],
      },
      {
        test: /\.png$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              mimetype: 'image/png',
            },
          },
        ],
      },
    ],
  },
  devServer: {
    static: {
      directory: './build',
    },
    historyApiFallback: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: resolve(dirnamePath, 'public/index.html'),
      filename: 'index.html',
    }),
    new BundleAnalyzerPlugin({
      analyzerMode: 'static',
      openAnalyzer: false,
    }),
    new MiniCssExtractPlugin(),
    new CleanWebpackPlugin(),
  ],
  resolve: {
    fallback: {
      'os': false,
      'fs': false,
      'util': false,
      'path': false,
      'crypto': false,
    },
    extensions: ['.ts', '.mts', '.tsx', '.mtsx', '.js', '.mjs', '.css'],
    alias: {
      'react-dom': '@hot-loader/react-dom',
      '@': resolve(dirnamePath, 'src'),
    },
  },
};

export default config;
