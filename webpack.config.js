const CopyPlugin = require('copy-webpack-plugin') // eslint-disable-line node/no-unpublished-require

/**
 * @type import("webpack").Configuration
 */
module.exports = {
  mode: process.env.NODE_ENV || 'development',
  devtool: 'inline-source-map',
  entry: {
    content: `${__dirname}/src/content.ts`,
    background: `${__dirname}/src/background.ts`
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: ['.ts', '.js']
  },
  plugins: [
    // publicフォルダに、manifest.jsonやicon.pngを置いたので、
    // それが一緒に./distフォルダに吐き出されるようにする
    new CopyPlugin({
      patterns: [
        {
          from: './public',
          to: './'
        }
      ]
    })
  ]
}
