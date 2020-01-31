const webpack = require('webpack');
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserJSPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const dotenv = require('dotenv');

module.exports = (env) => {
  const isProduction = env === 'production';
  let envKeys = {}
  if (process.env.NODE_ENV !== 'production') {
    const envVars = dotenv.config({ path: './config/dev.env' }).parsed;
    envKeys = Object.keys(envVars).reduce((prev, next) => {
      prev[`process.env.${next}`] = JSON.stringify(envVars[next]);
      return prev;
    }, {});
  } else {

  }


  return {
    entry: './src/app.js',
    output: {
      path: path.join(__dirname, 'public'),
      filename: 'js/bundle.js',
      publicPath: '/'
    },
    module: {
      rules: [{
        loader: 'babel-loader',
        test: /\.js$/,
        exclude: /node_modules/
      }, {
        test: /\.(sa|sc|c)ss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: process.env.NODE_ENV === 'development',
              esModule: true,
            }
          }, {
            loader: 'css-loader',
            options: {
              sourceMap: true
            }
          }, {
            loader: 'sass-loader',
            options: {
              sourceMap: true
            }
          }
        ]
      }]
    },
    devtool: isProduction ? 'source-map' : 'inline-source-map',
    devServer: {
      contentBase: path.join(__dirname, 'public'),
      historyApiFallback:{
        index:'/public/index.html'
      },
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: 'styles/styles.css',
        ignoreOrder: false, // Enable to remove warnings about conflicting order
      }),
      new webpack.DefinePlugin(envKeys)
    ],
    optimization: {
      minimizer: [new TerserJSPlugin({}), new OptimizeCSSAssetsPlugin({})],
    }
  }
};
