var path = require("path");
var fs = require("fs");
const { override, babelInclude, fixBabelImports } = require("customize-cra");

const fixMomentJs = (config) => {
  config.plugins.push(
    new webpack.ContextReplacementPlugin(/^\.\/locale$/, (context) => {
      if (!/\/moment\//.test(context.context)) {
        return;
      }
      // context needs to be modified in place
      Object.assign(context, {
        // include locales
        regExp: /^\.\/(fr|en)/,
        // point to the locale data folder relative to moment's src/lib/locale
        request: "../../locale",
      });
    })
  );
  return config;
};

module.exports = override(
  fixMomentJs,
  fixBabelImports("import", {
    libraryName: "antd",
    libraryDirectory: "es",
    style: "css",
  })
);

module.exports = {
  entry: "./src/index.js",
  module: {
    rules: [
      //...
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        issuer: {
          test: /\.jsx?$/,
        },
        use: ["babel-loader", "@svgr/webpack", "url-loader"],
      },
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        loader: "url-loader",
      },
    ],
  },
};

module.exports = function (config, env) {
  // return config
  return Object.assign(
    config,
    override(
      babelInclude([
        path.resolve("src"),
        // fs.realpathSync('./node_modules/@isomorphic/shared')
      ]),
      fixBabelImports("antd", {
        libraryDirectory: "es",
        style: "css",
      })
    )(config, env)
  );
};
