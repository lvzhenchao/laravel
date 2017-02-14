/*global document,$,Ajax,Hashtable,JSPanel,JSRepeater,StringBuilder,
ORDER_SUMMARY_TEMPLATE,RPT_SHIPPING_FEE_ITEM_TEMPLATE,RPT_COUPON_ITEM_TEMPLATE,P_ORDER_SUBMIT_PROTOCOL_TIPS */

// cartItems.js
// purpose: coupon module for checkout page.
// author: Lu You

function Summary(container_id) {
    var m_data_source = null;
    var m_panel = new JSPanel(container_id);
    var m_rpt_shipping_fee = new JSRepeater('rep_shipping_fee_real');
    var m_rpt_dangdang_money = new JSRepeater('rep_dangdang_money');
    var m_rep_collection_promotion = new JSRepeater('rep_collection_promotion');
    var m_rep_order_promotion = new JSRepeater('rep_order_promotion');
	var m_rpt_overseas_tax = new JSRepeater('rep_overseas_tax_real');

    var promo_expand_status = true;
    var shipping_fee_expand_status = true;
    var coupon_expand_status = true;
    var giftcard_expand_status = true;
	var overseas_tax_expand_status = true;

    var obj_coupon_money_real = null;
    var obj_rep_dangdang_money = null;
    var obj_rep_order_promotion = null;
    var obj_rep_collection_promotion = null;
    var obj_rep_shipping_fee_real = null;
	var obj_rep_overseas_tax_real = null;
	
	var order_count = 0;
	
	var is_show_free_oversea = false;
	
	var deposit_presale_type = 0; //1代表全款支付，2代表定金和尾款分开支付

    this.show = function (result) {
        bindTemplate();
        addEvents();

        //        get_order_submit_tips(m_data_source["is_agree"]);

        //验证码
        yzmInit();

        //支付密码
        payPasswordInit();

        $1('btn_change_yzm').onclick = function () { changeYZMMarked(); };

        $1('ck_protocol').onclick = function () { check_protocol(); };
    }

    this.setDataSource = function (data_source) {
        m_data_source = data_source;
        m_panel.DataSource = data_source;

        m_rpt_shipping_fee.DataSource = data_source['order_list'];
        m_rpt_dangdang_money.DataSource = data_source['order_list'];
        m_rep_collection_promotion.DataSource = data_source['collection_deduct_info'];

        m_rep_order_promotion.DataSource = data_source['order_promotion'];
        m_rpt_overseas_tax.DataSource = data_source['order_list'];

        if (m_data_source["presale_type"] == null) {
            deposit_presale_type = 0;
        } else {
            deposit_presale_type = m_data_source["presale_type"];
        }
    }

    this.setSubmit = function (order_flow_submit) {
        m_order_flow_submit = order_flow_submit;
    }

    this.setYzmStatus = function (is_no_safe_ip) {
        m_data_source['is_no_safe_ip'] = is_no_safe_ip;
    }

    this.isNoSafeIp = function () {
        return m_data_source['is_no_safe_ip'];
    }

    var get_order_submit_tips = function (is_agree) {
        var order_submit_tips = $1('order_submit_tips');
        if (order_submit_tips != null) {
            if (!is_agree) {
                order_submit_tips.innerHTML = P_ORDER_SUBMIT_PROTOCOL_TIPS;
                $1('order_submit_tips').className = "";
            }
            else
                $1('order_submit_tips').className = "objhide";
        }
    }


    this.setSubmitErrorTips = function (submit_error_tips) {
        if (submit_error_tips)
            $s($1('order_submit_error_tips_bar'));
        else
            $h($1('order_submit_error_tips_bar'));
        $1('order_submit_error_tips').innerHTML = submit_error_tips;
    }

    //点了提交按钮后的按钮变化
    this.setDisabled = function () {
        $disabled('submit');
        $wait('submit');
    }
    this.setEnabled = function () {
        $enabled('submit');
        $1('submit').style.cursor = 'pointer';
    }

    var check_protocol = function () {
        if ($1('ck_protocol').checked)
            $1('submit').className = "btn btn-super-orange";
        else
            $1('submit').className = "btn btn-super-orange btn-super-disabled";
    }

    var ipt_yzm_keyup = function (o, e) {
        var k = null;
        if (e) {
            k = e.keyCode;
        }
        else if (event) {
            k = event.keyCode;
        }

        if (k == 9)
            return;

        var ov = o.value;
        var lisi = null;
        var j = 0;
        for (var i = 0; i < yzm_array_len; i++) {
            lisi = obj_ipt_yzm_lis[i];
            if (lisi.innerHTML.startsWith(ov)) {
                $s(lisi);
                j++;
            }
            else $h(lisi);
        }

        if (j < 2) {
            $h(obj_ipt_yzm);
        }
        else if (j < 10) {
            $s(obj_ipt_yzm);
            obj_ipt_yzm.style.height = 'auto';
        }
        else {
            $s(obj_ipt_yzm);
            obj_ipt_yzm.style.height = '100px';
        }
    };

    var li_c = function (t) { t.className = 'li_bg'; };
    var li_r = function (t) { t.className = ''; }
    var ipt_yzm_focus = function (o) {

        clearYzmTips(o);
        var li_ck = function (t) { o.value = t.innerHTML; $h(obj_ipt_yzm); o.style.color = '#404040'; };
        var sb = new StringBuilder();
        for (var i = 0; i < yzm_array_len; i++) {
            sb.append("<li>");
            sb.append(i);
            sb.append('</li>');
        }
        obj_ipt_yzm.innerHTML = sb.toString();
        obj_ipt_yzm_lis = obj_ipt_yzm.childNodes;
        for (var i = 0; i < yzm_array_len; i++) {
            obj_ipt_yzm_lis[i].onmouseover = function () { li_c(this); };
            obj_ipt_yzm_lis[i].onmouseout = function () { li_r(this); };
            obj_ipt_yzm_lis[i].onclick = function () { li_ck(this); };
        }
        var pos = getposOffset_c(o);
        setLocation(obj_ipt_yzm, pos[0] + 3, pos[1] + 20);
        setDimension(obj_ipt_yzm, 85, 100);

        if (yzm_array_len < 8)
            obj_ipt_yzm.style.height = 'auto';


        show_ipt_yzm(obj_ipt_yzm, o);
    };

    var show_ipt_yzm = function (z, o) {
        $s(z);
        if (document.addEventListener) {
            document.addEventListener('click', documentonclick, false);
        }
        else {
            document.attachEvent('onclick', function (e) { documentonclick(); });
        }

        function documentonclick() {
            var evt = arguments[0] || window.event;
            var sender = evt.srcElement || evt.target;

            if (!contains(z, sender) && sender != o) {
                $h(z);
                if (document.addEventListener) {
                    document.removeEventListener('click', documentonclick, false);
                }
                else {
                    document.detachEvent('onclick', function (e) { documentonclick(); });
                }
            }
        };
    };

    // show error
    function showError(error) {
        SubmitData.error = error;
    }
    // show bind error
    function showSubmitError(errorCode) {
        var error;
        switch (errorCode) {
            case 1:
            case 5:
            case 6:
            case 9:
            case 10:
            case 11:
                error = "请填写正确的卡号";
                break;
            case 7:
                error = "请填写正确的密码";
                break;
            case 12:
                error = "激活失败";
                break;
            default:
                error = "礼券绑定失败";
        }
        showError(error);
    }

    // clear error
    function clearError() {
        couponData.error = null;
    }

    function yzmInit() {
        changeYZMMarked();
        //        obj_ipt_yzm = $1('ul_ipt_yzm');
        //	    $1('ipt_yzm').onkeyup=function(e){ipt_yzm_keyup(this,e);};

        if (m_data_source['is_no_safe_ip'] == 0) {
            $h($1('div_yzm_word'));
        }

    }

    function payPasswordInit() {

        var isEnable = m_data_source['payment_password_enabled'] == 1;
        isEnable = isEnable 
        	&& (+m_data_source['cust_cash_used'] > +m_data_source['min_cust_cash_password_limit'] 
        		|| (CouponType.hasFlag(+m_data_source['coupon_type'], CouponType.GiftCard) && +m_data_source['gift_card_money_used'] > +m_data_source['min_gift_card_password_limit']));
        if (isEnable) {
            if (m_data_source['is_set_payment_password']) {
                    ShowOrClosePayPassWord(3);
                }
                else {
                ShowOrClosePayPassWord(0);
            }
            }
        else {
            ShowOrClosePayPassWord(2);
        }
    }

    function bindTemplate() {
        if (m_data_source['order_list'] != null && m_data_source['order_list'].length > 0) {
            order_count = m_data_source['order_list'].length;
        }
        m_panel.Template = ORDER_SUMMARY_TEMPLATE;
        m_data_source['bargin_total'] = formatFloat(m_data_source['bargin_total']);
        m_data_source['shipping_fee'] = formatFloat(m_data_source['shipping_fee']);
        m_data_source['promo_discount_amount'] = formatFloat(m_data_source['promo_discount_amount']);
        m_data_source['coupon_amount'] = formatFloat(m_data_source['coupon_amount']);
        m_data_source['cust_cash_used'] = formatFloat(m_data_source['cust_cash_used']);
        m_data_source['payable_amount'] = formatFloat(m_data_source['payable_amount']);
        m_data_source['gift_card_charge'] = formatFloat(m_data_source['gift_card_charge']);
        m_data_source['total_gift_package_price'] = formatFloat(m_data_source['total_gift_package_price']);
        m_data_source['gift_package_price'] = formatFloat(m_data_source['gift_package_price']);
        m_data_source['gift_package_price_tips'] = formatFloat(m_data_source['gift_package_price_tips']);
        m_data_source['greetingcard_price'] = formatFloat(m_data_source['greetingcard_price']);
        m_data_source['privilege_code_discount_amount'] = formatFloat(m_data_source['privilege_code_discount_amount']);
        m_data_source['point_deduction_amount'] = formatFloat(m_data_source['point_deduction_amount']);
        //定金和尾款金额格式化
        m_data_source['deposit_amount'] = formatFloat(m_data_source['deposit_amount']);
        m_data_source['balance_amount'] = formatFloat(m_data_source['balance_amount']);
		
        //礼品卡和礼券总金额
        m_data_source["coupon_and_giftcard_money_used"]=formatFloat((+m_data_source["gift_card_money_used"])+(+m_data_source["coupon_amount"]));
        m_data_source["gift_card_money_used"]=formatFloat(m_data_source["gift_card_money_used"]);
        m_data_source["coupon_used"]=formatFloat(m_data_source["coupon_amount"]);
		m_data_source['overseas_tax'] = formatFloat(m_data_source['overseas_tax']);
		if(parseFloat(m_data_source['overseas_tax']) == 0){
			is_show_free_oversea = true;
			m_data_source['overseas_tax'] = formatFloat(m_data_source['free_overseas_tax']);
		} 
		
		
        if (m_data_source['payable_amount'] >= 1000) {
            m_data_source['payable_amount_style'] = "f14";
        }
        else {
            m_data_source['payable_amount_style'] = "f18";
        }
        //先取值，防止设置设置支付密码后，给输入框赋了值，但重新绑定后丢失。
        var payment_password = $F("input_pay_password");
        m_panel.DataBind();
        if (payment_password)
            $1("input_pay_password").value = payment_password;

        obj_coupon_money_real = $1("coupon_money_real");
        obj_rep_dangdang_money = $1("rep_dangdang_money");
        obj_rep_order_promotion = $1("rep_order_promotion");
        obj_rep_collection_promotion = $1("rep_collection_promotion");
        obj_rep_shipping_fee_real = $1("rep_shipping_fee_real");
		obj_rep_overseas_tax_real = $1("rep_overseas_tax_real");

		if (deposit_presale_type == 1) {
		    $1("div_product_total").className = 'hide';
		    $1("div_presale_mobile").className = 'hide';
		    $1("submit").className = ' btn btn-super-orange btn-super-disabled';
		} else if (deposit_presale_type == 2) {
		    $1("div_product_total").className = 'hide';
		    $1("div_final_payment_total").className = 'hide';
		    $1("submit").className = ' btn btn-super-orange btn-super-disabled';
		} else {
		    $1("div_deposit_total").className = 'hide';
		    $1("div_final_payment_total").className = 'hide';
		    $1("div_presale_mobile").className = 'hide';
		    $1("div_agree_pay_deposit").className = 'hide';
		}
        $1("total_shipping_fee_real").className = 'hide';
        $1("total_promo_amount_real").className = 'hide';
        $1("total_coupon_real").className = 'hide';
        $1("total_gift_card_charge").className = 'hide';
        $1("total_cust_cash_real").className = 'hide';
        $1("total_cust_point_real").className = 'hide';
        $1("rep_collection_promotion").className = 'hide';
        $1("total_discount_code_real").className = 'hide';
        $1("total_gift_package_price").className = 'hide';
        $1("gift_package_price").className = 'hide';
        $1("total_privilege_code_discount_amount").className = 'hide';
        $1("greetingcard_price").className = 'hide';
		$1("total_overseas_tax_real").className = 'hide';
		$1("total_energy_saving_subsiby_amout").className = 'hide';
        if (m_data_source['shipping_fee'] > 0) {
            $1("total_shipping_fee_real").className = '';
            m_rpt_shipping_fee.ItemTemplate = RPT_SHIPPING_FEE_ITEM_TEMPLATE;
            m_rpt_shipping_fee.onItemDataBind = function (dataItem, obj_tpl) {
                if (dataItem['order_shipping_fee'] > 0) {
                    dataItem['order_shipping_fee'] = formatFloat(dataItem['order_shipping_fee']);
                }
                else {
                    dataItem['shipping_fee_display'] = 'hide';
                }
            }
            m_rpt_shipping_fee.DataBind();
        }
		if(m_data_source['energy_saving'] == true) {
			$1("total_energy_saving_subsiby_amout").className = "";
		}
		if (m_data_source['is_overseas'] == true) {
			
			if(is_show_free_oversea){
				$1("order_flow_overseas_tax").className = "default";
			} else {
				$1("order_flow_overseas_tax").className = "";
			}
            $1("total_overseas_tax_real").className = '';
            m_rpt_overseas_tax.ItemTemplate = RPT_OVERSEAS_TAX_ITEM_TEMPLATE;
            m_rpt_overseas_tax.onItemDataBind = function (dataItem, obj_tpl) {
                if (dataItem['is_overseas'] == true) {
					if(formatFloat(dataItem['overseas_tax']) == 0){
						dataItem['default_class'] = "default";
						dataItem['overseas_tax'] = formatFloat(dataItem['free_overseas_tax']);
					} else {
						dataItem['default_class'] = "";
						dataItem['overseas_tax'] = formatFloat(dataItem['overseas_tax']);
					}
                }
                else {
                    dataItem['overseas_tax_display'] = 'hide';
                }
            }
            m_rpt_overseas_tax.DataBind();
			if(is_show_free_oversea){
				$("#oversea_icon_free").show();
			} else {
				$("#oversea_icon_free").hide();
			}
			if(order_count == 1){
				$("#overseas_tax_detail_link").click();
			}
        }
        if (m_data_source['promo_discount_amount'] > 0) {
            $1("total_promo_amount_real").className = '';
            if (m_data_source['collection_deduct_info']!=undefined && m_data_source['collection_deduct_info'].length > 0) {
                $1("rep_collection_promotion").className = '';
                m_rep_collection_promotion.ItemTemplate = RPT_PROMOTION_ITEM_TEMPLATE;
                m_rep_collection_promotion.onItemDataBind = function (dataItem, obj_tpl) {
                    if (dataItem['order_direct_discount_amount'] > 0) {
                        dataItem['order_direct_discount_amount'] = formatFloat(dataItem['order_direct_discount_amount']);
                    }
                    else {
                        dataItem['order_direct_discount_amount'] = 'hide';
                    }
                    dataItem['collection_promotion_desc_tips'] = dataItem['collection_promotion_desc'];
                    dataItem['collection_promotion_desc'] = nTruncate(dataItem['collection_promotion_desc'], 10);
                }
                m_rep_collection_promotion.DataBind();
            }

            m_rep_order_promotion.ItemTemplate = RPT_ORDER_PROMOTION_ITEM_TEMPLATE;
            m_rep_order_promotion.onItemDataBind = function (dataItem, obj_tpl) {

                if (dataItem['order_prom_subtract'] > 0) {
                    $s($1("rep_order_promotion"));
                    dataItem['order_prom_subtract'] = formatFloat(dataItem['order_prom_subtract']);
                }
                else {
                    dataItem['order_promotion_display'] = 'hide';
                }
                dataItem['shop_promo_msg_tips'] = dataItem['shop_promo_msg'];
                dataItem['shop_promo_msg'] = nTruncate(dataItem['shop_promo_msg'], 10);
            }
            m_rep_order_promotion.DataBind();
        }
        
        //if(+m_data_source["coupon_and_giftcard_money_used"]>0){ 
        	 //礼品卡显示
        $1("total_giftcard_real").className = 'hide';
            if(+m_data_source["gift_card_money_used"]>0){        	 
            	$1("total_giftcard_real").className = '';
                 m_rpt_dangdang_money.ItemTemplate = RPT_COUPON_ITEM_TEMPLATE;
                 m_rpt_dangdang_money.onItemDataBind = function (dataItem) {
                     if (+dataItem['cust_gift_card_used'] > 0) {
                    	 dataItem['cust_gift_card_used'] = formatFloat(dataItem['cust_gift_card_used']);
                     }
                     else {
                         dataItem['coupon_amount_display'] = 'hide';
                     }
                 };
                 m_rpt_dangdang_money.DataBind();            
            }
           
            if (m_data_source['coupon_used'] > 0) {
            	$1("total_coupon_real").className = '';
                switch (+m_data_source['coupon_type']) {
                    case 1:
                    case 9:                      
                        obj_coupon_money_real.className = 'p-child';
                        break;                
                    case 4:
                        $1("total_discount_code_real").className = '';
                        $1("total_coupon_real").className = 'hide';
                        break;
                    default:
                        break;
                }
               
            }
       



        if (m_data_source['gift_package_price'] != 0 && m_data_source['greeting_card_price'] != 0) {
            $S("total_gift_package_price");
        }

        if (m_data_source['gift_package_price'] == 0 && m_data_source['greeting_card_price'] != 0) {
            $S("greetingcard_price");
        }

        if (m_data_source['gift_package_price'] != 0 && m_data_source['greeting_card_price'] == 0) {
            $S("gift_package_price");
        }


        if (+m_data_source['gift_card_charge'] > 0) {
            $1("total_gift_card_charge").className = '';
        }

        if (m_data_source['cust_cash_used'] > 0) {
            $S("total_cust_cash_real");
        }
        if (m_data_source['point_deduction_amount'] > 0) {
            $S("total_cust_point_real");
        }
        if (!m_data_source['is_agree']) {
            $s($1('div_ck_protocol'));
        }
        if (+m_data_source['privilege_code_discount_amount'] > 0) {
            $1("total_privilege_code_discount_amount").className = '';
        }
    }


    function getEvent() {
        if (document.all) {
            return window.event; //for ie
        }
        func = getEvent.caller;
        while (func != null) {
            var arg0 = func.arguments[0];
            if (arg0) {
                if ((arg0.constructor == Event || arg0.constructor == MouseEvent) || (typeof (arg0) == "object" && arg0.preventDefault && arg0.stopPropagation)) {
                    return arg0;
                }
            }
            func = func.caller;
        }
        return null;
    }

    // events
    function addEvents() {
        if (deposit_presale_type == 2) {
            $1('presale_mobile').onkeydown = function () {
                $1('presale_mobile').className = "input-w87";
                $h($1('order_submit_error_tips_bar'));
                var ev = getEvent();
                if (ev.keyCode >= 48 && ev.keyCode <= 57) { return; }
                if (ev.keyCode >= 96 && ev.keyCode <= 105) { return; }
                if (ev.keyCode == 8 || ev.keyCode == 46 || ev.keyCode == 37 || ev.keyCode == 39) { return; }
                return false;
            }
        }
        if (deposit_presale_type == 1 || deposit_presale_type == 2) {
            $1('agree_pay_deposit').onclick = function () {
                if ($1('agree_pay_deposit').checked == true) {
                    $1("submit").className = ' btn btn-super-orange';
                } else {
                    $1("submit").className = ' btn btn-super-orange btn-super-disabled';
                }
            }
        }
        $1('shipping_fee_detail_link').onclick = function () {
            if (shipping_fee_expand_status) {
                $h(obj_rep_shipping_fee_real);
                $1("shipping_fee_detail_icon").className = 'icon icon-adress-open';
                shipping_fee_expand_status = false;
            }
            else {
                $s(obj_rep_shipping_fee_real);
                $1("shipping_fee_detail_icon").className = 'icon icon-adress-close';
                shipping_fee_expand_status = true;
            }
        }
		if(order_count == 1){
			$("#shipping_fee_detail_link").click();
		}

        $1('promo_detail_link').onclick = function () {
            if (promo_expand_status) {
                $h(obj_rep_collection_promotion);
                $h(obj_rep_order_promotion);
                $1("promo_detail_icon").className = 'icon icon-adress-open';
                promo_expand_status = false;
            }
            else {
                $s(obj_rep_collection_promotion);
                $s(obj_rep_order_promotion);
                $1("promo_detail_icon").className = 'icon icon-adress-close';
                promo_expand_status = true;
            }
        }

        $1('giftcard_detail_link').onclick = function () {
            if (giftcard_expand_status) {
                $h(obj_rep_dangdang_money);
                $1("giftcard_detail_icon").className = 'icon icon-adress-open';
                giftcard_expand_status = false;
            }
            else {
            	var isUseGiftcard=CouponType.hasFlag(+m_data_source.coupon_type, CouponType.GiftCard);//if m_data_source['coupon_type'] == 1
                if (isUseGiftcard) {
                    $s(obj_rep_dangdang_money);
                }
                $1("giftcard_detail_icon").className = 'icon icon-adress-close';
                giftcard_expand_status = true;
            }
        }
        $1('coupon_detail_link').onclick = function () {
            if (coupon_expand_status) {
                $h(obj_coupon_money_real);
                $1("coupon_detail_icon").className = 'icon icon-adress-open';
                coupon_expand_status = false;
            }
            else {
            	var isUseCoupon=CouponType.hasFlag(+m_data_source.coupon_type, CouponType.Coupon);//if m_data_source['coupon_type'] == 1
                if (isUseCoupon) {
                    $s(obj_coupon_money_real);
                }
                $1("coupon_detail_icon").className = 'icon icon-adress-close';
                coupon_expand_status = true;
            }
        }


        $1('submit').onclick = function () {
            if (deposit_presale_type == 1 || deposit_presale_type == 2) {
                if ($1('submit').className.indexOf("disabled") > 0) {
                    return;
                }
            }
            var presale_mobile = "";
			if (deposit_presale_type == 2) {
				var reg = /^((14[0-9])|(13[0-9])|(15[^4,\D])|(18[0-9])|(17[0-9]))\d{8}$/;
				presale_mobile = $1("presale_mobile").value;
				if (presale_mobile == null || !reg.test(presale_mobile)) {
					$s($1('order_submit_error_tips_bar'));
					$1('order_submit_error_tips').innerHTML = '手机号码格式错误';
					$1('presale_mobile').className = "input-w87 input-red";
					return;
				}
			}
            //虚拟礼品卡密钥验证
            var orders = m_data_source["order_list"];
            var firtKey;
            var mobileNumber;
            for (var i = 0; i < orders.length; i++) {
                if (orders[i]["order_type"] == 50) {
                    var success = VirtualGiftCard.submitCheckVirtualKey();
                    if (!success) {
                        window.location.hash = "#GiftCardUserKey";
                        return false;
                    } else {
                        firtKey = $1('txt_first_key').value;
                        mobileNumber = $F('txt_mobile_number');
                    }
                    
                }
            }
            if (!m_data_source['is_agree'] && !$1('ck_protocol').checked)
                return;

            var s_pay_password = "";

            if (m_data_source['payment_password_enabled'] == 1 
            		&& (+m_data_source['cust_cash_used'] > +m_data_source['min_cust_cash_password_limit'] 
            			|| (CouponType.hasFlag(+m_data_source['coupon_type'], CouponType.GiftCard) && +m_data_source['gift_card_money_used'] > +m_data_source['min_gift_card_password_limit']))) {
                if (!m_data_source['is_set_payment_password'] && $1('div_pay_password').style.display == "none") //新增 
                {
                    $s($1('order_submit_error_tips_bar'));
                    $1('order_submit_error_tips').innerHTML = '请设置支付密码';
                    return;
                }

                s_pay_password = $F('input_pay_password');
                if (s_pay_password == null || s_pay_password == '') {
                    $s($1('order_submit_error_tips_bar'));
                    $1('order_submit_error_tips').innerHTML = '请输入支付密码';
                    return;
                }
                var paypwdlen = getLength(s_pay_password);
                if (paypwdlen < 6 || paypwdlen > 20) {
                    $s($1('order_submit_error_tips_bar'));
                    $1('order_submit_error_tips').innerHTML = '请输入正确的支付密码';
                    return;
                }
            }

            var s_sign = "";

            if (m_data_source["is_no_safe_ip"] == 1) {
                s_sign = $F('ipt_yzm');
                if (s_sign == null || s_sign == '' || s_sign.indexOf("&") >= 0) {
                    $s($1('order_submit_error_tips_bar'));
                    $1('order_submit_error_tips').innerHTML = '请填写验证码';
                    return;
                }
            }
            m_order_flow_submit(s_sign, m_data_source['shop_id'], encodeURIComponent(s_pay_password), firtKey, mobileNumber, m_data_source['product_ids'], m_data_source['sk_action_id'], presale_mobile);
            return false;
        }
		
		$1('overseas_tax_detail_link').onclick = function () {
            if (overseas_tax_expand_status) {
                $h(obj_rep_overseas_tax_real);
                $1("overseas_tax_detail_icon").className = 'icon icon-adress-open';
                overseas_tax_expand_status = false;
            }
            else {
                $s(obj_rep_overseas_tax_real);
                $1("overseas_tax_detail_icon").className = 'icon icon-adress-close';
                overseas_tax_expand_status = true;
            }
        }
		
		if(order_count == 1){
			$("#overseas_tax_detail_link").click();
		}
    }
}

