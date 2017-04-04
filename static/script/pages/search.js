var windowWidth = $(window).width();
if(windowWidth < 320) {
	windowWidth = 320;
}

new Vue({
	el: '#app_search',
	data: {
		screen_width:windowWidth,
		double_screen_width:windowWidth*2,

		search:[],
		condition:true,
		empty:false
	},
	methods: {
		doSearch: function() {
			console.log("开始搜索了！");
			var keyword = $('#search_box').val();
			var _this = this;
			$.get('/ajax/search',{
				keyword:keyword
			},function(d){
				_this.condition = false;
				_this.search = d.items;
				if(_this.search.length == 0){
					_this.empty = true;
				}else{
					_this.empty = false;
				}
			},'json')
		}
	}
});