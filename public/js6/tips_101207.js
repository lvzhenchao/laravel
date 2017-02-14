//checkout_tips.js
var RPT_CHECKOUT_TIPS_TEMPLATE = "<p>{desc}</p>"
var RPT_CHECKOUT_TIPS_HEADTEMPLATE = "<p><b>温馨提示：</b></p>";

function Tips(container_id) {
    var m_rpt_checkout_tips = new JSRepeater(container_id);
    m_rpt_checkout_tips.ItemTemplate = RPT_CHECKOUT_TIPS_TEMPLATE;
    m_rpt_checkout_tips.HeaderTemplate = RPT_CHECKOUT_TIPS_HEADTEMPLATE

    var checkout_tips_ajax = new Ajax('/order/getTip');
    var checkout_tips_cache = null;
    checkout_tips_ajax.OnSucceed
	   (
			function (result) {
			    if (result != null && result['error_code'] == 0) {
//			        $1(container_id).className = 'shoppingcart_notice';
			        checkout_tips_cache = result['checkout_tips'];
			        bindCheckoutTips(checkout_tips_cache);
			    }
			    else {
			        $1(container_id).className = 'objhide';
			    }
			}
		);
    var bindCheckoutTips = function (result) {
        if (result == null || result.length == 0) {
            $1(container_id).className = 'objhide';
        }
        else {
            $1(container_id).className = 'shoppingcart_tips';
            m_rpt_checkout_tips.DataSource = result;
            m_rpt_checkout_tips.DataBind();
        }
    }
    this.show = function () {        
        if (checkout_tips_cache == null)
            checkout_tips_ajax.invokeServer('shop_type=1', 'POST', true);
        else
            bindCheckoutTips(checkout_tips_cache);
    }
}

