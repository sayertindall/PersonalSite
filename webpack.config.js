const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
    mode: "production",
    optimization: {
        minimize: true,
        minimizer: [new TerserPlugin({
            extractComments: 'all',

        })],
    },
    devtool: 'eval-source-map',
    entry: __dirname + '/src/index.js',
    output: {
        path: __dirname + '/public/dist',
        filename: 'bundle.js'
    },

    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                use: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                use: [
                    "style-loader",
                    "css-loader"
                ]
            }
        ]
    },
    resolve: {
        extensions: [
            '.js',
            '.jsx'
        ]
    }
};
