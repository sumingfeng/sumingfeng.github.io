$(function() {

		var must = '<span class="warning3">必填</span>'; //设置必填HTML

		var pw_letter = $('#pw_letter'); //安全等级对象

		/*表单验证*/

		$("#validForm").validate({

			//errorElement: "em",

			rules: { //规则

				select: { //下拉必选

					select: true

				},

				user: {

					required: true, //必填

					rangelength: [6, 20] //6到20个字符

				},

				email: {

					required: true, //必填

					email: true //邮箱验证开启
				},

				password: {

					required: true, //必填

					rangelength: [6, 20] //6到20个字符

				},

				repeat_pwd: {

					required: true, //必填

					rangelength: [6, 20],

					equalTo: "#level_pwd" //是否两次输入一致

				},

				phone: { //移动手机

					required: true, //必填

					phone: true //中国移动运营商手机号验证开启

				},

				id_card: { //身份证

					required: true, //必填

					id_card: true //中国移动运营商手机号验证开启

				},

				bank_card: { //银行卡

					required: true, //必填

					bank_card: true

				},

				date: { //日期：yy-mm-dd

					required: true, //必填

					dateRule: true //开启验证
				},

				url: { //网址

					required: true, //必填

					url: true //开启验证
				},

				topic: { //复选框

					required: true, //必选

					minlength: 2

				},

				radio: { //单选

					required: true //必填
				},

				txtArea: { //说明

					required: true, //必填

					maxlength: 200

				},

				fileImg: {

					required: true
				}
			},

			messages: { //信息反馈

				user: {

					required: must,

					rangelength: '<span class="warning1">6到20个字符</span>'
				},

				email: {

					required: must, //必填

					email: '<span class="warning1">邮箱格式不正确</span>'
				},

				password: {

					required: must, //必填

					rangelength: '<span class="warning1">6到20个字符</span>'
				},

				repeat_pwd: {

					required: must, //必填

					rangelength: '<span class="warning1">6到20个字符</span>',

					equalTo: '<span class="warning1">两次输入密码不一致</span>'

				},

				phone: { //身份证

					required: must

				},

				id_card: { //身份证

					required: must
				},

				bank_card: { //银行卡

					required: must

				},

				date: { //日期：yy-mm-dd

					required: must //必填

				},

				url: { //网址

					required: must, //必填

					url: '<span class="warning1">网址无效</span>'
				},

				topic: {

					required: '<span class="warning3">必选</span>', //必填

					minlength: '<span class="warning1">至少选2项</span>'

				},

				radio: { //单选

					required: '<span class="warning3">必选</span>'
				},

				txtArea: {

					required: '<span class="warning3">不能为空，最多100个汉字。</span>', //必填

					maxlength: '<span class="warning1">超出字数限制</span>'
				},

				fileImg: {

					required: '<span class="warning3">须上传图片</span'
				}
			}
		})

		/*验证方法扩展*/

		/*下拉必选*/
		jQuery.validator.addMethod("select", function(value, element) {

			if (value != '') {

				return true
			}
		}, '<span class="warning1">一定要选择一项</span>');

		/*身份证*/
		jQuery.validator.addMethod("id_card", function(value, element) {

			return this.optional(element) || (/^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$/.test(value) || /^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/.test(value))

		}, '<span class="warning1">身份证号码无效</span>');

		/*银行卡*/
		jQuery.validator.addMethod("bank_card", function(value, element) {

			var _val = value.split('-').join('');

			if (/^\d{19}$/g.test(_val)) {

				return true
			}
		}, '<span class="warning1">银行卡输入格式错误</span>');

		/*中国移动段手机号*/
		jQuery.validator.addMethod("phone", function(value, element) {

			var _re = /^1(3[4-9]|5[012789]|8[78])\d{8}$/;

			return this.optional(element) || (_re.test(value));

		}, '<span class="warning1">手机号输入有误</span>');

		/*日期格式化方法*/
		jQuery.validator.addMethod("dateRule", function(value, element) {

			var matches = /(\d{4})[-\/](\d{2})[-\/](\d{2})/.exec(value);
			if (matches == null) return this.optional(element) || false;
			return this.optional(element) || true;

		}, '<span class="warning1">日期输入格式错误，正确格式为:yy-mm-dd，如2010-03-28</span>');


		/*密码安全等级：弱、中、强*/

		$("#level_pwd").on({

			"keyup": function() {

				var password_val = $.trim($(this).val());

				var len = password_val.length;

				/*表示密码强度为弱（只是数字或只是字母的)*/
				if (len >= 6 && (/^[0-9]+$/g.test(password_val) || /^[a-zA-Z]+$/g.test(password_val) || /^[^0-9a-zA-Z]+$/g.test(password_val))) {

					pw_letter.addClass("pw-letter-low");
					pw_letter.removeClass("pw-letter-mid");
					pw_letter.removeClass("pw-letter-high");
				}
				/*表示密码强度为强（必须是数字+字母+字符，并且密码位数在15～20位)*/
				else if (len >= 15 && (/[0-9]/g.test(password_val) && /\w/.test(password_val) && /[!,@#,$,%,^,&,*,?,_,~,-,(,)]/.test(password_val))) {

					pw_letter.addClass("pw-letter-high");
					pw_letter.removeClass("pw-letter-low");
					pw_letter.removeClass("pw-letter-mid");
				}
				/*表示密码强度为中(至少是数字和字母或字符相结合的)*/
				else if (len >= 6 && ((/[0-9]/g.test(password_val) && /[a-zA-Z]/g.test(password_val)) || (/[0-9]/g.test(password_val) && /[^0-9a-zA-Z]/g.test(password_val)) || (/[a-zA-Z]/g.test(password_val) && /[^0-9a-zA-Z]/g.test(password_val)))) {
					pw_letter.addClass("pw-letter-mid");
					pw_letter.removeClass("pw-letter-low");
					pw_letter.removeClass("pw-letter-high");
				} else {
					pw_letter.removeClass("pw-letter-low");
					pw_letter.removeClass("pw-letter-mid");
					pw_letter.removeClass("pw-letter-high");
				}
			}
		})

		/*银行卡输入每4位数字加中线*/

		$('#bank_card').on({

			keyup: function() {

				var obj = $(this);

				var str = $.trim(obj.val());

				str = str.replace(/\s/g, '-').replace(/(\d{4})(?=\d)/g, "$1 ");

				obj.val(str);
			}

		})


		$('#isValid').click(function(e) {

			if ($("#validForm").validate().form()) { //表单客户端验证是否通过

				alert("客户端验证通过！");

			}

		})

	})