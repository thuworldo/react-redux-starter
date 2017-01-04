var path = require('path');
var webpack = require('webpack');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var ProgressBarPlugin = require('progress-bar-webpack-plugin');
var chalk = require('chalk');
module.exports = {
    entry: [
        './src/js/App.js'
    ],
    output: {
        path: path.join(__dirname, 'build/'),
        filename: "js/bundle.js"
    },

    resolve: {
        modulesDirectories: ['node_modules'],
        extensions: ['', '.js', '.jsx'],
        moduleTemplates: ['', 'index.jsx', 'index.js']
    },

    module: {
        loaders: [
            {
                test: /(\.js||\.jsx)/,
                loader: 'babel-loader',
                include: path.resolve(__dirname, 'src/js'),
                exclude: /node_modules/,
                query: { presets: ['es2015', 'stage-0', 'react'] }
            },
            {
                test: /\.css$/,
                loader: 'style-loader!css-loader!autoprefixer-loader?browsers=last 2 versions'
            },
            {
                test: /\.scss$/,
                loader: 'style-loader!css-loader!autoprefixer-loader?browsers=last 2 versions!sass-loader'
            },
        ]
    },

    plugins: [
        new webpack.DefinePlugin({ __DEV__: false }),
        new ProgressBarPlugin({
            format: chalk.cyan(':msg') + " " + chalk.green.bold(':bar') + chalk.magenta.bold(':percent') + ' (:elapsed seconds) ',
            clear: true
        }),
        new CopyWebpackPlugin([
            { from: 'src/index.html', to: "index.html" },
            { from: 'src/img', to: 'img' }
        ]),
        new webpack.NoErrorsPlugin(),
        new webpack.ProvidePlugin({
            React: 'react',
            ReactDOM: 'react-dom'
        })
    ]


}