var hello = require('./js/hello');
require("./style.less");
$(function(){
	console.log("start devdd wwwx");
	$.get('http://120.26.82.73',{},function(d){
		console.log(d)
	})
});