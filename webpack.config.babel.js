import path from 'path';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
// import CopyWebpackPlugin from 'copy-webpack-plugin';
import configs from './app/config';

const env = process.env.NODE_ENV || 'development';

const { s3URL, qaURL } = configs;

const masterTemplate = {
  development: './app/src/views/index.pug',
  production: './app/src/views/index.build.pug',
  qa: './app/src/views/index.build.pug',
};

let URL;

if (env === 'production') {
  URL = s3URL;
} else if (env === 'qa') {
  URL = qaURL;
} else {
  URL = '';
}

const config = {
  entry: './app/src/js/app.js',
  output: {
    filename: 'bundle.js?[hash]',
    path: path.resolve(__dirname, 'public'),
    publicPath: URL,
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        // exclude: [/node_modules/],
        use: [{
          loader: 'babel-loader',
        }],
      },
      {
        test: /\.(sass|scss)$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'sass-loader'],
        }),
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        include: [path.resolve(__dirname, 'app/src/img')],
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[path][name].[ext]?[hash]',
              context: path.resolve(__dirname, 'app/src/'),
              emitFile: true,
            },
          },
        ],
      },
      {
        test: /\.(pug)$/,
        use: [
          'html-loader',
          {
            loader: 'pug-html-loader',
            options: {
              data: {
                // s3Link: URL,
              },
              pretty: true,
            },
          },
        ],
      },
    ],
  },


  plugins: [
    new ExtractTextPlugin('style.css?[hash]'),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, `${masterTemplate[env]}`),
      minify: {
        removeComments: true,
      },
      inject: true,
    }),
    // new CopyWebpackPlugin([{ from: './app/src/img', to: 'img' }]),
  ],
  devtool: 'source-map',
  devServer: {
    // historyApiFallback: true,
    noInfo: true,
    contentBase: path.resolve(__dirname, '/'),
    // compress: true,
    port: 8000,
    host: '0.0.0.0',
    // inline: true
    // open: true
  },
};

export default config;

