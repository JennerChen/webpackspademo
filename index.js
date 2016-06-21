var hello = require('./js/hello');
require("./style.less");
$(function(){
	console.log("start devdd wwwx");
	if (__DEV__) {
		console.warn('Extra logging');
	}
});