var id = location.href.split('?id=').pop();
$.get('/ajax/book?id=' + id,function(d){
	var windowWidth = $(window).width();
	if(windowWidth < 320) {
		windowWidth = 320;
	}

	d.screen_width = windowWidth;
	new Vue({
		el:'#app',
		data:d,
		methods:{
			readBook:function(){
				location.href = "/reader"
			}
		}
	});
},'json');