const path = require('path');
const webpack = require('webpack');

module.exports = {
  mode: 'development',
  devtool: 'inline-source-map',
  entry: './index',
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/dist/'
  },
  plugins: [
    new webpack.NamedModulesPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        include: ['index.js', 'src'].map(
          name => path.resolve(__dirname, name)
        ),
        loader: 'babel-loader',
      },
      {
        test: /\.css$/,
        loader: 'style-loader!raw-loader'
      },
      {
        test: /\.svg$/,
        include: path.join(__dirname, 'assets'),
        loader: 'url-loader?limit=10000&mimetype=image/svg+xml'
      },
      {
        test: /\.png$/,
        include: path.join(__dirname, 'assets'),
        loader: 'url-loader?mimetype=image/png'
      },
      {
        test: /\.jpg$/,
        include: path.join(__dirname, 'assets'),
        loader: 'url-loader?mimetype=image/jpg'
      },
      {
        test: /\.gif$/,
        include: path.join(__dirname, 'example/assets'),
        loader: 'url-loader?mimetype=image/gif'
      },
      {
        test: /\.json$/i,
        use: [
          {
            loader: 'raw-loader',
            options: {
              esModule: false,
            },
          },
        ],
      },
    ]
  },
  devServer: {
    port: 8080,
    host: '0.0.0.0',
    disableHostCheck: true
  }
};