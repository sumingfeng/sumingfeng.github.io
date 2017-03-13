/**
*  
*  作者:苏明（SuMing）
   QQ : 376878454
   ver : su_tabUI 1.0 
*/

;(function($){
	
	$.fn.extend({
		
		su_tabUI : function(opts){
			
			var $this = this;
			
			var t = null;
			
			var defaults = {
			
				trig : '.lis li',  // 触发标签
				
				panel : '.panel', // 变化的内容区域
				
				title : '.point li',
				
				current : 'current', // 当前标签class
				
				next : '.btn_next', // 前进
				
				prev : '.btn_prev', // 后退
				
				autoPlay : false,  //是否自动播放
				
				event : 'click',  //默认标签为点击事件
				 
				initTab : 0,  //默认为第1项为当前状态
				
				delay : 3000, //自动播放间隔时间
				
				cache : false,
				
				callback:""
				
			}
			
			opts = $.extend(defaults,opts);
			
			
			var $trig = $this.find(opts.trig);
			
			var $title =  $this.find(opts.title);
			
			var $panel = $this.find(opts.panel);
			
			var $next = $this.find(opts.next);
			
			var $prev = $this.find(opts.prev);
			
			function setTab(){
			
				$panel.eq(opts.initTab).fadeIn('slow').siblings().hide();
			
				$trig.eq(opts.initTab).addClass(opts.current).siblings().removeClass(opts.current);
				
				if($title != undefined){
					
					$title.eq(opts.initTab).fadeIn('slow').siblings().hide();
				}
				
			}
			
			/** ---  autoPlay ------**/
			
			function autoPlay(){
			
				t =  setInterval(function(){
					
					opts.initTab ++;
					
					if(opts.initTab == $trig.length ){

						opts.initTab = 0;
					}
					
					setTab();

					},opts.delay)
			}
			
			if(opts.autoPlay){
				
				autoPlay();
				
			}
			
			$trig.parent('ul').on({
				
				'mouseover' : function(){
				
					clearInterval(t)
					
				}
			
			})
			/** ---  endPlay ------**/
			
			$trig.on(opts.event,function(e){
				
				
				e.preventDefault();
				
				var _this = $(this);
				
				var _index = _this.index();
				
				opts.initTab = _index;
			
				$panel.eq(opts.initTab).fadeIn('fast').siblings().hide();
				
				$(this).addClass(opts.current).siblings().removeClass(opts.current);
				
				if($title != undefined){
					
					$title.eq(opts.initTab).fadeIn('slow').siblings().hide();
				}
				
				var $a = $(this).find("a");
				
				if($a.attr("_src") != undefined){
					
					opts.callback && opts.callback();
					
					$panel.eq(opts.initTab).html('数据加载中,请稍后...');
					
					$.ajax({

						url:$a.attr("_src"),
						
						cache:opts.cache,
						
						success:function(data){

							$panel.eq(opts.initTab).fadeIn('fast').html(data).siblings().hide()
						}

					})
				}
			})
			
			$trig.eq(opts.initTab).trigger(opts.event);	
			
			/** --- prev next -- **/
			
			$prev.on('click',function(e){
				
				e.preventDefault();
				
				if(opts.initTab == 0) {
				
					opts.initTab = $trig.length;
				}
				
				opts.initTab -- ;
				
				setTab()
				
			}).mouseover(function(){
			
				clearInterval(t)
				
			})
			
			
			$next.on('click',function(e){
				
				e.preventDefault();
				
				opts.initTab ++;
				
				if(opts.initTab >= $trig.length){
					
					opts.initTab = 0;
					
				}
				
				setTab();
				
			}).mouseover(function(){
			
				clearInterval(t)
				
			})
	
		}
			
	})
	
})(jQuery)