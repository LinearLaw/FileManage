
const url = require('./public/base-path-dev.js');
module.exports ={
    lintOnSave:false,
    devServer: {
        proxy: {
            '/api': {
                target: url.BASE_PATH,
                ws: true,
                changeOrigin: true,
                pathRewrite: {
                    '^/api': ''
                }
            }
        }
    }
}