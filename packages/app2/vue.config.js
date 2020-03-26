const webpackConfig = require('./webpack.config');

module.exports = {
    publicPath: "/app2",
    css: {
        extract: false
    },
    configureWebpack: webpackConfig,
    devServer: {
        contentBase: './',
        compress: true,
        port: 3001
    }
}