function changeYZMMarked() {
    ddvcode.show_vcode("sign_img");
}

function clearYzmTips(obj) {
    if (obj.value == '' || obj.value == '请填写字符') {
        obj.value = '';
        obj.style.color = '#b5b5b5'
    }
}

function showYzmTips(obj) {
    if (obj.value == '') {
        obj.value = '请填写字符';
        obj.style.color = '#b5b5b5'
    }
    else
        obj.style.color = '#404040'
}

function ShowOrClosePayPassWord(isShowPayPwd) {
    if (isShowPayPwd == 0) {
        $1('div_set_password').style.display = "";
        $1('div_pay_password').style.display = "none";
    }
    else if (isShowPayPwd == 2) {
        $1('div_set_password').style.display = "none";
        $1('div_pay_password').style.display = "none";
    }
    else {
        $1('div_set_password').style.display = "none";
        $1('div_pay_password').style.display = "";
    }
}

var getLength = function (str) {
    var realLength = 0, len = str.length, charCode = -1;
    for (var i = 0; i < len; i++) {
        charCode = str.charCodeAt(i);
        if (charCode >= 0 && charCode <= 128) realLength += 1;
        else realLength += 2;
    }
    return realLength;
};
function showSetPaymentPasswordWindow() {
    $1('divSetPaymentPassword').className = 'popup-wrap popup-orderEnd popup-wrap-w410';
    var objshield = $1('div_shield');
    $s(objshield);
    $1("setPaymentPasswordCompleted").onclick = function () {
        $1("divSetPaymentPassword").className = "hide";
        $h(objshield);
        $h($1('order_submit_error_tips_bar'));
        ShowOrClosePayPassWord(1);
    };
    $1("CloseSetPaymentPasswordWindow").onclick = function () {
        $1("divSetPaymentPassword").className = "hide";
        $h(objshield);
        $h($1('order_submit_error_tips_bar'));
    };
}
