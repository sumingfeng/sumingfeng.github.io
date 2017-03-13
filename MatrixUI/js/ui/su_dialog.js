/**
*  
*  作者:苏明（SuMing）
   QQ : 376878454
   ver : su_dialog 1.0 
*/

;
(function ($) {

	var size = {

		winH: $(window).height(),

		winW: $(window).width(),

		docH: $(document).height(),
	}

	var $popBox = $('<div class="popBox"></div>');

	var $phead = $('<div class="phead"></div>');

	var $pbody = $('<div class="pbody" style="max-height:600px;overflow:auto;position:relative"></div>');

	var $close = $('<span class="close">X</span>');
	
	var $buttonArea = $('<div class="button-area"></div>');
	
	$.extend({

		'su_dialog': function (url, opts, callback) {

			var $this = this;

			var defaults = {
				
				mold:"tip", //content、Ajax、iframe

				width: 500,

				height: 400,

				title: '&nbsp;',

				url: '',

				method: 'get',

				data: '',

				asnyc: 'false',

				tpl: '',

				buttons: [], //按钮数组

				events: [] //每个按钮对应的事件函数
			}

			opts = opts && $.extend(defaults, opts);
			
			function init() {

				dialog_show();

				showCon(url);
				
				callback && callback();

			}

			function dialog_show() {

				if ($('#mask').length > 0) {

					$mask = $('#mask')
					
				} else {

					$mask = $('<div id="mask"></div>');

					$mask.appendTo($(document.body));
				}

				$(document.body).append($popBox);

				$phead.html('<h2>' + opts.title + '</h2>').appendTo($popBox);

				$pbody.appendTo($popBox);

				$close.appendTo($popBox);
				
				$buttonArea.appendTo($popBox);
			
				popStyle();
			}


			function dialog_close() {

				$popBox.remove();

				$mask.hide();
				
				$('body').css({overflow:''});

			}

			function popStyle() {
				
				$('body').css({overflow:'hidden'});
				
				$(window).scrollTop(0);
				
				var popLeft = (size.winW - opts.width) * 0.5;

				var popTop = (size.winH + $(window).scrollTop() - opts.height) * 0.5;

				$mask.css({
					
					width: '100%',
					
					height: $(document).height() + 'px',
					
					position: 'absolute',
					
					left: 0,
					
					top: 0,
					
					background: '#000',

					opacity: '0.5',
					
					zIndex: 99999,
					
					display: 'block'
					
				});

				$popBox.css({

					position: 'absolute',

					width: opts.width + 'px',

					height: opts.height + 'px',

					left: popLeft + 'px',

					zIndex: 100000
				})

				.stop().animate({
					
					top: popTop + 'px'
					
				}, 500)

			}

			$close.on('click', function () {

				dialog_close()

			})
			
			
			$buttonArea.html("");

			if (opts.buttons.length > 0 && opts.events.length > 0) {
				
				var i = 0;
				
				for (i = 0; i < opts.buttons.length; i++) {
					
					var $btn = $('<input type="button" class="bt_sign01">');
					
					$btn.val(opts.buttons[i]);
					
					$buttonArea.append($btn);
					
					$btn.each(function(){
						
						$(this).on('click',opts.events[i])
					
					});

				}
			}
			
			/*iframe url*/
			var iframeLoad = function(url) {
				
        		$pbody.html('<iframe allowtransparency="allowtransparency" align="middle" frameborder="0" height="500" width="100%" scrolling="auto" src="'+url+'" id="popIframe">请使用支持iframe框架的浏览器。</iframe>');
				
				/*$(window.parent.document).find("#popIframe").load(function(){
					var main = $(window.parent.document).find("#popIframe");
					var thisheight = $(document).height()+30;
					main.height(thisheight);
				});*/
				
			}
			function showCon(url){
				
				$pbody.html('');
				
				if(opts.mold == "tip" && url == "tip" && opts.tpl != undefined && opts.tpl != ""){
				
					$pbody.html(opts.tpl);
					
					popStyle();
				}
				
				if(opts.mold == "content" && $('#' + url).length > 0){
				
					((opts.tpl == "" || opts.tpl == undefined) && $pbody.html($('#' + url).html())) || $pbody.html(opts.tpl);
					
					popStyle();
				}
				
				if(opts.mold == "ajax"){
				
					$.ajax({

						url: url,

						type: opts.method,
						
						dataType: "html",

						asnyc: false,
						
						data: opts.data,
						
						beforeSend:function(){
							
							$pbody.html("加载中,请稍后...");
							
							popStyle()
							
						},

						success: function (re) {
							
							var $img = $(re).filter('img');
							
							if($img.length>0){
								
								$img.load(function(){
									
									setTimeout(function(){$pbody.html(re);
									
									popStyle();},500)
									
								
								})
							}
							else{
								
								$pbody.html(re);
							}
						},
						
						error: function (data, textstatus) {
							
							$pbody.html("出错了...");
							
						}

					})
				}
					if(opts.mold == "iframe" && url != null){
					 
						iframeLoad (url);
						
						popStyle();
						
					}
				
			
			}	
			
	
			init();

		},

		'su_dialog_close': function (func) {

			$popBox.remove();

			$mask.remove();
			
			func && func();
			
			$('body').css({overflow:''});

		}
	})

})(jQuery)