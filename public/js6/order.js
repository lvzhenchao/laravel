
var ORDER_READONLY_TEMPLATE =
 "<div class='order-list'>"
 + "<div class='cont'>"
 + "<div class='cont' id='cart_item_rep_{order_sequence_id}'>"
 + "</div>"
+ "<div class='pricebar clearfix'>"
 + "<div id='div_giftpacking'>"
 + "</div>"
 + "<div class='price-total'>"
 + "<span class='mr-10' style=\"margin-right:70px;display:none;\" id='gift_card_charge_{order_sequence_id}'><strong>礼品卡手续费：</strong>&yen;<span id=\"gift_card_charge_value_{order_sequence_id}\">{gift_card_charge}</span></span>"
 + "<span class='mr-10'><strong>运费：</strong><span id='obj_order_shipping_fee_{order_sequence_id}'>&yen;{order_shipping_fee} </span> <a href=\"javascript:void(0)\" class='{is_show_shippingfee_piece}' id='shippingfee_piece_tips_{order_sequence_id}'>(想免运费?)</a>"
 + "    <div id ='order_shipping_fee_tips_{order_sequence_id}' class='popup-wrap popup-normal' style='left:0px; top:-85px;display:none;'>"
 + "    <div class='popup-title'>"
 + "        <h3>免运费说明？</h3>"
 + "        <a class='btn-popup-close' href=\"javascript:void(0)\" id='shipping_fee_close_tips_close_{order_sequence_id}'></a>"
 + "     </div>"
 + "     <div class='popup-cont'>"
 + "         <p id='shippingfee_tip_{order_sequence_id}'><span id='pub_free_shippingfee_{order_sequence_id}' ></span><span id='gm_free_shippingfee_{order_sequence_id}' ></span> 可免运费</p>"
 + "         <p id='shop_shippingfee_tip_{order_sequence_id}'></p>"
 + "     </div>"
 + "    </div></a>"
 + "</span>"
 + "<span class=\"mr-10\" style=\"display: none;\" id='order_overseas_tax_{order_sequence_id}'> "
 + "<strong>税费：</strong> "
 + "<strong class=\"\" id='overseas_tax_{order_sequence_id}'>¥{overseas_tax}</strong> "
 + "<span class=\"question_icon\" style=\"display: none;\" id='order_assemble_tax_icon_{order_sequence_id}'></span> "
 + "</span> "
 + "<span class='mr-10'><strong>小计总额：</strong><strong class='color-price'>&yen;<span id='obj_order_bargin_total_{order_sequence_id}'>{order_bargin_total}</span></strong></span>"
 + "<a class='btn btn-small-grey' href='javascript:for_99click();' style='color:#333333;' id='btn_shipping_fee_{order_sequence_id}'>免运费凑单</a>"
 + "</div>"
 + " <div class=\"jump_pannel\" style=\"display: none;\" id='order_assemble_tax_{order_sequence_id}'> "
 + "   <div class=\"tax\"><span class=\"tax_name\">关税：</span><span class=\"price\" id='tariff_{order_sequence_id}' >¥{tariff}</span></div> "
 + "   <div class=\"tax\"><span class=\"tax_name\">消费税：</span><span class=\"price\" id='excise_{order_sequence_id}' >¥{excise}</span></div> "
 + "   <div class=\"tax\"><span class=\"tax_name\">增值税：</span><span class=\"price\" id='vat_{order_sequence_id}' >¥{vat}</span></div> "
 + " </div> "
 + "</div>"
 + "</div>"
 + "<div class='cont'>"
 + "<div class='item-list virtual' id='user_key_div_{order_sequence_id}'></div>"

 + "    <div id='shop_message_{order_sequence_id}' class='item-message'>"
 + "    <p id='shop_message_prompt_{order_sequence_id}' class='item-message-prompt hide'>"
 + "    <span class='help-inline help-inline-error help-inline-large'><span class='icon icon-warn'></span>已超过字数上限，请精简语言</span>"
 + "    </p>"
 + "    <p>"
 + "    <label for=''>给商家留言：</label>"
 + "    <textarea name='' id='text_shop_message_{order_sequence_id}' cols='48' rows='1' style='overflow-x:hidden'>{ship_message}</textarea>"
 + "    <span id='shop_message_length_{order_sequence_id}' class='help-inline'>0/200</span>"
 + "    <span id='placeholder_text_{order_sequence_id}' class='placeholder-text'>最多可输入200个字</span>"
 + "    </p>"
 + "    </div>"
 + "</div>"
+ "</div>";


