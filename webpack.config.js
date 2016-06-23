var webpack = require('webpack');
// 该插件将webpack不会将css直接插入页面中,而是提取到设定的css文件中
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var path = require('path');
// var buildPath = path.resolve(__dirname, 'src/www');
// definePlugin takes raw strings and inserts them, so you can put strings of JS if you want.
var definePlugin = new webpack.DefinePlugin({
    __DEV__: JSON.stringify(JSON.parse(process.env.BUILD_DEV || 'true')),
    __PRERELEASE__: JSON.stringify(JSON.parse(process.env.BUILD_PRERELEASE || 'false'))
});
module.exports = {
    entry: [
        './index.js'
    ],
    resolve: {
        // 当require时,下列字符不用写后缀
        extensions: ['', '.js', '.md', '.txt', '.jsx', '.json']
    },
    output: {
        path: __dirname +"/build/",
        filename: 'bundle.js',
        publicPath: '/build/'
    },
    devtool: "#cheap-module-source-map",
    module: {
        loaders: [{
                test: [/\.js$/, /\.jsx$/],
                loader: 'babel-loader',
                query: {
                    presets: ['es2015', 'react']
                }
            }, {
                test: [/\.html$/, /\.htm$/],
                loader: 'html-loader'
            }, {
                test: /\.handlebars$/, 
                loader: 'handlebars-loader'//使用handlebar-loader,不直接使用handlebar
            },{
                test: [/\.json$/],
                loader: 'json-loader'
            }, {
                test: /\.less$/,
                loader: ExtractTextPlugin.extract("style-loader", "css-loader!less-loader")
                // 'style-loader!css-loader!less-loader'
            }, // use ! to chain loaders
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract("style-loader", "css-loader")
                // 'style-loader!css-loader'
            }, {
                test: /\.(png|jpg)$/,
                loader: 'url-loader?limit=8192&name=/[path][name].[ext]'
            } // inline base64 URLs for <=8k images, direct URLs for the rest
        ]
    },
    externals: {
        "jquery": "jQuery",
        "underscore":"_"
    },
    plugins: [
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery",
            "window.jQuery": "jquery",
        }),
        new ExtractTextPlugin("style.css", {
            allChunks: true
        }),
        new webpack.HotModuleReplacementPlugin(), //热替换模块
        new webpack.NoErrorsPlugin() //当新的更改报错时, 不生产新的代码
    ]
};
