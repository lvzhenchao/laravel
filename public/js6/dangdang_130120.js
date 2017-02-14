﻿var gFo1K3 = function () {
    var eqEN71 = new Ajax('/order/check');
    var i = 0;
    var urlSubstr = location.search.substr(1);
    eqEN71.OnSucceed
	(
		function (fsJYU) {
		    if (fsJYU != null && fsJYU['error_code'] == 0) {
		        new OrderFlow().show();
		        eqEN71.clearInterval();
		    }
		    else location.replace(fsJYU['shopping_cart_url']);
		}
	);
    eqEN71.invokeServer(urlSubstr, 'POST', true);
    eqEN71.OnInterval
	(
		function () {
		    eqEN71.Abort();

		    if (i < 1) {
		        eqEN71.invokeServer(urlSubstr, 'POST', true);
		    }
		    else {
		        eqEN71.clearInterval();
		        location.replace("http://static.dangdang.com/503error/error.html");
		    }
		    i = i + 1;
		}
	);
};
var userPassword;
//收货信息相关
var RECEIVING_RELEVANT_INFORMATION = '<h3 class="order-h3"><span>收货相关信息</span></h3>'
        + '<div class="order-box">'
            + '<div class="order-info">'
                + '<div class="cont" id="receivingInfo">'
                + '<div id="div_consignee"></div>'
                + "<div id='div_mobilecust'></div>"
				+ "<div class='item-list' id='div_self_pickup'>"
					
				+"</div>"
                + '<div class="item-list" id="shipmentList">'
                + '<h4 style="display:none">送货方式<a class="ml-15" href="javascript:for_99click();" id="shipmentCollapse">修改</a></h4>'
                + '</div>'
                + '<div class="item-list" id="paymentList">'
                + '<h4 style="display:none">支付方式<a class="ml-15" href="javascript:for_99click();" id="paymentCollapse">修改</a></h4>'
                + '</div>'
                + '<div class="item-list" id="invoiceList">'
                + '<h4 style="display:none">发票信息<a class="ml-15" href="javascript:for_99click();" id="invoiceCollapse">修改</a></h4>'
                + '</div>'
                + '<div id="div_mobileplan" class="item-contact contact-form"></div>'
            + '</div>'
        + '</div>';

//var SHIPMENT_READONLY_TEMPLATE_LEVEL_ONE = "<p class='listcon'>订单{SortNums}：<span class='mr-10'>{ShipTypeName}</span><span class='mr-10'>{ship_date_name}</span></p>";

//购物清单相关
var RPT_ORDER_ITEMTEMPLATE =
		  "<h3 id='order_title_{order_sequence_id}' class='order-h3' >"
		+ "<span>订单<span id='order_sort_number_{order_sequence_id}'>{sort_num}</span></span>"
		+ "<small>(<span id='order_sender_description_{order_sequence_id}'>{sender_description}</span>)</small>"
		+ "<a title='' href='###' id='part_order_tips_{order_sequence_id}' class='{single_order}' >为什么分订单?</a>"

        + "  <div  id='part_order_tips_box_{order_sequence_id}' class='popup-wrap popup-normal' style='left:10px;margin-top:-100px; display:none;'>"
    + " <div  class='popup-title'>"
    + "     <h3>为什么分订单？</h3>"
    + "     <a class='btn-popup-close' href=\"javascript:void(0)\" id='part_order_tips_close_{order_sequence_id}'  ></a>"
    + "  </div>"
    + "  <div class='popup-cont'>"
    + "     <p>由于您购买的商品是由不同商家配送的，因此需要分订单。</p>"
    + "  </div> "
    + " </div> "

		+ "</h3>"
		+ "<div id='div_orderflow_{order_sequence_id}' class='order-box'></div>";

