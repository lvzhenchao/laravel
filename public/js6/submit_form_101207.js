var FORM_TEMPLETE =
 "<form id='order_flow_submit' method='post'>"
       + "<input type='hidden' id='pay_id' name='pay_id'/>"
       + "<input type='hidden' id='pay_type' name='pay_type'/>"
       + "<input type='hidden' id='pre_submit_order_count' name='pre_submit_order_count'/>"
       + "<input type='hidden' id='shop_id' name='shop_id'/>"
       + "<input type='hidden' id='is_package_order' name='is_package_order'/>"
       + "<input type='hidden' id='order_type' name='order_type'/>"
       + "<input type='hidden' id='parent_id' name='parent_id'/>"
 	   + "<input type='hidden' id='order_info' name='order_info'/>"
  	   + "<input type='hidden' id='product_ids' name='product_ids'/>"
  	   + "<input type='hidden' id='ship_type' name='ship_type'/>"
  	   + "<input type='hidden' id='pick_up_id' name='pick_up_id'/>"
  	   + "<input type='hidden' id='dq_status' name='dq_status'/>"
  	   + "<input type='hidden' id='pay_from' name='pay_from'/>"
  	   + "<input type='hidden' id='input_charset' name='input_charset'/>"
  	   + "<input type='hidden' id='partner_id' name='partner_id'/>"
       + "<input type='hidden' id='sign' name='sign'/>"
+ "</form>";

function submit_form() {
    $1('div_order_flow_submit').innerHTML = FORM_TEMPLETE;

    this.setHavePartOrder = function (is_package_order) {
        if (is_package_order == true)
            $1('is_package_order').value = 1;
        else
            $1('is_package_order').value = 0;
    }
    this.setPreSubmitOrderCount = function (pre_submit_order_count) {
        $1('pre_submit_order_count').value = pre_submit_order_count;
    }
    this.setOrderInfo = function (order_info) {
        $1('order_info').value = order_info;
    }

    this.setPayId = function (pay_id) {
        $1('pay_id').value = pay_id;
    }

    this.setProductIds = function (product_ids) {
        $1('product_ids').value = product_ids;
    }
    this.setPayType = function (pay_type) {
        $1('pay_type').value = pay_type;
    }
    this.setParent_id = function (parent_id) {
        $1('parent_id').value = parent_id;
    }

    this.setShopId = function (shop_id) {
        $1('shop_id').value = shop_id;
    }

    this.setOrderType = function (order_type) {
        $1('order_type').value = order_type;
    }
    this.setShipType = function (ship_type) {
        $1('ship_type').value = ship_type;
    }
    this.setPickUpID = function (pick_up_id) {
        $1('pick_up_id').value = pick_up_id;
    }
    this.setDqStatus = function (dq_status) {
        $1('dq_status').value = dq_status;
    }
    this.setPayFrom = function (pay_from) {
        $1('pay_from').value = pay_from;
    }
    this.setInputCharset = function (input_charset) {
        $1('input_charset').value = input_charset;
    }
    this.setPartnerId = function (partner_id) {
        $1('partner_id').value = partner_id;
    }
    this.setSign = function (sign) {
        $1('sign').value = sign;
    }
    this.submit = function (url) {
        $1('order_flow_submit').action = url;
        $1('order_flow_submit').submit();
    }


}

var GET_FORM_TEMPLETE = 
	"<form id='order_flow_get_submit' method='get'>"
	    + "<input type='hidden' id='grand_order_id' name='grand_order_id'/>"
	    + "<input type='hidden' id='pre_submit_count' name='pre_submit_count'/>"
	    + "<input type='hidden' id='order_type' name='order_type'/>"
	+ "</form>";
	function get_submit_form() {
	    $1('div_order_flow_submit').innerHTML = GET_FORM_TEMPLETE;
	    this.setGrandOrderId = function(grand_order_id){
	    	$1('grand_order_id').value = grand_order_id;
	    }
	    this.setPreSubmitCount = function(pre_submit_count){
	    	$1('pre_submit_count').value = pre_submit_count;
	    }
	    this.setOrderType = function(order_type){
	    	$1('order_type').value = order_type;
	    }
	    this.submit = function (url) {
	    	$1('order_flow_get_submit').action = url;
	    	$1('order_flow_get_submit').submit();
	    }


	}