const path = require('path');

module.exports = {
  entry: './src/TypeScript/Scripts/index.ts',
  mode:"production",
  module: {
    rules: [
      {
        test: /\.ts$/,
        include: [path.resolve(__dirname, 'src')],
        use: 'ts-loader',
      }
    ]
  },
  resolve: {
    extensions: ['.ts', '.js']
  },
  output: {
    publicPath: 'public',
    filename: 'index.js',
    path: path.resolve(__dirname, 'public'),
  },
};