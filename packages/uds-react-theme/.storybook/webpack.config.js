const path = require('path');

// As described here (https://itnext.io/sharing-variables-between-js-and-sass-using-webpack-sass-loader-713f51fa7fa0)
// we can have a single source of truth for theme options
// We can have some js object with options, convert it to sass variables declarations string and pass to loader options.data

// Similar approach here: https://github.com/epegzz/sass-vars-loader

//const sass = require("node-sass");
//const sassUtils = require("node-sass-utils")(sass);
//const sassVars = require(__dirname + "../stories/themeOptions.js");


module.exports = async ({ config }) => {

  config.module.rules.push({
    test: /\.scss$/,
    use: [
      'style-loader',
      'css-loader',
      {
        loader: 'sass-loader',
        options: {
          data: '@import "theme.scss";',
          includePaths: [ path.resolve(__dirname, '../stories') ]
        }
      }
    ],
    include: path.resolve(__dirname, '../src'),
  });

  config.module.rules.push({
    test: /\.stories\.jsx?$/,
    loaders: [require.resolve('@storybook/addon-storysource/loader')],
    enforce: 'pre',
  });

  return config
};
