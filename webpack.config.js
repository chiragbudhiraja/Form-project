const path = require('path');

module.exports = {
  entry: './main/app.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  }
};
