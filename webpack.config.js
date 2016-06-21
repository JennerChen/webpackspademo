var webpack = require('webpack');
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
		path: __dirname + '/build',
		filename: 'bundle.js',
		publicPath: '/build/'
//	    写工具类使用该参数
//	    library:"commonLib",
//	    libraryTarget:'umd'
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
			test: [/\.json$/],
			loader: 'json-loader'
		}, {
			test: [/\.html$/],
			loader: 'html-loader'
		}, {
			test: /\.less$/,
			loader: 'style-loader!css-loader!less-loader'
		}, {
			test: /\.css$/,
			loader: 'style-loader!css-loader'
		}, {
			test: /\.(png|jpg)$/,
			loader: 'url-loader?limit=8192&name=/[path][name].[ext]'
		} // inline base64 URLs for <=8k images, direct URLs for the rest
		]
	},
	externals: {
		"jquery": "jQuery"
	},
	plugins: [
		definePlugin,
		new webpack.HotModuleReplacementPlugin(),//热替换模块
		new webpack.NoErrorsPlugin()//当新的更改报错时, 不生产新的代码
//	    new webpack.optimize.UglifyJsPlugin({ //压缩代码
//		    compressor: {
//			    warnings: false
//		    }
//	    })
	]
};
