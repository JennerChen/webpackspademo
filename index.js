require("./style.less");
function changePage(){
	var currentState = History.getState(true, true);
	if(currentState){
    	if(currentState.title === 'pageA'){
    		// 异步加载
    		require.ensure(['./pageA.html','./js/hello.js'],function(require){
    			var hello = require('./js/hello.js');
    			var content = require('./pageA.html');
    			hello.sayHi();
    			$('#content').html(content);
    		});
    	}else if(currentState.title === 'pageB'){
		    $('#content').html(require('./pageB.html'));
    	}else if(currentState.title === 'pageC'){
    		$('#content').html(require('./pageC.html'));
    	}else{
    		$('#content').html(require('./pageA.html'));
    	}
    }
}
$(function(){
    History.Adapter.bind(window,'statechange',function(){
	    changePage();
    });

    $('#navigator').delegate('button','click',function(){
    	var target = this.id;
    	History.pushState({state:target}, target, "/page/"+target);
    });
    changePage();
});