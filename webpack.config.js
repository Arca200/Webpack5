// 所有配置最终都是在node.js上运行的，所以模块化使用的是common.js
const path = require('path')
module.exports = {
    //入口
    entry: './src/main.js',
    //输出
    output: {
        //文件输出路径
        path: path.resolve(__dirname, 'dist'),
        //输出文件名
        filename: 'main.js'
    },
    //加载器
    module: {
        rules: [{
            test: /\.css$/i,
            use: [
                // 将js中的css通过创建style标签并添加html文件中生效
                'style-loader',
                // 将css资源编译成common.js
                'css-loader'
            ]
        },
        {
            test: /\.less$/i,
            use: [
                'style-loader',
                'css-loader',
                'less-loader'
            ]
        },
        {
            test: /\.s[ac]ss$/i,
            use: [
                'style-loader',
                'css-loader',
                'sass-loader'
            ]
        },
        {
            test: /\.styl$/i,
            use: [
                'style-loader',
                'css-loader',
                'stylus-loader'
            ]
        }
        ]
    },
    //插件
    plugins: [],
    //模式
    mode: 'development'
}