/**
 * Created by zhangqing on 2016/6/18.
 */
var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');

var config = require('./webpack.config.js');
var serverAddress = "127.0.0.1";
var serverPort = "1377";
config.entry.unshift("webpack-dev-server/client?http://"+serverAddress+":"+serverPort+"/"
	, "webpack/hot/dev-server"
);
new WebpackDevServer(webpack(config),{
	publicPath:config.output.publicPath,
	hot:true,
	proxy: {
		// '/abc*': {
		// 	target: 'http://120.26.82.73',
		// 	rewrite: function(req) {
		// 		req.url = req.url.replace(/^\/abc/, '');
		// 	}
		// },
		'/page/*': {
			target: '127.0.0.1:13777/',
			secure: false,
			bypass: function (req, res, proxyOptions) {
				if (req.headers.accept.indexOf('html') !== -1) {
					console.log('Skipping proxy for browser request.');
					return '/index.html';
				}
			}
		}
	},
	stats: { colors: true }
}).listen(serverPort,serverAddress,function(err){
	if(err){
		console.log(err);
	}
	console.log('listening at %s',serverAddress+":"+serverPort);
});