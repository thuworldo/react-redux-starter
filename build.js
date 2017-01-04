var config = require('./webpack.config.js');
var webpack = require('webpack');
var CleanWebpackPlugin = require('clean-webpack-plugin');
var path = require('path');

config.plugins.push(new webpack.optimize.OccurrenceOrderPlugin());
config.plugins.push(new webpack.optimize.DedupePlugin());
config.plugins.push(
    new webpack.optimize.UglifyJsPlugin({
            compress: {warnings: false},
            output: {comments: false},
            minimize: true,
            sourceMap: false,
            exclude: [/node_modules/,/bower_components/]
    })
);
config.plugins.push(
    new CleanWebpackPlugin(
        path.join(__dirname + "/build/")
    )
);

config.devtool='cheap-module-source-map';
config.plugins[0].definitions["process.env"]={'NODE_ENV': '"production"'};




var compiler = webpack(config);


compiler.run(()=>{});
