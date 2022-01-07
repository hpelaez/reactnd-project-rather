const nodeExternals = require('webpack-node-externals');
const path = require('path');

/*
const HtmlWebPackPlugin = require("html-webpack-plugin");
const htmlPlugin = new HtmlWebPackPlugin({
  template: "./src/index.html",
  filename: "./index.html"
});
*/

const common = {
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            }
        ]
    }
}

const clientConfig = {
    ...common,

    name: 'client',
    target: 'web',
    mode: 'development', // https://webpack.js.org/configuration/mode/
    entry: {
        client: ["./src/client.js"]
    },
    output: {
        path: path.join(__dirname, 'build', 'public'),
        filename: "[name].js"
    },

    /*
    // split chunk for vendors
    optimization: {
        splitChunks: {
            cacheGroups: {
                vendor: {
                    chunks: 'initial',
                    name: 'vendor',
                    test: module => /node_modules/.test(module.resource),
                    enforce: true,
                },
            },
        },
    },
    */

    // plugins: [htmlPlugin],

    node: {
        fs: 'empty',
        net: 'empty',
        tls: 'empty',
    },
}

const serverConfig = {
    ...common,

    mode: 'development',

    name: 'server',
    target: 'node',
    externals: [nodeExternals()],

    entry: {
      server: ['@babel/polyfill', path.resolve(__dirname, 'src/server.js')],
    },
    output: {
      path: path.resolve(__dirname, 'build/'),
      filename: 'server.js',
    },

    // devtool: 'cheap-module-source-map',

    node: {
      console: false,
      global: false,
      process: false,
      Buffer: false,
      __filename: false,
      __dirname: false,
    },
};

module.exports = [clientConfig, serverConfig]