function OrderFlow() {
	var objDegradationNoticeDialog = new DegradationNoticeDialog("degradation_notice_dialog");
    var order_flow_ajax = new Ajax('/order/getInfo');
    var submit_ajax = new Ajax('/order/submit');

    var objTips = new Tips('div_checkout_tips');
    var objSummary = new Summary('div_summary');
    var objCoupon = new Coupon('div_coupon');
    var order_items = new JSRepeater('rpt_order');

    var obj_submit_form = new submit_form();
    var obj_get_submit_form = new get_submit_form();
    var obj_checkcattle = new checkcattle();
	var obj_serviceIm = new serviceIm();
	var objSpuLimit = new SpuLimit();
    var ojbOrders = [];
    var need_first_cod_valid = false;
    var is_loaded = false;
    var dd_need_send_order_sms = null;
    var is_cattle = 0;
    var is_have_limit_product = 0;
    var IsShowShipmentLevelOne = null;
    var IsShowPaymentLevelOne = null;
    //返回买一增多删除的缺货商品集合
    var lackProds = "";
    var flag = 0;
	//spu限购商品列表
	var spuLimits = null;
	var checkoutType=0;
    var self = this;

    objCoupon.setCouponSubmit
		(
							function (result) {
							    RefreshNoCash(result);
							    SynchronizeOrder(result);
							}
		);

    objCoupon.setCouponCancel
		(
							function (result) {
							    RefreshNoCash(result);
							    SynchronizeOrder(result);
							}
		);
    objCoupon.setCashSubmitSuccessCallback(
        function (result) {
            RefreshNoCash(result);
        });
    objCoupon.setGiftcardSubmitSuccessCallback(
       function (result) {
           RefreshNoCash(result);
       });
    objCoupon.setPointSubmitSuccessCallback(
       function (result) {
           RefreshNoCash(result);
       });
	objSpuLimit.setBackCartSuccessCallback
	(
		function (result, is_gift_package_refresh) {
			if (result["cart_items_count"] == null || result["cart_items_count"] == 0) {
				location.replace(result["shoping_cart_url"]);
				return;
			}
			RefreshOrder(result, is_gift_package_refresh);
			SynchronizeOrder(result);
		}
	);

    objSummary.setSubmit
(

function (ssign, shop_id, pay_password, firtKey, mobileNumber, product_ids, sk_action_id, presale_mobile) {
    if (is_loaded) {
        return;
    }

    for (var j = 0; j < ojbOrders.length; j++) {
        if (!ojbOrders[j].isEditStatus())
            return;
        lackProds = ojbOrders[j].getLackProds(lackProds);
    }
    if (!obj_checkcattle.check(is_cattle, is_have_limit_product)) {
        return;
    }
	//提交订单时，验证如果有spu限购商品，阻止提交订单流程，并弹出限购商品窗口，
	if(objSpuLimit.check(spuLimits)){
		objSpuLimit.setDataSource(spuLimits);
		objSpuLimit.setCheckoutType(checkoutType);
		objSpuLimit.show();
		return;
	}
	var cattleSafeReturnData = $("#return_data").val();
    is_loaded = true;
    submit_ajax.OnReading
    (
        function () {
            objSummary.setDisabled();
            showWindowLoading('window_loading');
        }
    );
    submit_ajax.OnSucceed
    (
           function (result) {
               objSummary.setEnabled(); //提交完成但没有转向按钮恢复可用
               hideLocSelect('window_loading');
			   var toErrorPage = false;
               if (result != null && result['error_code'] == 0) {
                   objSummary.setSubmitErrorTips('');
//                   var is_first_cod = result['is_first_cod'];
//                   var pay_id = result['pay_id'];
//                   var pay_type = result['pay_type'];
//                   //2014-5-14 如果是联通合约机订单，则调用提交订单成功页时，把order_type虚拟为10010，为了和自营订单做区分
//                   if (result['order_list'][0].order_products_type == 80) {
//                       order_type = 10010;
//                   }
//                   obj_submit_form.setPayId(pay_id);
//                   obj_submit_form.setPayType(pay_type);
//                   obj_submit_form.setShopId(result['shop_id']);                   
//                   obj_submit_form.setHavePartOrder(result['have_part_order']);
//                   obj_submit_form.setOrderInfo(result['order_info']);
//                   obj_submit_form.setParent_id(result['parent_id']);
//                   obj_submit_form.setPreSubmitOrderCount(result['pre_submit_order_count']);
//                   obj_submit_form.setOrderType(result['order_type']);                   
//                   obj_submit_form.setProductIds(result['product_ids']);
//                   obj_submit_form.setShipType(result['ship_type']);
//                   obj_submit_form.setPickUpID(result['pick_up_id']);
//                   obj_submit_form.setDqStatus(result['dq_status']);
//                   obj_submit_form.setPayFrom(result['pay_from']);
//                   obj_submit_form.setInputCharset(result['input_charset']);
//                   obj_submit_form.setPartnerId(result['partner_id']);
//                   obj_submit_form.setSign(result['sign']);
                   
                   var grand_order_id = result['grand_order_id'];
                   var pre_submit_count = result['pre_submit_count'];
                   var order_type = result['order_type'];
                   obj_get_submit_form.setGrandOrderId(grand_order_id);
                   obj_get_submit_form.setPreSubmitCount(pre_submit_count);
                   obj_get_submit_form.setOrderType(order_type);
                   obj_get_submit_form.submit(BASE_PATH + '/cashier/');
//                   if (is_first_cod && pay_type == 0 && need_first_cod_valid)//第一张货到付款订单需要验证
//                       obj_submit_form.submit('phone_valid.aspx');
//                   else if (pay_type == 1)
//                       obj_submit_form.submit('http://cashier.dangdang.com/cashier.aspx?grand_order_id=' + grand_order_id + '&pre_submit_count=' + pre_submit_count + '&order_type=' + order_type);
//                   else
//                       obj_submit_form.submit('http://cashier.dangdang.com/cashier.aspx?grand_order_id=' + grand_order_id + '&pre_submit_count=' + pre_submit_count + '&order_type=' + order_type);
               }
               else {
               	   //error_code为99003表示宝贝在书里的商品进结算页，但是来源不合法，跳转到错误页面
	               if(result['error_code'] == 99003){
	               	   location.href = result['error_url'];
                       return;
	               }
            	   if (result['error_code'] == 2015) {
                       location.href = result['net_checkout'];
                       return;
                   }
				   //如果购物车没有商品，则跳回到购物车
				   if(result['error_code'] == 10102){
					   location.replace(result['shopping_cart_url']);
                       return;
				   }
                   is_loaded = false;
                   objSummary.setSubmitErrorTips('');
                   if (result['is_change_vcode']) {
                       ddvcode.show_vcode("sign_img");
                   }
                   if (result['error_code'] == 7) {
                       location.replace(result['shopping_cart_url']);
                       return;
                   }
                   if (result['error_code'] == 1204) {
                       location.replace(result["sk_action_url"]);
                       return;
                   }
                   if (result['error_code'] == 11) {
                       $s($1('div_yzm_word'));
                       changeYZMMarked();

                       if (objSummary.isNoSafeIp()) {
                           objSummary.setSubmitErrorTips('请填写正确的验证码');
                       }
                       else {
                           objSummary.setSubmitErrorTips('请填写验证码');
                       }

                       objSummary.setYzmStatus(true);
                       return;
                   }
                   if (result['error_code'] == 12) {
                       //alert("请填写正确的验证码！");
                       objSummary.setSubmitErrorTips(result['city_desc']);
                       return;
                   }

                   if (result['error_code'] == 17) {
                       $s($1('div_yzm_word'));
                       changeYZMMarked();
                       objSummary.setSubmitErrorTips('请填写正确的验证码');
                       objSummary.setYzmStatus(true);
                       return;
                   }
                   if (result['error_code'] == 19) {
                       objSummary.setSubmitErrorTips('请输入正确的支付密码');
                       return;
                   }
                   if (result['error_code'] == 18) {
                       objSummary.setSubmitErrorTips('请设置支付密码');
                       return;
                   }
                   if (result['error_code'] == 40610) {
                       objSummary.setSubmitErrorTips('请修改购买礼品卡金额至1万元以下方可正常提交订单，如需购买礼品卡金额1万元（含）以上，请致电400 106 6666转6，联系当当网企业销售部购买。');
                       return;
                   }
				   //节能减排温馨提示
				   if (result["error_code"] == 728) {
						alert("节能补贴仅面向北京地区的用户，收件人请使用和身份证号对应的真实姓名，且配送地址必须为北京市。");
						return;
				   }
				   //收货地址冲突
				   if (result["error_code"] == 40731) {
                       var flag = true;
                       var currOrder = ojbOrders[0];
                       for (var j = 0; j < ojbOrders.length; j++) {
                           for (var k = 0; k < result['order_list'].length; k++) {
                               if (ojbOrders[j].isCurrentOrder(result['order_list'][k]['order_sequence_id']) && result['order_list'][k]["is_overseas"]) {
                                   if (flag) {
                                       currOrder = ojbOrders[j];
                                       flag = false;
                                   }
                                   break;
                               }
                           }
                       }
                       currOrder.setConsigneeDataSource(result);
                       currOrder.consigneeRefresh();
                       return;
                   }
				   if (result["error_code"] == 40710) {
					   for (var j = 0; j < ojbOrders.length; j++) {
						   ojbOrders[j].showInvoice();
                       }
					   return;
				   }
                   $h($1('order_submit_error_tips_bar'));
                   //报缺提示
                   for (var j1 = 0; j1 < ojbOrders.length; j1++) {
                       var order_item = result;
					   if(order_item['order_list']==null){
						   toErrorPage = true;
						   break;
					   }
                       ojbOrders[j1].setProduct(order_item['order_list'][j1]);
                   }
                   if(result["error_code"]==40733){
                	   //order_flow_ajax_succeed(result);
                	   window.location.reload();
                	   return ;
                   }
                   //提交订单时候的降级处理 ||30302||30304||30305 ||40504
                   if(result["error_code"]==30111||result["error_code"]==30302||result["error_code"]==30304||result["error_code"]==30305 || (result["error_code"]==40504 && result["coupon_type"]>0)){
                	   objDegradationNoticeDialog.show(self);
                	   return ;
                   }
               }
			   if(toErrorPage==true){
				  submit_ajax.Abort();
				  location.replace("http://static.dangdang.com/503error/error.html");
			   }
           }
    );
    sk_action_id = sk_action_id == 0 ? '' : sk_action_id;
      submit_ajax.invokeServer('AYH=' + ssign + '&shop_id=' + shop_id + '&need_send_order_sms=' + dd_need_send_order_sms + '&pay_password=' + pay_password + '&lack_product_ids=' + lackProds + '&firt_key=' + firtKey + '&mobile_number=' + mobileNumber + '&cattle_safe_return_data=' + cattleSafeReturnData + '&sk_action_id=' + sk_action_id + '&product_ids=' + product_ids + '&presale_mobile=' + presale_mobile, 'POST', false);
      submit_ajax.OnTimeout
     (
        function () {
            submit_ajax.Abort();
            objSummary.setEnabled(); //提交完成但没有转向按钮恢复可用
            hideLocSelect('window_loading');
        }
    );
}
);

    //0318在页面打开的时候，显示礼券/帐户余额部分
    var order_flow_ajax_succeed = function (result) {
        userPassword = result["login_key"];
        objTips.show(); //温馨提示ajax入口写在这里
        is_cattle = result["is_cattle"];
        is_have_limit_product = result["is_have_limit_product"];
		spuLimits = result["spu_limit_buys"];
		checkoutType = result["checkout_type"];
        //temp
        var order_array = result['order_list'];
		if (result["error_code"] == 1206) {
		    location.replace(result["crowdfunding_url"]);
		    return;
	    }
        if (result["order_flow_invalid_code"] != 0 || result["cart_items_count"] == null || result["cart_items_count"] == 0) {
            location.replace(result["shopping_cart_url"]);
            return;
        }

        if ($('#receivingInfo').length <= 0)
            $('#rpt_order').before(RECEIVING_RELEVANT_INFORMATION);


        order_items.ItemTemplate = RPT_ORDER_ITEMTEMPLATE;
        order_items.DataSource = order_array;
        order_items.onItemDataBind = function (dataItem, obj_tpl) {
            if (order_array.length == 1) {
                //order_array[0]["sort_num"] = "";
                dataItem['single_order'] = 'hide';
            }
        };
        order_items.DataBind();
        UpdataCouponAndSummary(result);
        showShipmentLevelOne(result);

        showPaymentLevelOne(result);

        showInvoiceLevelOne(result);


        for (var i = 0; i < order_array.length; i++) {
            var objOrder = new Order('div_orderflow_' + order_array[i]['order_sequence_id'],
                order_array[i]['order_sequence_id'],
                order_array[i]['order_products_type']);
            objOrder.setDataSource(order_array[i]);
            if (order_array[i]['order_sequence_id'] == "0_0") {
                if (result["gift_package"] != null) {
                    objOrder.setGiftPackageDataSource(result["gift_package"][0]);
                }
            }
            objOrder.setConsigneeDataSource(result);
            objOrder.setShowConsignee(result["is_show_consignee"]);
            objOrder.setFirstCheckout(result["is_first_checkout"]);
			objOrder.setShowSelfPickup(result["is_show_self_pickup"]);
			objOrder.setOrderFlowInfo(result);
            ojbOrders[i] = objOrder;
            objOrder.show();

            objOrder.setPieceBuySuccess(
                function (result) {
                    RefreshOrder(result);
                }
            );

            objOrder.setSubmitErrorTips(
                function (submit_error_tips) {
                    objSummary.setSubmitErrorTips(submit_error_tips);
                }
            );

            //objOrder.setDdMoneySubmit(
            //    function (result) {
            //        RefreshNoCash(result);
            //        SynchronizeOrder(result);
            //    }
            //);

            //objOrder.setDdMoneyCancel(
            //    function (result) {
            //        RefreshNoCash(result);
            //    }
            //);

            //objOrder.setCustCashSubmit(
            //    function (result) {
            //        RefreshNoCash(result);
            //    }
            //);

            //objOrder.setCustCashCancel(
            //    function (result) {
            //        RefreshNoCash(result);
            //    }
            //);

            //objOrder.setGiftCardBindSubmit(
            //    function (result) {
            //        for (var j = 0; j < ojbOrders.length; j++) {
            //            ojbOrders[j].activeDDMoney(result['face_value']);
            //        }
            //    }
            //);

            objOrder.setConsigneeSave(
                function (result, order_sequence_id, cur_order, inherit_status) {
                    var flag = true;
                    for (var j = 0; j < ojbOrders.length; j++) {
                        result['order_list'].each(function (item) {
                            if (ojbOrders[j].isCurrentOrder(item['order_sequence_id'])) {
                                ojbOrders[j].setDataSource(item);
                                ojbOrders[j].setConsigneeDataSource(result);
								if (flag) {
                                    ojbOrders[j].saveConsigneeRefreshCurConsignee();
                                    flag = false;
                                }
								ojbOrders[j].saveConsigneeRefreshOtherInfo();
                            }
                        });
                    }
                    UpdataCouponAndSummary(result);
                }
            );
            objOrder.setMobileCustSave(function (result, order_sequence_id, cur_order) {
                for (var j = 0; j < ojbOrders.length; j++) {
                    result['order_list'].each(function (item) {
                        if (ojbOrders[j].isCurrentOrder(item['order_sequence_id']) && item['order_sequence_id'] == order_sequence_id) {
                            cur_order = item;
                            ojbOrders[j].setDataSource(item);
                            ojbOrders[j].mobileCustRefresh();
                        }
                    });
                }
                UpdataCouponAndSummary(result);
            });
            objOrder.setShipmentSave(
                function (result, order_sequence_id, cur_order, inherit_status) {
                    showShipmentLevelOne(result);
                    IsShowShipmentLevelOne = result['is_show_shipment_level_one'];
                    //RefreshOrder(result, true);
                    //SynchronizeOrder(result);
                    
                    $('#shipmentList>div.item-list').show();
                    //不同订单合并一起发货
                	togetherSend.showCheckBox();
                    togetherSend.bindtogetherSend(result);
                    
                    for (var j = 0; j < ojbOrders.length; j++) {
                        result['order_list'].each(function (item) {
                            if (ojbOrders[j].isCurrentOrder(item['order_sequence_id'])) {
                                if (item['order_sequence_id'] == order_sequence_id) {
                                    cur_order = item;
                                    ojbOrders[j].setDataSource(item);
                                    ojbOrders[j].shipmentRefresh();

                                }
                                else if (item["order_type"] == 50 || item["order_type"] == 98) {
                                    cur_order = item;
                                    ojbOrders[j].setDataSource(item);
                                    ojbOrders[j].shipmentRefresh();
                                }
                                else {
                                    if ((result['cust_cash_used'] && result['cust_cash_used'] > 0) || (result['coupon_type'] && result['coupon_type'] > 0)) {//用户使用了余额，或者礼品卡，礼券积分，区域促销码，需要刷新支付方式区域，因为分摊会变化
                                        ojbOrders[j].setDataSource(item);
                                        ojbOrders[j].paymentRefresh();
                                    }

                                    if (!inherit_status) {
                                        if (item['cur_edit_step'] == -1 || item['cur_edit_step'] > 1) {
                                            ojbOrders[j].shipmentInherit(cur_order);
                                        }
                                    }
                                }
                            }
                        });
                    }
                    UpdataCouponAndSummary(result);
                }
            );

            objOrder.setPaymentSave(
                function (result, order_sequence_id, cur_order, inherit_status) {
                    showPaymentLevelOne(result);
                    IsShowPaymentLevelOne = result['is_show_payment_level_one'];
                    for (var j = 0; j < ojbOrders.length; j++) {
                        result['order_list'].each(function (item) {
                            if (ojbOrders[j].isCurrentOrder(item['order_sequence_id'])) {
                                if (item['order_sequence_id'] == order_sequence_id) {
                                    cur_order = item;
                                    ojbOrders[j].setDataSource(item);
                                    ojbOrders[j].paymentRefresh();
                                } else {
                                    if (!inherit_status) {
                                        ojbOrders[j].paymentInherit(cur_order);
                                    }
                                }
                            }
                        });
                    }
                    UpdataCouponAndSummary(result);
                }
            );

            objOrder.setInvoiceSave(
                function (result, invoice_data, order_sequence_id) {
                    //更新一级节点信息
                    showInvoiceLevelOne(result);
                    if ($('#invoiceCollapse').text() == "收起" && $('#invoiceList>div.item-list').length == 1
                    		&& $('#invoiceList>div.item-list').find('.item-invoice').length == 0) {
                        $('#invoiceList>p.listcon').show();
                        $('#invoiceList>div.item-list').hide();
                        $('#invoiceCollapse').text('修改');
                    }
                    for (var j = 0; j < ojbOrders.length; j++) {
                        if (!ojbOrders[j].isCurrentOrder(order_sequence_id) && ojbOrders[j]['order_type'] != 50) {
                            ojbOrders[j].invoiceInherit(invoice_data);
                        }
                    }
                }
            );

            objOrder.setDeleteCartItemCallback(
                function (result, is_gift_package_refresh) {
                    if (result["cart_items_count"] == null || result["cart_items_count"] == 0) {
                        location.replace(result["shoping_cart_url"]);
                        return;
                    }
                    RefreshOrder(result, is_gift_package_refresh);
                    SynchronizeOrder(result);
                }
            );


            objOrder.setPayPasswordStatus(
                function (status) {
                    if (status && (!result['is_set_payment_password'] && result['payment_password_enabled'] == 1 && $1('div_pay_password').style.display == "none")) {
                        ojbOrders.each(function (item) {
                            item.updatePayPasswordStatus(true);
                        });
                    } else {
                        ojbOrders.each(function (item) {
                            item.updatePayPasswordStatus(false);
                        });
                    }
                }
            );
            objOrder.setPackingTypeChanged(function (result) {
                RefreshPackingType(result);
            });

            objOrder.setGiftPackageSubmit(
                function (result) {
                    RefreshOrder(result, true);
                    UpdataSummary(result);
                }
            );
        }
        //处理跨订单的情况
        //如果交易单上有展开的三级节点，则本订单发票需要隐藏一级节点并展示二级节点
        //注意处理含有虚拟礼品卡的情况
        for (var i = 0; i < order_array.length; i++) {
            if (($('#div_invoice_expand_' + order_array[i]['order_sequence_id']).length > 0) || ($('#edit_invoice_vgc').length > 0 && $('#edit_invoice_vgc:hidden').length == 0)) {
                flag = 1;
                break;
            }
        }
        if (flag == 1) {
            $('#invoiceList>p.listcon').hide();
            //展示二级节点,这之前订单的二级节点也要显示
            $('#invoiceList>div.item-list').show();
            $('#invoiceCollapse').text('收起');
        }
        IsShowShipmentLevelOne = result['is_show_shipment_level_one'];
        IsShowPaymentLevelOne = result['is_show_payment_level_one'];
        $('#shipmentCollapse').unbind('click').click(function () { btnShipmentCollapseClick(result); });
        $('#paymentCollapse').unbind('click').click(function () { btnpaymentCollapseClick(); });
        $('#invoiceCollapse').unbind('click').click(function () { btninvoiceCollapseClick(result['is_show_invoice_level_one']); });
        if ($('#shipmentList>p.listcon').length == 1 && $('#shipmentList>p.listcon>span:first').html() == "自动发货") {
            $('#shipmentCollapse').click();
        }
		try {
            obj_serviceIm.load(result);//小能客服
        }
        catch (e) { }
    };

    //加载送货方式一级展示
    var showShipmentLevelOne = function (result) {
        if (result['is_show_shipment_level_one'] == true) {
            $('#shipmentList>p.listcon').remove();
            var shipmentsHtml = '';
            for (var j = 0; j < result['shipment_groups'].length; j++) {
                var shipmentGroup = result['shipment_groups'][j];
                shipmentsHtml += '<p id="shipmentGroup_' + shipmentGroup.sort_nums + '" class="listcon" style="display:none" sortNum=' + shipmentGroup.sort_nums + '>订单' + shipmentGroup.sort_nums + '：<span class="mr-10">'
                    + shipmentGroup.ship_type_name + '</span><span class="mr-10">' + new Shipment().getShipDateTypeName(shipmentGroup.ship_date_type) + '</span></p>';
            }
            $('#shipmentList').append(shipmentsHtml);
        }
    };

    var showPaymentLevelOne = function (result) {
        if (result['is_show_payment_level_one'] == true) {
            $('#paymentList>p.listcon').remove();
            var paymentsHtml = '';
            for (var j = 0; j < result['payment_groups'].length; j++) {
                var paymentGroup = result['payment_groups'][j];
                paymentsHtml += '<p id="paymentGroup_' + paymentGroup.sort_nums + '" class="listcon" style="display:none">订单' + paymentGroup.sort_nums + '：<span class="mr-10">'
                    + paymentGroup.pay_type_name + '</span></p>';
            }
            $('#paymentList').append(paymentsHtml);
        }
    };

    var showInvoiceLevelOne = function (result) {
        if (result['is_show_invoice_level_one'] == true) {
            $('#invoiceList>p.listcon').remove();
            var invoicesHtml = '';
            for (var j = 0; j < result['invoice_groups'].length; j++) {
                var invoiceGroup = result['invoice_groups'][j];
                var info = "";
                if (invoiceGroup.invoice_category == InvoiceCategory.PaperInvoice) {
                    info = invoiceGroup.invoice_title + "&nbsp;&nbsp;&nbsp;&nbsp;发票内容：" + invoiceGroup.invoice_content;
                }
                else if (invoiceGroup.invoice_category == InvoiceCategory.VatInvoice) {
                    info = "增值税专用发票&nbsp;&nbsp;&nbsp;&nbsp;发票内容：" + invoiceGroup.invoice_content;
                }
                else if (invoiceGroup.invoice_category == InvoiceCategory.ElectronInvoice) {
                    info = "电子发票&nbsp;&nbsp;&nbsp;&nbsp;";
                    var titleLength = 20;
                    if(invoiceGroup.invoice_title.length > titleLength){
                    	info += invoiceGroup.invoice_title.substr(0, titleLength) + '...';
                }
                else {
                    	info += invoiceGroup.invoice_title;
                    }
                    if(invoiceGroup.content_value){
                    	info += "&nbsp;&nbsp;&nbsp;&nbsp;发票内容：" + invoiceGroup.invoice_content;
                    }
                    if(invoiceGroup.invoice_book_content){
                    	info += "&nbsp;&nbsp;&nbsp;&nbsp;图书发票内容：" + invoiceGroup.invoice_book_content;
                    }
                    if(invoiceGroup.invoice_nonbook_content){
                    	info += "&nbsp;&nbsp;&nbsp;&nbsp;非图书发票内容：" + invoiceGroup.invoice_nonbook_content;
                    }
                }
                else {
                    info = "暂不需要发票";
                }
                invoicesHtml += '<p id="invoiceGroup_' + invoiceGroup.sort_nums + '" class="listcon" style="display:none">订单' + invoiceGroup.sort_nums + '：<span class="mr-10">'
                    + info + '</span><font id="group_tips" color=\"#FF2832\" style="display:none">您的订单应付金额为0元，不可开发票</font></p>';
            }
            $('#invoiceList').append(invoicesHtml);
            if(parseFloat(result['payable_amount']) + parseFloat(result['cust_cash_used']) <= 0){
            	$('#group_tips').show();
            }else{
            	$('#group_tips').hide();
            }
        } else {
            $('#invoiceList').hide();
        }
    };
    
    //为送货方式一级展示的修改绑定事件
    var btnShipmentCollapseClick = function (result) {
        if (IsShowShipmentLevelOne && $('#shipmentList>div.item-list:hidden').length > 0) {
            $('#shipmentList>p.listcon').hide();
            $('#shipmentList>div.item-list').show();
   
            //不同订单合并一起发货
            togetherSend.showCheckBox();
            togetherSend.bindtogetherSend(result);
            $('#shipmentCollapse').text('收起');
            if ($('#shipmentList>div.item-list').length == 1) {
                $('#shipmentList>div.item-list>p>a').click();

                if ($('#shipmentList>div.item-list>p>span:first').html() == "自动发货") {
                    $('#shipmentCollapse').text('');
                }
            }
        }
        else if ($('#shipmentList>div.item-list>div.item-ship').length <= 0 && $('#shipmentList>p.listcon:hidden').length > 0) {
            $('#shipmentList>p.listcon').show();
            $('#shipmentList>div.item-list').hide();
            $("#together_send_id").hide();
            $('#shipmentCollapse').text('修改');
        }
    };
    //为支付方式一级展示的修改绑定事件
    var btnpaymentCollapseClick = function () {
        if (IsShowPaymentLevelOne && $('#paymentList>div.item-list:hidden').length > 0) {
            $('#paymentList>p.listcon').hide();
            $('#paymentList>div.item-list').show();
            $('#paymentCollapse').text('收起');
            if ($('#paymentList>div.item-list').length == 1) {
                $('#paymentList>div.item-list>p>span>a').click();
            }
        }
        else if ($('#paymentList>div.item-list>div.item-pay').length <= 0 && $('#paymentList>p.listcon:hidden').length > 0) {
            $('#paymentList>p.listcon').show();
            $('#paymentList>div.item-list').hide();
            $('#paymentCollapse').text('修改');
        }
    };
    var btninvoiceCollapseClick = function (isShowInvoiceLevelOne) {
        var isVcardLevelexpand = $('#edit_invoice_vgc').length > 0 && $('#edit_invoice_vgc:hidden').length == 0;//礼品卡订单三级节点展开
        var isHasLevelexpand = false;
        if (isVcardLevelexpand) {
            //有礼品卡前展开的情况
            isHasLevelexpand = true;
        } else {//有礼品卡且为展开或者不含礼品卡
            if ($('#edit_invoice_vgc').length > 0) {
                if ($('#invoiceList>div.item-list>div.item-invoice').length-1>0) {
                    isHasLevelexpand = true;
                }
            } else {
                if ($('#invoiceList>div.item-list>div.item-invoice').length > 0) {
                    isHasLevelexpand = true;
                }
            }
        }
        if (isShowInvoiceLevelOne && $('#invoiceList>div.item-list:hidden').length > 0) {
            $('#invoiceList>p.listcon').hide();
            $('#invoiceList>div.item-list').show();
            $('#invoiceCollapse').text('收起');
            if ($('#invoiceList>div.item-list').length == 1) {
                $('#invoiceList>div.item-list>p>a').click();
            }
        }
        //else if (($('#invoiceList>div.item-list>div.item-invoice').length <= 0 || $('#invoiceList>div.item-list>div.item-invoice:hidden').length > 0) && $('#invoiceList>p.listcon:hidden').length > 0) {
        //其他类型订单三级节点展开
        else if ($('#invoiceList>p.listcon:hidden').length > 0 && !isHasLevelexpand) {//只有二级节点展开的时候可以合并到一级节点
            $('#invoiceList>p.listcon').show();
            $('#invoiceList>div.item-list').hide();
            $('#invoiceCollapse').text('修改');
        }
    };


    function SynchronizeOrder(orderflow_data) {
        for (var m = 0; m < ojbOrders.length; m++) {
            var remove_status = true;
            var obj_order_title = $1("order_title_" + ojbOrders[m].getOrderSequenceId());
            var obj_order = $1("div_orderflow_" + ojbOrders[m].getOrderSequenceId());
            var currentOrderShipment = $('#div_shipment_' + ojbOrders[m].getOrderSequenceId());
            var currentOrderPayment = $('#div_payment_' + ojbOrders[m].getOrderSequenceId());
            var currentOrderInvoice = $('#div_invoice_' + ojbOrders[m].getOrderSequenceId());
            for (var n = 0; n < orderflow_data['order_list'].length; n++) {
                if (ojbOrders[m].isCurrentOrder(orderflow_data['order_list'][n]['order_sequence_id'])) {
                    remove_status = false;
                }
            }
            if (ojbOrders.length < orderflow_data['order_list'].length) {
                order_flow_ajax_succeed(orderflow_data);
            }
            else {
                if (remove_status) {
                    $h(obj_order_title);
                    $h(obj_order);
                    currentOrderShipment.remove();
                    currentOrderPayment.remove();
                    currentOrderInvoice.remove();
                    ojbOrders[m].setEditStatus(false);
                }
                if (!remove_status) {
                    $s(obj_order_title);
                    $s(obj_order);
                    ojbOrders[m].setEditStatus(true);
                }
            }
            if ($('#shipmentCollapse').text() == "收起" && $('#shipmentList>div.item-list').length == 1) {
                if ($('#shipmentList>div.item-list>p>span:first').html() == "自动发货") {
                    $('#shipmentCollapse').text('');
                } else {
                    $('#shipmentList>p.listcon').show();
                    $('#shipmentList>div.item-list').hide();
                    $('#shipmentCollapse').text('修改');
                }
            }
            else if ($('#shipmentCollapse').text() == "修改" && $('#shipmentList>div.item-list').length == 1 && $('#shipmentList>div.item-list>p>span:first').html() == "自动发货") {
                $('#shipmentList>p.listcon').hide();
                $('#shipmentList>div.item-list').show();
                $('#shipmentCollapse').text('');
            }
            if ($('#paymentCollapse').text() == "收起" && $('#shipmentList>div.item-list').length == 1) {
                $('#paymentList>p.listcon').show();
                $('#paymentList>div.item-list').hide();
                $('#paymentCollapse').text('修改');
            }
            if ($('#invoiceCollapse').text() == "收起" && $('#invoiceList>div.item-list').length == 1) {
                $('#invoiceList>p.listcon').show();
                $('#invoiceList>div.item-list').hide();
                $('#invoiceCollapse').text('修改');
            }
        }

    }


    function RefreshNoCash(order_flow_data) {
    	showShipmentLevelOne(order_flow_data);
    	$('#shipmentList>p.listcon').hide();
        $('#shipmentList>div.item-list').show();
        $('#shipmentCollapse').text('收起');
    	togetherSend.showCheckBox();
        togetherSend.bindtogetherSend(order_flow_data);
        showPaymentLevelOne(order_flow_data);
        $('#paymentList>p.listcon').hide();
        $('#paymentCollapse').unbind('click').click(function () { btnpaymentCollapseClick(); });
        $('#paymentList>div.item-list').show();
        $('#paymentCollapse').text('收起');
        showInvoiceLevelOne(order_flow_data);
        $('#invoiceList>p.listcon').hide();
        $('#invoiceCollapse').unbind('click').click(function () { btninvoiceCollapseClick(order_flow_data['is_show_invoice_level_one']);  });
        $('#invoiceList>div.item-list').show();
        $('#invoiceCollapse').text('收起');
        for (var j = 0; j < ojbOrders.length; j++) {
            for (var k = 0; k < order_flow_data['order_list'].length; k++) {
                if (ojbOrders[j].isCurrentOrder(order_flow_data['order_list'][k]['order_sequence_id'])) {
                    ojbOrders[j].setDataSource(order_flow_data['order_list'][k]);
                    ojbOrders[j].refreshNoCash();
                }
            }
        }
        UpdataCouponAndSummary(order_flow_data);
    }
    function RefreshPackingType(order_flow_data) {
        for (var j = 0; j < ojbOrders.length; j++) {
            for (var k = 0; k < order_flow_data['order_list'].length; k++) {
                if (ojbOrders[j].isCurrentOrder(order_flow_data['order_list'][k]['order_sequence_id'])) {
                    ojbOrders[j].setDataSource(order_flow_data['order_list'][k]);
                    ojbOrders[j].refreshPackingType();
                }
            }
        }
        UpdataCouponAndSummary(order_flow_data);
    }
    function RefreshOrder(order_flow_data, is_gift_package_refresh) {
        IsShowShipmentLevelOne = order_flow_data['is_show_shipment_level_one'];
        showShipmentLevelOne(order_flow_data);
        showPaymentLevelOne(order_flow_data);
        showInvoiceLevelOne(order_flow_data);
		is_cattle = order_flow_data["is_cattle"];
		spuLimits = order_flow_data["spu_limit_buys"];
		checkoutType = order_flow_data["checkout_type"];
        //如果当前的所有订单都不需要收货地址，则隐藏收货地址区域
        if (order_flow_data["is_show_consignee"] == 0) {
            $('#div_consignee').hide();
        }

        for (var j = 0; j < ojbOrders.length; j++) {
            for (var k = 0; k < order_flow_data['order_list'].length; k++) {
                if (ojbOrders[j].isCurrentOrder(order_flow_data['order_list'][k]['order_sequence_id'])) {
                    ojbOrders[j].setShowConsignee(order_flow_data["is_show_consignee"]);
                    ojbOrders[j].setFirstCheckout(order_flow_data["is_first_checkout"]);
                    ojbOrders[j].setDataSource(order_flow_data['order_list'][k]);
					ojbOrders[j].setConsigneeDataSource(order_flow_data);
					if(order_flow_data["is_show_consignee"] == 1){
                    ojbOrders[j].consigneeRefresh();
					}
                    ojbOrders[j].refreshOrder(is_gift_package_refresh);
                }
            }
        }
        UpdataCouponAndSummary(order_flow_data);
    }

    function UpdataCouponAndSummary(order_flow_data) {
        objCoupon.setDataSource(order_flow_data);
        objCoupon.show();
        objSummary.setDataSource(order_flow_data);
        objSummary.show();
    }

    function UpdataSummary(order_flow_data) {
        objSummary.setDataSource(order_flow_data);
        objSummary.show();
    }

    order_flow_ajax.OnSucceed
		(
				function (result) {
				    if (result != null && result['error_code'] == 0) {
				        order_flow_ajax_succeed(result);
				        order_flow_ajax.clearInterval();
				    }else{
						order_flow_ajax.clearInterval();
						location.replace("http://static.dangdang.com/503error/error.html");
					}
				    $S('div_ajax_canvas');
				    $H('order_flow_loading');
				    $S('order_flow_summary');
				}
		);
    order_flow_ajax.OnReading
		(
			function () {
			    //$H('div_ajax_canvas');
			    $S('order_flow_loading');
			    //$H('order_flow_summary');
			}
		);
    var requestNumber = 0;
    order_flow_ajax.OnInterval
		(
			function () {
			    order_flow_ajax.Abort();
			    $S('div_ajax_canvas');
			    $H('order_flow_loading');
			    $S('order_flow_summary');
			    if (requestNumber < 1) {
			        order_flow_ajax.invokeServer(location.search.substr(1), 'POST', true);
			    }
			    else {
			        order_flow_ajax.clearInterval();
			        location.replace("http://static.dangdang.com/503error/error.html");
			    }
			    requestNumber = requestNumber + 1;
			}
		);

    this.show = function () {

        order_flow_ajax.invokeServer(location.search.substr(1), 'POST', false);
    };

    this.setDataSource = function (data_source) {
        order_items.DataSource = data_source;
    };

}