/* ========================================================================
 * Matrix Project: index.js v1.0.0
 * ========================================================================
 * Copyright 2013.10 
   by SuMing - 苏明  书写编辑器 - Brackets
 * ======================================================================== */

+( function ( $,win ) {

	var gf = ['g_html.html', 'g_css.html', 'g_js.html', 'g_fish.html'];

	var f2_hm = ['com_button.html', 'com_table.html', 'com_form.html', 'com_tab.html', 'com_page3.html', 'com_page2.html', 'com_pop.html', 'com_date.html','com_tip.html', "api.html"];

	var page_hm = ['page_1.html', 'page_2.html'];
	
	var bizmessage_hm = ['bizmessage_1.html'];

	var search_hm = ['search_1.html'];

	var fstore_hm = ['fstore1.html'];
	
	var cache_hm = ['cache_1.html'];

	var pros_hm = ['lm1.html', 'fx.html', 'fx_jh.html', 'lm2.html'];

	gf = gf.concat(f2_hm, page_hm,bizmessage_hm,search_hm, fstore_hm, cache_hm,pros_hm);

	var $lk_item = $('.lk-item');

	var $box = $lk_item.find(".box");

	var $li = $lk_item.find('li');

	var $mod_lis = $lk_item.find(".mod-lis");

	var $mod_tp = $lk_item.find(".tp");

	var $right_con = $('.right-con');

	var $right_con_inner = $right_con.find('.inner');
	
	var $goTop = $(".go-top");

	var i = 0;

	for (l = $li.length; i < l; i++) {

		$li.eq(i).attr('data-src', gf[i])

	}

	function addCur(obj) {

		obj.removeClass("sb");

		var txt = obj.text();
		
		txt.indexOf('√') != -1 && obj.text(txt.substring(0, txt.length - 1))

	}

	$lk_item.on('click', 'li', function () {

		var self = $(this);

		var $a = self.find('a');

		$a.addClass("sb");

		var ss = $a.text();
		
		ss.indexOf('√') == -1 && $a.html(ss + ' √');

		var $thisPra = self.siblings().find('a');

		$thisPra.each(function () {

			addCur($(this));

		})

		var $pra = self.parent().parent().parent().siblings();

		var $praB = self.parent().parent().parent().parent().parent().siblings();

		var $sib_a = $pra.find('a');

		var $sib_b = $praB.find("a");

		$sib_a.each(function () {

			addCur($(this));
		})

		$sib_b.each(function () {

			addCur($(this));
		})

		var $data_src = self.attr('data-src');
		
		$right_con_inner.html('<img src="images/ld.gif" id="loading">');
			
		$right_con_inner.load(

			'page/' + $data_src + '?' + new Date().getTime(),

			function (response, status, xhr) {
				
				status == 'error' && $right_con_inner.html('<h1>时间来不及，后续再做哦</h1>');
				
			}

		)

	})

	$right_con_inner.ajaxStart(function(){
		
		if($('#ui-datepicker-div').length){
			
			$('#ui-datepicker-div').remove();
		}
	
	})
	
	var $hd = $lk_item.find(".hd");

	$hd.next().hide();

	var $arr = $hd.find(".arr");

	$hd.click(function () {

		var _this = $(this);

		var _bd = _this.next();

		if (_bd.is(':visible')) {

			_this.find(".arrow").html(" ↓");

			_bd.slideUp();
			
		} else {

			_this.find(".arrow").html(" ↑");

			_bd.slideDown();


		}


	})



	win.scroll(function () {
		
		var _h = $(this).height();

		if (win.scrollTop() >= 47) {

			$lk_item.addClass("pos").css({
				
				height: _h
				
			})
			
			$goTop.fadeIn("300");

		} else {

			$lk_item.removeClass("pos").css({
				
				height: _h 
				
			})
			
			$goTop.fadeOut("300");
		}
	})


	$mod_tp.click(function () {

		var _this = $(this);

		var _bd = _this.next();

		if (_bd.is(':visible')) {

			_bd.slideUp();

		} else {

			_bd.slideDown();

		}


	})

	/*首页链接*/

	var indexLink = {

		hander: function (obj_lk, obj_hd) {

			obj_lk.click();

			obj_hd.click();
		},

		linkObj: {

			page: { //分页

				_lk: $("[data-src='page_1.html']"),

				_hd: $mod_lis.eq(1).find(".hd").eq(0)

			},

			f2: { //前端

				_lk: $("[data-src='g_html.html']"),

				_hd: $mod_lis.eq(0).find(".hd").eq(0)
			},

			search: { //搜索

				_lk: $("[data-src='search_1.html']"),

				_hd: $mod_lis.eq(3).find(".hd").eq(0)
			},
			
			fillSev: { //wenjian

				_lk: $("[data-src='fstore1.html']"),

				_hd: $mod_lis.eq(4).find(".hd").eq(0)
			},
			
			cache: { //缓存
				
				_lk: $("[data-src='cache_1.html']"),

				_hd: $mod_lis.eq(5).find(".hd").eq(0)
			},
			
			Bizmessage: { //缓存
				
				_lk: $("[data-src='bizmessage_1.html']"),

				_hd: $mod_lis.eq(2).find(".hd").eq(0)
			}

		},

		eventFun: {

			trigPage: function () {

				indexLink.hander(indexLink.linkObj.page._lk, indexLink.linkObj.page._hd)
				
			},
			
			trigTip: function(){
				
				indexLink.hander(indexLink.linkObj.Bizmessage._lk, indexLink.linkObj.Bizmessage._hd)
			},
			
			trigUserMg: function(){
				
				tipBox("待开发....")
			},
			
			trigDataReport:function(){
				
				tipBox("待开发....")
			},
			
			trigCatch: function(){
				
				indexLink.hander(indexLink.linkObj.cache._lk, indexLink.linkObj.cache._hd)
			},

			trigSearch: function () {

				indexLink.hander(indexLink.linkObj.search._lk, indexLink.linkObj.search._hd)
				
			},
			
			trigFillSev: function(){
			
				indexLink.hander(indexLink.linkObj.fillSev._lk, indexLink.linkObj.fillSev._hd)
			},
			
			trigF2: function () {

				indexLink.hander(indexLink.linkObj.f2._lk, indexLink.linkObj.f2._hd)
			},

		},

		eventArr: function () {

			var arr = [];

			for (var i in indexLink.eventFun) {

				if (indexLink.eventFun.hasOwnProperty(i)) {

					arr.push(indexLink.eventFun[i])

				}
			}

			return arr
		},

		do : function () {

			var com_lk = $("#com_lk");

			var com_a = com_lk.find("a");

			com_a.each(function (index) {

				this.index = index;

				$(this).on("click", indexLink.eventArr()[this.index]);

			})
		}

	}

	indexLink.do();

	$lk_item.height(win.height()-47);

	/*分销*/

	var $fx = $("[data-src='fx.html']");

	var $fx_ = $mod_lis.eq(6).find(".hd").eq(1);

	$("#fenxiao").click(function () {

		$fx.click();
		
		$fx_.click();
	})

	/*首页链接End*/
	
	/*Top*/
	
	if($goTop.length){
		
		$goTop.click(function(){

		  win.scrollTop() > 0 && $('html,body').stop().animate({scrollTop: 0});

		});
	}

	/*公用提示*/
	function tipBox(con){
	
		$.su_dialog(

			/* "tip" 为提示层标示 */

			"tip", {

				width: 400,

				height: "158",

				title: "温馨提示",

				tpl: con,

				buttons: ["确定", "取消"],

				events: [

					function() {

						$.su_dialog_close(); //点确定之后关闭
					},

					function() {

						$.su_dialog_close(); //点取消之后关闭

					}

				]
			})
	}

})( jQuery,jQuery(window) )