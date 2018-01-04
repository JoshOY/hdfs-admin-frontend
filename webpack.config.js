var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var LodashModuleReplacementPlugin = require('lodash-webpack-plugin');
var HtmlPlugin = require('html-webpack-plugin');

function root(fn) {
  return path.resolve(__dirname, fn);
}

var CommonsChunkPlugin = webpack.optimize.CommonsChunkPlugin;

var extractProjectCSS = new ExtractTextPlugin({
  filename: 'style.[sha1:contenthash:hex:10].css?[sha1:contenthash:hex:10]',
  allChunks: true,
  ignoreOrder: true,
});

var extractVendorCSS = new ExtractTextPlugin({
  filename: 'vendor.[sha1:contenthash:hex:10].css?[sha1:contenthash:hex:10]',
});

var themeJSON = {};

var htmlPluginConfig = function () {
  return {
    inject: false,
    title: 'DFS Admin',
    template: root('app/template/index.ejs'),
    meta: [
      {
        name: 'description',
        content: 'Distributed file system management UI.',
      },
    ],
    mobile: true,
    links: [],
    appMountId: 'app-root',
    isProduction: false,
  };
};

module.exports = {
  entry: {
    app: root('app/entry.jsx'),
  },
  output: {
    filename: '[name].[chunkhash].js',
    path: root('./dist'),
    publicPath: '/public/',
    chunkFilename: '[name]-[id].chunk.js?[chunkhash]',
  },
  module: {
    loaders: [
      // js(x) loader
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      // css loader
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader',
      },
      // less loader
      {
        test: /\.less$/,
        include: /node_modules[/\\]/,
        use: extractVendorCSS.extract({
          use: [
            'css-loader',
            'less-loader',
          ],
          fallback: 'style-loader',
        }),
      },
      // global stylus loader
      {
        test: /\.global\.styl$/,
        // exclude: /node_modules[/\\]/,
        use: extractProjectCSS.extract({
          use: [
            {
              loader: 'css-loader',
              options: {
                // sourceMap: true,
                importLoaders: 2,
              },
            },
            {
              loader: 'postcss-loader',
              options: {
                plugins: [
                  require('autoprefixer'),
                ],
              },
            },
            {
              loader: 'stylus-loader',
            },
          ],
          fallback: 'style-loader',
        }),
      },
      // local css loader
      {
        test: /^((?!\.global).)*\.styl$/,
        // exclude: /node_modules[/\\]/,
        use: extractProjectCSS.extract({
          use: [
            {
              loader: 'css-loader',
              options: {
                modules: true,
                // sourceMap: true,
                importLoaders: 2,
                localIdentName: '[name]__[local]__[hash:base64:5]',
              },
            },
            {
              loader: 'postcss-loader',
              options: {
                plugins: [
                  require('autoprefixer'),
                ],
              },
            },
            {
              loader: 'stylus-loader',
            },
          ],
          fallback: 'style-loader',
        }),
      },
      // static resource loader
      {
        test: /\.(svg|ttf|eot|woff|woff2|png|jpg|jpeg|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'resource/[name]_[hash].[ext]?[sha1:hash:hex:10]',
              query: {
                publicPath: 'static/resource/',
                outputPath: 'resource/',
                useRelativePath: true,
              },
            },
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    alias: {
      ui: root('app'),
    },
  },
  plugins: [
    new HtmlPlugin(htmlPluginConfig()),
    new CommonsChunkPlugin({
      // Specify the common bundle'styles name.
      name: 'vendors',
      // this assumes your vendor imports exist in the node_modules directory
      minChunks: function (module) {
        return (module.context && module.context.indexOf('node_modules') !== -1);
      },
    }),
    // CommonChunksPlugin will now extract all the common modules from vendor and main bundles
    new CommonsChunkPlugin({
      name: 'manifest',
    }),
    new CommonsChunkPlugin({
      async: 'app-async-commons',
      minChunks: function (module, count) {
        return (count >= 2);
      },
    }),
    new LodashModuleReplacementPlugin({
      collections: true,
      paths: true,
      shorthands: true,
    }),
    extractProjectCSS,
    extractVendorCSS,
    new webpack.optimize.ModuleConcatenationPlugin(),
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
  ],
};
