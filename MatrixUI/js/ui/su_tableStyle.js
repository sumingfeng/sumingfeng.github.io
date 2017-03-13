/**
*  
*  作者:苏明（SuMing）
   QQ : 376878454
   ver : su_tableStyle 1.0
*/
;(function ($) {

	$.fn.extend({

		'su_tableStyle': function (opts) {

			var defaults = {

				odd: 'tr-odd', //奇数行Class

				even: 'even', //偶数行Class

				selected: 'selected', //已选中的行Class

				checkAll: '#checkAll' //全选复选框 ID
			}

			opts = $.extend(defaults, opts);

			var that = this;

			var $tbody = that.find('tbody');

			var $tr = $tbody.find('tr');

			$tbody.find('tr:even').addClass(opts.even);

			$tbody.find('tr:odd').addClass(opts.odd);

			that.find('input[type=checkbox]').removeAttr('checked'); //初始化复选框

			that.on('click', 'tbody>tr', function (e) {

				var _this = $(this);

				if (_this.hasClass('selected')) {

					_this.removeClass(opts.selected);

					_this.find('input[name=items]').removeAttr('checked');

				} else {

					_this.addClass(opts.selected);

					_this.find('input[name=items]').attr('checked', 'true');

				}

				var $chkbox = $('[name=items]:checkbox');

				var itemLen = $chkbox.length;

				var chkItemLen = $tr.filter('.selected').length;

				$(opts.checkAll).attr('checked', itemLen === chkItemLen);

				//console.log(itemLen + '||' + chkItemLen);

				$(opts.checkAll).attr('checked', itemLen === chkItemLen);

			})

			that.on('click', opts.checkAll, function (e) {

				$tbody.find('input[name=items]')

				.attr('checked', this.checked);

				this.checked && $tr.addClass('selected') || $tr.removeClass('selected')

			})


			return that;
		}
	})
})(jQuery)