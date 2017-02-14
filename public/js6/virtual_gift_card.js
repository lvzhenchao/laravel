﻿﻿var VirtualGiftCard = (function () {
    var GiftcardKeyTemplate =
    "<a name='GiftCardUserKey'></a>"
        + "<h4>礼品卡密钥</h4>"
        +"<div class=\"item-password\">"
        + "  <p class='color-orange pw_tips'>请您为本次购买的礼品卡设置密钥，该密钥用于支付成功后获取礼品卡密码，密钥与登陆密码不能一致。</p>"
        + " <div class='info-list'>"
        + "	 <label class='label-w103' for=''>设置密钥：</label><input class='input-w153' placeholder='' id='txt_first_key' type='password' onfocus='javascript:VirtualGiftCard.showFirstKeyTips();'  onblur='javascript:VirtualGiftCard.checkFirstKeyTips(this);'/>"
        + "	 <span class='worry' id='span_first_key_tips' style='visibility:hidden'></span>"
        + "	</div>"
        + "	<div class='info-list'>"
        + "	   <label class='label-w103' for=''>确认密钥：</label><input class='input-w153' placeholder='' id='txt_second_key' type='password' onfocus='javascript:VirtualGiftCard.showSecondKeyTips();'  onblur='javascript:VirtualGiftCard.checkSecondKeyTips(this);'/>"
        + "	   <span class='worry' id='span_second_key_tips' style='visibility:hidden'></span>"
        + "	</div>"
        + "	<div class='info-list'>"
        + "	<label class='label-w103' for=''>密钥找回手机：</label><input class='input-w153' placeholder='' id='txt_mobile_number' type='text' onfocus='javascript:VirtualGiftCard.showMobileTips();'  onblur='javascript:VirtualGiftCard.checkMobileTips(this);'/>"
        + "	  <span class='worry' id='span_mobile_number_tips' style='visibility:hidden'></span>"
    + "</div>"
+ "</div>";
    var InvoiceTemplate =
     "<a name='invoice_point_{order_sequence_id}'></a>"
   + " <div id='readonly_invoice_vgc' style='display:none'>"
   + "<P class='listcon'>订单{sort_num}：<span class='mr-10' id='invoice_info_vgc'></span><a href='javascript:for_99click();' id='invoice_modify_vgc'>编辑</a></P>"
   //+ "    <P><b>发票信息：</b><span class='mr-10' id='invoice_info_vgc'></span><a href='javascript:for_99click();' id='invoice_modify_vgc'>修改发票信息</a></P>"
   + " </div>"
   + " <div id='no_invoice_vgc' style='display:none'>"
    + "<P class='listcon'>订单{sort_num}：<span class='mr-10'>暂不需要发票</span><a href='javascript:for_99click();' id='need_invoice_vgc'>编辑</a><font id='no_invoice_tips_{order_sequence_id}' color=\"#FF2832\" style='display:none'>&nbsp;&nbsp;&nbsp;&nbsp;您的订单应付金额为0元，不可开发票</font></P>"
  // + "    <P><b>发票信息：</b><span class='mr-10'>暂不需要发票</span><a href='javascript:for_99click();' id='need_invoice_vgc'>开具发票</a></P>"
   + " </div>"
   + "<div class='item-invoice' id='edit_invoice_vgc' style='display:none'>"
	+ "<div class='item-invoice-title'><b>订单{sort_num}：<span class='mr-10' id='invoice_info_{order_sequence_id}'></span></b></div>"
        + "<div id='p_select_invoice_{order_sequence_id}' class='select-invoice'>"
            + "<label class='radio' for='rb_invoice_vgc'><input type='radio' name='invoice_type_vgc' id='rb_invoice_vgc'>普通发票（纸质）</label>"
            + "<label class='radio' for='rb_e_invoice_vgc' style='POSITION: relative'><input type='radio' name='invoice_type_vgc' id='rb_e_invoice_vgc'>普通发票（电子）<i id='div_not_have_e_invoice_mark_vgc' class='question-mark'></i><i id='div_not_have_e_invoice_tips_vgc' style='display:none;' class='invoice-tips'>电子发票是税务局认可的有效收付款凭证，具有售后维权的法律效力，暂不支持企业报销<i class='tips_arrow tips_arrow02'></i></i></label>"
        + "</div>"
	+ "<div class='invoice-box' id='div_invoice_vgc'>"
		+ "<div class='mt-10'>"
			+ "<span class='label-w80'>发票抬头：</span>"
			+ "<label class='radio' for='invoice_title_person_vgc' ><input type='radio' name='invoice_title_vgc' id='invoice_title_person_vgc'>个人</label>"
			+ "<label class='radio ml-20 mr-5' for='invoice_title_company_vgc'> <input type='radio' name='invoice_title_vgc' id='invoice_title_company_vgc'>单位</label>"
			+ "<span class='select-div select-div-w205' id='invoice_title_vgc'>"
				+ "<span class='selc-text w205'><input type='text' value=''  id='txt_company_title' maxlength='50'/><i id='btn_company_title' style='display: none;'></i></span>"
				+ "<ul class='selc-box w205 h110-scroll' id='list_company_title' style='display: none;'>"
				+ "</ul>"
				+ "<iframe frameborder='0'></iframe>"
			+ "</span>"
    	    + "<span class='help-inline help-inline-error' id='tips_invoice_title_vgc' style='display:none;'><span class='icon icon-warn'></span>请填写发票抬头</span>"

		+ "</div>"
		+ "<div class='mt-10'>"
			+ "<span class='label-w80'>发票内容：</span>"
			+ "<select class='select-h22' name='invoice_content_vgc' id='invoice_content_vgc'>"
			+ "</select>"
            + "<span class='help-inline help-inline-error' id='tips_invoice_content_vgc' style='display:none;'><span class='icon icon-warn'></span>请选择发票内容</span>"
		+ "</div>"
		+ "<div class='info-list'>"
			+ " <label class='label-w80' for=''>收货人姓名：</label><input class='input-w87' type='text' placeholder=''  id='txt_ship_name_{order_sequence_id}'  value='{ship_name}'>"
			  + "<span class='help-inline help-inline-error' id='tips_invoice_ship_name_vgc' style='display:none;'><span class='icon icon-warn'></span>请填写收件人姓名</span>"
		+ "</div>"
		+ "<div class='info-list'>"
			 + "<label class='label-w80' for=''>联系电话：</label>"
			+ "<input class='input-w87' type='text' placeholder=''id='txt_ship_mb_{order_sequence_id}' value='{ship_mb}'>"
			  + "<span class='help-inline help-inline-error' id='tips_invoice_ship_mb_vgc' style='display:none;'><span class='icon icon-warn'></span>请填写联系电话</span>"
		+ "</div>"
		+ "<div class='info-list' id='div_consignee_addr_{order_sequence_id}'>"
				 + " <label class='label-w80'>地区：</label>"
				        + "<select class='select-h22' name='' id='page_sel_country_{order_sequence_id}'></select>"
                        + "<select class='select-h22' name='' id='page_sel_province_{order_sequence_id}'></select>"
                        + "<select class='select-h22' name='' id='page_sel_city_{order_sequence_id}'></select>"
                        + "<select class='select-h22' name='' id='page_sel_town_{order_sequence_id}'></select>"
                        + "<select class='hide' name='' id='page_sel_quarter_{order_sequence_id}'></select>"
				  + "<span class='help-inline help-inline-error' id='span_region_id_valid_msg_{order_sequence_id}' style='display:none;'><span class='icon icon-warn'></span>请选择地址！</span>"

		+ "</div>"
		+ "<div class='info-list'>"
			 + "<label class='label-w80' for=''>详细地址：</label><input class='input-w515' type='text' placeholder='' id='txt_ship_address_{order_sequence_id}' value='{ship_address}'>"
			  + "<span class='help-inline help-inline-error' id='tips_invoice_detail_addr_vgc' style='display:none;'><span class='icon icon-warn'></span>请填写街道地址</span>"
		+ "</div>"
		+ "<div class='info-list'>"
			 + "<label class='label-w80' for=''>邮政编码：</label><input class='input-w87' type='text' placeholder='' id='txt_ship_zip_{order_sequence_id}' value='{ship_zip}'>"
			  + "<span class='help-inline help-inline-error' id='tips_invoice_ship_zip_vgc' style='display:none;'><span class='icon icon-warn'></span>请填写您的邮编</span>"
		+ "</div>"
		+ "<p class='btn-bar'>"
			+ "<a href='javascript:for_99click();' class='btn btn-large-orange mr-5' id='invoice_submit_vgc'>确认发票信息</a>"
			+ "<a href='javascript:for_99click();' class='btn btn-large-grey' id='no_invoice_submit_vgc'>暂不需要发票</a>"
			+ "<span class='help-inline help-inline-error help-inline-large' id='invoice_error_info_vgc'></span>"
		+ "</p>"
	+ "</div>"
            //电子发票
        + "                 <div class='invoice-box hide' id='div_e_invoice_vgc' >"
        + "                     <div class='ml-15 mt-10'>"
        + "                         <span class='span-w63'>发票抬头：</span>"
        + "                         <label class='radio'>"
        + "                             <input type='radio' value='0' id='e_invoice_title_person_vgc' name='rb_e_invoice_title_{order_sequence_id}' checked='checked' /><span>个人</span>"
        + "                         </label>"
        + "                     </div>"
        + "                     <div class='ml-15 mt-10'>"
        + "                         <span class='span-w63'>发票内容：</span>"
        + "                         <select id='e_invoice_content_vgc' class='select-h22'></select>"
        + "                         <span class='help-inline help-inline-error' id='tips_e_invoice_content_vgc' style='display:none;'><span class='icon icon-warn'></span>请选择发票内容</span>"
        + "                         <div class='invoice-info ml-65'>"
        + "                             <p id='p_e_content_tips_{order_sequence_id}'></p>"
        + "                         </div>"
        + "                     </div>"
        + "                     <div class='info-list'>"
        + "                         <label class='label-w80' for=''><strong class='hot'>*</strong>手机号：</label>"
        + "                         <input id='e_invoice_tel_vgc' class='input-w87' type='text' placeholder=''>"
        + "                         <span id='e_invoice_tel_tips_vgc' class='help-inline help-inline-error' style='display:none;'><span class='icon icon-warn'></span>请正确填写11位有效的手机号</span>"
        + "                     </div>"
        + "                             <p class='btn-bar'>"
        + "                                  <a class='btn btn-large-orange mr-5' href='javascript:for_99click();'  id='e_invoice_submit_vgc' >确认发票信息</a>"
        + "                                  <a class='btn btn-large-grey' href='javascript:for_99click();'  id='no_e_invoice_submit_vgc' >暂不需要发票</a>"
        + "                                  <span  id='e_invoice_error_info_vgc'></span>"
        + "                              </p>"
        + "                 </div>"
+ "</div>";
    //#region 密钥 
    var regexShipMb = '^((14[0-9])|(13[0-9])|(15[^4,\\D])|(18[0-9])|(17[0-9]))\\d{8}$';
	//保存真实的手机号（不带*号），在保存发票时会用到，因为发票编辑时，手机号要隐藏中间4位
	var real_invoice_ship_mb=null;
    var show = function (containerId) {
        var m_Virtualb_panel = new JSPanel(containerId);
        m_Virtualb_panel.Template = GiftcardKeyTemplate;
        m_Virtualb_panel.DataBind();
    };

    var showFirstKeyTips = function () {
        $1('span_first_key_tips').innerHTML = '密钥可使用6位数字，不能与当当登录密码相同';
        $1('span_first_key_tips').style.visibility = 'visible';
        $1('span_first_key_tips').className = 'show';
    };

    var checkFirstKeyTips = function (obj) {
        var first_key = obj.value;
        if (first_key == '') {
            $1('span_first_key_tips').innerHTML = '请设置密钥';
            $1('span_first_key_tips').style.visibility = 'visible';
            $1('span_first_key_tips').className = 'worry';
            return;
        }
        var reg = new RegExp('^(\\d{6})$', 'g');
        if (!reg.test($F('txt_first_key'))) {
            $1('span_first_key_tips').innerHTML = '密钥格式错误，请重新输入';
            $1('span_first_key_tips').style.visibility = 'visible';
            $1('span_first_key_tips').className = 'worry';
            return;
        }

        //密码六位值相同则过于简单
        var arrKey = first_key.split('');
        var issame = true;
        var keyword = arrKey[0];
        for (var i = 1; i < arrKey.length; i++) {
            if (arrKey[i] != keyword) {
                issame = false;
                break;
            }
        } 
        if (issame) {
            $1('span_first_key_tips').innerHTML = '密钥过于简单，请重新输入';
            $1('span_first_key_tips').style.visibility = 'visible';
            $1('span_first_key_tips').className = 'worry';
            return;
        }

        if ($.md5($1('txt_first_key').value) == userPassword) {
            $1('span_first_key_tips').innerHTML = '密钥不能与当当登录密码相同，请重新输入';
            $1('span_first_key_tips').style.visibility = 'visible';
            $1('span_first_key_tips').className = 'worry';
            return;
        }

        $1('span_first_key_tips').style.visibility = 'visible';
        $1('span_first_key_tips').innerHTML = '';
        $1('span_first_key_tips').className = 'success';
        
        if ($1('txt_second_key').value != '') {
            if ($1('txt_second_key').value != obj.value) {
                $1('span_second_key_tips').innerHTML = '两次输入密钥不一致，请重新输入';
                $1('span_second_key_tips').style.visibility = 'visible';
                $1('span_second_key_tips').className = 'worry';
            } else {
                $1('span_second_key_tips').style.visibility = 'visible';
                $1('span_second_key_tips').innerHTML = '';
                $1('span_second_key_tips').className = 'success';
            }
        }
    };

    var showSecondKeyTips = function () {
        $1('span_second_key_tips').innerHTML = '请再次输入您设置的密钥';
        $1('span_second_key_tips').style.visibility = 'visible';
        $1('span_second_key_tips').className = 'show';
    };

    var checkSecondKeyTips = function (obj) {
        var second_key = obj.value;
        if (second_key == '') {
            $1('span_second_key_tips').innerHTML = '请再次输入密钥';
            $1('span_second_key_tips').style.visibility = 'visible';
            $1('span_second_key_tips').className = 'worry';
            return;
        }

        if ($1('txt_first_key').value != obj.value) {
            $1('span_second_key_tips').innerHTML = '两次输入密钥不一致，请重新输入';
            $1('span_second_key_tips').style.visibility = 'visible';
            $1('span_second_key_tips').className = 'worry';
            return;
        }

        $1('span_second_key_tips').style.visibility = 'visible';
        $1('span_second_key_tips').innerHTML = '';
        $1('span_second_key_tips').className = 'success';
    };

    var showMobileTips = function () {
        $1('span_mobile_number_tips').innerHTML = '请输入您的常用手机号码，此号码用于找回密钥';
        $1('span_mobile_number_tips').style.visibility = 'visible';
        $1('span_mobile_number_tips').className = 'show';
    };

    var checkMobileTips = function (obj) {
        var mobile = obj.value;
        if (mobile == '') {
            $1('span_mobile_number_tips').innerHTML = '请输入您的手机号码';
            $1('span_mobile_number_tips').style.visibility = 'visible';
            $1('span_mobile_number_tips').className = 'worry';
            return;
        }
        var mobileReg = new RegExp(regexShipMb);
        if (!mobileReg.test(mobile)) {
            $1('span_mobile_number_tips').innerHTML = '手机号码格式错误，请重新输入';
            $1('span_mobile_number_tips').style.visibility = 'visible';
            $1('span_mobile_number_tips').className = 'worry';
            return;
        }

        $1('span_mobile_number_tips').style.visibility = 'visible';
        $1('span_mobile_number_tips').innerHTML = '';
        $1('span_mobile_number_tips').className = 'success';
    };

    var submitCheckVirtualKey = function () {
        if ($F('txt_first_key') == '') {
            $1('span_first_key_tips').innerHTML = '请设置密钥';
            $1('span_first_key_tips').style.visibility = 'visible';
            $1('span_first_key_tips').className = 'worry';
            return false;
        }

        if ($F('txt_second_key') == '') {
            $1('span_second_key_tips').innerHTML = '请再次输入密钥';
            $1('span_second_key_tips').style.visibility = 'visible';
            $1('span_second_key_tips').className = 'worry';
            return false;
        }

        if ($1('span_first_key_tips').innerHTML.trim().length > 0 || $1('span_second_key_tips').innerHTML.trim().length > 0) {
            return false;
        }

        if ($F('txt_mobile_number') == '') {
            $1('span_mobile_number_tips').innerHTML = '请输入您的手机号码';
            $1('span_mobile_number_tips').style.visibility = 'visible';
            $1('span_mobile_number_tips').className = 'worry';
            return false;
        }

        if ($1('span_mobile_number_tips').innerHTML.trim().length > 0) {
            return false;
        }
        return true;
    };
    //#endregion

    var orderDataCache;
    var setDataSource = function (data) {
        orderDataCache = data;
        REGEX_SHIP_MB = orderDataCache['ship_mb_regular_express'];
    };
    //region 发票区域
    var invoiceContentCache = []; //发票内容缓存
    var invoiceTitleCache = []; //发票抬头缓存,包含个人和单位
    var isGetInvoiceTitle = false;
    var invoiceContentDropDownList = new DropDownList("invoice_content_vgc");
    invoiceContentDropDownList.DataTextField = 'invoice_content'; //对应后台返回前台发票内容的key
    invoiceContentDropDownList.DataValueField = 'invoice_content'; //对应后台返回前台发票内容的value，由于后台返回内容没有value指定为key

    var eInvoiceContentDropDownList = new DropDownList("e_invoice_content_vgc");
    eInvoiceContentDropDownList.DataTextField = 'invoice_content';
    eInvoiceContentDropDownList.DataValueField = 'invoice_content';

    var invoiceContentAjax = new Ajax('/invoice/content');
    var invoiceDeleteAjax = new Ajax('/invoice/deletetitle');
    var invoiceTitleAjax = new Ajax('/invoice/info');
    var objRegion = null;
    var invoiceDate = null;
    var m_invoice_submit = null;

    var invoiceShow = function (m_data_source) {
    	if (m_data_source['invoice_restrict'] == InvoiceRestrict.Not) {
    		return;
    	}
        setDataSource(m_data_source);
        var invoicePanel = new JSPanel("div_invoice_" + m_data_source["order_sequence_id"]);
        invoicePanel.Template = InvoiceTemplate;
        invoicePanel.DataSource = m_data_source;
        invoicePanel.DataBind();
        //展开编辑
        if ((parseFloat(m_data_source['order_payable_amount']) + parseFloat(m_data_source['cust_cash_used']) <= 0)
        		|| (m_data_source["invoice_category"] != InvoiceCategory.NotNeedInvoice && !m_data_source["invoice_title"] || m_data_source["invoice_edit_status"])) {
            //有些条件下是不需要
            $('#invoiceList>p.listcon').hide();
            if ($('#invoiceList>h4:hidden').length > 0) {
                $('#invoiceList>h4').show();
            }
            $('#invoiceList>div.item-list').show();
            $('#invoiceCollapse').text('保存');
            $s($1("edit_invoice_vgc"));
            InvoiceEdit(0);
            if (!canInvoicing()) {
	        	$1('invoice_submit_vgc').className = 'btn btn-large-grey';
	        }
            return;
        }

        //不需要发票
        if (m_data_source["invoice_category"] == InvoiceCategory.NotNeedInvoice) {
            $s($1("no_invoice_vgc"));
            $1('need_invoice_vgc').onclick = InvoiceEdit;
        }
        else {
            //已开发票
            showInvoiceInfo();
        }
    };
    //初进页面要开发票、 修改发票、要开发票
    this.InvoiceEdit = function () {
        $s($1("edit_invoice_vgc"));
        $h($1('no_invoice_vgc'));
        $h($1('readonly_invoice_vgc'));
        initialize();
    };

    var initialize = function () {
        $1('tips_invoice_title_vgc').style.display = "none";
        $1('tips_invoice_content_vgc').style.display = "none";
        $1("tips_invoice_ship_name_vgc").style.display = "none";
        $1("tips_invoice_ship_mb_vgc").style.display = "none";
        $1("tips_invoice_detail_addr_vgc").style.display = "none";
        $1("tips_invoice_ship_zip_vgc").style.display = "none";
        $1('tips_e_invoice_content_vgc').style.display = "none";
        $1('e_invoice_tel_tips_vgc').style.display = "none";
		
        var title='';
        var content = '';
        var tel = '';

        //绑定发票内容
        bindInvoiceContent(orderDataCache["order_sequence_id"]);

        //绑定发票标题
        if (orderDataCache["invoice_title"] == null || orderDataCache["invoice_title"] =="") {
            setCompanyTitle(InvoiceInfoType.All);
            if (invoiceTitleCache[InvoiceInfoType.All] != null && invoiceTitleCache[InvoiceInfoType.All].length > 0) {
                title = invoiceTitleCache[InvoiceInfoType.All][0]["invoice_title"];
                content = invoiceTitleCache[InvoiceInfoType.All][0]["invoice_content"];
                tel = invoiceTitleCache[InvoiceInfoType.All][0]["invoice_tel"];
            }
        } else {
            title = orderDataCache["invoice_title"];
            content = orderDataCache["invoice_content"];
            tel = orderDataCache["invoice_tel"];
        }

        if (invoiceContentCache[InvoiceCategory.ElectronInvoice].length > 1 && tel) {
            $1("rb_e_invoice_vgc").checked = true;
            $h($1("div_invoice_vgc"));
            $s($1("div_e_invoice_vgc"));
			//隐藏电子发票手机号中间4位
			real_invoice_ship_mb = tel;
            $1("e_invoice_tel_vgc").value = ConsigneeCommon.getFormatShipMb(tel);
            if (content != null) {
                setEContentbyTitle(content);
            }
        } else {
            $1("rb_invoice_vgc").checked = true;
            $s($1("div_invoice_vgc"));
			//普通发票，隐藏手机号中间4位
			real_invoice_ship_mb = orderDataCache['ship_mb'];
			$1('txt_ship_mb_' + orderDataCache["order_sequence_id"]).value = ConsigneeCommon.getFormatShipMb($1('txt_ship_mb_' + orderDataCache["order_sequence_id"]).value);
			$h($1("div_e_invoice_vgc"));
            if (invoiceContentCache[InvoiceCategory.ElectronInvoice].length <= 1) {
                $1("rb_e_invoice_vgc").disabled = true;
            }
            if (!tel) {
                //判断是个人 还是 单位radio
                if (title == "个人") {
                    $1("invoice_title_person_vgc").checked = true;
                    $1("txt_company_title").disabled = true;
                } else {
                    $1("invoice_title_company_vgc").checked = true;
                    $1("txt_company_title").value = title;
                    $s($1("btn_company_title"));
                }
                if (content != null) {
                    setContentbyTitle(content);
                }
            }
        }


        addEvents();
        //初始化省市区
        objRegion = new Region('div_consignee_addr_' + orderDataCache['order_sequence_id'], orderDataCache['order_sequence_id'], 'page',2);
        objRegion.setValue(orderDataCache['country_id'], orderDataCache['province_id'], orderDataCache['city_id'], orderDataCache['town_id'], orderDataCache['quarter_id'], orderDataCache['order_type'], orderDataCache['shop_id']);

    };
    //绑定发票内容
    var bindInvoiceContent = function (orderSequenceId) {
        if (invoiceContentCache[InvoiceCategory.PaperInvoice] != null && invoiceContentCache[InvoiceCategory.ElectronInvoice] != null) {
            invoiceContentDropDownList.DataSource = invoiceContentCache[InvoiceCategory.PaperInvoice];
            invoiceContentDropDownList.DataBind();
            eInvoiceContentDropDownList.DataSource = invoiceContentCache[InvoiceCategory.ElectronInvoice];
            eInvoiceContentDropDownList.DataBind();
            if (invoiceContentCache[InvoiceCategory.ElectronInvoice] <= 1) {
                $1("rb_e_invoice_vgc").disabled = true;
            }
        } else {
            invoiceContentAjax.invokeServer('order_sequence_id=' + orderSequenceId, 'POST', false);
        }
    };
    invoiceContentAjax.OnSucceed
	(
	    function (result) {
	        if (result != null && result['errorCode'] == 0) {
	            if (result['invoice']) {
	                invoiceContentCache[InvoiceCategory.PaperInvoice] = result['invoice'];
	            } else {
	                invoiceContentCache[InvoiceCategory.PaperInvoice] = new Array();
	            }
	            if (result['e_invoice']) {
	                invoiceContentCache[InvoiceCategory.ElectronInvoice] = result['e_invoice'];
	            } else {
	                invoiceContentCache[InvoiceCategory.ElectronInvoice] = new Array();
	            }
	        }
	        invoiceContentCache[InvoiceCategory.PaperInvoice].unshift({ 'invoice_content': '请选择' });
	        invoiceContentCache[InvoiceCategory.ElectronInvoice].unshift({ 'invoice_content': '请选择' });
	        bindInvoiceContent();
	        if (!canInvoicing()) {
	        	$1('invoice_submit_vgc').className = 'btn btn-large-grey';
	        }
	    }
	);
    var canInvoicing = function () {
    	if (mustNeedInvoice()) {
            return true;
        }
        return !(parseFloat(orderDataCache['order_payable_amount']) + parseFloat(orderDataCache['cust_cash_used']) <= 0);
    };
    var mustNeedInvoice = function () {
    	return invoiceContentCache["invoice_restrict"] == 1;
    };
    //绑定单位title
    var setCompanyTitle = function (invoiceInfoType) {
        // 0 ,所有发票数据最近一条，1 为 个人用户的发票数据仅有一条，2为 单位抬头的发票数据按时间排序前100条
        invoiceTitleAjax.OnSucceed(
            function (result) {
                if (result != null && result["errorCode"] == 0) {
                    if (result.invoice != null) {
                        invoiceTitleCache[invoiceInfoType] = result.invoice;
                    }
                }
            }
        );
        invoiceTitleAjax.invokeServer("type= " + invoiceInfoType, "POST", false);
    };
    //根据发票单位联动发票内容
    function setContentbyTitle(invoiceContent) {
        //选定内容
        var options = $1("invoice_content_vgc").options;
        for (var j = 0; j < options.length; j++) {
            if (options[j].value == invoiceContent) {
                options[j].selected = true;
                break;
            }
        }
    }
    //根据发票单位联动发票内容
    function setEContentbyTitle(invoiceContent) {
        //选定内容
        var options = $1("e_invoice_content_vgc").options;
        for (var j = 0; j < options.length; j++) {
            if (options[j].value == invoiceContent) {
                options[j].selected = true;
                break;
            }
        }
    }
    // 附加事件
    function addEvents() {
        //增加input的键盘响应函数
        $1("txt_company_title").onkeyup = function (e) { intelligent_title_search(this, e); };

        //radio切换
        $1("invoice_title_person_vgc").onclick = function () {
            $1("txt_company_title").disabled = true;
            $1("btn_company_title").disabled = true;
            $h($1("list_company_title"));

            if (invoiceTitleCache[InvoiceInfoType.PaperPerson] == null) {
                setCompanyTitle(InvoiceInfoType.PaperPerson);
            }
            if (invoiceTitleCache[InvoiceInfoType.PaperPerson] != null) {
                setContentbyTitle(invoiceTitleCache[InvoiceInfoType.PaperPerson][0]["invoice_content"]);
            }
        };

        $1("invoice_title_company_vgc").onclick = function () {
            $1("txt_company_title").disabled = false;
            $1("btn_company_title").disabled = false;
            $s($1("btn_company_title"));
            //绑定下拉列表
            if (!isGetInvoiceTitle && invoiceTitleCache[InvoiceInfoType.PaperCompany] == null) {
                setCompanyTitle(InvoiceInfoType.PaperCompany);
            }
            if (invoiceTitleCache[InvoiceInfoType.PaperCompany] != null) {
                $1("txt_company_title").value = invoiceTitleCache[InvoiceInfoType.PaperCompany][0]["invoice_title"];
                setContentbyTitle(invoiceTitleCache[InvoiceInfoType.PaperCompany][0]["invoice_content"]);
            }
        };

        $1("btn_company_title").onclick = function () {
            //已绑定过就不再次绑定
            var invoiceTitle = $1("list_company_title");
            if (!isGetInvoiceTitle || invoiceTitle.childNodes.length == 0 || invoiceTitleCache[InvoiceInfoType.PaperCompany] == null) {
                setCompanyTitle(InvoiceInfoType.PaperCompany);
                if (invoiceTitleCache[InvoiceInfoType.PaperCompany] == null) {
                    return;
                }
                var html = new StringBuilder();
                for (var i = 0; i < invoiceTitleCache[InvoiceInfoType.PaperCompany].length; i++) {
                    html.appendFormat("<li id=" + invoiceTitleCache[InvoiceInfoType.PaperCompany][i]["id"] + "><p>" + invoiceTitleCache[InvoiceInfoType.PaperCompany][i]["invoice_title"] + "</p><a onclick='invoice_title_delete(" + invoiceTitleCache[InvoiceInfoType.PaperCompany][i]["id"] + ")' style='display:none'>删除</a></li>");
                }
                invoiceTitle.innerHTML = html.toString();
                for (var j = 0; j < invoiceTitle.childNodes.length; j++) {
                    var item = invoiceTitle.childNodes[j];
                    item.onclick = function (event) {
                        var eventElement = event ? event.target : window.event.srcElement;
                        //删除
                        if (eventElement.tagName == "A") {
                            deleteInvoiceTitle(this.id);
                            invoiceTitle.removeChild(this);
                        }
                        //选中
                        else {
                            //选定抬头
                            $1("txt_company_title").value = this.firstChild.innerHTML;

                            for (var i = 0; i < invoiceTitleCache[InvoiceInfoType.PaperCompany].length; i++) {
                                if (invoiceTitleCache[InvoiceInfoType.PaperCompany][i]["invoice_title"] == this.firstChild.innerHTML) {
                                    setContentbyTitle(invoiceTitleCache[InvoiceInfoType.PaperCompany][i]["invoice_content"]);
                                    break;
                                }
                            }
                            $h($1("list_company_title"));
                        }
                    };
                    item.onmouseover = function () {
                        this.className = "active";
                        this.lastChild.style.display = "block";
                    };
                    item.onmouseout = function () {
                        this.className = "";
                        this.lastChild.style.display = "none";
                    };
                }
            }
            $1("list_company_title").style.display = $1("list_company_title").style.display == "none" ? "block" : "none";
        };

        $1("invoice_submit_vgc").onclick = invoiceSubmitClick;
        $1("no_invoice_submit_vgc").onclick = invoice_cancel_click;
        $1("e_invoice_submit_vgc").onclick = eInvoiceSubmitClick;
        $1("no_e_invoice_submit_vgc").onclick = invoice_cancel_click;

        $1("rb_invoice_vgc").onclick = function () {
            $s($1("div_invoice_vgc"));
            $h($1("div_e_invoice_vgc"));
            if (invoiceTitleCache[InvoiceInfoType.Paper] == null) {
                setCompanyTitle(InvoiceInfoType.Paper);
            }
            if (invoiceTitleCache[InvoiceInfoType.Paper] != null) {
                setContentbyTitle(invoiceTitleCache[InvoiceInfoType.Paper][0]["invoice_content"]);
                if (invoiceTitleCache[InvoiceInfoType.PaperCompany][0]["invoice_title"] == "个人") {
                    $1("invoice_title_person_vgc").checked = true;
                } else {
                    $1("invoice_title_company_vgc").checked = true;
                    $1("txt_company_title").value = invoiceTitleCache[InvoiceInfoType.PaperCompany][0]["invoice_title"];
                }
            }
        };

        $1("rb_e_invoice_vgc").onclick = function () {
            $h($1("div_invoice_vgc"));
            $s($1("div_e_invoice_vgc"));
            if (invoiceTitleCache[InvoiceInfoType.ElectronPerson] == null) {
                setCompanyTitle(InvoiceInfoType.ElectronPerson);
            }
            if (invoiceTitleCache[InvoiceInfoType.ElectronPerson] != null) {
                setEContentbyTitle(invoiceTitleCache[InvoiceInfoType.ElectronPerson][0]["invoice_content"]);
            }
        };

        $1('div_not_have_e_invoice_mark_vgc').onmouseover = function () {
            $s($1('div_not_have_e_invoice_tips_vgc'));
        };
        $1('div_not_have_e_invoice_mark_vgc').onmouseout = function () {
            $h($1('div_not_have_e_invoice_tips_vgc'));
        };  
		$1('txt_ship_mb_' + orderDataCache["order_sequence_id"]).onfocus = function(){this.value = "";};
		$1('e_invoice_tel_vgc').onfocus = function(){this.value="";};
    }
    var invoice_cancel_click = function () {
        $h($1("edit_invoice_vgc"));
        $s($1("no_invoice_vgc"));
        var invoiceData = new Hashtable();
        invoiceData['invoice_category'] = InvoiceCategory.NotNeedInvoice;
        invoiceData['invoice_title'] = "";
        invoiceData['invoice_content'] = "";
        invoiceData['order_sequence_id'] = orderDataCache['order_sequence_id'];
        invoiceData['inherit_status'] = false;
        //invioceSubmitAjax.invokeServer(invoiceData, 'POST', false);

        //需要更新一级显示内容
        //为合并的状态
        //if ($('#invoiceGroup_' + orderDataCache['sort_num']).length > 0) {
        //    var sourceObj = $('#invoiceGroup_' + orderDataCache['sort_num']).prev();
        //    $('p').remove("#invoiceGroup_" + orderDataCache['sort_num']);

        //    var info = '暂不需要发票';
        //    var invoicesHtml = '';
        //    invoicesHtml += '<p id="invoiceGroup_' + orderDataCache['sort_num'] + '" class="listcon" style="display:none">订单' + orderDataCache['sort_num'] + '：<span class="mr-10">'
        //            + info + '</span></p>';
        //    sourceObj.after(invoicesHtml);
        //}
        m_invoice_submit(invoiceData);

        $1('need_invoice_vgc').onclick = InvoiceEdit;
    };
    function invoiceSubmitClick() {
    	 if (!canInvoicing()) {
    		 $1('tips_invoice_content_vgc').style.display = "";
    		 $1('tips_invoice_content_vgc').innerHTML = "您的订单应付金额为0元，不可开发票，请您选择“暂不需要发票”";
             return;
         }
        $1('tips_invoice_title_vgc').style.display = "none";
        $1('tips_invoice_content_vgc').style.display = "none";
        $1("tips_invoice_ship_name_vgc").style.display = "none";
        $1("tips_invoice_ship_mb_vgc").style.display = "none";
        $1("tips_invoice_detail_addr_vgc").style.display = "none";
        $1("tips_invoice_ship_zip_vgc").style.display = "none";
        //验证发票内容
        invoiceDate = new Hashtable();
        invoiceDate["invoice_category"] = InvoiceCategory.PaperInvoice;
        if (!$1("invoice_title_person_vgc").checked && !$1("invoice_title_company_vgc").checked) {
            $1('tips_invoice_title_vgc').style.display = "";
            return;
        }
        if ($1("invoice_title_company_vgc").checked == true) {
            invoiceDate["invoice_title"] = $1("txt_company_title").value;
            if (invoiceDate["invoice_title"] == "") {
                $1('tips_invoice_title_vgc').style.display = "";
                return;
            }
        } else {
            invoiceDate["invoice_title"] = "个人";
        }
        $1('tips_invoice_title_vgc').style.display = "none";
        invoiceDate["invoice_content"] = $1("invoice_content_vgc").value;
        if (invoiceDate["invoice_content"] == "" || invoiceDate["invoice_content"] == "请选择") {
            $1('tips_invoice_content_vgc').style.display = "";
            return;
        } else {
            $1('tips_invoice_content_vgc').style.display = "none";
        }
        var regionValue = null;
        if (!(regionValue = objRegion.getValue())) {
            return;
        }
        if ($F('txt_ship_name_' + orderDataCache["order_sequence_id"]) == "") {
            $1("tips_invoice_ship_name_vgc").style.display = "";
            $1('tips_invoice_ship_name_vgc').innerHTML = CONSIGNEE_ICON_WARN + "请填写收件人姓名";
            return;
        }
        var curShipName = filter_var($F('txt_ship_name_' + orderDataCache["order_sequence_id"]));
        if (curShipName.indexOf('<') >= 0) {
            $1("tips_invoice_ship_name_vgc").style.display = "";
            $1('tips_invoice_ship_name_vgc').innerHTML = CONSIGNEE_ICON_WARN + MSG_INVALID_CHAR_ERROR.replace('{0}', '<');
            return;
        }
        if (curShipName.indexOf('>') >= 0) {
            $1("tips_invoice_ship_name_vgc").style.display = "";
            $1('tips_invoice_ship_name_vgc').innerHTML = CONSIGNEE_ICON_WARN + MSG_INVALID_CHAR_ERROR.replace('{0}', '>');
            return;
        }
        if ($F('txt_ship_mb_' + orderDataCache["order_sequence_id"]) == "") {
            $1("tips_invoice_ship_mb_vgc").style.display = "";
            $1('tips_invoice_ship_mb_vgc').innerHTML = CONSIGNEE_ICON_WARN + "请填写联系电话";
            return;
        }
        var mobileReg = new RegExp(REGEX_SHIP_MB);
		var temp_ship_mb
		if(ConsigneeCommon.isContainAterisk($F('txt_ship_mb_' + orderDataCache["order_sequence_id"]))){
			temp_ship_mb = real_invoice_ship_mb;
		}else{
			temp_ship_mb = $F('txt_ship_mb_' + orderDataCache["order_sequence_id"]);
		}
        if (!mobileReg.test(temp_ship_mb)) {
        	$1("tips_invoice_ship_mb_vgc").style.display = "";
            $1('tips_invoice_ship_mb_vgc').innerHTML = CONSIGNEE_ICON_WARN + MSG_SHIP_MB_ERROR;
            return;
        }
        if ($F('txt_ship_address_' + orderDataCache["order_sequence_id"]) == "") {
            $1("tips_invoice_detail_addr_vgc").style.display = "";
            $1('tips_invoice_detail_addr_vgc').innerHTML = CONSIGNEE_ICON_WARN + "请填写街道地址";
            return;
        }
        var curShipAddress = filter_var($F('txt_ship_address_' + orderDataCache["order_sequence_id"]));
        if (curShipAddress.indexOf('<') >= 0) {
            $1("tips_invoice_detail_addr_vgc").style.display = "";
            $1('tips_invoice_detail_addr_vgc').innerHTML = CONSIGNEE_ICON_WARN + MSG_INVALID_CHAR_ERROR.replace('{0}', '<');
            return;
        }
        if (curShipAddress.indexOf('>') >= 0) {
            $1("tips_invoice_detail_addr_vgc").style.display = "";
            $1('tips_invoice_detail_addr_vgc').innerHTML = CONSIGNEE_ICON_WARN + MSG_INVALID_CHAR_ERROR.replace('{0}', '>');
            return;
        }
        if ($F('"txt_ship_zip_' + orderDataCache["order_sequence_id"]) == "") {
            $1("tips_invoice_ship_zip_vgc").style.display = "";
            $1('tips_invoice_ship_zip_vgc').innerHTML = CONSIGNEE_ICON_WARN + "请填写您的邮编";
            return;
        }
        var zipReg = new RegExp(REGEX_SHIP_ZIP);
        if (!zipReg.test($F('txt_ship_zip_' + orderDataCache["order_sequence_id"]))) {
        	$1("tips_invoice_ship_zip_vgc").style.display = "";
            $1('tips_invoice_ship_zip_vgc').innerHTML = CONSIGNEE_ICON_WARN + MSG_SHIP_ZIP_ERROR;
            return;
        }
        invoiceDate['order_sequence_id'] = orderDataCache['order_sequence_id'];

        invoiceDate['order_type'] = orderDataCache['order_type'];
        invoiceDate['ship_name'] = curShipName;
        invoiceDate['country_id'] = regionValue['country_id'];
        invoiceDate['province_id'] = regionValue['province_id'];
        invoiceDate['city_id'] = regionValue['city_id'];
        invoiceDate['town_id'] = regionValue['town_id'];
        invoiceDate['quarter_id'] =  regionValue['quarter_id'];

        invoiceDate['ship_zip'] = $F('txt_ship_zip_' + orderDataCache["order_sequence_id"]);
        //invoiceDate['ship_mb'] = $F('txt_ship_mb_' + orderDataCache["order_sequence_id"]);
		invoiceDate['ship_mb'] = temp_ship_mb;
        invoiceDate['ship_address'] = curShipAddress;

        //invioceSubmitAjax.invokeServer(invoiceDate, 'POST', false);
        m_invoice_submit(invoiceDate);
    }
    function eInvoiceSubmitClick() {
        //验证发票内容
        invoiceDate = new Hashtable();
        invoiceDate["invoice_category"] = InvoiceCategory.ElectronInvoice;
        invoiceDate["invoice_title"] = "个人";
        invoiceDate["invoice_content"] = $1("e_invoice_content_vgc").value;
        if (invoiceDate["invoice_content"] == "" || invoiceDate["invoice_content"] == "请选择") {
            $1('tips_e_invoice_content_vgc').style.display = "";
            return;
        } else {
            $1('tips_e_invoice_content_vgc').style.display = "none";
        }
		//如果手机号包含有*，则需要赋值为不带*的手机号（真实的手机号）保存到表里
		if(ConsigneeCommon.isContainAterisk($1("e_invoice_tel_vgc").value)){
			invoiceDate["invoice_tel"] = real_invoice_ship_mb;
		}else{
			invoiceDate["invoice_tel"] = $1("e_invoice_tel_vgc").value;
		}
        
        var mbRegExp = new RegExp(REGEX_SHIP_MB, 'g');
        if (!mbRegExp.test(invoiceDate["invoice_tel"])) {
            $1('e_invoice_tel_tips_vgc').style.display = "";
            return;
        } else {
            $1('e_invoice_tel_tips_vgc').style.display = "none";
        }
        invoiceDate['order_sequence_id'] = orderDataCache['order_sequence_id'];
        //invoiceDate['order_type'] = orderDataCache['order_type'];

        //invioceSubmitAjax.invokeServer(invoiceDate, 'POST', false);
        m_invoice_submit(invoiceDate);
    }
    var setInvoiceSubmit = function (invoice_submit) {
        m_invoice_submit = invoice_submit;
    };
    var showReadOnlyGiftCard = function (result) {
        if (result != null && result['error_code'] == 0) {
            //缓存数据
            var orderList = result['order_list'];
            for (var i = 0; i < orderList.length; i++) {
                if (orderList[i]['order_type'] == 50) {
                    setDataSource(orderList[i]);
                    break;
                }
            }

            if (orderDataCache["invoice_category"] == InvoiceCategory.NotNeedInvoice) {//暂不需要发票
                $s($1("no_invoice_vgc"));
                
                if(parseFloat(orderDataCache['order_payable_amount']) + parseFloat(orderDataCache['cust_cash_used']) <= 0){
                	$('#no_invoice_tips_'+orderDataCache['order_sequence_id']).show();
                }else{
                	$('#no_invoice_tips_'+orderDataCache['order_sequence_id']).hide();
                }
            }
            else {
                $h($1('no_invoice_vgc'));
                $h($1('edit_invoice_vgc'));
 
                showInvoiceInfo();
            }
           
        } else {
            setInvoiceErrorTips(result['errorCode']);
        }
    };
    //已开发票的内容信息
    var showInvoiceInfo = function() {
        //if (orderDataCache['invoice_title'] == "个人") {
        //    $1("invoice_info_vgc").innerHTML = "个人 发票内容：" + orderDataCache["invoice_content"];
        //}
        //else {
        //    $1("invoice_info_vgc").innerHTML = "单位 " + orderDataCache["invoice_title"] + " 发票内容：" + orderDataCache["invoice_content"];
        //}
        if (orderDataCache["invoice_category"] == InvoiceCategory.PaperInvoice) {
            $1("invoice_info_vgc").innerHTML = orderDataCache["invoice_title"] + " 发票内容：" + orderDataCache["invoice_content"];
        } else if (orderDataCache["invoice_category"] == InvoiceCategory.ElectronInvoice) {
            $1("invoice_info_vgc").innerHTML = "电子发票 " + orderDataCache["invoice_title"] + " 发票内容：" + orderDataCache["invoice_content"];
        }
        $1("invoice_modify_vgc").onclick = InvoiceEdit;
        $s($1('readonly_invoice_vgc'));

        //$('#invoiceList>p.listcon').remove();
        //var invoicesHtml = '';
        //for (var j = 0; j < orderDataCache['InvoiceGroups'].length; j++) {
        //    var invoiceGroup = orderDataCache['InvoiceGroups'][j];
        //    var info = "";
        //    if (invoiceGroup.IsVatNeed == "1") {
        //        info = "增值税专用发票 发票内容：" + invoiceGroup.InvoiceContent;
        //    }
        //    else if (invoiceGroup.InvoiceNeed == "1") {
        //        info = invoiceGroup.InvoiceTitle + " 发票内容：" + invoiceGroup.InvoiceContent;
        //    } else {
        //        info = "暂不需要发票";
        //    }
        //    invoicesHtml += '<p id="invoiceGroup_' + invoiceGroup.SortNums + '" class="listcon" style="display:none">订单' + invoiceGroup.SortNums + '：<span class="mr-10">'
        //        + info + '</span></p>';
        //}
        //$('#invoiceList').append(invoicesHtml);
        //var sourceObj = $('#invoiceGroup_' + orderDataCache['sort_num']).prev();
        //$('p').remove("#invoiceGroup_" + orderDataCache['sort_num']);
        //var info = orderDataCache["invoice_title"] + " 发票内容：" + orderDataCache["invoice_content"];
        //var invoicesHtml = '';
        //invoicesHtml += '<p id="invoiceGroup_' + orderDataCache['sort_num'] + '" class="listcon" style="display:none">订单' + orderDataCache['sort_num'] + '：<span class="mr-10">'
        //        + info + '</span></p>';
        //sourceObj.after(invoicesHtml);
    }
    var setInvoiceErrorTips = function (errorCode) {
        var invoiceErrorInfo = $1('invoice_error_info_vgc');
        switch (errorCode) {
            case "1":
                invoiceErrorInfo.innerHTML = "<span class='icon icon-warn'></span> " + MSG_INVOICE_CONTENT_EMPTY;
                break;
            case "2":
                invoiceErrorInfo.innerHTML = "<span class='icon icon-warn'></span> " + MSG_INVOICE_TITLE_EMPTY;
                break;
            case "3":
                invoiceErrorInfo.innerHTML = "<span class='icon icon-warn'></span> " + MSG_INVOICE_CONTENT_EMPTY;
                break;
            case "4":
                invoiceErrorInfo.innerHTML = "<span class='icon icon-warn'></span> " + MSG_TITLE_ID_ERROR;
                break;
            case "5":
                invoiceErrorInfo.innerHTML = "<span class='icon icon-warn'></span> " + MSG_ORDER_SEQUENCE_ID_ERROR;
                break;
            case "6":
                invoiceErrorInfo.innerHTML = "<span class='icon icon-warn'></span> " + MSG_CART_ID_ERROR;
                break;
            case "7":
                invoiceErrorInfo.innerHTML = "<span class='icon icon-warn'></span> " + MSG_TYPE_ID_ERROR;
                break;
            case "8":
                invoiceErrorInfo.innerHTML = "<span class='icon icon-warn'></span> " + MSG_SUBMIT_CLICK_ERROR;
                break;
            case "9":
                invoiceErrorInfo.innerHTML = "<span class='icon icon-warn'></span> " + MSG_CUST_ID_INVALID;
                break;
            default:
                invoiceErrorInfo.innerHTML = "<span class='icon icon-warn'></span> " + MSG_INVOICE_SAVE_ERROR;
                break;
        }
    }

    //编辑发票内容

    var deleteInvoiceTitle = function (titleId) {
        invoiceDeleteAjax.invokeServer("id=" + titleId, 'POST', true);
    };

    //endregion
    var intelligent_title_search = function (o, e) {
        $1("btn_company_title").onclick();

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
        var list = null;
        var isShow = false;
        if (invoiceTitleCache[InvoiceInfoType.PaperCompany] != null && invoiceTitleCache[InvoiceInfoType.PaperCompany].length > 0) {
            if (invoiceTitleCache[InvoiceInfoType.PaperCompany].length == 1 && invoiceTitleCache[InvoiceInfoType.PaperCompany][0].invoice_title == '')
                return;
            for (var i = 0; i < invoiceTitleCache[InvoiceInfoType.PaperCompany].length; i++) {
                list = $1("list_company_title").childNodes[i];
                if (ov != '' && list.firstChild.innerHTML.startsWith(ov)) {
                    $s(list);
                    isShow = true;
                }
                else {
                    $h(list);
                }
            }
            $1("list_company_title").style.display = isShow ? "block" : "none";
            isGetInvoiceTitle = false;
        }
    };

    return {
        show: show,
        showFirstKeyTips: showFirstKeyTips,
        checkFirstKeyTips: checkFirstKeyTips,
        showSecondKeyTips: showSecondKeyTips,
        checkSecondKeyTips: checkSecondKeyTips,
        showMobileTips: showMobileTips,
        checkMobileTips: checkMobileTips,
        submitCheckVirtualKey: submitCheckVirtualKey,
        setInvoiceErrorTips: setInvoiceErrorTips,
        showReadOnlyGiftCard: showReadOnlyGiftCard,
        setInvoiceSubmit: setInvoiceSubmit,
        invoiceShow: invoiceShow
    };
} ());