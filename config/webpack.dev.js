const ESLintPlugin = require('eslint-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
// 所有配置最终都是在node.js上运行的，所以模块化使用的是common.js
const path = require('path')
module.exports = {
    //入口
    entry: './src/main.js',
    //输出
    output: {
        //所有文件地输出路径,但是开发模式没有输出
        path: undefined,
        //入口文件打包输出文件名
        filename: 'static/js/main.js',
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
        },
        {
            test: /\.(png|jpe?g|gif|webp)$/i,
            type: 'asset',
            parser: {
                dataUrlCondition: {
                    maxSize: 10 * 1024
                }
            },
            generator: {
                filename: 'static/image/[hash][ext][query]'
            }
        },
        {
            test: /.(ttf|mp3|mp4)$/,
            type: 'asset/resource',
            generator: {
                filename: 'static/font/[hash:10][ext][query]'
            }
        },
        {
            test: /\.m?js$/,
            exclude: /node_modules/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/preset-env'],
                },
            },
        }
        ]
    },
    //插件
    plugins: [
        new ESLintPlugin({
            context: path.resolve(__dirname, '../src')
        }),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, '../public/index.html')
        })
    ],
    // 开发服务器
    devServer: {
        host: 'localhost', // 启动服务器域名
        port: '3000', // 启动服务器端口号
        open: true, // 是否自动打开浏览器
        hot: true, // 开启HMR功能（只能用于开发环境，生产环境不需要了）
    },
    //模式
    mode: 'development',
    devtool: 'cheap-module-source-map'
}