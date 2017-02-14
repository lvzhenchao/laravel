﻿/// <reference path="model_101207.js" />
/// <reference path="templates.js" />

// invoice.js
// purpose: invoice module for checkout page.
// author: Jing Heng

//#region error message
var MSG_CUST_ID_INVALID = '用户ID无效或者不合法';
var MSG_INVOICE_TITLE_EMPTY = '请填写单位名称';
var MSG_INVOICE_CONTENT_EMPTY = '请选择发票内容';
var MSG_TITLE_ID_ERROR = '发票抬头ID不合法';
var MSG_ORDER_SEQUENCE_ID_ERROR = '订单序列号无效';
var MSG_CART_ID_ERROR = '购物车ID无效';
var MSG_TYPE_ID_ERROR = '发票类型无效';
var MSG_SUBMIT_CLICK_ERROR = '请点击“确认发票信息”按钮';
var MSG_INVOICE_SAVE_ERROR = '发票保存失败';
var MSG_INVOICE_TITLE_ERROR = '请填写发票抬头';
var MSG_TITLE_ERROR = '请填写正确的单位名称';
var MSG_TITLE_DELETE_ERROR = '发票抬头删除失败';
//#endregion
var InvoiceInfoType = {//获取用户常用发票的类型
    Paper: 0, //纸质发票
    PaperPerson: 1, //纸质发票个人
    PaperCompany: 2, //纸质发票单位
    Electron: 3, //电子发票
    ElectronPerson: 4, //电子发票个人
    ElectronCompany: 5, //电子发票单位
    All: 100 //全部
};
var InvoiceCategory = {//发票类型
    NotNeedInvoice: 0, //不开发票
    PaperInvoice: 1, //开纸质发票
    VatInvoice: 2, //开增值税发票
    ElectronInvoice: 3 //开电子发票
};
var InvoiceRestrict = {//发票限制
		Must: 1, //必须开发票
		Can: 2, //可以开，顾客可不要
	    Not: 3 //不支持开票
	};