function Order(container_id, order_id, order_products_type) {
    var m_data_source = null;
    var m_order_panel = new JSPanel(container_id);
    var m_gift_package_source = null;
    var m_consignee_data_source = null;
    var dd_need_send_order_sms = null;
    var objConsignee = new Consignee('div_consignee');
    var objMobileCust = new MobileCust('div_mobilecust');
    var objMobilePlan = new MobilePlan('div_mobileplan');
	var objSelfPickup = new SelfPickup('div_self_pickup');
    var objShipment = new Shipment('div_shipment_' + order_id);
    var objPayment = new Payment('div_payment_' + order_id);
    var objCartItems = new CartItems('cart_item_rep_' + order_id);
    var objInvoice = new Invoice('div_invoice_' + order_id);
    var obj_shipping = new ShippingFeePiece('div_shippingfeepiece');
    var objGiftPacking = new GiftPackageHead('div_giftpacking');
    var shipment_ajax = new Ajax('/shipment/submit');
    var consignee_ajax = new Ajax('/consignee/submit');
    var payment_ajax = new Ajax('/payment/submit');
    var invoice_submit_ajax = new Ajax('/invoice/submit');

    var dangdang_money_used_ajax = new Ajax('/giftcard/use_giftcard');
    var dangdang_money_cancel_ajax = new Ajax('/giftcard/cancel');
    var gift_card_bind_ajax = new Ajax('/giftcard/active');

    var cust_cash_used_ajax = new Ajax('/balance/cash_used');
    var cust_cash_cancel_ajax = new Ajax('/balance/cancel');

    var ship_message_ajax = new Ajax('ShipMessage.aspx');
    var mobile_cust_ajax = new Ajax('contract_mobile_cust.aspx');
    var obj_order_shipping_fee = null;
    var obj_order_bargin_total = null;
    var obj_shop_message = null;
    var btn_shipping_fee = null;
    var obj_shippingfee_piece_tips = null;
    var obj_gift_card_charge = null;
    var obj_gift_card_charge_value = null;
    var obj_gift_card_charge_help = null;

    var m_set_mobileCust_save = null;

    var dd_need_send_order_sms;
    //var obj_register_mb;

    var isFirstOpenWeb = true;
    var m_is_show_consignee = 0;
    var m_is_first_checkout = 0;
	var m_is_show_self_pickup = 0;
	var m_cust_type =0;
	var m_checkout_type=0;

    var init_control = function () {
        obj_order_shipping_fee = $1("obj_order_shipping_fee_" + m_data_source['order_sequence_id']);
        obj_order_bargin_total = $1("obj_order_bargin_total_" + m_data_source['order_sequence_id']);
        obj_shop_message = $1("shop_message_" + m_data_source['order_sequence_id']);
        btn_shipping_fee = $1("btn_shipping_fee_" + m_data_source['order_sequence_id']);
        obj_shippingfee_piece_tips = $1("shippingfee_piece_tips_" + m_data_source['order_sequence_id']);
        //obj_order_sms = $1("order_sms");
        //obj_order_sms_checkbox = $1("order_sms_checkbox");
        obj_text_shop_message = $1("text_shop_message_" + m_data_source['order_sequence_id']);

        obj_order_shipping_fee_tips = $1("order_shipping_fee_tips_" + m_data_source['order_sequence_id']);
        obj_shipping_fee_close_tips_close = $1("shipping_fee_close_tips_close_" + m_data_source['order_sequence_id']);

        obj_order_sort_number = $1("order_sort_number_" + m_data_source['order_sequence_id']);

        obj_part_order_tips = $1("part_order_tips_" + m_data_source['order_sequence_id']);
        obj_part_order_tips_close = $1("part_order_tips_close_" + m_data_source['order_sequence_id']);

        obj_order_sender_description = $1("order_sender_description_" + m_data_source['order_sequence_id']);
        obj_gift_card_charge = $1("gift_card_charge_" + m_data_source['order_sequence_id']);
        obj_gift_card_charge_value = $1("gift_card_charge_value_" + m_data_source['order_sequence_id']);
        obj_gift_card_charge_help = $1("gift_card_charge_help_" + m_data_source['order_sequence_id']);
        //obj_register_mb = $1("register_mb_" + m_data_source['order_sequence_id']);
    };

    //this.activeDDMoney = function (remain_ddmoney) {
    //   // objPayment.refreshDDMoney(remain_ddmoney);
    //};

    this.refreshNoCash = function () {
        init_control();
        objCartItems.setDataSource(m_data_source);
        objCartItems.show();
        var flow_step = m_data_source['flow_step'];
        var m_edit_step = m_data_source['cur_edit_step'];
        objShipment.setDataSource(m_data_source);
        if (m_data_source['cur_edit_step'] == 1 || m_data_source['flow_step'] == 1) {
            objShipment.showEditable();
        } else {
            objShipment.showReadOnly();
        }
        objPayment.setDataSource(m_data_source);
        if (flow_step == 2) {
            objPayment.showEditable();
            return;
        }
        if (flow_step == 3) {
            if (m_edit_step > 1) {
                objPayment.showEditable();
            } else {
                objPayment.showReadOnly();
            }
        }

        refreshGiftCardCharge();

        ShippingFeePieceModel(m_data_source);
        obj_order_bargin_total.innerHTML = formatFloat(m_data_source['order_bargin_total']);
        if (m_data_source["order_type"] == 50) {
            VirtualGiftCard.invoiceShow(m_data_source);
        } else {
            objInvoice.init(m_data_source, "refreshNoCash");
        }
    };
    
    this.showInvoice = function (){
    	m_data_source.invoice_edit_status = true;
    	objInvoice.init(m_data_source);
    };

    this.refreshOrder = function (is_gift_package_refresh) {
        init_control();
        
		// 是否展示自提前置区域
		if (m_data_source['is_show_self_pick_up'] == true) {
			objSelfPickup.setDataSource(m_data_source);
			objSelfPickup.show();
		} else {
			if(m_data_source['have_normal_self_order'] == false || (m_data_source["order_sequence_id"] == "0_0" && m_data_source["order_type"] == 0 && m_data_source["shop_id"] == 0)){
				objSelfPickup.hide();
			}
		}
		
        if (m_is_show_consignee == 1 && m_is_first_checkout == 1) {
            obj_order_sort_number.innerHTML = m_data_source['sort_num'];
            objCartItems.setDataSource(m_data_source);
            objCartItems.show(false);
            return;
        }
        $('#shipmentList h4').show();
        //$('#shipmentList p.listcon').show();
        if ($('#div_shipment_' + m_data_source["order_sequence_id"]).length > 0
            && $('#div_shipment_' + m_data_source["order_sequence_id"] + ':hidden').length > 0) {
            if ($('#shipmentGroup_' + m_data_source["sort_num"]).length > 0) {
                $('#shipmentGroup_' + m_data_source["sort_num"]).show();
            } else {
                $('#shipmentList p.listcon').show();
            }
        }
       
        $('#paymentList h4').show();
        if ($('#div_payment_' + m_data_source["order_sequence_id"]).length > 0
            && $('#div_payment_' + m_data_source["order_sequence_id"] + ':hidden').length > 0) {
            if ($('#paymentGroup_' + m_data_source["sort_num"]).length > 0) {
                $('#paymentGroup_' + m_data_source["sort_num"]).show();
            } else {
                $('#paymentList p.listcon').show();
            }
           
        }
        //$('#paymentList p.listcon').show();

        objCartItems.setDataSource(m_data_source);
        objCartItems.show(true);


        
        var flow_step = m_data_source['flow_step'];
        var m_edit_step = m_data_source['cur_edit_step'];
        // 是否展示自提前置区域
        if (m_data_source['is_show_self_pick_up']) {
            objSelfPickup.setDataSource(m_data_source);
            objSelfPickup.show();
        }
        objShipment.setDataSource(m_data_source);
        if (flow_step == 1) {
            objShipment.showEditable();
            //就算return，也要把商品清单栏订单编号更新了
            obj_order_sort_number.innerHTML = m_data_source['sort_num'];
            return;
        }
        if (flow_step == 2 || flow_step == 3) {
            if (m_edit_step == 1 || objShipment.isEditStatus()) {
                objShipment.showEditable();
            } else {
                objShipment.showReadOnly();
            }
        }

        objPayment.setDataSource(m_data_source);
        if (flow_step == 2) {
            objPayment.showEditable();
            //就算return，也要把商品清单栏订单编号更新了
            obj_order_sort_number.innerHTML = m_data_source['sort_num'];
            return;
        }
        if (flow_step == 3) {
            if (m_edit_step > 1 || objPayment.isEditStatus()) {
                //  if (m_edit_step > 1  || objPayment.isEditStatus()) {
                objPayment.showEditable();
            } else {
                objPayment.showReadOnly();
            }
        }
        if (m_edit_step == 2 || objPayment.isEditStatus()) {
            objPayment.showEditable();
        } else {
            objPayment.showReadOnly();
        }
        if (m_data_source['invoice_restrict'] != InvoiceRestrict.Not) {
            $('#invoiceList h4').show();
            //$('#invoiceList p.listcon').show();
            if ($('#div_invoice_' + m_data_source["order_sequence_id"]).length > 0
                && $('#div_invoice_' + m_data_source["order_sequence_id"] + ':hidden').length > 0) {
                if ($('#invoiceGroup_' + m_data_source["sort_num"]).length > 0) {
                    $('#invoiceGroup_' + m_data_source["sort_num"]).show();
                } else {
                    $('#invoiceList p.listcon').show();
                }
            }
        }
        if (!is_gift_package_refresh) {
            if (m_data_source["order_type"] == 50) {
                VirtualGiftCard.invoiceShow(m_data_source);
            } else {
                objInvoice.init(m_data_source);
            }
        } else {
            if (m_data_source["order_type"] == 50) {
                VirtualGiftCard.invoiceShow(m_data_source);
            } else {
                objInvoice.init(m_data_source, 'giftPackageRefresh');
            }
        }
        refreshGiftCardCharge();

        ShippingFeePieceModel(m_data_source);
        obj_order_bargin_total.innerHTML = formatFloat(m_data_source['order_bargin_total']);

        obj_order_sort_number.innerHTML = m_data_source['sort_num'];


        if (!is_gift_package_refresh) {
            if (m_data_source["shop_id"] == 0 && m_data_source['order_type'] == 0 && m_data_source["order_products_type"] != 80 && m_cust_type!=10 && m_data_source['energy_saving_order'] == false && m_checkout_type != 9) {
                if (objShipment.isEditStatus()) {
                    objShipment.showEditable();
                }

                if (m_data_source['is_gift_package'] === true) {
                    objGiftPacking.checkedGiftPackageAndRefresh(objGiftPacking.getGiftPackageMain().getProductPackage().getIsPackage());
                } else {
                    objGiftPacking.uncheckedGiftPackage();
                }
                objGiftPacking.giftPackageMain.getProductPackage().illegalProduct.setPutBackCartItemCallbackForProductList(function (result) {
                    m_set_delete_cartitem(result, true);
                });
                objGiftPacking.setGiftPackageSubmit(function (result) {
                    m_gift_package_submit(result);
                });

            }
        }

    };

    this.consigneeRefresh = function () {
        objConsignee.setDataSource(m_consignee_data_source, getConsigneeDataSource());
        objConsignee.setOrderSequenceIds(m_consignee_data_source["order_sequence_ids"]);
        //objConsignee.VipSMS.refreshRegisterMb();
		var dataSource = getConsigneeDataSource();
        if (dataSource['cur_edit_step'] == 0) {
            if (dataSource['addr_id'] == 0) {
                objConsignee.showAddNewAddress();
            } else {
                objConsignee.showEditable();
            }
			
        } else {
            objConsignee.showReadOnly();
            // 是否展示自提前置区域
            if (m_data_source['is_show_self_pick_up']) {
                objSelfPickup.setDataSource(m_data_source);
                objSelfPickup.show();
            } else {
				if(m_data_source['have_normal_self_order'] == false || (m_data_source["order_sequence_id"] == "0_0" && m_data_source["order_type"] == 0 && m_data_source["shop_id"] == 0)) {
					objSelfPickup.hide();
				}
            }
            if (m_data_source["order_products_type"] != null && m_data_source["order_products_type"] == 80) {
                objMobileCust.setDataSource(m_data_source);
                if (m_data_source['flow_step'] == 4 || m_data_source['cur_edit_step'] == 4) {
                    objMobileCust.showEditable();
                }
            } else {
                objShipment.setDataSource(m_data_source);
                if (m_data_source['cur_edit_step'] == 1 || m_data_source['flow_step'] == 1 || objShipment.isEditStatus() ||  (current_ship_address != m_data_source["ship_address"] && m_data_source["order_type"] != 50 && m_data_source["order_type"] != 98)) {
                    objShipment.showEditable();
                }
                else if (m_data_source["order_type"] == 50 || m_data_source["order_type"] == 98) {
                    objShipment.showReadOnly();
                }
                else
                    objShipment.setCityShipTypeDesc(m_data_source["city_ship_type_desc"]);

                if (m_data_source['flow_step'] == 3) {
                    objPayment.setDataSource(m_data_source);
                }
            }
            objCartItems.setDataSource(m_data_source);
            objCartItems.show(true);

            ShippingFeePieceModel(m_data_source);
        }
    }

//把consigneeRefresh分成了2个saveConsigneeRefreshCurConsignee和saveConsigneeRefreshOtherInfo方法，供保存收货地址后回调方法调用
    //为什么要把consigneeRefresh分成2个，因为海外购项目导致的
    //其他调用consigneeRefresh这个方法的地方不变
    this.saveConsigneeRefreshCurConsignee = function () {
        objConsignee.setDataSource(m_consignee_data_source, getConsigneeDataSource());
        var dataSource = getConsigneeDataSource();
        if (dataSource['cur_edit_step'] == 0) {
            if (dataSource['addr_id'] == 0) {
                objConsignee.showAddNewAddress();
            } else {
                objConsignee.showEditable();
            }
        }
        else {
            objConsignee.showReadOnly();
            // 是否展示自提前置区域
            if (m_data_source['is_show_self_pick_up']) {
                objSelfPickup.setDataSource(m_data_source);
                objSelfPickup.show();
            }
        }
    }

    this.saveConsigneeRefreshOtherInfo = function () {
        var dataSource = getConsigneeDataSource();
        if (dataSource['cur_edit_step'] != 0) {
            if (m_data_source["order_products_type"] != null && m_data_source["order_products_type"] == 80) {
                objMobileCust.setDataSource(m_data_source);
                if (m_data_source['flow_step'] == 4 || m_data_source['cur_edit_step'] == 4) {
                    objMobileCust.showEditable();
                }
            } else {
                // 是否展示自提前置区域
                if (m_data_source['is_show_self_pick_up']) {
                    objSelfPickup.setDataSource(m_data_source);
                    objSelfPickup.show();
                } else {
                    if(m_data_source['have_normal_self_order'] == false || (m_data_source["order_sequence_id"] == "0_0" && m_data_source["order_type"] == 0 && m_data_source["shop_id"] == 0)) {
						objSelfPickup.hide();
					}
                }
                objShipment.setDataSource(m_data_source);
                if (m_data_source['cur_edit_step'] == 1 || m_data_source['flow_step'] == 1 || (current_ship_address != m_data_source["ship_address"] && m_data_source["order_type"] != 50 && m_data_source["order_type"] != 98)) {
                    objShipment.showEditable();
                }
                else if (m_data_source["order_type"] == 50 || m_data_source["order_type"] == 98) {
                    objShipment.showReadOnly();
                }
                else
                    objShipment.setCityShipTypeDesc(m_data_source["city_ship_type_desc"]);

                if (m_data_source['flow_step'] == 3) {
                    objPayment.setDataSource(m_data_source);
                }
            }

            if (m_data_source['cur_edit_step'] == 2) {
                objPayment.setDataSource(m_data_source);
                objPayment.showEditable();
            }

            objCartItems.setDataSource(m_data_source);
            objCartItems.show(true);

            ShippingFeePieceModel(m_data_source);
            //地区变更会引起价格变动（区域促销），故刷新‘小计金额’显示区
            obj_order_bargin_total.innerHTML = formatFloat(m_data_source['order_bargin_total']);
        }
    }
	
    this.mobileCustRefresh = function () {
        objMobileCust.setDataSource(m_data_source);
        if (m_data_source['flow_step'] == 4 || m_data_source['cur_edit_step'] == 4) {
            objMobileCust.showEditable();
        }
        else {
            objMobileCust.showReadOnly();
        }
        objShipment.setDataSource(m_data_source);
        if (m_data_source['cur_edit_step'] == 1 || m_data_source['flow_step'] == 2) {
            objShipment.showEditable();
        }

        if (m_data_source['flow_step'] == 3) {
            objPayment.setDataSource(m_data_source);
        }
        objCartItems.setDataSource(m_data_source);
        objCartItems.show(true);
        ShippingFeePieceModel(m_data_source);
    }

    this.shipmentRefresh = function () {
        init_control();
        // 是否展示自提前置区域
        if (m_data_source['is_show_self_pick_up']) {
            objSelfPickup.setDataSource(m_data_source);
            objSelfPickup.show();
        }
        objShipment.setDataSource(m_data_source);
        if (m_data_source['cur_edit_step'] == 1 || m_data_source['flow_step'] == 1) {
            objShipment.showEditable();
        } else
            objShipment.showReadOnly();

        objPayment.setDataSource(m_data_source);
        if (m_data_source['cur_edit_step'] == 2 || m_data_source['flow_step'] == 2 || objPayment.isEditStatus()) {
            objPayment.showEditable();
        } else
            objPayment.showReadOnly();

        objCartItems.setDataSource(m_data_source);
        objCartItems.show(true);

        refreshGiftCardCharge();

        ShippingFeePieceModel(m_data_source);
        showOverseasTax(m_data_source, true); //更新海外购税
        obj_order_bargin_total.innerHTML = formatFloat(m_data_source['order_bargin_total']);
    };
	
    this.paymentRefresh = function () {
        objPayment.setDataSource(m_data_source);
		objShipment.setDataSource(m_data_source);
		ShippingFeePieceModel(m_data_source);
		showOverseasTax(m_data_source, true); //更新海外购税
        $('#order_sender_description_' + m_data_source["order_sequence_id"]).text(m_data_source["sender_description"]);
        if (m_data_source['cur_edit_step'] == 2 || m_data_source['flow_step'] == 2) {
            objPayment.showEditable();
        }
        else
            objPayment.showReadOnly();
        if (m_data_source['flow_step'] == 3) {
            if (m_data_source['order_products_type'] == 80) {
                objMobilePlan.setDataSource(m_data_source);
                objMobilePlan.show();
            }
        }
        if (m_data_source['cart_items'] != null) {
            objCartItems.setDataSource(m_data_source);
            objCartItems.show(true);
        }
        if (m_data_source["order_type"] == 50) {
            VirtualGiftCard.invoiceShow(m_data_source);
        } else {
            objInvoice.init(m_data_source, "paymentRefresh");
        }
        //需要展示一级节点
        $('#invoiceList h4').show();
        if ($('#div_invoice_' + m_data_source["order_sequence_id"]).length > 0
            && $('#div_invoice_' + m_data_source["order_sequence_id"] + ':hidden').length > 0) {
            if ($('#invoiceGroup_' + m_data_source["sort_num"]).length > 0) {
                $('#invoiceGroup_' + m_data_source["sort_num"]).show();
            } else {
                $('#invoiceList p.listcon').show();
            }
        }

        if (($('#div_invoice_expand_' + m_data_source['order_sequence_id']).length > 0) || ($('#edit_invoice_vgc').length > 0 && $('#edit_invoice_vgc:hidden').length == 0)) {
            $('#invoiceList>p.listcon').hide();
            //展示二级节点,这之前订单的二级节点也要显示
            $('#invoiceList>div.item-list').show();
            $('#invoiceCollapse').text('收起');
        }
    }

    this.refreshPackingType = function () {

        refreshGiftCardCharge();

        ShippingFeePieceModel(m_data_source);
        obj_order_bargin_total.innerHTML = formatFloat(m_data_source['order_bargin_total']);
    };

    this.show = function () {
        m_order_panel.Template = ORDER_READONLY_TEMPLATE;
        m_order_panel.DataBind();
        
        if (m_data_source["is_overseas"] == 1) {
            $("#order_overseas_tax_" + m_data_source['order_sequence_id']).show();
            
            if(m_data_source["customs_clearance_mode"]==1) {
                $("#order_assemble_tax_icon_" + m_data_source['order_sequence_id']).show();

                var orderAssembleTax = $("#order_assemble_tax_" + m_data_source['order_sequence_id']);
                $(".price-total .mr-10 .question_icon").hover(function () {
                    orderAssembleTax.show();
                }, function () {
                    orderAssembleTax.hide();
                });
            }
 
        }      

        init_control();
        var flow_step = m_data_source['flow_step'];
        var m_edit_step = m_data_source['cur_edit_step'];
        var town_id = m_data_source['town_id'];
        var sequence_id = m_data_source['order_sequence_id'];


        $('#shipmentList').append('<div id="div_shipment_' + sequence_id + '" class="item-list" ' + ($('#shipmentList>p.listcon').length > 0 ? 'style="display:none"' : '') + '></div>');
        $('#paymentList').append('<div id="div_payment_' + sequence_id + '" class="item-list" ' + ($('#paymentList>p.listcon').length > 0 ? 'style="display:none"' : '') + '></div>');
        //需要确认一下添加在了对应以及节点上
        if (m_data_source['invoice_restrict'] != InvoiceRestrict.Not) {
            $('#invoiceList').append('<div id="div_invoice_' + sequence_id + '" class="item-list" ' + ($('#invoiceList>p.listcon').length > 0 ? 'style="display:none"' : '') + '></div>');
        }
        
        //自营和二手书，联通合约机，秒杀，供应商自发商铺没有商家留言功能
        if (m_data_source["shop_id"] == 0 || m_data_source["shop_id"] >= 1500000 || (m_data_source["order_type"] == 0 && m_data_source["order_products_type"] == 80) || m_data_source["order_type"] == 97 || m_data_source["shop_type"] == 6) {
            $h(obj_shop_message);
        }
		
		//企业用户、节能减排订单、订金预售不支持礼品包装
        if (m_data_source["shop_id"] == 0 && m_data_source['order_type'] == 0 && m_data_source["order_products_type"] != 80 && m_cust_type!=10 && m_data_source['energy_saving_order'] == false && m_checkout_type != 9) {
            // $h(obj_shop_message);

            if (m_data_source["is_gift_package"]) {
                objGiftPacking.show(1, m_gift_package_source);
            } else {
                objGiftPacking.show(0, m_gift_package_source);
            }

            if (objShipment.isEditStatus()) {
                objShipment.showEditable();
            }

            if (objGiftPacking.giftPackageMain.getProductPackage().illegalProduct.isHaveIllegalProduct()
                && objGiftPacking.giftPackageMain.getProductPackage().getIsPackage()) {
                objGiftPacking.checkedGiftPackageAndOpen();
            }

            objGiftPacking.giftPackageMain.getProductPackage().illegalProduct.setPutBackCartItemCallbackForProductList(function (result) {
                m_set_delete_cartitem(result, true);
            });

            objGiftPacking.setGiftPackageSubmit(function (result) {
                m_gift_package_submit(result);
            });
        }

        obj_order_sort_number.innerHTML = m_data_source['sort_num'];

        (function (sequence_id) {
            shipping_fee_tips.init(sequence_id);
            obj_shippingfee_piece_tips.onclick = function () { shipping_fee_tips.show(sequence_id); };
            obj_shipping_fee_close_tips_close.onclick = function () { shipping_fee_tips.hide(sequence_id); };

            obj_part_order_tips.onclick = function () { $s($1("part_order_tips_box_" + sequence_id)); };
            obj_part_order_tips_close.onclick = function () { $h($1("part_order_tips_box_" + sequence_id)); };

            ///<summary>商家留言模块</summary>
            var shipmessage = ShipMessage(sequence_id);
            //如果是宝贝在书里订单，则商家留言输入框不能编辑
	        if(m_checkout_type==12){
	        	obj_text_shop_message.readOnly=true;
	        }
            obj_text_shop_message.onblur = shipmessage.Save;
            obj_text_shop_message.onmouseout = shipmessage.Save;
            obj_text_shop_message.onkeyup = shipmessage.OnChange;
            obj_text_shop_message.onpaste = shipmessage.OnChange;
            obj_text_shop_message.oncut = shipmessage.OnChange;
        })(sequence_id);

        refreshGiftCardCharge();

        ShippingFeePieceModel(m_data_source);
        $1('btn_shipping_fee_' + m_data_source['order_sequence_id']).onclick = function () { btn_shipping_fee_click(); };
        //电子书和虚拟礼品卡隐藏收货人信息
        //if (m_data_source['order_type'] != 98 && m_data_source['order_type'] != 50 && !(m_data_source['order_type'] == 97 && m_data_source['order_products_type'] == 98) && m_is_only_show_consignee==1) {
        var order_list = m_consignee_data_source["order_list"];
        var currIndex = 0;
        var overseasIndex = 0;
        var overseasCount = 0;
        for (var i = 0; i < order_list.length; i++) {
            if (m_data_source['order_sequence_id'] == order_list[i]['order_sequence_id']) {
                currIndex = i;
            }
            if (overseasCount == 0 && order_list[i]["is_overseas"]) {
                overseasIndex = i;
            }
            if (order_list[i]["is_overseas"]) {
                overseasCount++;
            }
        }
        if (m_is_show_consignee == 1 && (overseasCount <= 1 || (overseasCount > 1 && currIndex == overseasIndex))) {
            objConsignee.setDataSource(m_consignee_data_source, getConsigneeDataSource());
            objConsignee.setOrderSequenceIds(m_consignee_data_source["order_sequence_ids"]);
            //if (flow_step == 0 ||(m_is_first_checkout==1 && (m_data_source["order_type"]==50 || m_data_source["order_type"]==98))) {
            if (m_is_first_checkout == 1) {
                obj_order_shipping_fee.innerHTML = "当确认送货方式后显示";
                _h(obj_shippingfee_piece_tips);
                obj_shipping_fee_close_tips_close.onclick();
                objConsignee.showEditable();

                //第一次进结算要把商品清单栏和礼品卡密钥显示出来
                objCartItems.setDataSource(m_data_source);
                objCartItems.show(false);
                //虚拟礼品卡订单-密钥设置
                if (m_data_source['order_type'] == 50) {
                    VirtualGiftCard.show('user_key_div_' + m_data_source['order_sequence_id']);
                }
                else {
                    $H('user_key_div_' + m_data_source['order_sequence_id']);
                }
                return;
            }
            if (flow_step > 0 && town_id != 0 && m_edit_step != 0)//0403修改，修正历史数据问题 
                objConsignee.showReadOnly();
            else
                objConsignee.showEditable();
			// 是否展示自提前置区域
			if(m_data_source['is_show_self_pick_up']){
				objSelfPickup.setDataSource(m_data_source);
				objSelfPickup.show();
			}
            if (m_data_source['order_products_type'] == 80) {
                objMobileCust.setDataSource(m_data_source);
                if (flow_step == 4 || m_edit_step == 4) {
                    objMobileCust.showEditable();
                }
                else {
                    objMobileCust.showReadOnly();
                }
            }
            objShipment.setDataSource(m_data_source);
            if (flow_step == 1 || m_data_source["is_show_shipment"] == true) {
                obj_order_shipping_fee.innerHTML = "当确认送货方式后显示";
                _h(obj_shippingfee_piece_tips);
                obj_shipping_fee_close_tips_close.onclick();
                objShipment.showEditable();
            }
            else if (flow_step == 2 || flow_step == 3) {
                //如果是第一次打开页面并且在节日内则展开送货方式
                var isExpanded = isFirstOpenWeb && m_data_source["app_setting"] && (m_data_source["app_setting"]["is_show_shipment_festive_tip"] == true);
                if (m_edit_step == 1 || isExpanded) {
                    isFirstOpenWeb = false;
                    objShipment.showEditable();
                    obj_order_shipping_fee.innerHTML = "当确认送货方式后显示";
                    _h(obj_shippingfee_piece_tips);
                    obj_shipping_fee_close_tips_close.onclick();
                }
                else {
                    objShipment.showReadOnly();
                }
            }
        } else {
			// 是否展示自提前置区域
			if(m_data_source['is_show_self_pick_up']){
				objSelfPickup.setDataSource(m_data_source);
				objSelfPickup.show();
			}
            objShipment.setDataSource(m_data_source);
            objShipment.showReadOnly();
        }
        //虚拟礼品卡订单-密钥设置
        if (m_data_source['order_type'] == 50) {
            VirtualGiftCard.show('user_key_div_' + m_data_source['order_sequence_id']);
        }
        else {
            $H('user_key_div_' + m_data_source['order_sequence_id']);
        }

        //0318在支付方式打开的时候，判断礼券的状态
        objPayment.setDataSource(m_data_source);
        if (flow_step == 2) {
            objPayment.showEditable();
        }
        else if (flow_step == 3) {
            //  if (m_edit_step == 2 || m_data_source['remain_cash'] > 0 || m_data_source['remain_gift_card'] > 0) {
            if (m_edit_step == 2) {
                objPayment.showEditable();
            }
            else {
                objPayment.showReadOnly();
            }
            if (m_data_source['order_products_type'] == 80) {
                objMobilePlan.setDataSource(m_data_source);
                objMobilePlan.show();
            }
        }
        if (m_edit_step == 3) {
            objGiftPacking.checkedGiftPackageAndOpen();
        }
        if (m_data_source["order_type"] == 50) {
            VirtualGiftCard.invoiceShow(m_data_source);
        } else {
            objInvoice.init(m_data_source);
        }
        $('#shipmentList h4').show();
        $('#shipmentList p.listcon').show();
        $('#paymentList h4').show();
        $('#paymentList p.listcon').show();
        if (m_data_source['invoice_restrict'] != InvoiceRestrict.Not) {
            $('#invoiceList h4').show();
            if ($('#invoiceGroup_' + m_data_source['sort_num']).length > 0) {
                $('#invoiceGroup_' + m_data_source['sort_num']).show();
            } else {
                $('#invoiceList>p.listcon').show();
            }

            //如果默认需要发票但发票信息为空的情况
            if ((m_data_source['invoice_category'] == 1 || m_data_source['invoice_category'] == 3) && m_data_source['invoice_title'] == "" && m_data_source['invoice_content'] == "") {
                if ($('#invoiceGroup_' + m_data_source['sort_num']).length > 0) {
                    $('#invoiceGroup_' + m_data_source['sort_num']).hide();
                } else {
                    $('#invoiceList>p.listcon').hide();
                }
                $('#div_invoice_' + m_data_source['order_sequence_id']).show();
                $('#invoiceCollapse').text('保存');
            }
        }
        

       
        
        objCartItems.setDataSource(m_data_source);
        objCartItems.show(false);
        //VipSMS.setNeedSMS();
        showOverseasTax(m_data_source, false);

    };

    var showOverseasTax = function (order_data, isRefresh) {
       
        if (order_data["is_overseas"] == 1) {
            if (isRefresh) {
                $('#overseas_tax_' + order_data['order_sequence_id']).text("¥" + formatFloat(order_data['overseas_tax']));
                $('#tariff_' + order_data['order_sequence_id']).text("¥" + formatFloat(order_data['tariff']));
                $('#excise_' + order_data['order_sequence_id']).text("¥" + formatFloat(order_data['excise']));
                $('#vat_' + order_data['order_sequence_id']).text("¥" + formatFloat(order_data['vat']));
            }

            $("#order_overseas_tax_" + order_data['order_sequence_id']).show();

            if (m_data_source["customs_clearance_mode"] == 1) {
                $("#order_assemble_tax_icon_" + order_data['order_sequence_id']).show();

                var orderAssembleTax = $("#order_assemble_tax_" + order_data['order_sequence_id']);
                $(".price-total .mr-10 .question_icon").hover(function() {
                    orderAssembleTax.show();
                }, function() {
                    orderAssembleTax.hide();
                });
            }
        }
    };

    objMobileCust.setMobileCustSave(function (mobile_cust_data) {
        mobile_cust_ajax.OnReading(function () {
            is_loaded = false;
            objMobileCust.setDisabled();
            showWindowLoading('window_loading');
        });
        mobile_cust_ajax.OnSucceed(function (result) {
            is_loaded = true;
            hideLocSelect('window_loading');
            if (result != null && result['error_code'] == 0) {
                m_set_mobileCust_save(result, m_data_source['order_sequence_id'], m_data_source);
            }
            else {
                alert('保存失败！');
            }

        });
        mobile_cust_ajax.invokeServer(mobile_cust_data, 'POST', true);
        mobile_cust_ajax.OnTimeout(function () {
            is_loaded = true;
            hideLocSelect('window_loading');
        });
    });

    objConsignee.setConsigneeSave
		(
			    function (consi_data) {
			        consignee_ajax.OnReading
                    (
                        function () {
                            is_loaded = false;
                            objConsignee.setDisabled();
                            showWindowLoading('window_loading');
                        }
                    );
			        consignee_ajax.OnSucceed
                    (
                           function (result) {
                               is_loaded = true;
                               hideLocSelect('window_loading');
                               if (result != null && result['error_code'] == 0) {
                                   m_set_consignee_save(result, m_data_source['order_sequence_id'], m_data_source, consi_data['inherit_status']);
                               }
                               else {
                                   alert('保存失败！');
                               }
                           }
                    );
			        consignee_ajax.invokeServer(consi_data, 'POST', false);
			        consignee_ajax.OnTimeout
                    (
                            function () {
                                //		                    consignee_ajax.Abort();
                                is_loaded = true;
                                hideLocSelect('window_loading');
                            }
                    );
			    }
		 );
    objConsignee.setConsigneeClose
		 (
		    function () {
		        objConsignee.showReadOnly();
		    }
		 );
    objSelfPickup.setResetShipment
        (
            function (checked) {
                if (m_data_source['cur_edit_step'] == 1 
				|| objShipment.isEditStatus() 
				|| (checked == true && m_data_source['ship_type'] != 11) 
				|| (checked == false && m_data_source['ship_type'] == 11)) {
                    objShipment.showEditable();
                }
            }

        );
    objShipment.setShipmentSave
		 (
    //结算版本合并一期  2014-1-27 对于不进购物车的结算的处理
				function (shipment_data) {
				    shipment_ajax.OnReading
                    (
                        function () {
                            is_loaded = false;
                            objShipment.setDisabledSave();
                            showWindowLoading('window_loading');
                        }
                    );

				    shipment_ajax.OnSucceed
                    (
                        function (result) {
                            is_loaded = true;
                            hideLocSelect('window_loading');
                            if (result != null && result['error_code'] == 0) {
                                m_set_shipment_save(result, m_data_source['order_sequence_id'], m_data_source, shipment_data['inherit_status']);
                            }
                            else {
                                alert('保存失败！');
                            }
                        }
                    );
				    shipment_ajax.invokeServer(shipment_data, 'POST', false);
				    shipment_ajax.OnTimeout
                     (
                        function () {
                            //		                    shipment_ajax.Abort();
                            is_loaded = true;
                            hideLocSelect('window_loading');
                        }
                    );
				}
        );
    objShipment.setShipmentClose
       (
           function () {
               objShipment.showReadOnly();
           }
       );
    objShipment.setPackingTypeChanged(function (result) {
        m_packing_type_changed(result);
    });
    objPayment.setPaymentSave
		(
				function (payment_data) {
				    payment_ajax.OnReading
                        (
                            function () {
                                is_loaded = false;
                                objPayment.setDisabledSave();
                                showWindowLoading('window_loading');
                            }
                        );
				    payment_ajax.OnSucceed
						(
								function (result) {
								    is_loaded = true;
								    hideLocSelect('window_loading');
								    if (result != null && result['error_code'] == 0) {
								        m_set_payment_save(result, m_data_source['order_sequence_id'], m_data_source, payment_data['inherit_status']);
								    }
								    else {
								        alert('保存失败！');
								    }
								}
						);
				    payment_ajax.invokeServer(payment_data, 'POST', false);
				    payment_ajax.OnTimeout
                        (
		                    function () {
		                        //		                        payment_ajax.Abort();
		                        is_loaded = true;
		                        hideLocSelect('window_loading');
		                    }
                        );
				}
		 );

    objPayment.setPayPasswordStatus
            (
		                    function () {
		                        m_set_pay_password_status();
		                    }
	    	 );


    objInvoice.setInvoiceSubmit
        (
            function (invoice_data) {
                invoice_submit_ajax.OnSucceed
				(
						function (result) {
						    if (result != null && result['error_code'] == 0) {
						        objInvoice.setInvoiceCategory(invoice_data['invoice_category']);
						        objInvoice.setInvoiceTitle(invoice_data['invoice_title']);
						        objInvoice.setInvoiceContent(invoice_data['invoice_content']);
						        objInvoice.setInvoiceTel(invoice_data['invoice_tel']);
						        objInvoice.setInvoiceBookContent(invoice_data['invoice_book_content']);
						        objInvoice.setInvoiceNonbookContent(invoice_data['invoice_nonbook_content']);
						        objInvoice.showReadOnly(invoice_data['invoice_title'], invoice_data['invoice_content'], invoice_data['invoice_category'], invoice_data['invoice_tel'], invoice_data['invoice_book_content'], invoice_data['invoice_nonbook_content']);

						        if (!invoice_data['inherit_status']) {
						            m_invoice_save(result,invoice_data, m_data_source['order_sequence_id']);
						        }
						    }
						    else if (!invoice_data['inherit_status']) {
						        objInvoice.setInvoiceErrorTips(result['error_code']);
						    }
						}
				);
                invoice_submit_ajax.invokeServer(invoice_data, 'POST', false);
                invoice_submit_ajax.OnTimeout
                (
		            function () {
		                //		                invoice_submit_ajax.Abort();
		            }
                );
            }
        );
    VirtualGiftCard.setInvoiceSubmit
        (
            function (invoice_data) {
                invoice_submit_ajax.OnSucceed
				(
						function (result) {
						    VirtualGiftCard.showReadOnlyGiftCard(result);
						    if (result != null && result['error_code'] == 0) {
						    	m_invoice_save(result, invoice_data, m_data_source['order_sequence_id']);//向上层传递信息
						    }
						}
				);
                invoice_submit_ajax.invokeServer(invoice_data, 'POST', false);
                invoice_submit_ajax.OnTimeout
                (
		            function () {
		                //		                invoice_submit_ajax.Abort();
		            }
                );
            }
        );

    if (objGiftPacking) {



        //obj_gift_packing.giftPackageMain.getProductPackage().illegalProduct.setPutBackCartItemCallback(
        //    function (result) {
        //        m_set_delete_cartitem(result);
        //    }
        //);
    }

    objCartItems.setChangeConsigneeCallback
         (
		    function (order_sequence_id) {
		        objConsignee.EidtConsignee();
		    }
		 );


    objCartItems.setDeleteCartItemCallback
		 (
		    function (order_flow) {
		        m_set_delete_cartitem(order_flow);
		    }
		 );

    objCartItems.setchangePaymentCallback
         (
		    function (order_sequence_id) {
		        objPayment.showEditable();
		    }
		 );


    obj_shipping.setPieceBuySuccess
		 (
		    function (result) {
		        m_piece_buy_success(result);
		    }
		 );
    var shipping_fee_tips = {
        init: function (sequence_id) {
            if (m_data_source['shop_id'] > 0) {
                $H("shippingfee_tip_" + sequence_id);
                $S("shop_shippingfee_tip_" + sequence_id);
            }
            else {
                $S("shippingfee_tip_" + sequence_id);
                $H("shop_shippingfee_tip_" + sequence_id);
            }
        },
        show: function (sequence_id) { $S("order_shipping_fee_tips_" + sequence_id); },
        hide: function (sequence_id) { $H("order_shipping_fee_tips_" + sequence_id); }
    }

    var ShipMessage = function (sequence_id) {
        var ship_msg_obj = $1("text_shop_message_" + sequence_id);
        var placeholder_text_obj = $1("placeholder_text_" + sequence_id);
        var shop_message_prompt_obj = obj = $1("shop_message_prompt_" + sequence_id);
        var shop_message_length_obj = $1("shop_message_length_" + sequence_id);
        var msg_cache = ship_msg_obj.value;
        var maxlength = 60;
        var row = ship_msg_obj.rows;
        var time_out_change;
        var GetLength = function (str) {
            ///<summary>获得字符串实际长度，中文2，英文1</summary>
            var realLength = 0, len = str.length, charCode = -1;
            for (var i = 0; i < len; i++) {
                charCode = str.charCodeAt(i);
                if (charCode >= 0 && charCode <= 128) realLength += 1;
                else realLength += 1.63; //这里仅是计算汉字占用宽度而已，不是字符数
            }
            return realLength;
        };
        (function () {
            ///<summary>初始化商家留言</summary>
            var msg = decodeURIComponent(ship_msg_obj.value.replace(/\+/ig, " "));
            if (!msg)
                placeholder_text_obj.className = "placeholder-text";
            else {
                placeholder_text_obj.className = "placeholder-text hide";
                shop_message_length_obj.innerHTML = msg.length + "/200";
                msg_cache = ship_msg_obj.value = msg;
                row = ship_msg_obj.rows = parseInt(GetLength(msg) / maxlength) + 1;
            }
        })();
        var messageMethod = {
            //公有变量、方法
            OnChange: function () {
                ///<summary>商家留言输入的时候更新字数指示</summary>rows
                var msg = ship_msg_obj.value;
                if (!msg)
                    placeholder_text_obj.className = "placeholder-text";
                else
                    placeholder_text_obj.className = "placeholder-text hide";
                if (msg.length > 200) {
                    shop_message_prompt_obj.className = "item-message-prompt";
                    ship_msg_obj.value = msg.substr(0, 200);
                }
                else
                    shop_message_prompt_obj.className = "item-message-prompt hide";
                shop_message_length_obj.innerHTML = ship_msg_obj.value.length + "/200";
                clearTimeout(time_out_change); //实时统计有可能出现卡顿现象，因此延时200ms
                time_out_change = setTimeout(function () {
                    var new_row = (parseInt(GetLength(msg) / maxlength) + 1);
                    if (new_row != row) { //自适应
                        ship_msg_obj.rows = row = new_row;
                    }
                }, 200);
            },
            Save: function () {
                ///<summary>输入框失去焦点的时候保存</summary>                
                var msg = ship_msg_obj.value;
                if (msg_cache == msg) return;
                if (msg.length > 200) return;
                var m_ship_message_data = new Hashtable();
                m_ship_message_data['customerMessage'] = msg;
                m_ship_message_data['orderSequenceId'] = m_data_source['order_sequence_id'];
                var ship_message_ajax = new Ajax('/message/save');
                ship_message_ajax.OnSucceed
                        (
                            function (result) {
                                if (result != null && result['error_code'] == 0)
                                    msg_cache = msg;
                            }
                        )
                ship_message_ajax.invokeServer(m_ship_message_data, 'POST', false);
            }
        };
        return messageMethod;
    };

    //var VipSMS = {
    //    setNeedSMS: function () {
    //        if (m_data_source['is_show_send_msg'] == true) {
    //            obj_order_sms_checkbox.checked = m_data_source['need_send_order_sms'];
    //            obj_order_sms_checkbox.onclick = this.SaveSendSMS;
    //        }
    //        else {
    //            $h(obj_order_sms);
    //        }
    //    },
    //    SaveSendSMS: function () {
    //        var m_send_SMS_data = new Hashtable();
    //        m_send_SMS_data['need_send_sms'] = this.checked == true ? '1' : '0';
    //        m_send_SMS_data['order_sequence_id'] = m_data_source['order_sequence_id'];
    //        var ship_message_ajax = new Ajax('sendSMS.aspx');
    //        ship_message_ajax.OnSucceed
    //        (
    //            function (result) {
    //                if (result != null && result['errorCode'] == 0) {
    //                    m_data_source['need_send_sms'] = this.checked == 'checked' ? '1' : '0';
    //                }
    //            }
    //        )
    //        ship_message_ajax.invokeServer(m_send_SMS_data, 'POST', false);
    //    },
    //    refreshRegisterMb: function () {
    //        ///<summary>给送货信息保存的时候调用：this.consigneeRefresh</summary>
    //        if (m_data_source["shop_id"] == 0) {
    //            obj_register_mb.innerHTML = m_data_source["register_mb"];
    //            if ($1("register_mb_0_98"))
    //                $1("register_mb_0_98").innerHTML = m_data_source["register_mb"];
    //        }
    //    }
    //}

    var btn_shipping_fee_click = function () {
        obj_shipping.show(m_data_source['order_sequence_id']);
    }

    var ShippingFeePieceModel = function (order_data) {
       
        obj_order_shipping_fee.innerHTML = "&yen;" + formatFloat(order_data['order_shipping_fee']);
        _s(obj_shippingfee_piece_tips);
        _s(btn_shipping_fee);
		
		//订金预售不显示免运费凑单文字
        if (!order_data['is_suppot_free_shipping_fee'] || m_checkout_type == 9) {
            _h(obj_shippingfee_piece_tips);
            obj_shipping_fee_close_tips_close.onclick();
            _h(btn_shipping_fee);
        }
        if (order_data['order_shipping_fee'] <= 0) {
            _h(obj_shippingfee_piece_tips);
            obj_shipping_fee_close_tips_close.onclick();
            _h(btn_shipping_fee);
            obj_order_shipping_fee.innerHTML = '免运费';
            return;
        }
		
        if (order_data['shop_id'] > 0) {
            $1("shop_shippingfee_tip_" + order_data['order_sequence_id']).innerHTML = "再买￥" + order_data['free_shippingfee_gap'] + "可免运费";
            return;
        }

        var obj_pub_free_shippingfee = $1("pub_free_shippingfee_" + order_data['order_sequence_id']);
        var obj_gm_free_shippingfee = $1("gm_free_shippingfee_" + order_data['order_sequence_id']);
        obj_pub_free_shippingfee.innerHTML = "您需要再买 " + order_data["free_shippingfee_gap"] + " 元";
        obj_pub_free_shippingfee.style.display = "inline";
        obj_gm_free_shippingfee.style.display = "inline";
        $h(obj_gm_free_shippingfee);
    };

    this.setGiftPackageSubmit = function (GiftPackageSubmit) {
        m_gift_package_submit = GiftPackageSubmit;
    }
    var RemoveDupProds = function (lackProds) {
        var arrayObj = new Array();
        if (lackProds.substring(0, 1) == ",") {
            lackProds = lackProds.substring(1, lackProds.length);
        }
        var prods = lackProds.split(",");
        var is_find;
        for (var i = 0; i < prods.length; i++) {
            is_find = false;
            for (var j = 0; j < arrayObj.length; j++) {
                if (prods[i] == arrayObj[j]) {
                    is_find = true; break;
                }
            }
            if (!is_find && prods[i] != "") {
                arrayObj.push(prods[i]);
            }
        }
        return arrayObj.join(",");
    }
    this.setPieceBuySuccess = function (PieceBuySuccess) {
        m_piece_buy_success = PieceBuySuccess;
    }

    this.paymentInherit = function (result) {
        objPayment.setInherit(result);
    }

    this.shipmentInherit = function (result) {
        objShipment.setInherit(result);
    }

    this.consigneeInherit = function (result) {
        objConsignee.setInherit(result);
    }

    this.invoiceInherit = function (result) {
        objInvoice.inherit(result);
    }

    this.setDataSource = function (data_source) {
        m_data_source = data_source;
        m_order_panel.DataSource = data_source;

        m_data_source['gift_card_charge'] = formatFloat(m_data_source['gift_card_charge']);
        m_data_source['order_shipping_fee'] = formatFloat(m_data_source['order_shipping_fee']);
        m_data_source['order_bargin_total'] = formatFloat(m_data_source['order_bargin_total']);
    }
    this.setGiftPackageDataSource = function (data_source) {
        m_gift_package_source = data_source;
    }

    this.setConsigneeDataSource = function (data_source) {
        m_consignee_data_source = data_source;
    }

    this.setShowConsignee = function (is_show_consignee) {
        m_is_show_consignee = is_show_consignee;
    }

    this.setFirstCheckout = function (is_first_checkout) {
        m_is_first_checkout = is_first_checkout;
    }
	
	this.setShowSelfPickup = function (is_show_self_pickup) {
        m_is_show_self_pickup = is_show_self_pickup;
    }

    this.setSubmitErrorTips = function (set_submit_error_tips) {
        m_set_submit_error_tips = set_submit_error_tips;
    }

    this.setPaymentSave = function (set_payment_save) {
        m_set_payment_save = set_payment_save;
    }

    this.setShipmentSave = function (set_shipment_save) {
        m_set_shipment_save = set_shipment_save;
    }

    this.setConsigneeSave = function (set_consignee_save) {
        m_set_consignee_save = set_consignee_save;
    }

    this.setMobileCustSave = function (set_mobileCust_save) {
        m_set_mobileCust_save = set_mobileCust_save;
    }

    this.setInvoiceSave = function (set_invoice_save) {
        m_invoice_save = set_invoice_save;
    }

    //this.setCustCashSubmit = function (CustCashSubmit) {
    //    m_set_Cust_Cash_Submit = CustCashSubmit;
    //}

    //this.setCustCashCancel = function (CustCashCancel) {
    //    m_set_Cust_Cash_Cancel = CustCashCancel
    //}

    //this.setDdMoneySubmit = function (dd_money_submit) {
    //    m_dd_money_submit = dd_money_submit;
    //}

    //this.setDdMoneyCancel = function (dd_money_cancel) {
    //    m_dd_money_cancel = dd_money_cancel;
    //}

    this.setGiftCardBindSubmit = function (gift_card_bind) {
        m_gift_card_bind_submit = gift_card_bind;
    }

    this.setShipmentInherit = function (shipment_inherit) {
        m_set_shipment_inherit = shipment_inherit;
    }

    this.setPaymentInherit = function (payment_inherit) {
        m_set_payment_inherit = payment_inherit;
    }

    this.setConsigneeInherit = function (consignee_inherit) {
        m_set_consignee_inherit = consignee_inherit;
    }

    this.setInvoiceInherit = function (invoice_inherit) {
        m_set_invoice_inherit = invoice_inherit;
    }

    this.setPayPasswordStatus = function (pay_password_status_update) {
        m_set_pay_password_status = pay_password_status_update;
    }

    this.updatePayPasswordStatus = function (Status) {
        objPayment.updatePayPasswordStatus(Status);
    }

    this.setDeleteCartItemCallback = function (delete_cartitem) {
        m_set_delete_cartitem = delete_cartitem;
    }
    this.setPackingTypeChanged = function (callback) {
        m_packing_type_changed = callback;
    }
	
	//参数是交易单，在这里可以获取交易单上的信息，给相应的变量赋值
	this.setOrderFlowInfo = function(order_flow_data){
		m_cust_type = order_flow_data["cust_type"];
		m_checkout_type = order_flow_data["checkout_type"];
	}
	
    this.getOrderSequenceId = function () {
        return m_data_source['order_sequence_id'];
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

    this.isCurrentOrder = function (seq_id) {
        if (m_data_source['order_sequence_id'] == seq_id) {
            return true;
        }
        return false;
    }
    this.setEditStatus = function (edit_status) {
        m_data_source['edit_status'] = edit_status;
    }

    this.getEditStatus = function () {
        if (m_data_source['edit_status'] != null) {
            return m_data_source['edit_status'];
        }
        else {
            return false;
        }
    }

    this.isEditStatus = function () {
        if (m_data_source['edit_status'] != null) {
            if (!m_data_source['edit_status']) {
                return true;
            }
        }
        if (objShipment.isEditStatus()) {
            objShipment.setHignLight();
            window.location.hash = "shipment_point_" + m_data_source['order_sequence_id'];
            objShipment.setShipmentSaveConfig('请点击“确认送货方式”');
            fixHash();
            return false;
        }
        if (objPayment.isEditStatus()) {
            objPayment.setHignLight();
            window.location.hash = "payment_point_" + m_data_source['order_sequence_id'];
            objPayment.setPaymentSaveConfig('请点击“确认支付方式”');
            fixHash();
            return false;
        }

        if (objGiftPacking.isEditStatus()) {
            window.location.hash = "div_giftpacking";
            objGiftPacking.getGiftPackageMain().setGiftPackageSaveConfig('请点击“确认礼品包装”');
            fixHash();
            return false;
        }

        if (objInvoice.isInvoiceEditStatus()) {
            window.location.hash = "invoice_point_" + m_data_source['order_sequence_id'];
            fixHash();
            objInvoice.setInvoiceErrorTips("8");
            return false;
        }
        if (m_data_source["order_type"] == 50) {
            if ($1("edit_invoice_vgc").style.display != "none") {
                window.location.hash = "invoice_point_" + m_data_source['order_sequence_id'];
                fixHash();
                VirtualGiftCard.setInvoiceErrorTips("8");
                return false;
            }
        }
        return true;
    }
    this.getLackProds = function (lackProds) {
        if (objCartItems.getLackProdIds() != "") {
            lackProds = lackProds + "," + objCartItems.getLackProdIds();
            return RemoveDupProds(lackProds);
        }
        return lackProds;
    }
    this.setProduct = function (result) {
        if (result['cur_edit_step'] == 1) {
            objShipment.showEditable();
            window.location.hash = "shipment_point_" + result['order_sequence_id'];
            objShipment.setSubmitConflictTips();
            return;
        }
        if (result['cur_edit_step'] == 2) {
            objPayment.showEditable();
            window.location.hash = "payment_point_" + result['order_sequence_id'];
            objPayment.setSubmitConflictTips();
            return;
        }
        if (result['cur_edit_step'] == 3) {
            objGiftPacking.checkedGiftPackageAndOpen();
            return;
        }

        objCartItems.setDataSource(result, true);

        objCartItems.show(true);
    }

    function refreshGiftCardCharge() {
        // gift card charge
        if (obj_gift_card_charge && obj_gift_card_charge_help) {
            $h(obj_gift_card_charge);
            $h(obj_gift_card_charge_help);

            if (objCartItems.hasGiftCardCharge()) {
                obj_gift_card_charge_value.innerHTML = m_data_source.gift_card_charge;
                if (+m_data_source.gift_card_charge > 0) {
                    obj_gift_card_charge.style.display = "inline";
                }
                $s(obj_gift_card_charge_help);
            }
        }
    }

    function getConsigneeDataSource() {
        var cur_order = null;
        var order_list = m_consignee_data_source["order_list"];
        if (order_list != null) {
            if (order_list.length == 1) {
                cur_order = order_list[0];
                return cur_order;
            }

            for (var i = 0; i < order_list.length; i++) {
                if (order_list[i]["order_type"] != 50 && order_list[i]["order_type"] != 98) {
                    cur_order = order_list[i];
                    if (order_list[i]["is_overseas"]) {
                        break;
                    }
                } else
                    continue;
            }
            return cur_order;
        }
    }
}
