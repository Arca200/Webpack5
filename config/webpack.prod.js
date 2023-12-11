const ESLintPlugin = require('eslint-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
// 所有配置最终都是在node.js上运行的，所以模块化使用的是common.js
const path = require('path')
const getStyleLoaders = (preProcessor) => {
    return [
        MiniCssExtractPlugin.loader,
        'css-loader',
        {
            loader: 'postcss-loader',
            options: {
                postcssOptions: {
                    plugins: [
                        'postcss-preset-env', // 能解决大多数样式兼容性问题
                    ],
                },
            },
        },
        preProcessor,
    ].filter(Boolean);
};
module.exports = {
    //入口
    entry: './src/main.js',
    //输出
    output: {
        //所有文件地输出路径
        path: path.resolve(__dirname, '../dist'),
        //入口文件打包输出文件名
        filename: 'static/js/main.js',
        clean: true
    },
    //加载器
    module: {
        rules: [{
            test: /\.css$/i,
            use: getStyleLoaders(),
        },
        {
            test: /\.less$/i,
            use: getStyleLoaders('less-loader'),
        },
        {
            test: /\.s[ac]ss$/i,
            use: getStyleLoaders('sass-loader'),
        },
        {
            test: /\.styl$/i,
            use: getStyleLoaders('stylus-loader'),
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
        }),
        // 提取css成单独文件
        new MiniCssExtractPlugin({
            // 定义输出文件名和目录
            filename: 'static/css/main.css',
        }),
        new CssMinimizerPlugin()
    ],
    // 开发服务器
    devServer: {
        host: 'localhost', // 启动服务器域名
        port: '3000', // 启动服务器端口号
        open: true, // 是否自动打开浏览器
    },
    //模式
    mode: 'production',
    devtool: 'source-map'
}