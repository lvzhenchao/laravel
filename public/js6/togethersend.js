var TOGETHER_SEND_ITEMTEMPLATE = '<p id="together_send_id" class="listcon">'
		+ '<input id="together_send_checkbox" name="together_send_checkbox" type="checkbox" value="" class="mr-5" style="vertical-align: text-bottom">'
		+ '不同订单合并一起发货（<a href="http://help.dangdang.com/details/page214" target="_blank">为什么？</a>）'
		+ "</p>";

var togetherSend = {

	// 一起发包裹
	bindtogetherSend : function(result) {
		$('#together_send_checkbox').bind('click', function() {
			var url = BASE_PATH + "/shipment/"
			var time = new Date().getTime();
			if ($("#together_send_checkbox").is(":checked")) {
				url += "agree_send_together";
			} else {
				url += "disagree_send_together";
			}

			$.ajax({
				type : "POST",
				url : url,
				data : {
					time : time
				},
				datatype : "json",// "xml", "html", "script", "json", "jsonp",
									// "text".
				beforeSend : function() {
					// handle before...,eg loading
				},
				success : function(result) {
					initTogetherSend(result);
				},
				complete : function(XMLHttpRequest, textStatus) {
					// handle complete...
				},
				error : function() {
					// handle error...
				}
			});
		});
		this.initTogetherSend(result);
	},

	initTogetherSend : function(result) {
		if (result['show_send_together'] == true) {
			var is_send_together = result['is_send_together'];
			if (is_send_together == 1) {
				$("[name = together_send_checkbox]:checkbox").attr("checked",
						true);
			} else {
				$("[name = together_send_checkbox]:checkbox").attr("checked",
						false);
			}
		} else {
			$('#together_send_id').hide();
		}
	},
	
	showCheckBox : function() {
		if ($("#together_send_id").length <= 0 ) { 
        	$('#shipmentList').append(TOGETHER_SEND_ITEMTEMPLATE);
        }else{
        	$("#together_send_id").show();
        }
	}
}
