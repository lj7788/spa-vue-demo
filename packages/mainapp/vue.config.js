module.exports = {
    devServer: {
        port: 8000,
        proxy: {
            "/app1": {
                target: "http://localhost:3000/app1/",
                changeOrigin: true,
                pathRewrite: {
                    '^/app1': ''
                }
            },
            "/app2": {
                target: "http://localhost:3001/app2/",
                changeOrigin: true,
                pathRewrite: {
                    '^/app2': ''
                }
            }
        }
    }
}