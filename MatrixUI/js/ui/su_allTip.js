/**
*  
*  作者:苏明（SuMing）
   QQ : 376878454
   ver : su_allTip 1.0 
*/

;(function($){

	$.extend($.fn,{
	
		'su_allTip':function(opts){
		
			opts = $.extend({
				
				tpl:'',//内容
				
				intoCon:true, //移入消息提示框时候依然显示
				
				pos:'bottom', //left\top\time
				
				delay: 500,  //信息框延时消失
				
				showTime : 300, //显示信息框的时间
				
				url:'',
				
				method:'',
				
				data:''
				
			},opts)
			
			var that = this;
			
			var t = null;
			
			var st = null;
			
			var $tipLay = $('<div class="tipBox"  style="display:none;z-index:999"></div>');
			
			var $t_inner = $('<div class="t-inner"></div>');
			
			var $arrow = $('<div class="arrow"></div>');
			
			var $tCon = $('<div class="tCon"></div>');
			
			
			if($(".tipBox").length == 0){
				
				$tipLay.appendTo($('body'));

				$t_inner.appendTo($tipLay);

				$arrow.appendTo($t_inner);

				$tCon.appendTo($t_inner);
				
				
			}	
			
			function showTip(){
			
				$tipLay.fadeIn();
				
			}
			
			function hideTip(){
			
				$tipLay.hide();
				
			}
			var $tipLay = $(".tipBox");
			
			this.mouseenter(function(){
				
				var $tipLay = $(".tipBox");
				
				var $tCon = $(".tCon");
				
				$tCon.html(opts.tpl);
				
				clearTimeout(t);
				
				st = setTimeout(showTip,opts.showTime);
			
				var _this = $(this);
				
				switch(opts.pos){
					
						case 'right' :
							
							$tipLay.css({left:_this.offset().left+_this.width() + 'px',top:_this.offset().top + 'px'});
							
							break;
							
						case 'left' :
							
							$tipLay.css({left:_this.offset().left - $tipLay.width() + 'px',top:_this.offset().top + 'px'});
							
							break;
							
						case 'top' :
							
							$tipLay.css({left:_this.offset().left  + 'px',top:_this.offset().top - $tipLay.outerHeight() + 'px'});
							
							break;
							
							
						case 'bottom' :
							
							$tipLay.css({left:_this.offset().left  + 'px',top:_this.offset().top + _this.outerHeight()  + 'px'});
							
							break;
					
					}
				
					if(_this.offset().top - $(window).scrollTop() < $tipLay.outerHeight()){
						
						$tipLay.css({left:_this.offset().left  + 'px',top:_this.offset().top + _this.outerHeight()  + 'px'});
						
					}
					
				    if($(window).height() + $(window).scrollTop() -  (_this.offset().top + _this.outerHeight()) < $tipLay.outerHeight() ){
					
						$tipLay.css({left:_this.offset().left  + 'px',top:_this.offset().top - $tipLay.outerHeight() + 'px'});
					}
				
					

					
				})
			
			.mouseleave(function(){
				
				clearTimeout(st);
				
			    t = setTimeout(hideTip,opts.delay);
				
				
			})
			
			//drop mouseover
			if(opts.intoCon) {
			
				$tipLay.mouseover(function(){
					
						clearTimeout(t);
						
						st = setTimeout(showTip,opts.showTime);
				})
				.mouseout(function(){
					
					clearTimeout(st);
	
					t = setTimeout(hideTip,opts.delay);
					
				})
			}
			
			//ajax
			
			if((opts.tpl=='' || opts.tpl== undefined) && opts.url !=''){
			
				$.ajax({
				
					url:opts.url,
					
					data:opts.data,
					
					asnyc : false,
					
					type:opts.method,
					
					beforeSend: function(){
					
						$tCon.html('请稍后......');
					},
					
					success:function(re){
					
						$tCon.html(re);
					}
				
				})
			}
		}
	})

})(jQuery)