function Invoice(container_id) {

    // control paras
    var obj_btn_submit = null;
    var obj_btn_close = null;
    var obj_title_person_radio = null;
    var obj_title_company_radio = null;
    var obj_invoice_content = null;
    var obj_invoice_title = null;
    var obj_span_invoice_tips = null;
    var obj_span_title_tips = null;
    var obj_span_content_tips = null;
    var obj_a_invoice_close = null;
    var obj_span_invoice = null;
    var obj_div_invoice_explain = null;
    var obj_div_invoice = null;
    var obj_invoice_title_ul = null;
    var ddl_invoice_content = null;
    var obj_a_invoice = null;
    var obj_invoice_modify = null;
    var obj_confirm_invoice_info = null;
    var obj_title_delete = null;
    var obj_invoice_danwei = null;
    var obj_p_content_tips = null; //3c发票需求

    var obj_rb_invoice = null;
    var obj_rb_VAT_invoice = null;
    var obj_div_VAT_invoice = null;
    var obj_div_VAT_invoice_explain = null;
    var obj_ddl_VAT_invoice_content = null;
    var obj_span_VAT_invoice_tips = null;
    var obj_span_VAT_content_tips = null;
    var obj_btn_VAT_invoice_submit = null;
    var obj_btn_VAT_invoice_close = null;
    var obj_p_select_invoice = null;
    var obj_p_VAT_content_tips = null;
    var str_VAT_content_tips = "";
    var obj_div_not_have_VAT_invoice_mark = null;
    var obj_div_not_have_VAT_invoice_tips = null;
    var obj_lab_invoice = null;
    var obj_lab_e_invoice = null;
    var obj_lab_VAT_invoice = null;
    var obj_p_VAT_invoice_explain = null;

    var obj_rb_e_invoice = null;
    var obj_div_e_invoice = null;
    var obj_ddl_e_invoice_content = null;
    var obj_ddl_e_book_invoice_content = null;
    var obj_ddl_e_nonbook_invoice_content = null;
    var obj_span_e_invoice_tips = null;
    var obj_span_e_content_tips = null;
    var obj_span_e_book_content_tips = null;
    var obj_span_e_nonbook_content_tips = null;
    var obj_btn_e_invoice_submit = null;
    var obj_btn_e_invoice_close = null;
    var obj_p_e_content_tips = null;
    var obj_p_e_book_content_tips = null;
    var obj_p_e_nonbook_content_tips = null;
    var obj_e_invoice_tel = null;
    var obj_e_invoice_tel_tips = null;
    var obj_div_not_have_e_invoice_tips = null;
    var obj_e_title_person_radio = null;
    var obj_e_title_company_radio = null;
    var obj_e_invoice_title = null;
    var obj_e_invoice_title_ul = null;
    var obj_e_invoice_danwei = null;
    var obj_span_e_title_tips = null;
    var obj_div_e_invoice_content = null;
    var obj_div_e_book_invoice_content = null;
    var obj_div_e_nonbook_invoice_content = null;

    // invoice paras
    var m_invoice_edit_status = null;
    var m_data_source = null;
    var m_invoice_submit = null;

    var m_invoice_title = null;
    var m_invoice_content = null;
    var m_invoice_category = null;//发票分类
    var m_invoice_tel = null;//电子普通发票-手机号
    var m_invoice_book_content = null;
    var m_invoice_nonbook_content = null;
    var VAT_invoice_content_cache = null;
    var e_invoice_content_cache = null;

    var invoice_all_cache = null; //用户最近使用发票信息
    var invoice_content_cache = null; //发票内容信息
    var invoice_company_cache = new Array(); //用户单位发票信息
    var invoice_person_cache = new Array(); //用户个人发票信息
    var invoice_paper_cache = null; //用户纸质发票信息
    var invoice_e_cache = null; //用户电子发票信息
    var m_is_first_load_invoice = 0;
    var m_is_first_load_person_invoice = new Array();
    var m_is_first_load_company_invoice = new Array();;

    var is_all_3c_category_product = false;

    var obj_intelligent_title = null; //智能匹配发票控件
    var obj_intelligent_title_lis = null; //智能匹配发票信息列控件
    var obj_intelligent_e_title = null; //智能匹配发票控件
    var obj_intelligent_e_title_lis = null; //智能匹配发票信息列控件

    var save_click = false;
    var is_init = false;//是否初始化过
    var last_time_is_not_print_price = false;//礼品包装上一次是否选择不显示价格
    var last_time_is_can_invoice = true;
    //var m_order_type = 0; //全局变量，记录依据商品类型得到的订单类型
    var noStorageJit = null;
    var m_invoice_panel = new JSPanel(container_id);
    m_invoice_panel.Template = INVOICE_TEMPLATE_EDIT;
	
	var is_has_no_storage_jit_package = false;//是否不入库联营
	
	var real_e_invoice_tel = null;  //用于保存电子发票真实的手机号（不带*号的），因为显示时要隐藏中间4位

    //是否支持电子发票图书发票内容
    var supportElectronBook = function () {
        return e_invoice_content_cache != null && e_invoice_content_cache['book']!= null && e_invoice_content_cache['book'].length > 1; 
    };
	//是否支持电子发票非图书发票内容
    var supportElectronNonbook = function () {
        return e_invoice_content_cache != null && e_invoice_content_cache['non_book']!= null && e_invoice_content_cache['non_book'].length > 1; 
    };
	//是否支持电子发票商家发票内容
    var supportElectronShop = function () {
        return e_invoice_content_cache != null && e_invoice_content_cache['shop']!= null && e_invoice_content_cache['shop'].length > 1; 
    };
    //是否支持电子发票
    var supportElectron = function () {
        return supportElectronBook() || supportElectronNonbook() || supportElectronShop();
    };
    //是否支持纸质发票
    var supportPaper = function () {
        return invoice_content_cache != null && invoice_content_cache.length > 1;
    };
    var supportVat = function () {
    	return VAT_invoice_content_cache != null && VAT_invoice_content_cache.length > 1;
    };
    //是否仅支持电子发票
    var onlySupportElectron = function () {
        return !supportPaper() && supportElectron() && !supportVat();
    };
    //是否仅支持纸质发票的
    var onlySupportPaper = function () {
        return supportPaper() && !supportElectron() && !supportVat();
    };
    //是否仅支持增值税发票的
    var onlySupportVat = function () {
        return !supportPaper() && !supportElectron() && supportVat();
    };
    //是否支持电子单位发票
    var supportElectronCompany = function () {
        return true;//m_data_source["shop_id"] > 0;
    };
    //是否必须开发票
    var mustNeedInvoice = function () {
    	return m_data_source["invoice_restrict"] == InvoiceRestrict.Must;
    };

    //动态绑定订单控件
    var InitControl = function () {
        obj_btn_submit = $1('invoice_submit_' + m_data_source['order_sequence_id']);
        obj_btn_close = $1('a_turn_off_invoice_' + m_data_source['order_sequence_id']);
        obj_title_person_radio = $1('invoice_title_person_' + m_data_source['order_sequence_id']);
        obj_title_company_radio = $1('invoice_title_company_' + m_data_source['order_sequence_id']);
        obj_invoice_content = $1('invoice_content_' + m_data_source['order_sequence_id']);
        obj_span_invoice_tips = $1('span_invoice_tips_' + m_data_source['order_sequence_id']);
        obj_span_title_tips = $1('span_title_tips_' + m_data_source['order_sequence_id']);
        obj_span_content_tips = $1('span_content_tips_' + m_data_source['order_sequence_id']);
        obj_a_invoice_close = $1('a_invoice_close_' + m_data_source['order_sequence_id']);
        obj_span_invoice = $1('span_invoice_' + m_data_source['order_sequence_id']);
        obj_div_invoice_explain = $1('div_invoice_explain_' + m_data_source['order_sequence_id']);
        obj_div_invoice = $1('div_invoice_expand_' + m_data_source['order_sequence_id']);
        obj_p_content_tips = $1('p_content_tips_' + m_data_source['order_sequence_id']);

        ddl_invoice_content = new DropDownList('invoice_content_' + m_data_source['order_sequence_id']); //对应前台js模板select控件id

        //发票内容对应后台信息字段 
        ddl_invoice_content.DataTextField = 'invoice_content'; //对应后台返回前台发票内容的key
        ddl_invoice_content.DataValueField = 'invoice_content'; //对应后台返回前台发票内容的value，由于后台返回内容没有value指定为key
        ddl_invoice_content.OnSelectedIndexChanged = invoiceContent_SelectedIndexChanged;

        obj_rb_invoice = $1('rb_invoice_' + m_data_source['order_sequence_id']);
        obj_rb_VAT_invoice = $1('rb_VAT_invoice_' + m_data_source['order_sequence_id']);
        obj_div_VAT_invoice = $1('div_VAT_invoice_' + m_data_source['order_sequence_id']);
        obj_ddl_VAT_invoice_content = $1('ddl_VAT_invoice_content_' + m_data_source['order_sequence_id']);
        obj_div_VAT_invoice_explain = $1('div_VAT_invoice_explain_' + m_data_source['order_sequence_id']);
        obj_span_VAT_invoice_tips = $1('span_VAT_invoice_tips_' + m_data_source['order_sequence_id']);
        obj_span_VAT_content_tips = $1('span_VAT_content_tips_' + m_data_source['order_sequence_id']);
        obj_btn_VAT_invoice_submit = $1('a_VAT_invoice_submit_' + m_data_source['order_sequence_id']);
        obj_btn_VAT_invoice_close = $1('a_VAT_invoice_close_' + m_data_source['order_sequence_id']);
        obj_p_select_invoice = $1('p_select_invoice_' + m_data_source['order_sequence_id']);
        obj_p_VAT_content_tips = $1('p_VAT_content_tips_' + m_data_source['order_sequence_id']);
        obj_div_not_have_VAT_invoice_mark = $1('div_not_have_VAT_invoice_mark_' + m_data_source['order_sequence_id']);
        obj_div_not_have_VAT_invoice_tips = $1('div_not_have_VAT_invoice_tips_' + m_data_source['order_sequence_id']);
        obj_lab_invoice = $1('lab_invoice_' + m_data_source['order_sequence_id']);
        obj_lab_e_invoice = $1('lab_e_invoice_' + m_data_source['order_sequence_id']);
        obj_lab_VAT_invoice = $1('lab_VAT_invoice_' + m_data_source['order_sequence_id']);
        obj_p_VAT_invoice_explain = $1('p_VAT_invoice_explain_' + m_data_source['order_sequence_id']);

        ddl_VAT_invoice_content = new DropDownList('ddl_VAT_invoice_content_' + m_data_source['order_sequence_id']);
        ddl_VAT_invoice_content.DataTextField = 'invoice_content';
        ddl_VAT_invoice_content.DataValueField = 'invoice_content';
        ddl_VAT_invoice_content.OnSelectedIndexChanged = invoiceContent_SelectedIndexChanged;
        noStorageJit = $1('no_storage_jit_' + m_data_source['order_sequence_id']);
        obj_rb_e_invoice = $1('rb_e_invoice_' + m_data_source['order_sequence_id']);;
        obj_div_e_invoice = $1('div_e_invoice_' + m_data_source['order_sequence_id']);;
        obj_ddl_e_invoice_content = $1('ddl_e_invoice_content_' + m_data_source['order_sequence_id']);
        obj_ddl_e_book_invoice_content = $1('ddl_e_book_invoice_content_' + m_data_source['order_sequence_id']);
        obj_ddl_e_nonbook_invoice_content = $1('ddl_e_nonbook_invoice_content_' + m_data_source['order_sequence_id']);
        obj_span_e_invoice_tips = $1('span_e_invoice_tips_' + m_data_source['order_sequence_id']);
        obj_span_e_content_tips = $1('span_e_content_tips_' + m_data_source['order_sequence_id']);
        obj_span_e_book_content_tips = $1('span_e_book_content_tips_' + m_data_source['order_sequence_id']);
        obj_span_e_nonbook_content_tips = $1('span_e_nonbook_content_tips_' + m_data_source['order_sequence_id']);
        obj_btn_e_invoice_submit = $1('a_e_invoice_submit_' + m_data_source['order_sequence_id']);
        obj_btn_e_invoice_close = $1('a_e_invoice_close_' + m_data_source['order_sequence_id']);
        obj_p_e_content_tips = $1('p_e_content_tips_' + m_data_source['order_sequence_id']);
        obj_p_e_book_content_tips = $1('p_e_book_content_tips_' + m_data_source['order_sequence_id']);
        obj_p_e_nonbook_content_tips = $1('p_e_nonbook_content_tips_' + m_data_source['order_sequence_id']);
        obj_e_invoice_tel = $1('e_invoice_tel_' + m_data_source['order_sequence_id']);
        obj_e_invoice_tel_tips = $1('e_invoice_tel_tips_' + m_data_source['order_sequence_id']);
        obj_div_not_have_e_invoice_tips = $1('div_not_have_e_invoice_tips_' + m_data_source['order_sequence_id']);
        obj_e_title_person_radio = $1('e_invoice_title_person_' + m_data_source['order_sequence_id']);
        obj_e_title_company_radio = $1('e_invoice_title_company_' + m_data_source['order_sequence_id']);
        obj_span_e_title_tips = $1('span_e_title_tips_' + m_data_source['order_sequence_id']);
        obj_div_e_invoice_content = $1('div_e_invoice_content_' + m_data_source['order_sequence_id']);
        obj_div_e_book_invoice_content = $1('div_e_book_invoice_content_' + m_data_source['order_sequence_id']);
        obj_div_e_nonbook_invoice_content = $1('div_e_nonbook_invoice_content_' + m_data_source['order_sequence_id']);

        ddl_e_invoice_content = new DropDownList('ddl_e_invoice_content_' + m_data_source['order_sequence_id']);
        ddl_e_invoice_content.DataTextField = 'invoice_content';
        ddl_e_invoice_content.DataValueField = 'invoice_content';
        ddl_e_invoice_content.OnSelectedIndexChanged = invoiceContent_SelectedIndexChanged;
        ddl_e_book_invoice_content = new DropDownList('ddl_e_book_invoice_content_' + m_data_source['order_sequence_id']);
        ddl_e_book_invoice_content.DataTextField = 'invoice_content';
        ddl_e_book_invoice_content.DataValueField = 'invoice_content';
        ddl_e_book_invoice_content.OnSelectedIndexChanged = invoiceContent_SelectedIndexChanged;
        ddl_e_nonbook_invoice_content = new DropDownList('ddl_e_nonbook_invoice_content_' + m_data_source['order_sequence_id']);
        ddl_e_nonbook_invoice_content.DataTextField = 'invoice_content';
        ddl_e_nonbook_invoice_content.DataValueField = 'invoice_content';
        ddl_e_nonbook_invoice_content.OnSelectedIndexChanged = invoiceContent_SelectedIndexChanged;
    };
    var invoice_content_ajax = new Ajax('/invoice/content');
    invoice_content_ajax.OnSucceed//请求得到订单对应的发票内
	(
	    function (result) {
	        if (result != null && result['errorCode'] == 0) {
	            if (result['invoice'] != null || result['e_invoice'] != null || result['vat_invoice'] != null) {
	                if (!result['invoice']) {
	                    result['invoice'] = new Array();
	                }
	                result['invoice'].unshift({ 'invoice_content': '请选择' });
	                invoice_content_cache = result['invoice'];
	                is_all_3c_category_product = (result['is3Cproducts'] == 'True');
	                //添加自营发票内容设置订单类型的方法
	                //setContentByOrderType();
	                bindInvoiceContent(invoice_content_cache);
	                //需要确认缓存中发票内容
	                if (!result['vat_invoice']) {
	                    result['vat_invoice'] = new Array();
	                }
	                result['vat_invoice'].unshift({ 'invoice_content': '请选择' });
	                VAT_invoice_content_cache = result['vat_invoice'];
	                bindVATInvoiceContent(VAT_invoice_content_cache);

	                //电子发票
	                if (!result['e_invoice']) {
	                    result['e_invoice'] = new Array();
	                }
	                if (!result['e_invoice']['book']) {
	                    result['e_invoice']['book'] = new Array();
	                }
	                result['e_invoice']['book'].unshift({ 'invoice_content': '请选择' });
	                if (!result['e_invoice']['non_book']) {
	                    result['e_invoice']['non_book'] = new Array();
	                }
	                result['e_invoice']['non_book'].unshift({ 'invoice_content': '请选择' });
	                if (!result['e_invoice']['shop']) {
	                    result['e_invoice']['shop'] = new Array();
	                }
	                result['e_invoice']['shop'].unshift({ 'invoice_content': '请选择' });
	                e_invoice_content_cache = result['e_invoice'];
	                bindEInvoiceContent(result['e_invoice']);

	                //图书不开增票判断添加到此处
	                if (result['vat_invoice'].length == 1) {
	                    obj_rb_VAT_invoice.disabled = "disabled";
	                    obj_div_not_have_VAT_invoice_mark.style.display = "inline-block";
	                    obj_lab_VAT_invoice.className = "radio enable-style";
	                    obj_div_not_have_VAT_invoice_mark.onmouseover = function () {
	                        $s(obj_div_not_have_VAT_invoice_tips);
	                    };
	                    obj_div_not_have_VAT_invoice_mark.onmouseout = function () {
	                        $h(obj_div_not_have_VAT_invoice_tips);
	                    };
	                }
	                if (result['vat_invoice'].length > 1 && result['isHaveExceptVatProduct'] == 'True') {
	                    obj_p_VAT_invoice_explain.innerHTML = obj_p_VAT_invoice_explain.innerHTML + "4、您订单中含有图书商品，根据《财税【2013】87号》文件，图书类商品不可开具增值税专用发票，百货类商品正常开具。若图书商品需索要普通发票，建议分开下单。";
	                }

	            }
	            else {
	                //3c发票需求 hj20130709
	                if (m_data_source["shop_id"] > 0 && +m_data_source["shop_type"] != 6) {
	                    obj_p_content_tips.innerHTML = "您订购的商品由当当合作卖家销售，发票由卖家开具并寄出";
	                    obj_p_e_content_tips.innerHTML = "您订购的商品由当当合作卖家销售，发票由卖家开具并寄出";
	                    obj_p_e_nonbook_content_tips.innerHTML = "您订购的商品由当当合作卖家销售，发票由卖家开具并寄出";
	                }
	                else {
	                    obj_p_content_tips.innerHTML = "数码、手机、家电类商品将默认打印出商品名称和型号";
	                    obj_p_e_content_tips.innerHTML = "数码、手机、家电类商品将默认打印出商品名称和型号";
	                    obj_p_e_nonbook_content_tips.innerHTML = "数码、手机、家电类商品将默认打印出商品名称和型号";
	                }
	                obj_p_VAT_content_tips.innerHTML = str_VAT_content_tips;
	                //将发票内容设置为请选择
	                ddl_invoice_content.DataSource = [{ 'invoice_content': '请选择' }];
	                ddl_invoice_content.DataBind();
	                obj_invoice_content.disabled = true;
	                if (obj_invoice_danwei != null) {
	                    obj_invoice_danwei.onclick = function () { invoice_title_click(InvoiceInfoType.PaperCompany); }
	                }
	                if (obj_e_invoice_danwei != null) {
	                    obj_e_invoice_danwei.onclick = function () { invoice_title_click(InvoiceInfoType.ElectronCompany); }
	                }
	                ddl_VAT_invoice_content.DataSource = [{ 'invoice_content': '请选择' }];
	                ddl_VAT_invoice_content.DataBind();
	                obj_ddl_VAT_invoice_content.disabled = true;
	                ddl_e_invoice_content.DataSource = [{ 'invoice_content': '请选择' }];
	                ddl_e_invoice_content.DataBind();
	                obj_ddl_e_invoice_content.disabled = true;

	                bindClickEvent();
	            }
	        }
	        else {//hj add 20130515
	            //3c发票需求 hj20130625
	            obj_p_content_tips.innerHTML = "数码、手机、家电类商品将默认打印出商品名称和型号";
	            obj_p_e_content_tips.innerHTML = "数码、手机、家电类商品将默认打印出商品名称和型号";
	            obj_p_e_nonbook_content_tips.innerHTML = "数码、手机、家电类商品将默认打印出商品名称和型号";
	            obj_p_VAT_content_tips.innerHTML = str_VAT_content_tips;
	            if (obj_invoice_danwei != null) {
	                obj_invoice_danwei.onclick = function () { invoice_title_click(InvoiceInfoType.PaperCompany); };
	            }
	            if (obj_e_invoice_danwei != null) {
	                obj_e_invoice_danwei.onclick = function () { invoice_title_click(InvoiceInfoType.ElectronCompany); }
	            }
	            bindClickEvent();
	        }
	        if (!canInvoicing()) {
	            //本来就应该加载发票内容绑定的，没办法，暂时放在这处理，因为invoice_content_ajax.invokeServer(m_post_data, 'POST', false); 多处调用了，有点乱。
	            //obj_p_content_tips.innerHTML = "您的订单应付金额为0元，不可开发票";
	            //obj_p_VAT_content_tips.innerHTML = "您的订单应付金额为0元，不可开发票";
	            //obj_p_e_content_tips.innerHTML = "您的订单应付金额为0元，不可开发票";
	            //obj_p_e_book_content_tips.innerHTML = "您的订单应付金额为0元，不可开发票";
	            //obj_p_e_nonbook_content_tips.innerHTML = "您的订单应付金额为0元，不可开发票";
	            obj_btn_submit.className = 'btn btn-large-grey';
	            obj_btn_VAT_invoice_submit.className = 'btn btn-large-grey';
	            obj_btn_e_invoice_submit.className = 'btn btn-large-grey';
	        }
	        else if (DoNotPrintPrice()) {
	            obj_p_content_tips.innerHTML = '<span class="help-inline help-inline-error help-inline-large" style="margin-left:0;"><span class="icon icon-warn"></span>商品清单不显示价格，请订单完成后到<em style="color:#404040">我的当当-自助补开/合开发票</em>补开</span>';
	            obj_p_VAT_content_tips.innerHTML = '<span class="help-inline help-inline-error help-inline-large" style="margin-left:0;"><span class="icon icon-warn"></span>商品清单不显示价格，请订单完成后到<em style="color:#404040">我的当当-自助补开/合开发票</em>补开</span>';
	            obj_p_e_content_tips.innerHTML = '<span class="help-inline help-inline-error help-inline-large" style="margin-left:0;"><span class="icon icon-warn"></span>商品清单不显示价格，请订单完成后到<em style="color:#404040">我的当当-自助补开/合开发票</em>补开</span>';
	            obj_p_e_book_content_tips.innerHTML = '<span class="help-inline help-inline-error help-inline-large" style="margin-left:0;"><span class="icon icon-warn"></span>商品清单不显示价格，请订单完成后到<em style="color:#404040">我的当当-自助补开/合开发票</em>补开</span>';
	            obj_p_e_nonbook_content_tips.innerHTML = '<span class="help-inline help-inline-error help-inline-large" style="margin-left:0;"><span class="icon icon-warn"></span>商品清单不显示价格，请订单完成后到<em style="color:#404040">我的当当-自助补开/合开发票</em>补开</span>';       
	        }
	        
	    }
	);

    //绑定发票内容下拉列表框；绑定按钮、抬头列表框和对应的响应函数
    var bindInvoiceContent = function (result) {
        //changeInvoiceContentCache(result);
        ddl_invoice_content.DataSource = result;
        ddl_invoice_content.DataBind();
        if (obj_invoice_danwei != null) {
            obj_invoice_danwei.onclick = function () { invoice_title_click(InvoiceInfoType.PaperCompany); };
        }
        if (obj_e_invoice_danwei != null) {
            obj_e_invoice_danwei.onclick = function () { invoice_title_click(InvoiceInfoType.ElectronCompany); }
        }
        bindClickEvent();

        if (result.length == 1 && result[0].invoice_content == "请选择") {
        	obj_rb_invoice.disabled = true;
        }
        //3c发票需求 hj20130709
        if (is_all_3c_category_product == true && m_data_source["shop_id"] == 0) {
            obj_p_content_tips.innerHTML = "数码、手机、家电类商品将默认打印出商品名称和型号";
        }
        else if (m_data_source["shop_id"] > 0 && +m_data_source["shop_type"] != 6) {
            obj_p_content_tips.innerHTML = "您订购的商品由当当合作卖家销售，发票由卖家开具并寄出";
        }
        else {
            obj_p_content_tips.innerHTML = "数码、手机、家电类商品将默认打印出商品名称和型号";
        }
    };
    //绑定增税发票内容下拉列表框；绑定按钮的响应函数
    var bindVATInvoiceContent = function (result) {
        ddl_VAT_invoice_content.DataSource = result;
        ddl_VAT_invoice_content.DataBind();
        bindClickEvent();
        if (result.length == 1 && result[0].invoice_content == "请选择") {
            obj_ddl_VAT_invoice_content.disabled = true;
        }
        else if (result.length > 1) {
            obj_ddl_VAT_invoice_content.options[1].selected = true;
        }
        obj_p_VAT_content_tips.innerHTML = str_VAT_content_tips;
    };

    //绑定电子发票发票内容下拉列表框
    var bindEInvoiceContent = function (result) {
        ddl_e_invoice_content.DataSource = result['shop'];
        ddl_e_invoice_content.DataBind();
        ddl_e_book_invoice_content.DataSource = result['book'];
        ddl_e_book_invoice_content.DataBind();
        ddl_e_nonbook_invoice_content.DataSource = result['non_book'];
        ddl_e_nonbook_invoice_content.DataBind();
        bindClickEvent();

        if (result['shop'].length == 1 && result['shop'][0].invoice_content == "请选择") {
            obj_ddl_e_invoice_content.disabled = true;
            $h(obj_div_e_invoice_content);
        }
        if (result['book'].length == 1 && result['book'][0].invoice_content == "请选择") {
            obj_ddl_e_book_invoice_content.disabled = true;
            $h(obj_div_e_book_invoice_content);
        }
        if (result['non_book'].length == 1 && result['non_book'][0].invoice_content == "请选择") {
            obj_ddl_e_nonbook_invoice_content.disabled = true;
            $h(obj_div_e_nonbook_invoice_content);
        }
        //3c发票需求 hj20130709
        if (is_all_3c_category_product == true && m_data_source["shop_id"] == 0) {
            obj_p_e_content_tips.innerHTML = "数码、手机、家电类商品将默认打印出商品名称和型号";
            obj_p_e_nonbook_content_tips.innerHTML = "数码、手机、家电类商品将默认打印出商品名称和型号";
        }
        else if (m_data_source["shop_id"] > 0 && +m_data_source["shop_type"] != 6) {
            obj_p_e_content_tips.innerHTML = "您订购的商品由当当合作卖家销售，发票由卖家开具并寄出";
            obj_p_e_nonbook_content_tips.innerHTML = "您订购的商品由当当合作卖家销售，发票由卖家开具并寄出";
        }
        else {
            obj_p_e_content_tips.innerHTML = "数码、手机、家电类商品将默认打印出商品名称和型号";
            obj_p_e_nonbook_content_tips.innerHTML = "数码、手机、家电类商品将默认打印出商品名称和型号";
        }

        if (result['shop'].length == 1 && result['book'].length == 1 && result['non_book'].length == 1) {
            obj_rb_e_invoice.disabled = "disabled";
        }
    }

    var bindClickEvent = function () {
        obj_btn_close.onclick = invoice_cancel_click;
        obj_btn_submit.onclick = invoice_submit_click;
        obj_btn_VAT_invoice_close.onclick = invoice_cancel_click;
        obj_btn_VAT_invoice_submit.onclick = vat_invoice_submit_click;
        obj_btn_e_invoice_close.onclick = invoice_cancel_click;
        obj_btn_e_invoice_submit.onclick = e_invoice_submit_click;
		obj_e_invoice_tel.onfocus = function(){obj_e_invoice_tel.value="";};
    };

    var invoiceContent_SelectedIndexChanged = function () {
        clearInvoiceTips();
    };
    var intelligent_title_search = function (o, e, invoiceInfoType) {
        clearInvoiceTips();
        common_invoice_title_close(invoiceInfoType);
        intelligent_invoice_title_close(invoiceInfoType);
        setIntelligentCompanyTitleList(invoiceInfoType);
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
        var intelligent_title = null;
        if (invoiceInfoType == InvoiceInfoType.PaperCompany) {
            intelligent_title = obj_intelligent_title_lis;
        }
        else if (invoiceInfoType == InvoiceInfoType.ElectronCompany) {
            intelligent_title = obj_intelligent_e_title_lis;
        } else {
            return;
        }
        if (invoice_company_cache[invoiceInfoType]) {
            if (invoice_company_cache[invoiceInfoType].length == 1 && invoice_company_cache[invoiceInfoType][0].invoice_title == '')
                return;
            for (var i = 0; i < invoice_company_cache[invoiceInfoType].length; i++) {
                lisi = intelligent_title[i];
                var title_intelligence = lisi.innerHTML;
                if (ov != '' && title_intelligence.startsWith(ov)) {
                    $s(lisi);
                }
                else {
                    $h(lisi);
                }
            }
        }

    };
    function setIntelligentCompanyTitleList(invoiceInfoType) {
        //设置发票抬头列表的样式
        if (!invoice_company_cache[invoiceInfoType]) {
            var m_query_invoice_data = new Hashtable();
            m_query_invoice_data['type'] = invoiceInfoType;
            m_query_invoice_data['id'] = 0;

            var invoice_data_ajax = new Ajax('/invoice/info');
            invoice_data_ajax.OnSucceed
                        (
                            function (result) {
                                if (result != null && result['errorCode'] == 0) {
                                    invoice_company_cache[invoiceInfoType] = result.invoice;
                                    createAndShowIntelligentTitle(invoiceInfoType);
                                }
                            }
                        );
            invoice_data_ajax.invokeServer(m_query_invoice_data, 'POST', true); //请求方式修改
        }
        else {
            createAndShowIntelligentTitle(invoiceInfoType);
        }
    }
    function createAndShowIntelligentTitle(invoiceInfoType) {
        if (!invoice_company_cache[invoiceInfoType])
            return;
        if (invoice_company_cache[invoiceInfoType].length == 1 && invoice_company_cache[invoiceInfoType][0].invoice_title == "")
            return;
        var m_title = null;
        var m_test = null;
        var m_intelligent_title_rpt_ul = null;
        var m_title_template = null;
        var m_intelligent_title = null;
        if (invoiceInfoType == InvoiceInfoType.PaperCompany) {
            //动态创建ul控件并设置id
            obj_intelligent_title = document.createElement('ul');
            obj_intelligent_title.id = "intelligent_title_ul_" + m_data_source["order_sequence_id"];
            m_title = obj_intelligent_title;
            m_test = document.getElementById('invoice_title_' + m_data_source["order_sequence_id"]);
            m_intelligent_title_rpt_ul = new JSRepeater('intelligent_title_ul_' + m_data_source["order_sequence_id"]);
            m_title_template = INTELLIGENT_TITLE_RPT_TEMPLATE;
            m_intelligent_title = "intelligent_title_";
        }
        else if (invoiceInfoType == InvoiceInfoType.ElectronCompany) {
            obj_intelligent_e_title = document.createElement('ul');
            obj_intelligent_e_title.id = "intelligent_e_title_ul_" + m_data_source["order_sequence_id"];
            m_title = obj_intelligent_e_title;
            m_test = document.getElementById('e_invoice_title_' + m_data_source["order_sequence_id"]);
            m_intelligent_title_rpt_ul = new JSRepeater('intelligent_e_title_ul_' + m_data_source["order_sequence_id"]);
            m_title_template = INTELLIGENT_E_TITLE_RPT_TEMPLATE;
            m_intelligent_title = "intelligent_e_title_";
        } else {
            return;
        }

        m_title.className = 'selc-box w205';
        //将ul控件添加到页面合适的位置
        m_test.parentNode.parentNode.appendChild(m_title);
        //为ul动态绑定li控件
        m_intelligent_title_rpt_ul.ItemTemplate = m_title_template;
        m_intelligent_title_rpt_ul.onItemDataBind = function () {
        };
        m_intelligent_title_rpt_ul.DataSource = invoice_company_cache[invoiceInfoType];
        m_intelligent_title_rpt_ul.DataBind();
        if (invoiceInfoType == InvoiceInfoType.PaperCompany) {
            obj_intelligent_title_lis = m_title.childNodes;
        } else if (invoiceInfoType == InvoiceInfoType.ElectronCompany) {
            obj_intelligent_e_title_lis = m_title.childNodes;
        }
        //添加li的响应事件
        invoice_li_array = m_intelligent_title_rpt_ul.DataSource;
        for (var m = 0; m < invoice_li_array.length; m++) {
            var obj_invoice_li = $1(m_intelligent_title + invoice_li_array[m]['id']);
            var m_invoice_title = invoice_li_array[m]['invoice_title'];
            if (obj_invoice_title.value == m_invoice_title) {
                obj_invoice_li.className = 'active';
            }
            var title_id = invoice_li_array[m]['id'];
            (function (title_id) {
                obj_invoice_li.onmouseover = function () { this.className = 'active'; }; //响应鼠标滑过li
            })(title_id);
            (function (title_id) {
                obj_invoice_li.onmouseout = function () {
                    this.className = '';
                }; //响应鼠标划出li
            })(title_id);
            (function (title_id) {
                obj_invoice_li.onclick = function () { //obj_invoice_title.value = temp_id;
                    setCompanyInvoiceByID(title_id, invoiceInfoType);
                    $1(m_intelligent_title + title_id).className = '';
                    //需要隐藏发票抬头部分,这样做整个ul就不存在了，因此上面需要动态生成ul
                    if (m_title != null) {
                        var _parentElement = m_title.parentNode;
                        if (_parentElement) {
                            _parentElement.removeChild(m_title);
                        }
                    }
                };
            })(title_id);    //响应点击li
        }
    }
    var invoice_submit_click = function () {
        if (!canInvoicing()) {
            setInvoiceErrorInfo(obj_span_content_tips, "您的订单应付金额为0元，不可开发票，请您选择“暂不需要发票”");
            return;
        }
        clearInvoiceTips();
        var invoice_data = new Hashtable();
        var invoice_title_value = filter_var($.trim(obj_invoice_title.value));
        var invoice_content_value = filter_var($.trim(obj_invoice_content.value));

        if (obj_title_person_radio.checked != true && obj_title_company_radio.checked != true) {
            setInvoiceErrorInfo(obj_span_title_tips, MSG_INVOICE_TITLE_ERROR);
            return;
        }

        if (obj_title_person_radio.checked == true) {
            invoice_title_value = '个人';

            if (invoice_content_value == '请选择' || invoice_content_value == '') {
                setInvoiceErrorInfo(obj_span_content_tips, MSG_INVOICE_CONTENT_EMPTY);
                return;
            }
        }
        else {
            if (invoice_title_value == '请填写单位名称' || invoice_title_value == '') {
                setInvoiceErrorInfo(obj_span_title_tips, MSG_INVOICE_TITLE_ERROR);
                return;
            }
            if (invoice_title_value == '个人') {
                setInvoiceErrorInfo(obj_span_title_tips, MSG_INVOICE_TITLE_EMPTY);
                return;
            }

            if (invoice_title_value.trim().indexOf('<') >= 0 || invoice_title_value.trim().indexOf('>') >= 0) {
                setInvoiceErrorInfo(obj_span_title_tips, MSG_TITLE_ERROR);
                return;
            }
            if (invoice_content_value == '请选择' || invoice_content_value == '') {
                setInvoiceErrorInfo(obj_span_content_tips, MSG_INVOICE_CONTENT_EMPTY);
                return;
            }
        }
        //此处需要添加代码

        clearInvoiceTips();
        //提交发票信息
        invoice_data['invoice_category'] = InvoiceCategory.PaperInvoice;
        invoice_data['invoice_title'] = invoice_title_value;
        invoice_data['invoice_content'] = invoice_content_value;
        invoice_data['order_sequence_id'] = m_data_source['order_sequence_id'];
        invoice_data['inherit_status'] = false;

        save_click = true;
        m_invoice_submit(invoice_data);
    };
    var vat_invoice_submit_click = function () {
        if (!canInvoicing()) {
            setInvoiceErrorInfo(obj_span_VAT_content_tips, "您的订单应付金额为0元，不可开发票，请您选择“暂不需要发票”");
            return;
        }
        clearInvoiceTips();
        var invoice_data = new Hashtable();
        var invoice_title_value = '';
        var invoice_content_value = filter_var($.trim(obj_ddl_VAT_invoice_content.value));

        if (invoice_content_value == '请选择' || invoice_content_value == '') {
            setInvoiceErrorInfo(obj_span_VAT_content_tips, MSG_INVOICE_CONTENT_EMPTY);
            return;
        }
        clearInvoiceTips();
        invoice_data['invoice_category'] = InvoiceCategory.VatInvoice;
        invoice_data['invoice_title'] = invoice_title_value;
        invoice_data['invoice_content'] = invoice_content_value;
        invoice_data['order_sequence_id'] = m_data_source['order_sequence_id'];
        invoice_data['inherit_status'] = false;

        save_click = true;
        m_invoice_submit(invoice_data);
    }
    var e_invoice_submit_click = function () {
        clearInvoiceTips();

        if (!canInvoicing()) {
            setInvoiceErrorInfo(obj_span_e_content_tips, "您的订单应付金额为0元，不可开发票，请您选择“暂不需要发票”");
            setInvoiceErrorInfo(obj_span_e_book_content_tips, "您的订单应付金额为0元，不可开发票，请您选择“暂不需要发票”");
            setInvoiceErrorInfo(obj_span_e_nonbook_content_tips, "您的订单应付金额为0元，不可开发票，请您选择“暂不需要发票”");
            return;
        }

        var invoice_data = new Hashtable();
        var invoice_title_value = filter_var($.trim(obj_e_invoice_title.value));
        var invoice_content_value = filter_var($.trim(obj_ddl_e_invoice_content.value));
        if(invoice_content_value == '请选择'){
        	invoice_content_value = '';
        }
        var invoice_book_content_value = filter_var($.trim(obj_ddl_e_book_invoice_content.value));
        if(invoice_book_content_value == '请选择'){
        	invoice_book_content_value = '';
        }
        var invoice_nonbook_content_value = filter_var($.trim(obj_ddl_e_nonbook_invoice_content.value));
        if(invoice_nonbook_content_value == '请选择'){
        	invoice_nonbook_content_value = '';
        }
		var invoice_tel=null;
		if(ConsigneeCommon.isContainAterisk(obj_e_invoice_tel.value)){
			invoice_tel = real_e_invoice_tel;
		}else{
			invoice_tel = obj_e_invoice_tel.value;
		}
        //var invoice_tel = obj_e_invoice_tel.value;

        if (obj_e_title_person_radio.checked != true && obj_e_title_company_radio.checked != true) {
            setInvoiceErrorInfo(obj_span_e_title_tips, MSG_INVOICE_TITLE_ERROR);
            return;
        }

        if (obj_e_title_person_radio.checked == true) {
            invoice_title_value = '个人';
        }
        else {
            if (invoice_title_value == '请填写单位名称' || invoice_title_value == '') {
                setInvoiceErrorInfo(obj_span_e_title_tips, MSG_INVOICE_TITLE_ERROR);
                return;
            }
            if (invoice_title_value == '个人') {
                setInvoiceErrorInfo(obj_span_e_title_tips, MSG_INVOICE_TITLE_EMPTY);
                return;
            }

            if (invoice_title_value.trim().indexOf('<') >= 0 || invoice_title_value.trim().indexOf('>') >= 0) {
                setInvoiceErrorInfo(obj_span_e_title_tips, MSG_TITLE_ERROR);
                return;
            }
        }
        
        if (supportElectronShop() && invoice_content_value == '') {
            setInvoiceErrorInfo(obj_span_e_content_tips, MSG_INVOICE_CONTENT_EMPTY);
            return;
        }
        
        if (supportElectronBook() && invoice_book_content_value == '') {
            setInvoiceErrorInfo(obj_span_e_book_content_tips, MSG_INVOICE_CONTENT_EMPTY);
            return;
        }
        
        if (supportElectronNonbook() && invoice_nonbook_content_value == '') {
            setInvoiceErrorInfo(obj_span_e_nonbook_content_tips, MSG_INVOICE_CONTENT_EMPTY);
            return;
        }
        
        if (invoice_content_value == '' && invoice_book_content_value == ''  && invoice_nonbook_content_value == '') {
        	setInvoiceErrorInfo(obj_span_e_content_tips, MSG_INVOICE_CONTENT_EMPTY);
            setInvoiceErrorInfo(obj_span_e_book_content_tips, MSG_INVOICE_CONTENT_EMPTY);
            setInvoiceErrorInfo(obj_span_e_nonbook_content_tips, MSG_INVOICE_CONTENT_EMPTY);
            return;
        }

        var mbRegExp = new RegExp(REGEX_SHIP_MB, 'g');
        if (!mbRegExp.test(invoice_tel)) {
            setInvoiceErrorInfo(obj_e_invoice_tel_tips, MSG_SHIP_MB_ERROR);
            return;
        }

        invoice_data['invoice_category'] = InvoiceCategory.ElectronInvoice;
        invoice_data['invoice_tel'] = invoice_tel;
        invoice_data['invoice_title'] = invoice_title_value;
        invoice_data['invoice_content'] = invoice_content_value;
        invoice_data['invoice_book_content'] = invoice_book_content_value;
        invoice_data['invoice_nonbook_content'] = invoice_nonbook_content_value;
        invoice_data['order_sequence_id'] = m_data_source['order_sequence_id'];
        invoice_data['inherit_status'] = false;

        save_click = true;
        m_invoice_submit(invoice_data);
    };
    function invoice_title_click(invoiceInfoType) {//点击发票抬头部分的下拉三角
        clearInvoiceTips();
        if (invoiceInfoType == InvoiceInfoType.PaperCompany) {
            if (obj_title_person_radio.checked == true)
                return;
            if ($1('invoice_title_ul_' + m_data_source['order_sequence_id']) != null) {
                common_invoice_title_close(invoiceInfoType);
                return;
            }
        }
        else if (invoiceInfoType == InvoiceInfoType.ElectronCompany) {
            if (obj_e_title_person_radio.checked == true)
                return;
            if ($1('e_invoice_title_ul_' + m_data_source['order_sequence_id']) != null) {
                common_invoice_title_close(invoiceInfoType);
                return;
            }
        }
        common_invoice_title_open(invoiceInfoType);
    }
    this.setDataSource = function (data_source) {
        m_data_source = data_source;
        REGEX_SHIP_MB = m_data_source['ship_mb_regular_express'];
        m_invoice_panel.DataSource = m_data_source;
    };

    var invoice_cancel_click = function () {
        obj_title_person_radio.checked = false;
        obj_title_company_radio.checked = false;
        obj_invoice_title.value = "";
        if (obj_invoice_content.options.length > 0) {
            obj_invoice_content.options[0].selected = true;
        }
        else
            obj_invoice_content.disabled = true;
        //        invoice_close(); //重新绑定显示信息

        //        //更新发票信息 暂时先这样写
        //        m_invoice_content = "";
        //        m_invoice_title = "";
        //       m_invoice_need = false;
        clearInvoiceTips();
        var invoice_data = new Hashtable();
        invoice_data['invoice_category'] = InvoiceCategory.NotNeedInvoice;
        invoice_data['invoice_title'] = "";
        invoice_data['invoice_content'] = "";
        invoice_data['order_sequence_id'] = m_data_source['order_sequence_id'];
        invoice_data['inherit_status'] = false;

        m_invoice_submit(invoice_data);
    };

    var setInvoiceErrorInfo = function (obj_span, invoice_error_tips) {
        if (invoice_error_tips != null && obj_span != null) {
            obj_span.className = 'help-inline help-inline-error help-inline-large';
            obj_span.innerHTML = "<span class='icon icon-warn'></span> " + invoice_error_tips;
        }
    };
    this.setInvoiceErrorTips = function (error_code) {
        if (obj_rb_VAT_invoice.checked) {
            switch (error_code) {
                case "1":
                    obj_span_VAT_content_tips.className = 'help-inline help-inline-error help-inline-large';
                    obj_span_VAT_content_tips.innerHTML = "<span class='icon icon-warn'></span> " + MSG_INVOICE_CONTENT_EMPTY;
                    break;
                case "2":
                    break;
                case "3":
                    obj_span_VAT_content_tips.className = 'help-inline help-inline-error help-inline-large';
                    obj_span_VAT_content_tips.innerHTML = "<span class='icon icon-warn'></span> " + MSG_INVOICE_CONTENT_EMPTY;
                    break;
                case "4":
                    obj_span_VAT_invoice_tips.className = 'help-inline help-inline-error help-inline-large';
                    obj_span_VAT_invoice_tips.innerHTML = "<span class='icon icon-warn'></span> " + MSG_TITLE_ID_ERROR;
                    break;
                case "5":
                    obj_span_VAT_invoice_tips.className = 'help-inline help-inline-error help-inline-large';
                    obj_span_VAT_invoice_tips.innerHTML = "<span class='icon icon-warn'></span> " + MSG_ORDER_SEQUENCE_ID_ERROR;
                    break;
                case "6":
                    obj_span_VAT_invoice_tips.className = 'help-inline help-inline-error help-inline-large';
                    obj_span_VAT_invoice_tips.innerHTML = "<span class='icon icon-warn'></span> " + MSG_CART_ID_ERROR;
                    break;
                case "7":
                    obj_span_VAT_invoice_tips.className = 'help-inline help-inline-error help-inline-large';
                    obj_span_VAT_invoice_tips.innerHTML = "<span class='icon icon-warn'></span> " + MSG_TYPE_ID_ERROR;
                    break;
                case "8":
                    obj_span_VAT_invoice_tips.className = 'help-inline help-inline-error help-inline-large';
                    obj_span_VAT_invoice_tips.innerHTML = "<span class='icon icon-warn'></span> " + MSG_SUBMIT_CLICK_ERROR;
                    break;
                case "9":
                    obj_span_VAT_invoice_tips.className = 'help-inline help-inline-error help-inline-large';
                    obj_span_VAT_invoice_tips.innerHTML = "<span class='icon icon-warn'></span> " + MSG_CUST_ID_INVALID;
                    break;
                default:
                    obj_span_VAT_invoice_tips.className = 'help-inline help-inline-error help-inline-large';
                    obj_span_VAT_invoice_tips.innerHTML = "<span class='icon icon-warn'></span> " + MSG_INVOICE_SAVE_ERROR;
                    break;
            }
        }
        else {
            switch (error_code) {
                case "1":
                    obj_span_content_tips.className = 'help-inline help-inline-error help-inline-large';
                    obj_span_content_tips.innerHTML = "<span class='icon icon-warn'></span> " + MSG_INVOICE_CONTENT_EMPTY;
                    break;
                case "2":
                    obj_span_title_tips.className = 'help-inline help-inline-error help-inline-large';
                    obj_span_title_tips.innerHTML = "<span class='icon icon-warn'></span> " + MSG_INVOICE_TITLE_EMPTY;
                    break;
                case "3":
                    obj_span_content_tips.className = 'help-inline help-inline-error help-inline-large';
                    obj_span_content_tips.innerHTML = "<span class='icon icon-warn'></span> " + MSG_INVOICE_CONTENT_EMPTY;
                    break;
                case "4":
                    obj_span_invoice_tips.className = 'help-inline help-inline-error help-inline-large';
                    obj_span_invoice_tips.innerHTML = "<span class='icon icon-warn'></span> " + MSG_TITLE_ID_ERROR;
                    break;
                case "5":
                    obj_span_invoice_tips.className = 'help-inline help-inline-error help-inline-large';
                    obj_span_invoice_tips.innerHTML = "<span class='icon icon-warn'></span> " + MSG_ORDER_SEQUENCE_ID_ERROR;
                    break;
                case "6":
                    obj_span_invoice_tips.className = 'help-inline help-inline-error help-inline-large';
                    obj_span_invoice_tips.innerHTML = "<span class='icon icon-warn'></span> " + MSG_CART_ID_ERROR;
                    break;
                case "7":
                    obj_span_invoice_tips.className = 'help-inline help-inline-error help-inline-large';
                    obj_span_invoice_tips.innerHTML = "<span class='icon icon-warn'></span> " + MSG_TYPE_ID_ERROR;
                    break;
                case "8":
                    obj_span_invoice_tips.className = 'help-inline help-inline-error help-inline-large';
                    obj_span_invoice_tips.innerHTML = "<span class='icon icon-warn'></span> " + MSG_SUBMIT_CLICK_ERROR;
                    break;
                case "9":
                    obj_span_invoice_tips.className = 'help-inline help-inline-error help-inline-large';
                    obj_span_invoice_tips.innerHTML = "<span class='icon icon-warn'></span> " + MSG_CUST_ID_INVALID;
                    break;
                default:
                    obj_span_invoice_tips.className = 'help-inline help-inline-error help-inline-large';
                    obj_span_invoice_tips.innerHTML = "<span class='icon icon-warn'></span> " + MSG_INVOICE_SAVE_ERROR;
                    break;
            }
        }
        //        if (invoice_error_tips != null) {
        //            if (invoice_error_tips.indexOf('内容') > 0 && obj_span_content_tips != null) {
        //                obj_span_content_tips.className = 'help-inline help-inline-error help-inline-large';
        //                obj_span_content_tips.innerHTML = "<span class='icon icon-warn'></span> " + invoice_error_tips;
        //            }
        //            else if (obj_span_invoice_tips != null) {
        //                obj_span_invoice_tips.className = 'help-inline help-inline-error help-inline-large';
        //                obj_span_invoice_tips.innerHTML = "<span class='icon icon-warn'></span> " + invoice_error_tips;
        //            }
        //        }
    };

    this.invoice_close = function () {//暂不需要发票重新绑定模板
        m_invoice_title = "";
        m_invoice_content = "";
        m_invoice_category = InvoiceCategory.NotNeedInvoice;
        m_invoice_tel = "";
        m_invoice_book_content = "";
        m_invoice_nobook_content = "";
        m_invoice_edit_status = 0;
        m_invoice_panel.Template = NO_INVOICE_TEMPLATE_READONLY;
        m_invoice_panel.DataBind();
        obj_a_invoice = $1('a_invoice_' + m_data_source['order_sequence_id']);
        var thisObject = this;
        obj_a_invoice.onclick = function () {
            thisObject.invoice_pucker_click();
        }
        if(parseFloat(m_data_source['order_payable_amount']) + parseFloat(m_data_source['cust_cash_used']) <= 0){
        	$('#no_invoice_tips_'+m_data_source['order_sequence_id']).show();
        }else{
        	$('#no_invoice_tips_'+m_data_source['order_sequence_id']).hide();
        }
        //var sourceObj = $('#invoiceGroup_' + m_data_source['sort_num']).prev();
        //$('p').remove("#invoiceGroup_" + m_data_source['sort_num']);
        //var infos ="暂不需要发票";
        //var invoicesHtml = '';
        //invoicesHtml += '<p id="invoiceGroup_' + m_data_source['sort_num'] + '" class="listcon" style="display:none">订单' + m_data_source['sort_num'] + '：<span class="mr-10">'
        //        + infos + '</span></p>';
        //sourceObj.after(invoicesHtml);
    }
    this.confirm_invoice_close = function (title_value, content_value, invoice_category, invoice_tel, invoice_book_content, invoice_nonbook_content) {//确定发票信息重新绑定模板
        m_invoice_title = title_value;
        m_invoice_content = content_value;
        m_invoice_category = invoice_category;
        m_invoice_edit_status = 0;
        m_invoice_tel = invoice_tel;
        m_invoice_book_content = invoice_book_content;
        m_invoice_nonbook_content = invoice_nonbook_content;
        m_invoice_panel.Template = CONFIRM_INVOICE_TEMPLATE_READONLY;
        m_invoice_panel.DataBind();
        obj_confirm_invoice_info = $1('confirm_order_info_' + m_data_source['order_sequence_id']);
        if (m_invoice_category == InvoiceCategory.PaperInvoice) {
            obj_confirm_invoice_info.innerHTML = title_value + "&nbsp;&nbsp;&nbsp;&nbsp;发票内容：" + content_value;
        }
        else if (m_invoice_category == InvoiceCategory.VatInvoice) {
            obj_confirm_invoice_info.innerHTML = "增值税专用发票&nbsp;&nbsp;&nbsp;&nbsp;发票内容：" + content_value;
        }
        else if (m_invoice_category == InvoiceCategory.ElectronInvoice) {
            obj_confirm_invoice_info.innerHTML = "电子发票&nbsp;&nbsp;&nbsp;&nbsp;";
            var titleLength = 20;
            if(title_value.length > titleLength){
            	obj_confirm_invoice_info.innerHTML += title_value.substr(0, titleLength) + '...';
            }
            else{
            	obj_confirm_invoice_info.innerHTML += title_value;
            }
            if(content_value){
            	obj_confirm_invoice_info.innerHTML += "&nbsp;&nbsp;&nbsp;&nbsp;发票内容：" + content_value;
            }
            if(invoice_book_content){
            	obj_confirm_invoice_info.innerHTML += "&nbsp;&nbsp;&nbsp;&nbsp;图书发票内容：" + invoice_book_content;
            }
            if(invoice_nonbook_content){
            	obj_confirm_invoice_info.innerHTML += "&nbsp;&nbsp;&nbsp;&nbsp;非图书发票内容：" + invoice_nonbook_content;
            }
        }
        obj_invoice_modify = $1('invoice_modify_' + m_data_source['order_sequence_id']);
        var thisObject = this;
        obj_invoice_modify.onclick = function () {
            thisObject.invoice_pucker_click();
        }

        //需要将对应信息放到他原来的位置
        //var sourceObj = $('#invoiceGroup_' + m_data_source['sort_num']).prev();
        //$('p').remove("#invoiceGroup_" + m_data_source['sort_num']);
        //var invoicesHtml = '';
        //invoicesHtml += '<p id="invoiceGroup_' + m_data_source['sort_num'] + '" class="listcon" style="display:none">订单' + m_data_source['sort_num'] + '：<span class="mr-10">'
        //        + info + '</span></p>';
        //sourceObj.after(invoicesHtml);

    }
    this.invoice_pucker_click = function () {//展开发票区域
        this.show(true);
    }

    this.isInvoiceEditStatus = function () {
        return m_invoice_edit_status == 1;
    };
    this.setInvoiceCategory = function (invoice_category) {
        m_invoice_category = invoice_category;
    }; this.setInvoiceContent = function (invoice_content) {
        m_invoice_content = invoice_content;
    };
    this.setInvoiceTitle = function (invoice_title) {
        m_invoice_title = invoice_title;
    };
    this.setInvoiceTel = function (invoice_tel) {
        m_invoice_tel = invoice_tel;
    };
    this.setInvoiceBookContent = function (invoice_book_content) {
    	m_invoice_book_content = invoice_book_content;
    };
    this.setInvoiceNonbookContent = function (invoice_nonbook_content) {
    	m_invoice_nonbook_content = invoice_nonbook_content;
    };

    function setCommonInvoiceInfo() {
        if (invoice_all_cache != null) {
            if (invoice_all_cache[0].invoice_tel && supportElectron()) {
                if (invoice_all_cache[0].invoice_title != '个人' && !supportElectronCompany()) {
                    return;
                }
                showInvoiceDiv(InvoiceCategory.ElectronInvoice);
                if (invoice_all_cache[0].invoice_title == '个人') {
                    obj_e_title_person_radio.checked = true; //由于对应的缓存变量不同不能使用setPersonInvoice
                    setEContentValue(invoice_all_cache[0].invoice_content, invoice_all_cache[0].invoice_tel
                    		, invoice_all_cache[0].invoice_book_content, invoice_all_cache[0].invoice_nonbook_content);
                    if (obj_ddl_e_invoice_content.value == "") {
                        obj_ddl_e_invoice_content.value = "请选择";
                    }
                    obj_e_invoice_title.disabled = true;
                }
                else {
                    obj_e_title_company_radio.checked = true;
                    obj_e_invoice_title.value = invoice_all_cache[0].invoice_title;
                    setEContentValue(invoice_all_cache[0].invoice_content, invoice_all_cache[0].invoice_tel
                    		, invoice_all_cache[0].invoice_book_content, invoice_all_cache[0].invoice_nonbook_content);
                    if (obj_ddl_e_invoice_content.value == "") {
                        obj_ddl_e_invoice_content.value = "请选择";
                    }
                }
            } else if(!supportElectron()) {
                showInvoiceDiv(InvoiceCategory.PaperInvoice);
                if (invoice_all_cache[0].invoice_title == '个人') {
                    obj_title_person_radio.checked = true; //由于对应的缓存变量不同不能使用setPersonInvoice
                    setContentValue(invoice_all_cache[0].invoice_content);
                    if (obj_invoice_content.value == "") {
                        obj_invoice_content.value = "请选择";
                    }
                    obj_invoice_title.disabled = true;
                }
                else {
                    obj_title_company_radio.checked = true;
                    obj_invoice_title.value = invoice_all_cache[0].invoice_title;
                    setContentValue(invoice_all_cache[0].invoice_content);
                    if (obj_invoice_content.value == "") {
                        obj_invoice_content.value = "请选择";
                    }
                }
            }

        }

    }
    this.show = function (isInvoicePuckerClick) {
        $('#invoiceList>p.listcon').hide();
        if ($('#invoiceList>h4:hidden').length > 0) {
            $('#invoiceList>h4').show();
        }
        $('#invoiceList>div.item-list').show();
        $('#invoiceCollapse').text('');
        m_invoice_edit_status = 1;
        m_invoice_panel.Template = INVOICE_TEMPLATE_EDIT;
        m_invoice_panel.DataSource = m_data_source;
        m_invoice_panel.DataBind();
        InitControl();

        if (m_data_source['is_has_no_storage_jit_package'] == "1") {
            //显示不入库联营提示
            $s(noStorageJit);
			is_has_no_storage_jit_package = true;
        } else {
            $h(noStorageJit);
			is_has_no_storage_jit_package = false;
        }
        //需要先去请求一下单位发票抬头信息
        getInvoiceTitleStyle(InvoiceInfoType.PaperCompany);
        getInvoiceTitleStyle(InvoiceInfoType.ElectronCompany);
        //因为会出现进结算为保存发票，商品缺货引起的发票内容变化；因此最好重新获取发票内容
        var m_post_data = GetInvoiceContentAjaxHashtable();
        invoice_content_ajax.invokeServer(m_post_data, 'POST', false);
        clearInvoiceTips();
        //绑定radio对应事件
        obj_title_person_radio.onclick = function () {
            setInvoiceInfo(InvoiceInfoType.PaperPerson);
        };
        obj_title_company_radio.onclick = function () {
            setInvoiceInfo(InvoiceInfoType.PaperCompany);
        };
        obj_e_title_person_radio.onclick = function () {
            setEInvoiceInfo(InvoiceInfoType.ElectronPerson);
        }
        obj_e_title_company_radio.onclick = function () {
            setEInvoiceInfo(InvoiceInfoType.ElectronCompany);
        };
        //秒杀，联通合约机不支持增值税发票
        if (m_data_source["order_type"] != 97 && m_data_source["order_products_type"] != 80) {
            obj_rb_invoice.onclick = function () {
                setInvoiceType(InvoiceCategory.PaperInvoice);
				if(is_has_no_storage_jit_package) {
					$s(noStorageJit);
				}
            };
            obj_rb_VAT_invoice.onclick = function () {
                setInvoiceType(InvoiceCategory.VatInvoice);
				if(is_has_no_storage_jit_package) {
					$s(noStorageJit);
				}
            };
            obj_rb_e_invoice.onclick = function () {
                setInvoiceType(InvoiceCategory.ElectronInvoice);
				if(is_has_no_storage_jit_package) {
					$h(noStorageJit);
				}
            };
            if(!supportElectronCompany()){
            	$h($1('e_invoice_title_company_label_' + m_data_source["order_sequence_id"]));
                $h($1('e_invoice_title_data_' + m_data_source["order_sequence_id"]));
            }
            if(m_data_source["shop_id"] > 0){
            	if(!supportPaper()){
            		$h(obj_lab_invoice);
            	}
            	if(!supportElectron()){
            		$h(obj_lab_e_invoice);
            	}
            	if(!supportVat()){
            		$h(obj_lab_VAT_invoice);
            		$h(obj_div_not_have_VAT_invoice_mark);
            	}
            }
        }
        else {
            $h(obj_p_select_invoice);
        }
        if (obj_invoice_title) {
            //发票抬头onfocus事件
            obj_invoice_title.onfocus = function () { checkInvoiceTitle(InvoiceInfoType.PaperCompany); };
            //增加input的键盘响应函数
            obj_invoice_title.onkeyup = function (e) { intelligent_title_search(this, e, InvoiceInfoType.PaperCompany); };
        }
        if (obj_e_invoice_title) {
            //发票抬头onfocus事件
            obj_e_invoice_title.onfocus = function () { checkInvoiceTitle(InvoiceInfoType.ElectronCompany); };
            //增加input的键盘响应函数
            obj_e_invoice_title.onkeyup = function (e) { intelligent_title_search(this, e, InvoiceInfoType.ElectronCompany); };
        }

        if (isInvoicePuckerClick) {
            getCurInvoiceInfo();
        } else {
            m_invoice_category = m_data_source['invoice_category'];
            m_invoice_content = m_data_source['invoice_content'];
            m_invoice_title = m_data_source['invoice_title'];
            m_invoice_tel = m_data_source['invoice_tel'];
            m_invoice_book_content = m_data_source['invoice_book_content'];
            m_invoice_nonbook_content = m_data_source['invoice_nonbook_content'];
        }
        if (mustNeedInvoice()) {
            if (obj_btn_close) {
                $h(obj_btn_close);
            }
            if (obj_btn_VAT_invoice_close) {
                $h(obj_btn_VAT_invoice_close);
            }
            if (obj_btn_e_invoice_close) {
                $h(obj_btn_e_invoice_close);
            }
        }
        if (onlySupportElectron()) {
            setInvoiceType(InvoiceCategory.ElectronInvoice);
        }
        else if (onlySupportPaper()) {
            setInvoiceType(InvoiceCategory.PaperInvoice);
        }
        else if (onlySupportVat()) {
            setInvoiceType(InvoiceCategory.VatInvoice);
        } 
        else {
            setInvoiceType(m_invoice_category);
        }
        //原订单上保存有发票信息
        if (m_invoice_category == InvoiceCategory.PaperInvoice && m_invoice_title != '' && m_invoice_content != '') {
            if (m_invoice_title == '个人') {
                obj_title_person_radio.checked = true;
                obj_invoice_title.disabled = true;
                obj_invoice_title.value = "";
            }
            else {
                obj_title_company_radio.checked = true;
                obj_invoice_title.disabled = false;
                obj_invoice_title.value = m_invoice_title;
            }
            //需要验证发票内容是否有效,然后再设置前台显示
            setContentValue(m_invoice_content);
        }
        else if (m_invoice_category == InvoiceCategory.VatInvoice && m_invoice_content != '') {
            setVATContentValue(m_invoice_content);
        }
        else if (m_invoice_category == InvoiceCategory.ElectronInvoice && m_invoice_title != '' && m_invoice_tel != '') {
            setEContentValue(m_invoice_content, m_invoice_tel, m_invoice_book_content, m_invoice_nonbook_content);
        }
        else {

        }
    };   //设置按钮不可点击
    this.setDisabled = function (titleData, contentData) {
        if (titleData != '' && contentData != '') {
            $disabled('invoice_submit_' + m_data_source['order_sequence_id']);
            $wait('invoice_submit_' + m_data_source['order_sequence_id']);
        }
        else if (titleData == '' && contentData == '') {
            $disabled('a_turn_off_invoice_' + m_data_source['order_sequence_id']);
            $wait('a_turn_off_invoice_' + m_data_source['order_sequence_id']);
        }
    }; //发票部分只读显示
    this.showReadOnly = function (readonly_title, readonly_content, invoice_category, invoice_tel, invoice_book_content, invoice_nonbook_content) {
        if ((invoice_category == InvoiceCategory.PaperInvoice && readonly_title != "" && readonly_content != "") 
        		|| (invoice_category == InvoiceCategory.VatInvoice && readonly_content != "")
        		|| (invoice_category == InvoiceCategory.ElectronInvoice  && readonly_title != "")) {
            this.refreshInvoiceContent(readonly_title, readonly_content, invoice_category, invoice_tel, invoice_book_content, invoice_nonbook_content);
        }
        else if (readonly_title == "" && readonly_content == "") {
            this.invoice_close();
        }
        if ($('#invoiceCollapse').text() == "") {
            $('#invoiceCollapse').text("收起");
        }
    };

    this.refreshInvoiceContent = function (titleData, contentData, invoice_category, invoice_tel, invoice_book_content, invoice_nonbook_content) {
        //if (!save_click) { //自营订单重新验证发票内容且没有点击保存发票信息
        var invoice_content_refresh_ajax = new Ajax('/invoice/content');
        var m_post_data = GetInvoiceContentAjaxHashtable();
        var thisObject = this;
        invoice_content_refresh_ajax.OnSucceed
        (
            function (result) {
                if (result != null && result['errorCode'] == 0) {
                    if (!result['invoice']) {
                        result['invoice'] = new Array();
                    }
                    result['invoice'].unshift({ 'invoice_content': '请选择' });
                    invoice_content_cache = result['invoice'];
                    if (!result['vat_invoice']) {
                        result['vat_invoice'] = new Array();
                    }
                    result['vat_invoice'].unshift({ 'invoice_content': '请选择' });
                    VAT_invoice_content_cache = result['vat_invoice'];
                    //电子发票
	                if (!result['e_invoice']) {
	                    result['e_invoice'] = new Array();
	                }
	                if (!result['e_invoice']['book']) {
	                    result['e_invoice']['book'] = new Array();
	                }
	                result['e_invoice']['book'].unshift({ 'invoice_content': '请选择' });
	                if (!result['e_invoice']['non_book']) {
	                    result['e_invoice']['non_book'] = new Array();
	                }
	                result['e_invoice']['non_book'].unshift({ 'invoice_content': '请选择' });
	                if (!result['e_invoice']['shop']) {
	                    result['e_invoice']['shop'] = new Array();
	                }
	                result['e_invoice']['shop'].unshift({ 'invoice_content': '请选择' });
	                e_invoice_content_cache = result['e_invoice'];
                    is_all_3c_category_product = (result['is3Cproducts'] == 'True');
                    //添加自营发票内容设置订单类型的方法
                    //setContentByOrderType();
                    //changeInvoiceContentCache(invoice_content_cache);
                    //此处应修改为判断当前发票内容不在选项里就需要展开
                    if (checkContentChange(contentData, invoice_category, invoice_book_content, invoice_nonbook_content)) {
                        thisObject.invoice_pucker_click();
                        //bindInvoiceContent(invoice_content_cache);
                    }
                    else {
                        thisObject.confirm_invoice_close(titleData, contentData, invoice_category, invoice_tel, invoice_book_content, invoice_nonbook_content);
                    }
                }
                else {
                    thisObject.invoice_pucker_click();
                    //3c发票需求 hj20130709
                    if (m_data_source["shop_id"] > 0 && +m_data_source["shop_type"] != 6) {
                        obj_p_content_tips.innerHTML = "您订购的商品由当当合作卖家销售，发票由卖家开具并寄出";
                        obj_p_e_content_tips.innerHTML = "您订购的商品由当当合作卖家销售，发票由卖家开具并寄出";
                        obj_p_e_nonbook_content_tips.innerHTML = "您订购的商品由当当合作卖家销售，发票由卖家开具并寄出";
                    }
                    else {
                        obj_p_content_tips.innerHTML = "数码、手机、家电类商品将默认打印出商品名称和型号";
                        obj_p_e_content_tips.innerHTML = "数码、手机、家电类商品将默认打印出商品名称和型号";
                        obj_p_e_nonbook_content_tips.innerHTML = "数码、手机、家电类商品将默认打印出商品名称和型号";
                    }
                    obj_p_VAT_content_tips.innerHTML = str_VAT_content_tips;
                    if (obj_invoice_danwei != null) {
                        obj_invoice_danwei.onclick = function () { invoice_title_click(InvoiceInfoType.PaperCompany); };
                    }
                    if (obj_e_invoice_danwei != null) {
                        obj_e_invoice_danwei.onclick = function () { invoice_title_click(InvoiceInfoType.ElectronCompany); };
                    }
                    bindClickEvent();
                }
            }
        );
        invoice_content_refresh_ajax.invokeServer(m_post_data, 'POST', false); //修改请求方式
    };

    this.setInvoiceSubmit = function (invoice_submit) {
        m_invoice_submit = invoice_submit;
    };

    function checkContentChange(contentData, invoice_category, invoice_book_content, invoice_nonbook_content) {
        if (contentData == '请选择') {
            return true;
        }
        if (invoice_category == InvoiceCategory.PaperInvoice) {
            if (invoice_content_cache == null)
                return true;
            else {
                for (var l = 0; l < invoice_content_cache.length; l++) {
                    if (invoice_content_cache[l].invoice_content == contentData)
                        return false;
                }
                return true;
            }
        }
        else if (invoice_category == InvoiceCategory.VatInvoice) {
            if (VAT_invoice_content_cache == null)
                return true;
            else {
                for (var l = 0; l < VAT_invoice_content_cache.length; l++) {
                    if (VAT_invoice_content_cache[l].invoice_content == contentData)
                        return false;
                }
                return true;
            }
        }
        else if (invoice_category == InvoiceCategory.ElectronInvoice) {
            if (e_invoice_content_cache == null)
                return true;
            else {
            	if(supportElectronShop()){
            		for (var l = 0; l < e_invoice_content_cache["shop"].length; l++) {
                        if (e_invoice_content_cache["shop"][l].invoice_content == contentData)
                            return false;
                    }
            	}
				if(supportElectronBook()){
					for (var l = 0; l < e_invoice_content_cache["book"].length; l++) {
                        if (e_invoice_content_cache["book"][l].invoice_content == invoice_book_content)
                            return false;
                    }
            	}
				if(supportElectronNonbook()){
					for (var l = 0; l < e_invoice_content_cache["non_book"].length; l++) {
                        if (e_invoice_content_cache["non_book"][l].invoice_content == invoice_nonbook_content)
                            return false;
                    }
				}
                return true;
            }
        }
        else {
            return false;
        }

    }

    //隐藏单位抬头列表，个人觉得好像没有隐藏列表信息……
    function common_invoice_title_close(invoiceInfoType) {
        var obj = null;
        if (invoiceInfoType == InvoiceInfoType.PaperCompany) {
            obj = $1('invoice_title_ul_' + m_data_source['order_sequence_id']);
        }
        else if (invoiceInfoType == InvoiceInfoType.ElectronCompany) {
            obj = $1('e_invoice_title_ul_' + m_data_source['order_sequence_id']);
        } else {
            return;
        }
        if (obj != null) {
            var _parentElement = obj.parentNode;
            if (_parentElement) {
                _parentElement.removeChild(obj);
            }
        }
    }

    //隐藏智能匹配单位抬头列表，个人觉得好像没有隐藏列表信息……
    function intelligent_invoice_title_close(invoiceInfoType) {
        var ul = null;
        if (invoiceInfoType == InvoiceInfoType.PaperCompany) {
            ul = $1('intelligent_title_ul_' + m_data_source['order_sequence_id']);
        }
        else if (invoiceInfoType == InvoiceInfoType.ElectronCompany) {
            ul = $1('intelligent_e_title_ul_' + m_data_source['order_sequence_id']);
        } else {
            return;
        }
        if (ul != null) {
            var _parentElement = ul.parentNode;
            if (_parentElement) {
                _parentElement.removeChild(ul);
            }
        }
    }
    //生成单位抬头发票的信息列表，以及设置每一条信息的操作响应
    function common_invoice_title_open(invoiceInfoType) {
        intelligent_invoice_title_close(invoiceInfoType);
        //if (invoice_company_cache == null) {
        var m_query_invoice_data = new Hashtable();
        m_query_invoice_data['type'] = invoiceInfoType;
        m_query_invoice_data['id'] = 0;

        var invoice_data_ajax = new Ajax('/invoice/info');
        invoice_data_ajax.OnSucceed
            (
                function (result) {
                    if (result != null && result['errorCode'] == 0) {
                        invoice_company_cache[invoiceInfoType] = result.invoice;
                        //                        if (invoice_company_cache.length == 1)
                        //                            return;
                        setCompanyInvoiceList(invoiceInfoType);
                    }
                }
            );
        invoice_data_ajax.invokeServer(m_query_invoice_data, 'POST', true);

    }

    //单位发票信息列表以及操作响应
    function setCompanyInvoiceList(invoiceInfoType) {
        //设置发票抬头列表的样式;
        if (!invoice_company_cache[invoiceInfoType]) {
            var m_query_invoice_data = new Hashtable();
            m_query_invoice_data['type'] = invoiceInfoType;
            m_query_invoice_data['id'] = 0;

            var invoice_info_ajax = new Ajax('/invoice/info');

            invoice_info_ajax.OnSucceed
            (
                function (resultInfo) {
                    if (resultInfo != null && resultInfo['errorCode'] == 0) {
                        invoice_company_cache[invoiceInfoType] = resultInfo.invoice;
                        createAndShowInvoice(invoiceInfoType);
                    }
                }
            );
            invoice_info_ajax.invokeServer(m_query_invoice_data, 'POST', true);
        }
        else {
            createAndShowInvoice(invoiceInfoType);
        }


    }
    //为单位抬头部分设置显示样式
    function getInvoiceTitleStyle(invoiceInfoType) {
        //hj add 界面优化
        intelligent_invoice_title_close(invoiceInfoType);
        if (!invoice_company_cache[invoiceInfoType]) {
            var m_query_invoice_data = new Hashtable();
            m_query_invoice_data['type'] = invoiceInfoType;
            m_query_invoice_data['id'] = 0;

            var invoice_info_ajax = new Ajax('/invoice/info');

            invoice_info_ajax.OnSucceed
            (
                function (resultInfo) {
                    if (resultInfo != null && resultInfo['errorCode'] == 0) {
                        if (resultInfo.invoice != null) {
                            invoice_company_cache[invoiceInfoType] = resultInfo.invoice;
                            setInvoiceTitleStyle(invoiceInfoType);
                        }
                        else {
                            setInvoiceTitleStyle(invoiceInfoType);
                        }
                    }
                }
            );
            invoice_info_ajax.invokeServer(m_query_invoice_data, 'POST', false);
        }
        else {
            setInvoiceTitleStyle(invoiceInfoType);
        }
    }


    function setInvoiceTitleStyle(invoiceInfoType) {
        var invoice_title_data = null;
        var single = null;
        var mulitple = null;
        if (invoiceInfoType == InvoiceInfoType.PaperCompany) {
            invoice_title_data = "invoice_title_data_";
            single = SINGLE_INVOICE_TITLE;
            mulitple = MULTIPLE_INVOICE_TITLE;
        }
        else if (invoiceInfoType == InvoiceInfoType.ElectronCompany) {
            invoice_title_data = "e_invoice_title_data_";
            single = SINGLE_E_INVOICE_TITLE;
            mulitple = MULTIPLE_E_INVOICE_TITLE;
        } else {
            return;
        }
        var m_invoice_title_data_panel = new JSPanel(invoice_title_data + m_data_source["order_sequence_id"]);
        if (!invoice_company_cache[invoiceInfoType] || invoice_company_cache[invoiceInfoType].length == 1) {//没有单位发票或者单位发票为一条的时候
            m_invoice_title_data_panel.Template = single;
            m_invoice_title_data_panel.DataSource = { "order_sequence_id": m_data_source["order_sequence_id"] };
            m_invoice_title_data_panel.DataBind();
            if (invoiceInfoType == InvoiceInfoType.PaperCompany) {
                obj_invoice_title = $1('invoice_title_' + m_data_source['order_sequence_id']);
            } else if (invoiceInfoType == InvoiceInfoType.ElectronCompany) {
                obj_e_invoice_title = $1('e_invoice_title_' + m_data_source['order_sequence_id']);
            }
        }
        else {
            m_invoice_title_data_panel.Template = mulitple;
            m_invoice_title_data_panel.DataSource = { "order_sequence_id": m_data_source["order_sequence_id"] };
            m_invoice_title_data_panel.DataBind();
            if (invoiceInfoType == InvoiceInfoType.PaperCompany) {
                obj_invoice_title = $1('invoice_title_' + m_data_source['order_sequence_id']);
                obj_invoice_danwei = $1('invoice_danwei_' + m_data_source['order_sequence_id']);
            } else if (invoiceInfoType == InvoiceInfoType.ElectronCompany) {
                obj_e_invoice_title = $1('e_invoice_title_' + m_data_source['order_sequence_id']);
                obj_e_invoice_danwei = $1('e_invoice_danwei_' + m_data_source['order_sequence_id']);
            }

        }

    }
    //创建并响应单位抬头列表
    function createAndShowInvoice(invoiceInfoType) {
        if (!invoice_company_cache[invoiceInfoType])
            return;
        if (invoice_company_cache[invoiceInfoType].length == 1 && invoice_company_cache[invoiceInfoType][0].invoice_title == "")
            return;
        var invoice_title_ul = null;
        var m_title_rpt_ul = null;
        var invoice_title_str = null;
        var title_delete_str = null;
        var invoice_title = null;
        var setFunction = null;
        var tips = null;
        if (invoiceInfoType == InvoiceInfoType.PaperCompany) {
            //动态创建ul控件并设置id
            obj_invoice_title_ul = document.createElement('ul');
            obj_invoice_title_ul.id = "invoice_title_ul_" + m_data_source["order_sequence_id"];
            invoice_title_ul = obj_invoice_title_ul;
            m_title_rpt_ul = new JSRepeater('invoice_title_ul_' + m_data_source["order_sequence_id"]);
            m_title_rpt_ul.ItemTemplate = INVOICE_TITLE_RPT_TEMPLATE;
            invoice_title_str = "invoice_title_";
            title_delete_str = "title_delete_";
            invoice_title = obj_invoice_title;
            setFunction = setContentValue;
            tips = obj_span_invoice_tips;
        }
        else if (invoiceInfoType == InvoiceInfoType.ElectronCompany) {
            obj_e_invoice_title_ul = document.createElement('ul');
            obj_e_invoice_title_ul.id = "e_invoice_title_ul_" + m_data_source["order_sequence_id"];
            invoice_title_ul = obj_e_invoice_title_ul;
            m_title_rpt_ul = new JSRepeater('e_invoice_title_ul_' + m_data_source["order_sequence_id"]);
            m_title_rpt_ul.ItemTemplate = E_INVOICE_TITLE_RPT_TEMPLATE;
            invoice_title_str = "e_invoice_title_";
            title_delete_str = "e_title_delete_";
            invoice_title = obj_e_invoice_title;
            setFunction = setEContentValue;
            tips = obj_span_e_invoice_tips;
        } else {
            return;
        }


        if (invoice_company_cache[invoiceInfoType].length <= 5) {
            invoice_title_ul.className = 'selc-box w205';
        }
        else {
            invoice_title_ul.className = 'selc-box w205 h110-scroll';
        }
        //将ul控件添加到页面合适的位置
        var m_test = document.getElementById(invoice_title_str + m_data_source["order_sequence_id"]);
        m_test.parentNode.parentNode.appendChild(invoice_title_ul);
        //为ul动态绑定li控件
        m_title_rpt_ul.onItemDataBind = function () {
        };
        m_title_rpt_ul.DataSource = invoice_company_cache[invoiceInfoType];
        m_title_rpt_ul.DataBind();

        //添加ul的OnmouseOut事件
        //obj_invoice_title_ul.onmouseout = function () { common_invoice_title_close(); /*intelligent_invoice_title_close();*/ };
        //添加li的响应事件
        invoice_li_array = m_title_rpt_ul.DataSource;
        for (var m = 0; m < invoice_li_array.length; m++) {
            var obj_invoice_li = $1(invoice_title_str + invoice_li_array[m]['id']);
            var m_invoice_title = invoice_li_array[m]['invoice_title'];
            if (invoice_title.value == m_invoice_title) {
                obj_invoice_li.className = 'active';
                $1(title_delete_str + invoice_li_array[m]['id']).className = 'block';
            }
            var title_id = invoice_li_array[m]['id'];
            (function (title_id) {
                obj_invoice_li.onmouseover = function () { this.className = 'active'; $1(title_delete_str + title_id).className = 'block'; }; //响应鼠标滑过li
            })(title_id);
            (function (title_id) {
                obj_invoice_li.onmouseout = function () {
                    this.className = ''; $1(title_delete_str + title_id).className = 'hide';
                }; //响应鼠标划出li
            })(title_id);
            (function (title_id) {
                obj_invoice_li.onclick = function (e) { //obj_invoice_title.value = temp_id;
                    e = e ? e.target : window.event.srcElement;
                    if (e.tagName == 'A')
                        return; //点击删除操作，阻止onclick函数执行
                    //直接从缓存里找到对应的发票信息进行设置
                    setCompanyInvoiceByID(title_id, invoiceInfoType);
                    $1(invoice_title_str + title_id).className = '';
                    //需要隐藏发票抬头部分,这样做整个ul就不存在了，因此上面需要动态生成ul
                    deleteTitleUl(invoiceInfoType);
                };
            })(title_id);       //响应点击li
            var obj_title_delete = $1(title_delete_str + invoice_li_array[m]['id']);
            (function (title_id) {//删除发票抬头
                obj_title_delete.onclick = function () {
                    //后台请求更新数据库种信息状态
                    var invoice_data = new Hashtable();
                    invoice_data['id'] = title_id;
                    var invoice_delete_ajax = new Ajax('/invoice/deletetitle');
                    invoice_delete_ajax.OnSucceed
                    (
                         function (result) {
                             if (result != null && result['errorCode'] == 0) {//后台发票抬头删除成功
                                 $1(invoice_title_str + title_id).className = '';
                                 //删除ul控件
                                 deleteTitleUl(invoiceInfoType);
                                 //经产品确认清空抬头信息，内容默认“请选择”
                                 invoice_title.value = '';
                                 setFunction('请选择');
                                 //更新单位发票信息
                                 invoice_company_cache[invoiceInfoType] = null;
                                 //设置单位发票抬头样式
                                 getInvoiceTitleStyle(invoiceInfoType);
                                 setCompanyInvoiceList(invoiceInfoType);
                             }
                             else {
                                 setInvoiceErrorInfo(tips, MSG_TITLE_DELETE_ERROR);
                             }
                         }
                    );
                    invoice_delete_ajax.invokeServer(invoice_data, 'POST', true); //修改请求方式

                };
            })(title_id);    //响应"删除"响应
        }
    }
    //删除抬头列表ul
    function deleteTitleUl(invoiceInfoType) {
        if (invoiceInfoType == InvoiceInfoType.PaperCompany) {
            if (obj_invoice_title_ul != null) {
                var _parentElement = obj_invoice_title_ul.parentNode;
                if (_parentElement) {
                    _parentElement.removeChild(obj_invoice_title_ul);
                    obj_invoice_title_ul = null;
                }
            }
        }
        else if (invoiceInfoType == InvoiceInfoType.ElectronCompany) {
            if (obj_e_invoice_title_ul != null) {
                var _parentElement = obj_e_invoice_title_ul.parentNode;
                if (_parentElement) {
                    _parentElement.removeChild(obj_e_invoice_title_ul);
                    obj_e_invoice_title_ul = null;
                }
            }
        }
    }

    //获取单位发票缓存中某一条发票信息并设置到页面显示
    function setCompanyInvoiceByID(id, invoiceInfoType) {
        var setFunction = null;
        var invoice_title = null;
        if (invoiceInfoType == InvoiceInfoType.PaperCompany) {
            setFunction = setContentValue;
            invoice_title = obj_invoice_title;
        }
        else if (invoiceInfoType == InvoiceInfoType.ElectronCompany) {
            setFunction = setEContentValue;
            invoice_title = obj_e_invoice_title;
        } else {
            return;
        }
        if (invoice_company_cache[invoiceInfoType]) {
            for (var l = 0; l < invoice_company_cache[invoiceInfoType].length; l++) {
                if (invoice_company_cache[invoiceInfoType][l].id == id) {
                    invoice_title.value = invoice_company_cache[invoiceInfoType][l].invoice_title;
                    setFunction(invoice_company_cache[invoiceInfoType][l].invoice_content, invoice_company_cache[invoiceInfoType][l].invoice_tel
                    		, invoice_company_cache[invoiceInfoType][0].invoice_book_content, invoice_company_cache[invoiceInfoType][0].invoice_nonbook_content);
                    break;
                }
            }
        }
        else {
            var invoice_data_query = new Hashtable();
            invoice_data_query['id'] = id;
            var invoice_query_ajax = new Ajax('/invoice/info');
            invoice_query_ajax.OnSucceed
            (
                   function (result) {
                       if (result != null && result['errorCode'] == 0 && result.invoice != null) {
                           invoice_title.value = result.invoice[0].invoice_title;
                           setFunction(result.invoice[0].invoice_content, result.invoice[0].invoice_tel
                           		, result.invoice[0].invoice_book_content, result.invoice[0].invoice_nonbook_content);
                       }
                   }
           );
            invoice_query_ajax.invokeServer(invoice_data_query, 'POST', true);
        }
    }
    //绑定最近使用的单位发票内容信息
    function bindCompanyInvoice(invoiceInfoType) {
        if (!invoice_company_cache[invoiceInfoType] && !m_is_first_load_company_invoice[invoiceInfoType]) {
            //请求后台返回单位发票信息
            var m_query_invoice_data = new Hashtable();
            m_query_invoice_data['type'] = invoiceInfoType;
            m_query_invoice_data['id'] = 0;

            var invoice_data_ajax = new Ajax('/invoice/info');
            invoice_data_ajax.OnSucceed
                        (
                            function (result) {
                                if (result != null && result['errorCode'] == 0) {
                                    invoice_company_cache[invoiceInfoType] = result.invoice;
                                    setCompanyInvoice(invoiceInfoType);
                                }
                            }
                        );
            invoice_data_ajax.invokeServer(m_query_invoice_data, 'POST', true); //修改请求方式
            m_is_first_load_company_invoice[invoiceInfoType] = true;
        }
        else {
            setCompanyInvoice(invoiceInfoType);
        }
    }
    //获取当前单位发票内容信息并对页面对应控件变量赋值
    function setCompanyInvoice(invoiceInfoType) {
        var radio = null;
        var title = null;
        var setFuntion = null;
        if (invoiceInfoType == InvoiceInfoType.PaperCompany) {
            radio = obj_title_company_radio;
            title = obj_invoice_title;
            setFuntion = setContentValue;
        }
        else if (invoiceInfoType == InvoiceInfoType.ElectronCompany) {
            radio = obj_e_title_company_radio;
            title = obj_e_invoice_title;
            setFuntion = setEContentValue;
        }
        else {
            return;
        }
        if (radio.checked != true)
            radio.checked = true;
        if (!invoice_company_cache[invoiceInfoType]) {
            title.value = "";
            setFuntion("请选择");
        }
        else {
            title.value = invoice_company_cache[invoiceInfoType][0].invoice_title;
            setFuntion(invoice_company_cache[invoiceInfoType][0].invoice_content, invoice_company_cache[invoiceInfoType][0].invoice_tel
               		, invoice_company_cache[invoiceInfoType][0].invoice_book_content, invoice_company_cache[invoiceInfoType][0].invoice_nonbook_content);
        }

    }
    //设置当前发票内容
    function setContentValue(contentInfo) {
        for (var i = 0; i < obj_invoice_content.options.length; i++) {
            if (obj_invoice_content.options[i].value == contentInfo) {
                obj_invoice_content.options[i].selected = true;
                return;
            }
            obj_invoice_content.options[0].selected = true;
        }
    }
    //设置当前增值税专用发票内容
    function setVATContentValue(contentInfo) {
        for (var i = 0; i < obj_ddl_VAT_invoice_content.options.length; i++) {
            if (obj_ddl_VAT_invoice_content.options[i].value == contentInfo) {
                obj_ddl_VAT_invoice_content.options[i].selected = true;
                return;
            }
            obj_ddl_VAT_invoice_content.options[0].selected = true;
        }
    }
    //设置当前电子发票内容
    function setEContentValue(contentInfo, Invoice_tel, invoice_book_content, invoice_nonbook_content) {      
        if(supportElectronShop() && contentInfo){
        	obj_ddl_e_invoice_content.options[0].selected = true;
        	for (var i = 0; i < obj_ddl_e_invoice_content.options.length; i++) {
                if (obj_ddl_e_invoice_content.options[i].value == contentInfo) {
                    obj_ddl_e_invoice_content.options[i].selected = true;
                    break;
                }
            }
        }
        if(supportElectronBook() && invoice_book_content){
        	obj_ddl_e_book_invoice_content.options[0].selected = true;
            for (var i = 0; i < obj_ddl_e_book_invoice_content.options.length; i++) {
                if (obj_ddl_e_book_invoice_content.options[i].value == invoice_book_content) {
                    obj_ddl_e_book_invoice_content.options[i].selected = true;
                    break;
                }
            }      	
        }
        if(supportElectronNonbook() && invoice_nonbook_content){
        	obj_ddl_e_nonbook_invoice_content.options[0].selected = true;
        	for (var i = 0; i < obj_ddl_e_nonbook_invoice_content.options.length; i++) {
                if (obj_ddl_e_nonbook_invoice_content.options[i].value == invoice_nonbook_content) {
                    obj_ddl_e_nonbook_invoice_content.options[i].selected = true;
                    break;
                }
            }	
        }
        if (Invoice_tel) {
            obj_e_invoice_tel.value = ConsigneeCommon.getFormatShipMb(Invoice_tel);
			real_e_invoice_tel = Invoice_tel;
        }
    }
    //绑定最近使用的个人发票信息
    function bindPersonInvoice(invoiceInfoType) {
        if (!invoice_person_cache[invoiceInfoType] && !m_is_first_load_person_invoice[invoiceInfoType]) {
            //请求后台返回单位发票信息
            var m_query_invoice_data = new Hashtable();
            m_query_invoice_data['type'] = invoiceInfoType;
            m_query_invoice_data['id'] = 0;

            var invoice_data_ajax = new Ajax('/invoice/info');
            invoice_data_ajax.OnSucceed
                        (
                            function (result) {
                                if (result != null && result['errorCode'] == 0) {
                                    invoice_person_cache[invoiceInfoType] = result.invoice;
                                    setPersonInvoice(invoiceInfoType);
                                }
                            }
                        );
            invoice_data_ajax.invokeServer(m_query_invoice_data, 'POST', true); //修改请求方式
            m_is_first_load_person_invoice[invoiceInfoType] = true;
        }
        else {
            setPersonInvoice(invoiceInfoType);
        }
    }
    //获取最近个人发票内容信息并对页面控件变量赋值
    function setPersonInvoice(invoiceInfoType) {
        var radio = null;
        var title = null;
        var setFuntion = null;
        if (invoiceInfoType == InvoiceInfoType.PaperPerson) {
            radio = obj_title_person_radio;
            title = obj_invoice_title;
            setFuntion = setContentValue;
        }
        else if (invoiceInfoType == InvoiceInfoType.ElectronPerson) {
            radio = obj_e_title_person_radio;
            title = obj_e_invoice_title;
            setFuntion = setEContentValue;
        }
        else {
            return;
        }

        if (radio.checked != true)
            radio.checked = true;
        title.disabled = true;
        if (invoice_person_cache[invoiceInfoType] == null) {
            setFuntion("请选择");
        }
        else {
            setFuntion(invoice_person_cache[invoiceInfoType][0].invoice_content, invoice_person_cache[invoiceInfoType][0].invoice_tel
            		, invoice_person_cache[invoiceInfoType][0].invoice_book_content, invoice_person_cache[invoiceInfoType][0].invoice_nonbook_content);
        }
    }

    //获取CK库当前用户发票信息
    function getCurInvoiceInfo() {
        if (m_invoice_category == null && m_invoice_content == null && m_invoice_book_content == null && m_invoice_nonbook_content == null && m_invoice_title == null) {//需要请求后台返回当前订单发票信息
            var m_ck_invoice_info = new Hashtable();
            m_ck_invoice_info["order_sequence_id"] = m_data_source["order_sequence_id"];
            var m_ck_invoice_ajax = new Ajax('/invoice/ck');
            m_ck_invoice_ajax.OnSucceed
            (
                function (result) {//得到当前数据库中存储的发票信息
                    if (result != null && result['errorCode'] == 0) {
                        if (result.ck_invoice[0].invoice_category != 0) {
                            m_invoice_category = result.ck_invoice[0].invoice_category;
                            m_invoice_title = result.ck_invoice[0].invoice_title;
                            m_invoice_content = result.ck_invoice[0].invoice_content;
                            m_invoice_tel = result.ck_invoice[0].invoice_tel;
                            m_invoice_book_content = result.ck_invoice[0].invoice_book_content;
                            m_invoice_nonbook_content = result.ck_invoice[0].invoice_nonbook_content;
                        }
                        else {
                            m_invoice_category = InvoiceCategory.NotNeedInvoice;
                            m_invoice_title = "";
                            m_invoice_content = "";
                            m_invoice_tel = "";
                            m_invoice_book_content = "";
                            m_invoice_nonbook_content = "";
                        }
                    }
                }
            );
            m_ck_invoice_ajax.invokeServer(m_ck_invoice_info, 'POST', false); //修改请求方式
        }
    }
    //绑定显示用户最近的发票信息
    function bindCustInvoiceInfo() {
        if (invoice_all_cache == null) {
            var m_query_invoice_data = new Hashtable();
            m_query_invoice_data['id'] = 0;
            if (onlySupportElectron()) {//仅支持电子发票的
                m_query_invoice_data['type'] = InvoiceInfoType.Electron;
            }
            else if (onlySupportPaper()) {//仅支持纸质发票的
                m_query_invoice_data['type'] = InvoiceInfoType.Paper;
            } else if (supportElectron()) {
                m_query_invoice_data['type'] = InvoiceInfoType.Electron;
            } else{
            	m_query_invoice_data['type'] = InvoiceInfoType.All;
            }

            var invoice_query_ajax = new Ajax('/invoice/info');
            invoice_query_ajax.OnSucceed
                (
                    function (result) {
                        if (result != null && result['errorCode'] == 0) {
                            invoice_all_cache = result.invoice;
                            setCommonInvoiceInfo(); //显示用户当前最近一次发票信息
                        }
                        else {
                        }
                    }
                );
            invoice_query_ajax.invokeServer(m_query_invoice_data, 'POST', false); //修改请求方式
        }
        else {
            setCommonInvoiceInfo(); //显示用户当前最近一次发票信息
        }
    }
    function bindPaperInvoiceInfo() {
        if (!invoice_paper_cache) {
            var m_query_invoice_data = new Hashtable();
            m_query_invoice_data['id'] = 0;
            m_query_invoice_data['type'] = InvoiceInfoType.Paper;
            var invoice_query_ajax = new Ajax('/invoice/info');
            invoice_query_ajax.OnSucceed
                (
                    function (result) {
                        if (result != null && result['errorCode'] == 0) {
                            invoice_paper_cache = result.invoice;
                        }
                    }
                );
            invoice_query_ajax.invokeServer(m_query_invoice_data, 'POST', false); //修改请求方式
        }
        showInvoiceDiv(InvoiceCategory.PaperInvoice);
        if (invoice_paper_cache) {
            if (invoice_paper_cache[0].invoice_title == '个人') {
                obj_title_person_radio.checked = true; //由于对应的缓存变量不同不能使用setPersonInvoice
                setContentValue(invoice_paper_cache[0].invoice_content);
                if (obj_invoice_content.value == "") {
                    obj_invoice_content.value = "请选择";
                }
                obj_invoice_title.disabled = true;
            }
            else {
                obj_title_company_radio.checked = true;
                obj_invoice_title.value = invoice_paper_cache[0].invoice_title;
                setContentValue(invoice_paper_cache[0].invoice_content);
                if (obj_invoice_content.value == "") {
                    obj_invoice_content.value = "请选择";
                }
            }
        } else {
            common_invoice_title_close(InvoiceInfoType.PaperCompany);
            obj_invoice_title.disabled = true;
        }
    }

    function bindEInvoiceInfo() {
        if (!invoice_e_cache) {
            var m_query_invoice_data = new Hashtable();
            m_query_invoice_data['id'] = 0;
            if (!supportElectronCompany()) {
                m_query_invoice_data['type'] = InvoiceInfoType.ElectronPerson;
            } else {
                m_query_invoice_data['type'] = InvoiceInfoType.Electron;
            }
            var invoice_query_ajax = new Ajax('/invoice/info');
            invoice_query_ajax.OnSucceed
                (
                    function (result) {
                        if (result != null && result['errorCode'] == 0) {
                            invoice_e_cache = result.invoice;
                        }
                    }
                );
            invoice_query_ajax.invokeServer(m_query_invoice_data, 'POST', false); //修改请求方式
        }
        showInvoiceDiv(InvoiceCategory.ElectronInvoice);
        if (invoice_e_cache) {
            setEContentValue(invoice_e_cache[0].invoice_content, invoice_e_cache[0].invoice_tel
            		, invoice_e_cache[0].invoice_book_content, invoice_e_cache[0].invoice_nonbook_content);
            if (obj_invoice_content.value == "") {
                obj_invoice_content.value = "请选择";
            }
            if (invoice_e_cache[0].invoice_title == '个人') {
                obj_e_title_person_radio.checked = true; //由于对应的缓存变量不同不能使用setPersonInvoice
                obj_e_invoice_title.disabled = true;
            }
            else {
                obj_e_title_company_radio.checked = true;
                obj_e_invoice_title.value = invoice_e_cache[0].invoice_title;

            }
        } else {
            obj_ddl_e_invoice_content.value = "请选择";
        }
    }
    //点击发票抬头部分的radio响应
    function setInvoiceInfo(invoiceInfoType) {
        if (invoiceInfoType == InvoiceInfoType.PaperPerson) {
            removeChild('invoice_title_ul_');
            removeChild('intelligent_title_ul_');
        }
        clearInvoiceTips();
        getCurInvoiceInfo();
        if (m_invoice_category == InvoiceCategory.PaperInvoice && m_invoice_title != '' && m_invoice_content != '') { //ck库记录用户需要发票
            if (m_invoice_title == '个人') {//ck库中记录用户确认使用个人抬头发票
                if (invoiceInfoType == InvoiceInfoType.PaperPerson) { //用户点击个人radio，显示ck记录发票信息
                    obj_title_person_radio.checked = true;
                    obj_invoice_title.disabled = true;

                    for (var i = 0; i < obj_invoice_content.options.length; i++) {
                        if (obj_invoice_content.options[i].value == m_invoice_content) {
                            obj_invoice_content.options[i].selected = true;
                            common_invoice_title_close(InvoiceInfoType.PaperCompany); //关闭常用抬头区域
                            return;
                        }
                        obj_invoice_content.options[0].selected = true; //选中“请选择”
                    }
                } else { //用户点击单位radio，查找最近使用单位发票信息
                    obj_title_company_radio.checked = true;
                    obj_invoice_title.disabled = false;
                    obj_invoice_title.value = '';
                    bindCompanyInvoice(InvoiceInfoType.PaperCompany);
                }
            } else { //ck库中记录用户确认使用了单位发票
                if (invoiceInfoType == InvoiceInfoType.PaperCompany) { //用户点击单位radio，显示ck库发票信息
                    obj_title_company_radio.checked = true;
                    obj_invoice_title.disabled = false;
                    obj_invoice_title.value = m_invoice_title;

                    for (var i = 0; i < obj_invoice_content.options.length; i++) {
                        if (obj_invoice_content.options[i].value == m_invoice_content) {
                            obj_invoice_content.options[i].selected = true;
                            return;
                        }
                        obj_invoice_content.options[0].selected = true;
                    }
                } else { //用户点击个人radio，查找最近个人发票信息
                    obj_title_person_radio.checked = true;
                    obj_invoice_title.disabled = true;
                    bindPersonInvoice(InvoiceInfoType.PaperPerson);
                }
            }
        } else {
            if (obj_title_person_radio.checked == true) {//用户点击个人radio
                obj_invoice_title.disabled = true;
                common_invoice_title_close(InvoiceInfoType.PaperCompany);
                bindPersonInvoice(InvoiceInfoType.PaperPerson);
            } else { //用户点击单位radio
                obj_invoice_title.disabled = false;
                bindCompanyInvoice(InvoiceInfoType.PaperCompany);
            }
        }
    }
    //点击发票抬头部分的radio响应
    function setEInvoiceInfo(invoiceInfoType) {
        if (invoiceInfoType == InvoiceInfoType.ElectronPerson) {
            removeChild('e_invoice_title_ul_');
            removeChild('e_intelligent_title_ul_');
        }
        clearInvoiceTips();
        getCurInvoiceInfo();
        if (m_invoice_category == InvoiceCategory.ElectronInvoice && m_invoice_title != '' && m_invoice_content != ''&& m_invoice_book_content != ''&& m_invoice_nonbook_content != '' && m_invoice_tel != '') { //ck库记录用户需要发票
            if (m_invoice_title == '个人') { //ck库中记录用户确认使用个人抬头发票
                if (invoiceInfoType == InvoiceInfoType.ElectronPerson) { //用户点击个人radio，显示ck记录发票信息
                    obj_e_title_person_radio.checked = true;
                    obj_e_invoice_title.disabled = true;

                    for (var i = 0; i < obj_ddl_e_invoice_content.options.length; i++) {
                        if (obj_ddl_e_invoice_content.options[i].value == m_invoice_content) {
                            obj_ddl_e_invoice_content.options[i].selected = true;
                            common_invoice_title_close(InvoiceInfoType.ElectronCompany); //关闭常用抬头区域
                            return;
                        }
                        obj_ddl_e_invoice_content.options[0].selected = true; //选中“请选择”
                    }
                } else { //用户点击单位radio，查找最近使用单位发票信息
                    obj_e_title_company_radio.checked = true;
                    obj_e_invoice_title.disabled = false;
                    obj_e_invoice_title.value = '';
                    bindCompanyInvoice(InvoiceInfoType.ElectronCompany);
                }
            } else { //ck库中记录用户确认使用了单位发票
                if (invoiceInfoType == InvoiceInfoType.ElectronCompany) { //用户点击单位radio，显示ck库发票信息
                    obj_e_title_company_radio.checked = true;
                    obj_e_invoice_title.disabled = false;
                    obj_e_invoice_title.value = m_invoice_title;

                    for (var i = 0; i < obj_ddl_e_invoice_content.options.length; i++) {
                        if (obj_ddl_e_invoice_content.options[i].value == m_invoice_content) {
                            obj_ddl_e_invoice_content.options[i].selected = true;
                            return;
                        }
                        obj_ddl_e_invoice_content.options[0].selected = true;
                    }
                } else { //用户点击个人radio，查找最近个人发票信息
                    obj_e_title_person_radio.checked = true;
                    obj_e_invoice_title.disabled = true;
                    bindPersonInvoice(InvoiceInfoType.ElectronPerson);
                }
            }
        } else {
            if (obj_e_title_person_radio.checked == true) { //用户点击个人radio
                obj_e_invoice_title.disabled = true;
                common_invoice_title_close(InvoiceInfoType.ElectronCompany);
                bindPersonInvoice(InvoiceInfoType.ElectronPerson);
            } else { //用户点击单位radio
                obj_e_invoice_title.disabled = false;
                bindCompanyInvoice(InvoiceInfoType.ElectronCompany);
            }
        }
    }
    //移除子节点
    function removeChild(id) {
        if ($1(id + m_data_source["order_sequence_id"]) != null) {
            var _parentElement = $1(id + m_data_source["order_sequence_id"]).parentNode;
            if (_parentElement) {
                _parentElement.removeChild($1(id + m_data_source["order_sequence_id"]));
            }
        }
    }
    //点击发票类型部分的radio响应
    function setInvoiceType(invoiceCategory) {
        clearInvoiceTips();
        getCurInvoiceInfo();
        showInvoiceDiv(invoiceCategory);
        if (invoiceCategory == InvoiceCategory.PaperInvoice && supportPaper()) {
            if (m_invoice_category == InvoiceCategory.PaperInvoice && m_invoice_title != '' && m_invoice_content != '') { //ck库记录用户需要发票
                if (m_invoice_title == '个人') { //ck库中记录用户确认使用个人抬头发票
                    obj_title_person_radio.click();
                }
                else {
                    obj_title_company_radio.click();
                }
            }
            else {
                bindPaperInvoiceInfo();
            }
        }
        else if (invoiceCategory == InvoiceCategory.VatInvoice) {

        } else if (invoiceCategory == InvoiceCategory.ElectronInvoice && supportElectron()) {
            if (m_invoice_category == InvoiceCategory.ElectronInvoice && m_invoice_title != '' && m_invoice_tel != '') { //ck库记录用户需要发票
                if (m_invoice_title == '个人' || !supportElectronCompany()) { //ck库中记录用户确认使用个人抬头发票
                    obj_e_title_person_radio.click();
                }
                else {
                    obj_e_title_company_radio.click();
                    obj_e_invoice_title.value = m_invoice_title;
                }
            }
            else {
                bindEInvoiceInfo();
            }
        } else {
            bindCustInvoiceInfo();
        }
    }

    function showInvoiceDiv(invoiceCategory) {
        $h(obj_span_invoice);
        $h(obj_div_invoice_explain);
        $h(obj_div_VAT_invoice);
        $h(obj_div_VAT_invoice_explain);
        $h(obj_div_e_invoice);
    	if (invoiceCategory == InvoiceCategory.ElectronInvoice) {
            obj_rb_e_invoice.checked = true;
            $s(obj_div_e_invoice);
        } else if (invoiceCategory == InvoiceCategory.PaperInvoice) {
            obj_rb_invoice.checked = true;
            $s(obj_span_invoice);
            showPaperInvoiceTip();
        } else if (invoiceCategory == InvoiceCategory.VatInvoice) {
            obj_rb_VAT_invoice.checked = true;
            $s(obj_div_VAT_invoice);
            $s(obj_div_VAT_invoice_explain);
        } else if (supportElectron()) {
            obj_rb_e_invoice.checked = true;
            $s(obj_div_e_invoice);
        } else if (supportPaper()) {
            obj_rb_invoice.checked = true;
            $s(obj_span_invoice);
            showPaperInvoiceTip();
        } else if (supportVat()) {
            obj_rb_VAT_invoice.checked = true;
            $s(obj_div_VAT_invoice);
            $s(obj_div_VAT_invoice_explain);
        }
		//如果是不入库联营，当选择的是电子书发票的时候，隐藏文字描述。
		if(is_has_no_storage_jit_package) {
			if(obj_rb_e_invoice.checked){
				$h(noStorageJit);
			} else {
				$s(noStorageJit);
			}
		} 
    }
    
    var showPaperInvoiceTip = function () {
    	if(m_data_source["shop_id"] == 0){
    		$s(obj_div_invoice_explain);
    	}
    	else{
    		$h(obj_div_invoice_explain);
    	}
    }

    var clearInvoiceTips = function () {
        //隐藏错误提示部分
        obj_span_content_tips.className = "hide";
        obj_span_content_tips.innerHTML = "";
        obj_span_title_tips.className = "hide";
        obj_span_title_tips.innerHTML = "";
        obj_span_invoice_tips.className = "hide";
        obj_span_invoice_tips.innerHTML = "";
        obj_span_VAT_content_tips.className = "hide";
        obj_span_VAT_content_tips.innerHTML = "";
        obj_span_VAT_invoice_tips.className = "hide";
        obj_span_VAT_invoice_tips.innerHTML = "";
        obj_p_e_content_tips.className = "hide";
        obj_p_e_content_tips.innerHTML = "";
        obj_span_e_invoice_tips.className = "hide";
        obj_span_e_invoice_tips.innerHTML = "";
        obj_span_e_content_tips.className = "hide";
        obj_span_e_content_tips.innerHTML = "";
        obj_span_e_book_content_tips.className = "hide";
        obj_span_e_book_content_tips.innerHTML = "";
        obj_span_e_nonbook_content_tips.className = "hide";
        obj_span_e_nonbook_content_tips.innerHTML = "";
        obj_e_invoice_tel_tips.className = "hide";
        obj_e_invoice_tel_tips.innerHTML = "";
        obj_span_e_title_tips.className = "hide";
        obj_span_e_title_tips.innerHTML = "";
    };
    var checkInvoiceTitle = function (invoiceInfoType) {
        if (invoiceInfoType == InvoiceInfoType.PaperCompany) {
            if (obj_title_company_radio.checked != true) {
                obj_title_company_radio.checked = true;
                obj_invoice_title.value = '';
            }
        }
        else if (invoiceInfoType == InvoiceInfoType.ElectronCompany) {
            if (obj_e_title_company_radio.checked != true) {
                obj_e_title_company_radio.checked = true;
                obj_e_invoice_title.value = '';
            }
        }
    };

    this.inherit = function (invoice_data) {
        //需要发票的非电子书订单需要进行发票继承
        if (invoice_data['invoice_title'] != '' && invoice_data['invoice_content'] != '' && invoice_data['invoice_content'] != '请选择') {
            if (supportPaper() && invoice_data['invoice_category'] == InvoiceCategory.PaperInvoice && m_invoice_category == InvoiceCategory.PaperInvoice && m_invoice_title == '' && m_invoice_content == '' && m_data_source['invoice_restrict'] != InvoiceRestrict.Not) {
                //显示当前需要保存的发票信息
                setInvoiceType(InvoiceCategory.PaperInvoice);
                if (invoice_data['invoice_title'] == '个人') {
                    obj_title_person_radio.checked = true;
                    obj_invoice_title.disabled = true;
                }
                else {
                    obj_title_company_radio.checked = true;
                    obj_invoice_title.disabled = false;
                    obj_invoice_title.value = invoice_data['invoice_title'];
                }
                setContentValue(invoice_data['invoice_content']);
                var inherit_data = new Hashtable();
                inherit_data['invoice_category'] = InvoiceCategory.PaperInvoice;
                inherit_data['invoice_title'] = invoice_data['invoice_title'];
                inherit_data['invoice_content'] = invoice_data['invoice_content'];
                inherit_data['order_sequence_id'] = m_data_source['order_sequence_id'];
                inherit_data['inherit_status'] = true;
                save_click = true;
                m_invoice_submit(inherit_data);
            }
        }
    };

    //针对使用了（礼品卡 或 礼券 或 优惠码）并且可支付金额等于0的订单，则重置发票选项为不开具，同时前端应展开并文字提示
    var canInvoicing = function () {
        if (mustNeedInvoice()) {
            return true;
        }
        return !(parseFloat(m_data_source['order_payable_amount']) + parseFloat(m_data_source['cust_cash_used']) <= 0);
    }
    var DoNotPrintPrice = function () {
        return m_data_source['is_gift_package'] && !m_data_source['is_print_price'];
    }

    this.init = function (data_source, from) {
        if (data_source['invoice_restrict'] != InvoiceRestrict.Not) {
            this.setDataSource(data_source);
            if (m_data_source['invoice_edit_status'] || (from && (from == "paymentRefresh" || from == "refreshNoCash") && !canInvoicing())) {
                last_time_is_can_invoice = canInvoicing();
                this.show();
                return;
            }
            if (is_init && last_time_is_can_invoice == canInvoicing() && from && (from == "paymentRefresh" || from == "refreshNoCash")) {
                last_time_is_can_invoice = canInvoicing();
                return;
            }
            if (DoNotPrintPrice() && data_source['invoice_category'] != InvoiceCategory.NotNeedInvoice) {
                last_time_is_not_print_price = DoNotPrintPrice();
                this.show();
                return;
            }
            if (is_init && last_time_is_not_print_price == DoNotPrintPrice() && from && from == "giftPackageRefresh") {
                last_time_is_not_print_price = DoNotPrintPrice();
                return;
            }
            if ((data_source['invoice_category'] == InvoiceCategory.PaperInvoice && data_source['invoice_title'] == '' && data_source['invoice_content'] == '')
                || (data_source['invoice_category'] == InvoiceCategory.VatInvoice && data_source['invoice_content'] == '')) {
                this.show();
            }
            else if (data_source['invoice_category'] == InvoiceCategory.ElectronInvoice && data_source['invoice_title'] == '' 
                && data_source['invoice_content'] == '' && data_source['invoice_book_content'] == '' && data_source['invoice_nonbook_content'] == '') {
                this.show();
            }
            else {
                this.showReadOnly(data_source['invoice_title'], data_source['invoice_content'], data_source['invoice_category'], data_source['invoice_tel']
                	, data_source['invoice_book_content'], data_source['invoice_nonbook_content']);
            }
            last_time_is_can_invoice = canInvoicing();
            last_time_is_not_print_price = DoNotPrintPrice();
            is_init = true;
        }
    }
    var GetInvoiceContentAjaxHashtable = function () {
        var m_post_data = new Hashtable();
        m_post_data['order_sequence_id'] = m_data_source["order_sequence_id"];
        if(m_data_source['order_type'] == 97 && m_data_source['cart_items'].length>0){
        	m_post_data['sk_action_id'] = m_data_source["sk_action_id"];
        	m_post_data['product_ids'] = m_data_source['cart_items'][0]['product_id'];
        }
        else if(m_data_source['order_type'] != 0 && m_data_source['cart_items'].length > 0){
        	m_post_data['product_ids']='';
        	for(var i = 0;i < m_data_source['cart_items'].length;i++){
        		if(i>0){
        			m_post_data['product_ids'] += ',';
        		}
        		m_post_data['product_ids'] += m_data_source['cart_items'][i]['product_id'];
        		m_post_data['product_ids'] += '.';
        		m_post_data['product_ids'] += m_data_source['cart_items'][i]['product_count'];
        	}
        }
        return m_post_data;
    }
}

