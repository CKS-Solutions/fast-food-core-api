const path = require('path');

module.exports = {
  entry: './src/lambda.ts',
  target: 'node',
  mode: 'production',
  optimization: {
    minimize: false,
  },
  resolve: {
    extensions: ['.ts', '.js'],
    alias: {
      '@entities': path.resolve(__dirname, 'src/core/domain/entities'),
      '@usecases': path.resolve(__dirname, 'src/core/application/use_cases'),
      '@repositories': path.resolve(__dirname, 'src/adapters/driven/persistance/repositories'),
      '@services': path.resolve(__dirname, 'src/core/domain/services'),
      '@dto': path.resolve(__dirname, 'src/adapters/driver/dto'),
      '@error': path.resolve(__dirname, 'src/core/domain/errors'),
    },
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'lambda.js',
    library: {
      type: 'commonjs2',
    },
  },
  externals: {
    '@prisma/client': '@prisma/client',
  },
};