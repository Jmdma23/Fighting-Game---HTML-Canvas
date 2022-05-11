const path = require('path');

module.exports = {
    entry: {
        index: './src/index.js',
        //print: './src/print.js',
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist'),
    },
    mode: 'development',
    devServer: {
        static: './dist',
    },
    optimization: {
        runtimeChunk: 'single',
    },
    module: {
        rules: [
          {
            test: /\.css$/i,
            use: ['style-loader', 'css-loader'],
          },
        ],
      },
};