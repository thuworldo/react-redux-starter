var webpack = require('webpack');
var config = require('./webpack.config.js');
var path = require('path');
var webpackDevServer = require('webpack-dev-server');

config.plugins.push(
    new webpack.HotModuleReplacementPlugin()
);
config.module.loaders.unshift(
    {
        test: /(\.js||\.jsx)/,
        loader: 'react-hot-loader',
        include: path.resolve(__dirname, 'src/js'),
    }
);
config.entry = [
    'webpack-dev-server/client?http://0.0.0.0:8288',
    'webpack/hot/only-dev-server',
    './src/js/App.js'
];
config.devtool="eval";
config.plugins[0].definitions.__DEV__= true;
var compiler = webpack(config);



var server = new webpackDevServer(compiler, { port: '8288', host: 'localhost', publicPath: '/',  inline: true, contentBase: 'build', hot: true });
server.listen(8288);
