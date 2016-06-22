require("./style.less");
function changePage(){
	var currentState = History.getState();
   
	if(currentState){
		console.log(currentState);
    	if(currentState.title == 'pageA'){
    		// 异步加载
    		require.ensure(['./pageA.html','./js/hello.js'],function(require){
    			var hello = require('./js/hello.js');
    			var content = require('./pageA.html')
    			hello.sayHi();
    			$('#content').html(content);
    		});
    	}else if(currentState.title == 'pageB'){
    		$('#content').html(require('./pageB.html'));
    	}else if(currentState.title == 'pageC'){
    		$('#content').html(require('./pageC.html'));
    	}else{
    		$('#content').html(require('./pageA.html'));
    	}
    }
}
$(function(){
	 // Bind to StateChange Event
    History.Adapter.bind(window,'statechange',function(){ // Note: We are using statechange instead of popstate
        // var State = History.getState(); // Note: We are using History.getState() instead of event.state
        // console.log(State);
        changePage();
    });
    
    $('#navigator').delegate('button','click',function(){
    	var target = this.id;
    	History.pushState({state:target}, target, "/page/"+target); 
    })
    changePage();
    // Change our States
    // History.pushState({state:1}, "pageA", "/page/pageA"); 
    // History.pushState({state:2}, "pageB", "/page/pageB"); 
    // History.pushState({state:2}, "pageC", "/page/pageC");
    // History.replaceState({state:3}, "State 3", "?state=3"); // logs {state:3}, "State 3", "?state=3"
    // History.pushState(null, null, "?state=4"); // logs {}, '', "?state=4"
    // History.back(); // logs {state:3}, "State 3", "?state=3"
    // History.back(); // logs {state:1}, "State 1", "?state=1"
    // History.back(); // logs {}, "Home Page", "?"
    // History.go(2); // logs {state:3}, "State 3", "?state=3"
});