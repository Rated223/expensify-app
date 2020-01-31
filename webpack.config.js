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
    envKeys = {
      'process.env.FB_API_KEY': JSON.stringify(process.env.FB_API_KEY),
      'process.env.FB_AUTH_DOMAIN': JSON.stringify(process.env.FB_AUTH_DOMAIN),
      'process.env.FB_DB_URL': JSON.stringify(process.env.FB_DB_URL),
      'process.env.FB_PROJECT_ID': JSON.stringify(process.env.FB_PROJECT_ID),
      'process.env.FB_BUCKET': JSON.stringify(process.env.FB_BUCKET),
      'process.env.FB_SENDER_ID': JSON.stringify(process.env.FB_SENDER_ID),
      'process.env.FB_APP_ID': JSON.stringify(process.env.FB_APP_ID)
    }
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
