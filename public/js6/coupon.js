/*global alert,$,Ajax,StringBuilder,Hashtable,JSPanel,RadioButtonList,JSRepeater, mocks,
couponAndReturnTemplate,invalidCouponTemplate,validCouponTemplate,
couponItemTemplate,couponReturnTemplate,couponReturnItemTemplate,couponReturnSubItemTemplate,
couponNormalLinkTemplate,couponShopLinkTemplate,couponShopProductLinkTemplate*/

/// <reference path="model_101207.js" />
/// <reference path="templates.js" />
/// <reference path="jquery-1.11.1.min.js" />
// coupon.js
// purpose: coupon module for checkout page.
// author: Li Meng
// see: http://twiki.dangdang.com/twiki/bin/view.pl/Tech/CheckoutCoupon
var CouponType = {
    None: 0, // 未使用任何优惠券
    Coupon: 1, // 礼券
    GiftCard: 2, // 礼品卡
    DiscountCode: 4, // 优惠码   
    AreaPrivilegeCode: 8, // 区域促销码
    Point:64,
    CashBalance:256,
    hasFlag: function () {
        for (var i = 1; i < arguments.length; i++) {
            if (+arguments[0] == 0) {
                return false;
            }
            if ((+arguments[0] & +arguments[i]) == +arguments[i]) {
                return true;
            }
        }
        return false;
    }
};
function Coupon(couponContainerID) {

    var self = this;

    // data source
    var dataSource;
    var degradationTypes=0;
    // coupon data
    var couponData = {
        selectedCouponNum: "",
        selectedOrderSequenceId: "",
        coupons: [],
        usedCouponOrders: null,
        hasValidCoupon: false,
        couponReturnItems: [],
        expand: true,
        showDiscountCodeReadonly: false,
        TradePayableAmount:0,//交易单应付款
        couponAmount:0.00,
        custCash: 0.00, //用户总余额
        custCashUsed: 0.00,//交易单使用余额
        custPoint: 0,//积分
        custPointRate:3000,//积分汇率
        custPointAsMoney: 0,//积分可兑换金额
        custPointMaxUsedAsMoney:0,//每次交易最多使用积分金额
        custPointUsed: 0,//使用的积分
        custPointUsedAsMoney:0.00,//使用的积分折合现金
        custGiftCard: 0.00,//礼品卡金额
		custAllCategoryGiftCard:0.00, //当当礼品卡金额
		custBookGiftCard:0.00, //图书专用卡金额
		commonVipBalance:0.00,//1特殊礼品卡金额
        custGiftCardUsed: 0.00,//使用的礼品卡
        custGiftCardUsedCharge: 0.00,//礼品卡收的手续费
        publicCouponNumber: '',//优惠码或区域促销码
        publicCouponAmount: 0.00, //优惠码抵扣金额
        privilegeCodeDiscountAmount:0.00, //区域促销码抵扣金额
        crowdfunding_forbid:"",//crowdfunding
        checkout_type:0,
        enterprises_user:1,  //1:企业用户;0:非企业用户
		isOnlyHaveOverseasOrder:false,   //是否只包含海外购订单
		isHaveOverseasOrder:false,     //包含海外购订单
		giftCardOrderType:1,  //使用礼品卡时用到的订单类型  1-百货，0-图书（包括纸书和电子书），2-百货和图书
		giftCardUseType:0,  //使用的礼品卡类型 0-当当礼品卡，1-图书专用卡，2-当当礼品卡+图书专用卡
		giftCardConfig:[], //礼品卡使用配置
		maybeSupportGiftCardType:[] //可能支持的礼品卡类型
    };
    var appSetting = {
        isSupportPoint:false //是否支持积分
    };
    var cartItemCount = 0; //记录购物车数量用来对比是否需要重新计算礼券
    var hasReadCoupons = false;    // whether read coupons
    //some flags
    var couponFlags = {
        crossOrderFlag: "cross_order", //跨订单的虚拟key
        orderCouponPrefix: "order_coupon_main_",
        couponSelectPrefix: "orderCouponSlt_",
        submitCouponPrefix: "submitCoupon_",
        cancelCouponPrefix: "cancelCoupon_",
        cancelCouponName: "cancelCoupon",
        toggleCouponViewPrefix: "toggleCouponView_",
        usedCouponTitlePrefix: "usedCouponTitle_"
    };
	//礼品卡使用类型
	var giftCardUseType={
		allCategory: 0,  //当当礼品卡
		book:2,  //图书专用卡
		allCategoryAndBook:-1,  //当当礼品卡+图书专用卡
		commonVip:1 //vip礼品卡
	};
	//使用礼品卡使用到的订单类型
	var giftCardOrderType={
		bookOrEbook:0,  //图书、电子书
		baihuo:1, //百货
		bookAndbaihuo:2 //图书和百货
	};
	
    // ajax
    var readCouponsAjax = new Ajax("/coupon/get");
    var bindCouponAjax = new Ajax("/coupon/active");
    var submitCouponAjax = new Ajax("/coupon/use");
    var cancelCouponAjax = new Ajax("/coupon/cancel");
    var submitGiftcardAjax = new Ajax('/giftcard/use_giftcard');
    var cancelGiftcardAjax = new Ajax('/giftcard/cancel');
    var bindGiftcardAjax = new Ajax('/giftcard/active');
    var submitCustCashAjax = new Ajax('/balance/cash_used');
    var cancelCustCashAjax = new Ajax('/balance/cancel');
    var submitCustPointAjax = new Ajax("/point/use_point");
    var cancelCustPointnAjax = new Ajax("/point/cancel");
    
    // templates
    var couponAndReturnBinder = new JSPanel(couponContainerID);
    var couponBinder = new JSRepeater("coupon");
    // var couponReadonlyBinder = new JSPanel("couponReadonlyItem");
    // var couponItems = new RadioButtonList("couponItems");
    var couponReturnBinder = new JSPanel("couponReturn");
    var couponReturnItems = new JSRepeater("couponReturnItems");
    
    // callbacks
    var couponBindCallback;
    var couponSubmitCallback;
    var couponCancelCallback;
    var cashSubmitSuccessCallback;
    var giftcardSubmitSuccessCallback;
    var pointSubmitSuccessCallback;
    // update bindings
    function updateBindings() {
        if (couponData.showBindPopup) {
            if ($("#bindCouponPopup").is(":hidden")) {
                var linkPosition = $("#showBindCoupon").offset();
                var popTop = linkPosition.top - 200;
                $("#bindCouponPopup").offset({ top: popTop }).show();
            }
        } else {
            $("#bindCouponPopup").hide();
        }
        if (couponData.showSubmitPopup) {
            $("#submitCouponPopup").show();
        } else {
            $("#submitCouponPopup").hide();
        }
        if($1("couponBindErrorWrap")!=null){
        $1("couponBindErrorWrap").className = couponData.bindError ? "help-inline help-inline-error help-inline-middle" : "hide";
        }
        if($1("couponBindError")!=null){
        $1("couponBindError").innerHTML = couponData.bindError || "";
        }
        if($1("couponReturn")!=null){
        // show or hide coupon return
        $1("couponReturn").className = couponData.couponReturnItems.length > 0 ? "" : "hide";
        }
        if (couponData.custCashUsed > 0) {
            $("#usedCustCashSummary").show();
        }
        else {
            $("#usedCustCashSummary").hide();
        }
        if (couponData.custCash <=0) {
            $("#custCashBtnArea").hide();
        }
		
		/*//是否显示使用礼品卡输入框
        if (couponData.custGiftCard <= 0) {
            $("#cf_giftcard_detail").hide();
			$("#cf_book_giftcard_detail").hide();
			$("#cf_category_giftcard_detail").hide();
        }else if(couponData.custAllCategoryGiftCard <= 0){
			$("#cf_category_giftcard_detail").hide();
		}else if(couponData.custBookGiftCard <= 0){
			$("#cf_book_giftcard_detail").hide();
		}
		
        if (couponData.custGiftCardUsed > 0) {
			if(conponData.giftCardUseType == giftCardUseType.)
            $("#usedGiftcardSummary").show();
        }
        else {
            $("#usedGiftcardSummary").hide();
        }
		*/
		
        if (appSetting.isSupportPoint) {
            $("#usedPointSummary").parent().show();
            //$("#usedPointSummary").parent().next().show();
            if (couponData.custPointUsed > 0) {
                $("#usedPointSummary").show();
            }
            else {
                $("#usedPointSummary").hide();
            }
            if (couponData.custPointAsMoney <= 0) {
                $("#pointBtnArea").hide();
            }
        }
        else {
            $("#usedPointSummary").parent().hide();
            $("#usedPointSummary").parent().next().hide();
        }

        if (couponData.showDiscountCodeReadonly) {
            $("#iptUseDiscountCode").val("");
        }
        var usedDiscountCodeSummaryContainer = $("#usedDiscountCodeSummary");
        if (couponData.publicCouponNumber) {
            
            if (couponData.publicCouponAmount>0) {
                usedDiscountCodeSummaryContainer.children("span").html("您当前使用优惠码总额减");
                usedDiscountCodeSummaryContainer.children("b").html("￥" + couponData.publicCouponAmount);
            }
            else if(couponData.privilegeCodeDiscountAmount>0)
            {
                usedDiscountCodeSummaryContainer.children("span").html("您当前使用区域促销码总额减");
                usedDiscountCodeSummaryContainer.children("b").html("￥" + couponData.privilegeCodeDiscountAmount);
            }
            $("#cancelDiscountCode").attr("num", couponData.publicCouponNumber);
            usedDiscountCodeSummaryContainer.show().parent().next().hide();
        }
        else {
            usedDiscountCodeSummaryContainer.hide();
        }

    }
    function getProductName(productID) {
        var result = "";
        if (dataSource && dataSource.order_list) {
            dataSource.order_list.each(function (order) {
                if (order.cart_items) {
                    order.cart_items.each(function (item) {
                        if (+item.product_id === +productID) {
                            result = item.product_name;
                        }
                    });
                }
            });
        }
        return result;
    }
    // update coupon link name and template
    function updateCouponLinkNameAndTemplate(couponLinkData) {
        var linkName, linkTemplate, type_id = couponLinkData.type_id; // 礼券小类
        if (type_id === 0) {
            linkName = "自营任意商品";
            linkTemplate = null;
        }
        else if (type_id === 100) {
            linkName = "全场商品";
            linkTemplate = null;
        }
        else if (type_id === 1) {
            linkName = "自营出版物";
            linkTemplate = null;
        } else if (type_id === 2) {
            linkName = "自营百货";
            linkTemplate = null;
        } else if (type_id === 5) {
            linkName = "自营电子书";
            linkTemplate = null;
        } else if (type_id === 3) {
            linkName = "指定商品种类";
            linkTemplate = couponNormalLinkTemplate;
        } else if (type_id === 4) {
            linkName = "指定商品集合";
            linkTemplate = couponNormalLinkTemplate;
        } else if (type_id === 10) {
            linkName = "指定商家集合商品";
            linkTemplate = couponNormalLinkTemplate;
        } else if (type_id === 6) {
            linkName = "指定商家任意商品";
            linkTemplate = couponShopLinkTemplate;
        } else if (type_id === 8) {
            linkName = "指定商家指定商品集合";
            linkTemplate = couponShopProductLinkTemplate;
        } else {
            linkName = "指定商品";
            linkTemplate = couponNormalLinkTemplate;
        }
        //replace combined url if has coupon_url
        linkTemplate = couponLinkData.coupon_url == "" ? linkTemplate : definedCouponProductLinkTemplate;
        couponLinkData.linkName = linkName;
        couponLinkData.linkTemplate = linkTemplate;
    }
    // get coupon link
    function getCouponLink(coupon, isCouponReturn) {
        // get coupon link data
        var couponLinkData = {
            apply_id: isCouponReturn ? coupon.coupon_id : coupon.apply_id,
            type_id: isCouponReturn ? (+coupon.coupon_type) : (+coupon.type==0 && +coupon.medium_scope_id == 6 ? 100 : (+coupon.medium_scope_id)),
            shop_id: coupon.shop_id,
            coupon_url: coupon.coupon_url || ""
        }, min_price = isCouponReturn ? (+coupon.coupon_limit) : (+coupon.min_price);
        updateCouponLinkNameAndTemplate(couponLinkData);

        var couponLink = "";
        if (!couponLinkData.linkTemplate) {
            couponLink = couponLinkData.linkName;
        } else {
            couponLink = new StringBuilder().appendFormat(couponLinkData.linkTemplate, couponLinkData).toString();
        }
        if (min_price !== 0) {
            couponLink += "满" + min_price + "元";
        }
        return couponLink;
    }
    // get coupons
    function getCoupons(coupons) {
        var result = [], i;
        for (i = 0; i < coupons.length; i += 1) {
            var coupon = coupons[i];
            if (coupon.valid_for_order) {
                try {
                    var info = coupon.valid_for_order.split("|");
                    var ids = info[0].replace("order_ids:", "");
                    if (ids) {
                        coupon.orders = ids.split(",");
                    }
                    //是否能使用到不能直接使用到的订单上
                    coupon.is_cross_order = (+info[1].replace("is_cross_order:", "")) === 1;
                } catch (e) {

                }

            }

            coupon.coupon_link = getCouponLink(coupon, false);
            coupon.coupon_disable_class = coupon.is_current_valid ? "" : "p-disabled";
            coupon.coupon_disable = coupon.is_current_valid ? "" : "disabled = 'disabled'";
            result.push(coupon);
        }
        // sort by is_current_valid
        result.sort(function (a, b) {
            return b.is_current_valid - a.is_current_valid;
        });
        return result;
    }
    //get coupons by order
    function getCouponsByOrder(coupons) {
        var orders = {};
        for (var i = 0; i < coupons.length; i++) {
            var item = coupons[i];
            //跨多个订单
            if (item.is_cross_order) {
                if (!orders[couponFlags.crossOrderFlag]) {
                    orders[couponFlags.crossOrderFlag] = [];
                }
                orders[couponFlags.crossOrderFlag].push(item);
            }
            if (item.orders && item.orders.length > 0) {
                for (var j = 0; j < item.orders.length; j++) {
                    var id = item.orders[j];
                    if (!orders[id]) {
                        orders[id] = [];
                    }
                    orders[id].push(item);
                }
            }
        }
        //转换成数组形式
        var arr = [];
        for (var key in orders) {
            var obj = {};
            obj.order_sequence_id = key;
			if(couponData.usedCouponOrders[key]){
				obj.sortNum = key == couponFlags.crossOrderFlag ? 10000 : couponData.usedCouponOrders[key].sortNum;
			}
            obj.title = key == couponFlags.crossOrderFlag ? "多张订单可合并使用的礼券" : "订单" + obj.sortNum;
            obj.coupons = orders[key];
            arr.push(obj);
        }
        //只有一个订单不显示序号列
        if (arr.length == 1) {
            arr[0].title = "订单";
        }
        arr.sort(function (a, b) {
            return a.sortNum - b.sortNum;
        });
        return arr;
    }
    // get coupon return sub items
    function getCouponReturnSubItems(coupons, shop_id) {
        var result = [], i;
        for (i = 0; i < coupons.length; i += 1) {
            var coupon = coupons[i];
            coupon.shop_id = shop_id;
            coupon.coupon_link = getCouponLink(coupon, true);
            result.push(coupon);
        }
        return result;
    }
    // get coupon return items
    function getCouponReturnItems(promotions) {
        // promotion_type = 8 || 22;
        // promotion type see http://twiki.dangdang.com/twiki/bin/view.pl/Tech/20100205cartckdict#促销类型
        var result = [], itemIndex = 0, i;
        if (!promotions) {
            return result;
        }
        for (i = 0; i < promotions.length; i += 1) {
            var promotion = promotions[i];
            if ((+promotion.promotion_type) === 8 || (+promotion.promotion_type) === 22) {
                var coupon_amt = promotion.coupon_info ? promotion.coupon_info.coupon_amt : promotion.coupon_amt,
                    coupon_count = (promotion.coupon_info ? promotion.coupon_info.coupon_count : promotion.coupon_count) || 1;

                // coupon item
                var couponReturnItem = {
                    product_name: getProductName(promotion.product_id),
                    coupon_amt: coupon_amt * coupon_count,
                    description: promotion.collection_promotion_desc,
                    item_index: itemIndex,
                    subItems: []
                };
                // sub coupon items
                var couponInfo = null;
                if (promotion.coupon_info && promotion.coupon_info.result) {
                    couponInfo = promotion.coupon_info.result;
                } else if (promotion.result) {
                    couponInfo = promotion.result;
                }
                if (couponInfo) {
                    couponReturnItem.subItems = getCouponReturnSubItems(couponInfo.coupons || [], couponInfo.shop_id);
                }

                itemIndex += 1;
                result.push(couponReturnItem);
            }
        }
        return result;
    }
    // get coupon by number
    function getCouponByNumber(coupons, couponNumber) {
        var i;
        for (i = 0; i < coupons.length; i += 1) {
            if (coupons[i].coupon_num === couponNumber) {
                return coupons[i];
            }
        }
        return null;
    }
    //parse per order used coupon
    function getCouponOrderMap(orderList) {
        var map = {};
        if (!orderList) {
            return map;
        }
        var couponUsedTime = {};
        for (var i = 0; i < orderList.length; i++) {
            var num = orderList[i].coupon_number;
            var isUsedCoupon =CouponType.hasFlag(+orderList[i].coupon_type,CouponType.Coupon);
            map[orderList[i].order_sequence_id] = {
                couponNum: isUsedCoupon ? num : "",
                usedMoney: isUsedCoupon ? orderList[i].coupon_amount : 0,
                sortNum: +orderList[i].sort_num
            };
            if (num) {
                couponUsedTime[num] = (couponUsedTime[num] || 0) + 1;
            }
        }
        //计算礼券被使用次数
        for (var key in map) {
            map[key].times = couponUsedTime[map[key].couponNum] || 0;
        }

        return map;
    }
    //get remain money Of coupon by number
    function getRemainCouponMoney(couponNum) {
        var coupon = getCouponByNumber(couponData.coupons, couponNum);
        if (coupon == null) {
            return 0;
        }
        var usedMoney = 0;
        for (var key in couponData.usedCouponOrders) {
            if (couponData.usedCouponOrders[key].couponNum == couponNum) {
                usedMoney += couponData.usedCouponOrders[key].usedMoney;
            }
        }
        return coupon.money - usedMoney;
    }


    // bind coupon return sub items
    function bindCouponReturnSubItems(couponReturnItem) {
        var containerID = "couponReturnSubItems" + couponReturnItem.item_index;
        var couponReturnSubItems = new JSRepeater(containerID);
        couponReturnSubItems.ItemTemplate = couponReturnSubItemTemplate;
        couponReturnSubItems.DataSource = couponReturnItem.subItems;
        couponReturnSubItems.DataBind();
    }
    // bind coupon return items
    function bindCouponReturnItems() {
        couponReturnItems.ItemTemplate = couponReturnItemTemplate;
        couponReturnItems.DataSource = couponData.couponReturnItems;
        couponReturnItems.DataBind();

        var i;
        for (i = 0; i < couponData.couponReturnItems.length; i += 1) {
            bindCouponReturnSubItems(couponData.couponReturnItems[i]);
        }
    }

    // bind read only template if has order of used coupon
    function refreshCouponView() {
        if (+couponData.couponAmount > 0) {
            $("#usedCouponSummary").show();
        }
        else {
            $("#usedCouponSummary").hide();
        }
        if (!couponData.hasValidCoupon || !couponData.usedCouponOrders) { return; }
        var crossOrderReadonlyHtml = "";
        var crossOrderCoupons = "";
        var maybeUsedCouponOrderKeys = []; //没有使用礼券的订单编号
        for (var key in couponData.usedCouponOrders) {
            if (!couponData.usedCouponOrders.hasOwnProperty(key)) { continue; }
            var couponNum = couponData.usedCouponOrders[key].couponNum;
            var usedTimes = couponData.usedCouponOrders[key].times;
            var isUsedCoupon = couponNum != null && couponNum != "";
            var desc = "";
            //处理跨订单使用显示
            if (isUsedCoupon) {
                var coupon = getCouponByNumber(couponData.coupons, couponNum);
                desc = "购买" + getCouponLink(coupon, false) + "可用（有效期至" + coupon.end_date + "）";
                if (crossOrderCoupons.indexOf(couponNum) < 0 && usedTimes > 1) {
                    crossOrderCoupons += couponNum + ",";
                    crossOrderReadonlyHtml += (new StringBuilder()).appendFormat(crossOrderCouponReadonlyTemplate, { "coupon_desc": desc, "coupon_num": couponNum }).toString();
                }
            }
            //处理单个订单显示
            var couponSelect = $("#" + couponFlags.couponSelectPrefix + key);
            var usedCouponTitle = $("#" + couponFlags.usedCouponTitlePrefix + key);
            if (couponSelect.length < 1) { continue; }
            
            usedCouponTitle.html(desc);
            if (isUsedCoupon) {
                couponSelect.hide().siblings("a[name='submitCoupon']").hide();
                usedCouponTitle.show().siblings("a[name='cancelCoupon']").attr("num", couponNum).show();
            }
            else {
                maybeUsedCouponOrderKeys.push(key);
                couponSelect.show().siblings("a[name='submitCoupon']").show();
                usedCouponTitle.hide().siblings("a[name='cancelCoupon']").attr("num", couponNum).hide();
            }
        }
        var crossOrderSelectIpt = $("#" + couponFlags.couponSelectPrefix + couponFlags.crossOrderFlag);
        if (crossOrderSelectIpt.length > 0) {
            if (crossOrderReadonlyHtml != "") {
                crossOrderSelectIpt.hide();
                $("#" + couponFlags.submitCouponPrefix + couponFlags.crossOrderFlag).hide();
            }
            else {
                crossOrderSelectIpt.show();
                $("#" + couponFlags.submitCouponPrefix + couponFlags.crossOrderFlag).show();
                maybeUsedCouponOrderKeys.push(couponFlags.crossOrderFlag);
            }
            //样式特殊处理
            crossOrderSelectIpt.before("<br/><p class=\"pt-5\"></p>");
            $("#" + couponFlags.usedCouponTitlePrefix + couponFlags.crossOrderFlag).html(crossOrderReadonlyHtml);
        }

        for (var k = 0; k < maybeUsedCouponOrderKeys.length; k++) {
            var orderKey = maybeUsedCouponOrderKeys[k];
            var selectIpt = $("#" + couponFlags.couponSelectPrefix + orderKey);
            if (selectIpt.length<1) { continue; }
            var couponInputs = selectIpt[0].options;
            var count = couponInputs.length;
            var hideCount = 0;
            //显示可用的礼券,禁用不可用礼券
            for (var i = 0; i < count; i++) {
                var remainMoney = getRemainCouponMoney(couponInputs[i].value);
                couponInputs[i].disabled = remainMoney > 0 ? false : true;
                hideCount += remainMoney > 0 ? 0 : 1;
            }
            //没有可用礼券则隐藏这个订单区域
            if (hideCount == count) {
                selectIpt.parent().hide();
            }
            else {
                selectIpt.parent().show();
            }
        }
        //如果没有使用礼券则默认展开第一个订单的礼券列表
        if (!CouponType.hasFlag(+dataSource.coupon_type, CouponType.Coupon)) {
            var alinks = document.getElementsByName("toggleCouponView");
            if (alinks.length > 0) {
                alinks[0].click();
            }
        }

    }

    // bind coupon template
    function bindTemplate() {
        // bind coupon and return container
        couponAndReturnBinder.Template = couponAndReturnTemplate;
        couponAndReturnBinder.DataSource = couponData;
        couponAndReturnBinder.DataBind();

        // bind coupon
        couponBinder.ItemTemplate = validCouponItemTemplate;
        couponBinder.FooterTemplate = validCouponFooterTemplate;
        couponBinder.DataSource = getCouponsByOrder(couponData.coupons)||[];
        couponBinder.onItemDataBind = function (source, parent) {
            //绑定子模板
            var rp = new JSRepeater();
            rp.DataSource = source.coupons;
            rp.ItemTemplate = couponItemTemplate;
            parent.ItemTemplate = parent.ItemTemplate.replace("{sub_coupon_item}", rp.GetJSRHTML());
        };
        couponBinder.DataBind();

        // bind coupon return
        couponReturnBinder.Template = couponReturnTemplate;
        couponReturnBinder.DataSource = couponData;
        couponReturnBinder.DataBind();
        bindCouponReturnItems();
      
    }
    // show bind error
    // error code see http://twiki.dangdang.com/twiki/bin/view.pl/Tech/CouponWebService
    function showBindError(error_code) {
        var code = +error_code;
        if (code === 107) {
            couponData.bindError = "请填写正确的密码";
        } else {
            couponData.bindError = "请填写正确的卡号";
        }
    }
    // clear bind error
    function clearBindError() {
        couponData.bindError = "";
    }
    // show bind popup
    function showBindPopup(isShow) {
        //updateBindings(true);
        clearBindError();
        couponData.showBindPopup = isShow;
        //couponData.userName = "";
        //couponData.password = "";
        updateBindings(false);
    }
    // show submit popup
    function showSubmitPopup(isShow) {
        couponData.showSubmitPopup = isShow;
        updateBindings();
    }
    function addCouponReturnPopupEvents() {
        function getShowCouponReturnPopupFunction(items, item_index, isShow) {
            return function () {
                for (var i = 0; i < items.length; i += 1) {
                    var popupElement = $1("couponReturnSubItemsPopup" + i);
                    if (isShow && i === item_index) {
                        popupElement.className = "";
                    } else {
                        popupElement.className = "hide";
                    }
                }
            };
        }
        var items = couponData.couponReturnItems;
        for (var i = 0; i < items.length; i += 1) {
            var item = items[i];

            if (item.subItems && item.subItems.length > 0) {
                $1("showCouponReturnSubItemsPopup" + item.item_index).onclick =
                    getShowCouponReturnPopupFunction(items, item.item_index, true);

                $1("closeCouponReturnSubItemsPopup" + item.item_index).onclick =
                    getShowCouponReturnPopupFunction(items, item.item_index, false);
            }
        }
    }
    function bindCoupon() {
        var userName = $1("couponUserName").value;
        var password = $1("couponPassword").value;
        clearBindError();

        if (!userName) {
            couponData.bindError = "请填写正确的卡号";
            updateBindings(false);
            return;
        }
        if (!password) {
            couponData.bindError = "请填写正确的密码";
            updateBindings(false);
            return;
        }

        var postData = new Hashtable();
        postData.coupon_number = encodeURIComponent(userName);
        postData.coupon_pwd = encodeURIComponent(password);

        bindCouponAjax.OnSucceed(function (result) {
            if ((+result.error_code) !== 0) {
                if (+result.error_code === 121) {
                    alert("激活失败，请重试");
                    return;
                }
                showBindError(+result.error_code);
            } else {
                // re-show all coupons
                hasReadCoupons = false;
                self.show();
                couponData.showBindPopup = false;

                if (couponBindCallback) {
                    couponBindCallback(result);
                }
            }
            updateBindings(false);
        });
        bindCouponAjax.invokeServer(postData, "POST", false);
    }
    
    //#region coupon
    function submitCoupon(showPopup, couponNum, orderSequenceId) {
        if (!couponNum) {
            alert("请选择礼券");
            return;
        }
        couponData.selectedCouponNum = couponNum;
        couponData.selectedOrderSequenceId = orderSequenceId;
        //如果之前使用礼品卡则弹出提示
        //礼品卡、礼券同时使用该弹框不需要了
        /*if (showPopup && CouponType.hasFlag(+couponData.coupon_type, CouponType.GiftCard)) {
            showSubmitPopup(true);
            updateBindings();
            return;
        }*/
        var postData = new Hashtable();
        postData.coupon_number = couponNum;
        postData.order_sequence_id = orderSequenceId || "";
       submitCouponAjax.OnSucceed(function (result) {
            if ((+result.error_code) !== 0) {
                alert("礼券使用失败，请重试");
            } else {
                self.setDataSource(result);
                //couponData.showReadonly = true;
                couponData.showSubmitPopup = false;
                couponData.showBindPopup = false;

                //refreshCouponView();回调刷新
                updateBindings();

                if (couponSubmitCallback) {
                    couponSubmitCallback(result);
                }
            }
            updateBindings();
        });
       submitCouponAjax.invokeServer(postData, "POST", false);
    }
    function cancelCoupon(couponNum) {
        //updateBindings(true);
      cancelCouponAjax.OnSucceed(function (result) {
            if ((+result.error_code) !== 0) {
                alert("取消失败，请重试");
            } else {
                self.setDataSource(result);
                updateBindings();
                if (couponCancelCallback) {
                    couponCancelCallback(result);
                }
            }
            // couponData.showReadonly = false;

        });
        var postData = new Hashtable();
        postData.coupon_number = couponNum || "";
        cancelCouponAjax.invokeServer(postData, "POST", false);
      
    }
    //#endregion
    
    //#region user cash

    function submitCustCash(eventSourceElement) {
        var inputCash = +$("#iptUseCustCash").val();
        if (isNaN(inputCash)|| inputCash < 0 || inputCash > (+couponData.custCash) || inputCash < 0.01) {
            showErroTipBehindElement(eventSourceElement, "请填写正确的金额");
            return;
        }
        //if (inputCash > couponData.TradePayableAmount) {
        //    showErroTipBehindElement(eventSourceElement, "不能超过支付总金额");
        //    return;
        //}
        hideErroTipBehindElement(eventSourceElement);
        var cashPostData = new Hashtable();
        cashPostData['cust_cash_used'] = inputCash;
        submitCustCashAjax.OnSucceed
        (
                function (result) {
                    if (result != null && result['error_code'] == 0) {
                        //回调方法刷新了整个非现金区域
                        if (cashSubmitSuccessCallback) {
                            cashSubmitSuccessCallback(result);
                        }
                    }
                    else {
                        showErroTipBehindElement(eventSourceElement, "使用余额失败");
                    }
                }
        );
        submitCustCashAjax.invokeServer(cashPostData, 'POST', true);

    }

    function cancelCustCash(eventSourceElement) {
        hideErroTipBehindElement(eventSourceElement);
        var cashPostData = new Hashtable();
        cashPostData['method'] = 'cancel_cash';
        cancelCustCashAjax.OnSucceed(
            function(result) {
                if (result != null && result['error_code'] == 0) {
                    //回调方法刷新了整个非现金区域
                    if (cashSubmitSuccessCallback) {
                        cashSubmitSuccessCallback(result);
                    }
                }
                else {
                    showErroTipBehindElement(eventSourceElement, "取消余额失败");
                }
            }
        );
        cancelCustCashAjax.invokeServer(cashPostData, 'POST', true);
    }

    //#endregion
    
    //#region giftcard
    /**
      * 互斥礼品卡提交
      */
    function submitGiftcardHC(eventSourceElement) {
    	var useType= $("#giftCardType").val();
    	submitGiftcard(eventSourceElement,useType);
    }
    function submitGiftcard(eventSourceElement,useType) {
		var inputCash = 0;
		var custGiftCardAmount = 0;
		if(couponData.giftCardOrderType == giftCardOrderType.bookOrEbook){
			useType=giftCardUseType.allCategoryAndBook;
			inputCash = +$("#iptCategoryUseGiftCard").val();
			custGiftCardAmount = couponData.custGiftCard;
		}else{
			inputCash = +$("#giftCardTypeVal").val();
			if(useType == giftCardUseType.allCategory){
				custGiftCardAmount = couponData.custAllCategoryGiftCard;
			}else if(useType == giftCardUseType.book){
				custGiftCardAmount = couponData.custBookGiftCard;
			}else if(useType == giftCardUseType.commonVip){
				custGiftCardAmount = couponData.commonVipBalance;
			}
		}
		
        if (isNaN(inputCash)|| inputCash < 0 || inputCash > (+custGiftCardAmount) || inputCash < 0.01) {
            showErroTipBehindElement(eventSourceElement, "请填写正确的金额");
            return;
        }
        hideErroTipBehindElement(eventSourceElement);
        var isShowPop = CouponType.hasFlag(couponData.coupon_type,CouponType.DiscountCode);
        if (isShowPop) {
           /* //弹框 使用礼品卡，礼券/优惠码将会失效，同时支付金额将发生变化，您确定使用礼品卡吗？
        	var popView = $("#submitCouponPopup");
            //定位弹框
            var position = getposOffset_c(this);
            var left = (position[0] - 340) || 0;
            var top = (position[1] - 120) || 0;
            
            
            var p = $("#categoryGiftCardName");
            var offset = p.offset();
            
            popView.css("left", offset.left-100 + "px");
            popView.css("top", offset.top-100 + "px"); 
            popView.removeClass('hide');
            popView.show();
            return;*/
        }
        var postData = new Hashtable();
        postData['dangdang_money_payable'] = inputCash;
        postData['method'] = 'use_giftcard';
		postData['gift_card_use_type'] = useType
        submitGiftcardAjax.OnSucceed
        (
                function (result) {
                    if (result != null && result['error_code'] == 0) {
                        //回调方法刷新了整个非现金区域
                        if (giftcardSubmitSuccessCallback) {
                            giftcardSubmitSuccessCallback(result);
                        }
                    }
                    else {
                    	if(result['error_code'] == 30311){
                    		showErroTipBehindElement(eventSourceElement, result["errorMessage"]||"此店铺不支持礼品卡支付");
                    	}else{
                    		showErroTipBehindElement(eventSourceElement, result["errorMessage"]||"使用礼品卡失败");
                    	}
                        
                    }
                }
        );
        submitGiftcardAjax.invokeServer(postData, 'POST', true);

    }

    function cancelGiftcard(eventSourceElement,cancelType) {
        hideErroTipBehindElement(eventSourceElement);
        var postData = new Hashtable();
        postData['method'] = 'cancel_giftcard';
		postData['gift_card_use_type'] = cancelType;
        cancelGiftcardAjax.OnSucceed(
            function (result) {
                if (result != null && result['error_code'] == 0) {
                    //回调方法刷新了整个非现金区域
                    if (giftcardSubmitSuccessCallback) {
                        giftcardSubmitSuccessCallback(result);
                    }
                }
                else {
                    showErroTipBehindElement(eventSourceElement, "取消礼品卡失败");
                }
            }
        );
        cancelGiftcardAjax.invokeServer(postData, 'POST', true);
    }
	
	
    
    /**
     * 不支持礼品卡类型
     */
    function notSupportGiftCardType(){
    	var result= "当当礼品卡,图书专用卡,全品类卡,";
    	var typs = couponData.maybeSupportGiftCardType;
    	
		for(var i=0;i< typs.length;i++){
			var item = typs[i];
			if(item ==giftCardUseType.allCategory){
				result = result.replace("当当礼品卡,",";");
			}else if(item ==giftCardUseType.book){
				result = result.replace("图书专用卡,",";");
			}else if(item ==giftCardUseType.commonVip){
				result = result.replace("全品类卡,",";");
			}
		}
		return result.substring(0,result.lastIndexOf(';')); 
    }
	
	/**
	 * 获取不支持礼品卡的商家列表
	 * @returns {String}
	 */
	function getGiftCardConfig(){
		var config = couponData.giftCardConfig;
		var tips="";
		if(config !=null){
			for(var i=0;i< config.length;i++){
				var item = config[i];
				if(item.support == false){
					if(i == 0){
						tips=item.shop_name+"商家";
					}else{
						tips=tips+","+item.shop_name+"商家";
					}
				}
			}
		}
		return tips;
	}
	//初始化使用礼品卡后，礼品卡区域的展示样式
	function displayUsedGiftCardArea(){
		$("#usedGiftcardSummary").show();
		$("#cf_giftcard_detail").hide();
		//如果是图百混合订单，则根据使用的礼品卡类型，把另一种礼品卡使用框置灰
		if(couponData.giftCardOrderType == giftCardOrderType.bookAndbaihuo){
			if(couponData.giftCardUseType == giftCardUseType.allCategory){
				 $("#cf_category_giftcard_detail").hide();
				 $("#cf_book_giftcard_detail").show();
				 $("#iptUseBookGiftCard").addClass("no_click");
				 $("#iptUseBookGiftCard").attr("readonly",true);
				 $("#submitBookGiftCard").hide();
				 showErroTipBehindElement($("#bookGiftCartBtnArea"), "您的订单不能同时使用两种礼品卡");
			}else if(couponData.giftCardUseType == giftCardUseType.book){
				 $("#cf_book_giftcard_detail").hide();
				 $("#cf_category_giftcard_detail").show();
				 $("#iptCategoryUseGiftCard").addClass("no_click");
				 $("#iptCategoryUseGiftCard").attr("readonly",true);
				 $("#submitCategoryGiftCard").hide();
				 showErroTipBehindElement($("#categoryGiftCardBtnArea"), "您的订单不能同时使用两种礼品卡");
			}
		}else{
			$("#cf_category_giftcard_detail").hide();
			$("#cf_book_giftcard_detail").hide();
		}
	}
	//初始化用户没有使用礼品卡，礼品卡区域的展示样式
	function displayNotUsedGiftCardArea(){
		//如果订单中中只有百货商品,且用户当当礼品卡有金额，则显示当当礼品卡使用输入框
		if(couponData.giftCardOrderType == giftCardOrderType.baihuo && couponData.custAllCategoryGiftCard > 0){
			$("#cf_category_giftcard_detail").show();
		}else if(couponData.giftCardOrderType == giftCardOrderType.bookOrEbook && couponData.custGiftCard > 0)
		{
			//如果订单中只有出版物商品,且用户当当礼品卡金额+图书专用卡金额大于0，显示一个的礼品卡使用输入框
			$("#cf_giftcard_detail").show();
		}else if(couponData.giftCardOrderType == giftCardOrderType.bookAndbaihuo)
		{
			//订单中图书和百货都有,当当礼品卡和图书专用卡哪个有钱，则显示哪个输入框
			if(couponData.custAllCategoryGiftCard > 0){
				$("#cf_category_giftcard_detail").show();
			}
			if(couponData.custBookGiftCard > 0){
				$("#cf_book_giftcard_detail").show();
			}
		}
	}
    //#endregion
    
    //#region active new giftcard
   function bindGiftCard(eventSourceElement) {
        var number = $("#iptGiftCardNum").val();
        var pwd = $("#iptGiftCardPassword").val();
        if (!number) {
            showErroTipBehindElement(eventSourceElement, '请填写正确的卡号');
            return;
        }
        if (!pwd) {
            showErroTipBehindElement(eventSourceElement, '请填写正确的密码');
            return;
        }
        hideErroTipBehindElement(eventSourceElement);
        var postData = new Hashtable();
        postData['giftcard_number'] = number;
        postData['giftcard_pwd'] = pwd;
        postData['method'] = 'active_giftcard';
       bindGiftcardAjax.OnSucceed(
           function(result) {
               if (result != null && result['error_code'] == 0) {
                   $("#bindGiftcard").hide();
                 //回调方法刷新了整个非现金区域
                   if (giftcardSubmitSuccessCallback) {
                       giftcardSubmitSuccessCallback(result);
                   }
               }
               else {
                   showErroTipBehindElement(eventSourceElement, "激活礼品卡失败");
               }
           }
       );
       bindGiftcardAjax.invokeServer(postData, 'POST', true);
    }
   
   /**
    * 显示礼品卡余额区域
    */
	   function displayGiftCardBalance() {
		   
		 
		if (couponData.custAllCategoryGiftCard > 0
				|| couponData.custBookGiftCard > 0
				|| couponData.commonVipBalance > 0) {
			if (couponData.commonVipBalance > 0) {
				$("#commonVipGiftCard").show();
			}
			if (couponData.custAllCategoryGiftCard > 0) {
				if (couponData.commonVipBalance > 0) {
					$("#splitFlagAfterVipCard").show();
				}
				$("#categoryGiftCard").show();
			}
			if (couponData.custBookGiftCard > 0) {
				if (couponData.custAllCategoryGiftCard > 0
						|| couponData.commonVipBalance > 0) {
					$("#splitFlagAfterAllCategory").show();
				}
				$("#bookGiftCard").show();
			}
			if ((couponData.custAllCategoryGiftCard > 0 || couponData.custBookGiftCard > 0)
					&& isAllNotSupportGiftCard()) {
				$("#bookGiftCardNotUseHint").show();
			}
			$("#giftCardAmountArea").show();
		}
		
		
		if(couponData.giftCardOrderType == giftCardOrderType.baihuo ){
			if (couponData.custBookGiftCard > 0) {
			    $("#bookGiftCardNotUseHint").show();
			    $("#orderNotSupportTips").html("您订单中的商品不支持使用图书专用卡");
			}
		}
	}
	
   
	/**
	 * 初始化礼品卡类型区域
	 */
	function initGiftCardType(){
		showActiveGiftCardArea();
		displayGiftCardBalance();
		initNotSupportGiftCardTips();
		initGiftCardOperArea();
	}
	
	
	/**
	 * 显示礼品卡使用金额区域
	 */
	function showUsedGiftCardArea(){
		if (couponData.custGiftCardUsed > 0) {
			var type = couponData.giftCardUseType;
			if(type == giftCardUseType.commonVip){
				$("#custGiftCardUsedDetail").html('全品类卡支付订单');
			} else if (type == giftCardUseType.allCategory){
				$("#custGiftCardUsedDetail").html('当当礼品卡支付订单');
			} else if (type == giftCardUseType.allCategoryAndBook){
				$("#custGiftCardUsedDetail").html('礼品卡支付订单');
			} else if (type == giftCardUseType.book){
				$("#custGiftCardUsedDetail").html('图书专用卡支付订单');
			}
			
			$("#usedGiftcardSummary").show();
			$("#cf_giftcard_detail").hide();
		}else{
			$("#usedGiftcardSummary").hide();
		}
	}
	
	/**
	 * 显示激活礼品卡
	 */
	function showActiveGiftCardArea(){
		$("#giftCartActiveArea").show();
	}
	/**
	 * 是否全部商家不支持礼品卡
	 * 
	 * @return {Boolean}
	 */
	function isAllNotSupportGiftCard() {
		if (!couponData.giftCardConfig) {
			return false;
		}
		for (var i = 0; i < couponData.giftCardConfig.length; i++) {
			if (couponData.giftCardConfig[i].support) {
				return false;
			}
		}
		return true;
	}
	/**
	 * 初始化不支持礼品卡提示文案
	 */
	function initNotSupportGiftCardTips(){
		var tips= getGiftCardConfig();
		if(tips !="" && !isAllNotSupportGiftCard()){
			$("#giftCardNotSupport").show();
		}
	}
	
	/**
	 * 初始化礼品卡操作区域
	 */
	function initGiftCardOperArea(){
		if(couponData.giftCardOrderType == giftCardOrderType.bookAndbaihuo 
				|| couponData.giftCardOrderType == giftCardOrderType.baihuo){
		    
		    	var total = (+couponData.commonVipBalance) + (+couponData.custBookGiftCard) + (+couponData.custAllCategoryGiftCard);
			if(total<= 0){
			    $("#cf_select").hide();
			    return ;
			}
			
			//下拉礼品卡类型
			var selObj = $("#giftCardType");
			selObj.html("");
			var typs = couponData.maybeSupportGiftCardType;
			if(typs.length == 0){
				$("#cf_select").hide();
				return;
			}
			$("#cf_select").show();//全品类卡
			
			for(var i=0;i< typs.length;i++){
				var item = typs[i];
				
				if(item ==giftCardUseType.allCategory){
					text ="当当礼品卡";
				}else if(item ==giftCardUseType.book){
					text ="图书专用卡";
				}else if(item ==giftCardUseType.commonVip){
					text ="全品类卡";
				}
				selObj.append("<option value='"+item+"'>"+text+"</option>");
			}
		}else{
			var total = (+couponData.commonVipBalance) + (+couponData.custBookGiftCard) + (+couponData.custAllCategoryGiftCard);
			if(total<= 0){
				$("#cf_category_giftcard_detail").hide();
				return ;
			}
			
			var allShopNotSupport = isAllNotSupportGiftCard();
			if(allShopNotSupport){
				if(couponData.commonVipBalance > 0){
					$("#giftCardInputTips").html("您可以使用全品类卡");
					$("#cf_category_giftcard_detail").show();
				}
			}else{
				if(couponData.commonVipBalance > 0  && couponData.custBookGiftCard <= 0 && couponData.custAllCategoryGiftCard <= 0){
					$("#giftCardInputTips").html("您可以使用全品类卡");
				}else if (couponData.custAllCategoryGiftCard > 0  && couponData.custBookGiftCard <= 0 && couponData.commonVipBalance <= 0){
					$("#giftCardInputTips").html("您可以使用当当礼品卡");
				}else if (couponData.custBookGiftCard > 0  && couponData.custAllCategoryGiftCard <= 0 && couponData.commonVipBalance <= 0){
					$("#giftCardInputTips").html("您可以使用图书专用卡");
				}else if (couponData.custBookGiftCard > 0  && couponData.custAllCategoryGiftCard > 0 && couponData.commonVipBalance > 0){
					$("#giftCardInputTips").html("您可以使用礼品卡");
				}
				$("#cf_category_giftcard_detail").show();
			}
		}
	}

    //#endregion

    //#region discount code or area promotion code
    function submitDiscountCode(eventSourceElement) {
        var postData = new Hashtable();
        postData["coupon_number"] = $("#iptUseDiscountCode").val().toUpperCase();
        if (postData["coupon_number"].length < 1) {
            showErroTipBehindElement(eventSourceElement, "抱歉，请输入优惠码");
            return;
        }
        if (postData["coupon_number"] == couponData.publicCouponNumber) {
            showErroTipBehindElement(eventSourceElement, "您的订单已享受该优惠");
            return;
        }
        postData["method"] = 'use_coupon';
        submitCouponAjax.OnSucceed(function (result) {
            if ((+result.error_code) !== 0) {
                if (!result.errorMessage||result.error_code==30106) {
                    result.errorMessage = "抱歉，您输入的优惠码有误";
                }
                showErroTipBehindElement(eventSourceElement, result.errorMessage);

            } else {
                couponData.showDiscountCodeReadonly = true;
                //show coupon list and display readonly discount area
               self.setDataSource(result);
                updateBindings();
                //hide coupon used amount
                if (couponSubmitCallback) {
                    couponSubmitCallback(result);
                }

            }
        });
        submitCouponAjax.invokeServer(postData, "POST", false);
    }
   
    //#endregion
    
    //#region point
    function submitCustPoint(eventSourceElement) {
        var amount = +$("#iptUsePoint").val();
        var errorInfo = '';
        if (isNaN(amount) || amount<=0) {
            errorInfo = "请填写正确的金额";
        }
        /*else if (amount > ((+couponData.TradePayableAmount)+(+couponData.custPointUsedAsMoney))) {
            errorInfo = "不能超过支付总金额";
        }*/
        else if (amount >couponData.custPointMaxUsedAsMoney) {
            errorInfo = "亲，输入金额超限了";
        }
        else if (amount.toString().indexOf(".") > -1 && (amount.toString().split("."))[1].length > 1) {
            errorInfo = "亲，只能精确到角（一位小数）";
        }
        if (errorInfo) {
            showErroTipBehindElement(eventSourceElement, errorInfo);
            return;
        }
        hideErroTipBehindElement(eventSourceElement);
        var postData = new Hashtable();
        postData["point_deduction_amount"] = amount;
        submitCustPointAjax.OnSucceed(function (result) {
            if ((+result.error_code) !== 0) {
                    showErroTipBehindElement(eventSourceElement, "使用积分失败");
            } else {
                if (pointSubmitSuccessCallback) {
                    pointSubmitSuccessCallback(result);
                }
            }
        });
        submitCustPointAjax.invokeServer(postData, "POST", true);
    }
    function cancelCustPoint(eventSourceElement) {
        var postData = new Hashtable();
        cancelCustPointnAjax.OnSucceed(function (result) {
            if ((+result.error_code) !== 0) {
                showErroTipBehindElement(eventSourceElement, "取消积分使用失败");
            } else {
                if (pointSubmitSuccessCallback) {
                    pointSubmitSuccessCallback(result);
                }
            }
        });
        cancelCustPointnAjax.invokeServer(postData, "POST", true);
    }
   
    //#endregion
    
    //#region common method
    var tipHtml = "<span class=\"help-inline help-inline-error help-inline-large error\"><span class=\"icon icon-warn\"></span><span></span></span>";
    function showErroTipBehindElement(eventElement,errorText) {
        if (!eventElement) {
            return;
        }
        var $tip = $(eventElement).next(".error");
        if ($tip.length < 1) {
            $tip = $(tipHtml);
            $(eventElement).after($tip);
        }
        $tip.show().children().last().text(errorText);
    }
    function hideErroTipBehindElement(eventElement) {
        if (!eventElement) {
            return;
        }
        $(eventElement).next(".error").hide();
    }
    //#endregion
    // events
    function addEvents() {
    
        // show bind pop up
        $1("showBindCoupon").onclick = function () {
            showBindPopup(true);
        };
        // cancel bind pop up
        $1("closeBindCoupon").onclick = function () {
            showBindPopup(false);
        };
        // bind coupon
        $1("bindCoupon").onclick = function () {
            bindCoupon();
        };
        // cancel submit pop up
        $1("closeSubmitCoupon").onclick = $1("cancelSubmitCoupon").onclick = function () {
            showSubmitPopup(false);
        };
        // submit coupon
        $("#submitCoupon").click(function () {
            submitCoupon(false, couponData.selectedCouponNum, couponData.selectedOrderSequenceId);
        });

        $1("couponUserName").onfocus = $1("couponPassword").onfocus = function () {
            couponData.bindError = "";
            updateBindings();
        };
        $1("couponUserName").onkeyup = $1("couponPassword").onkeyup = function (event) {
            event = event || window.event;
            var keyCode = event.keyCode || event.which;
            if (keyCode === 13) {
                $1("bindCoupon").click();
            }
        };
        // show and hide coupon return popup
        addCouponReturnPopupEvents();
        // submit coupon  event
        $("#coupon a[name='submitCoupon']").click(function () {
            var selectCouponNum = $("#" + $(this).attr("valueid")).val();
            var orderSequenceId = $(this).attr("orderid");
            if (!selectCouponNum || !orderSequenceId) {
                return;
            }
            //交易单之前使用过礼品卡则提示
            var isShowPop = CouponType.hasFlag(couponData.coupon_type, CouponType.GiftCard);
            if (isShowPop) {
                var popView = $("#submitCouponPopup");
                //定位弹框
                var position = getposOffset_c(this);
                var left = (position[0] - 340) || 0;
                var top = (position[1] - 120) || 0;
                popView.css("left", left + "px");
                popView.css("top", top + "px");
            }
            submitCoupon(isShowPop, selectCouponNum, orderSequenceId == couponFlags.crossOrderFlag ? "" : orderSequenceId);
        });
        //cancel coupon event
        //$("#div_coupon").on("click", "a[name='cancelCoupon']", function () {
        //    var usedCouponNum = $(this).attr("num");
        //    cancelCoupon(usedCouponNum);
        //});
        //alert($("#div_coupon a[name='cancelCoupon']"));
        $("#div_coupon a[name='cancelCoupon']").unbind('click').bind('click',function () {
            var usedCouponNum = $(this).attr("num");
            cancelCoupon(usedCouponNum);
        });
        // expand and collapse area
        $("#expandCash,#expandGiftcard,#expandPoint,#expandDiscountCode,#expandCoupon").click(function () {
            //优惠码区域使用后不可展开
            if ($(this).attr("id") == "expandDiscountCode" && $("#usedDiscountCodeSummary").is(":visible")) {
                return;
            }
            if ($(this).attr("id") == "expandDiscountCode" && couponData.custGiftCardUsed > 0) {
            	return;
            }
            
            var isUsedDiscountCode = CouponType.hasFlag(couponData.coupon_type, CouponType.DiscountCode);
            if ($(this).attr("id") == "expandGiftcard" && isUsedDiscountCode ) {
            	return;
            }
            
            if ($(this).hasClass("up")) {
				if($(this).attr("id") == "expandGiftcard"){
					$(this).removeClass("up");
					$("#giftCardAmountArea").hide();
					$("#giftCardNotSupport").hide();
					$("#cf_category_giftcard_detail").hide();
					$("#cf_book_giftcard_detail").hide();
					$("#cf_giftcard_detail").hide();
					$("#giftCartActiveArea").hide();
					$("#usedGiftcardSummary").hide();
					
					$("#cf_select").hide();//vip
				}else{
					$(this).removeClass("up").parent().next().hide();
				}
            }
            else {
				//如果是展开礼品卡选项
				if($(this).attr("id") == "expandGiftcard"){
					$(this).addClass("up");
					//根据用户使用的礼品卡金额，判断是否要显示使用礼品卡的提示信息以及取消使用按钮,和使用礼品卡输入框
					if (couponData.custGiftCardUsed > 0) {
						showUsedGiftCardArea();
						showActiveGiftCardArea();
					}else{
						initGiftCardType();
					}
				}else{
					$(this).addClass("up").parent().next().show();
				}
                
            }
        });
       //默认全部折叠，礼品卡例外，如果用户使用了礼品卡，则礼品卡区域要展开
        $("#expandCash,#expandGiftcard,#expandPoint,#expandDiscountCode,#expandCoupon").each(function(){
			if($(this).attr("id") == "expandGiftcard"){
				if(couponData.custGiftCardUsed > 0){
					$(this).addClass("up");
					showUsedGiftCardArea();
				}else{
					$(this).removeClass("up");
					$("#giftCardAmountArea").hide();
					$("#giftCardNotSupport").hide();
					//$("#cf_giftcard_detail").hide();
					//$("#cf_book_giftcard_detail").hide();
					$("#cf_category_giftcard_detail").hide();
					$("#giftCartActiveArea").hide();
					$("#usedGiftcardSummary").hide();
					$("#cf_select").hide();//vip
				}
			}else{
				$(this).removeClass("up").parent().next().hide();
			}
            
        });
        
        //众筹
        forbid_somes_functions(couponData);
        
        $("#cancelCustCash").click(function () {cancelCustCash(this); });
        $("#submitCash").click(function () { submitCustCash(this); });
        
        //$("#submitGiftCard").click(function () { submitGiftcard(this,giftCardUseType.allCategoryAndBook); });
		//$("#submitBookGiftCard").click(function () { submitGiftcard(this,giftCardUseType.book); });
		
        
        $("#submitGiftCardType").click(function () { submitGiftcardHC(this,giftCardUseType.book); });
		$("#submitCategoryGiftCard").click(function () { submitGiftcard(this,giftCardUseType.allCategory); });
        
		$("#cancelGiftCard").click(function () { cancelGiftcard(this,couponData.giftCardUseType); });
        $("#submitPoint").click(function () { submitCustPoint(this); });
        $("#cancelPoint").click(function () { cancelCustPoint(this); });
        $("#submitDiscountCode").click(function () {submitDiscountCode(this);});
        $("#cancelDiscountCode").click(function () { cancelCoupon($(this).attr("num")); });
        
        //active a new giftcard
        $("#activeNewGiftcard").click(function () {
            var linkPosition = $(this).offset();
            var popTop = linkPosition.top - 200;
            $("#bindGiftcard").offset({ top: popTop }).show();
            hideErroTipBehindElement(this);
        });
        $("#closeBindGiftCard").click(function () {
            $("#bindGiftcard").hide();
        });
        $("#btnBindGiftCard").click(function() {
            bindGiftCard(this);
        });
        
        //point rate tips
        $("#pointRateTip").hover(
            function() {
                $(this).children().show();
            },
            function() {
                $(this).children().hide();
            }
        );
		$("#categoryGiftCardName").hover(
			function() {
				$("#giftCartNameHint").attr("class","remind_info");
				$("#giftCartNameHint").html("当当礼品卡不支海外购、当当礼品卡、图书专用卡及部分商家商品使用，具体请详见单品页面标识");
				$("#giftCartNameHint").show();
			},
			function() {
				$("#giftCartNameHint").hide();
			}
		);
		
		
		$("#giftCardNotSupportDetail").hover(
				function() {
					var tips= getGiftCardConfig();
					if(tips !=""){
						$("#giftCardNotSupportTips").attr("class","remind_info remind_info2");
						$("#giftCardNotSupportTips").html("您的订单中&nbsp;"+tips+"&nbsp;不支持使用当当礼品卡和图书专用卡，给您购物造成的不便，深表歉意。<i class=\"tips_arrow\"></i>");
						$("#giftCardNotSupportTips").show();
					}
				},
				function() {
					$("#giftCardNotSupportTips").hide();
				}
			);
		
		$("#bookGiftCardName").hover(
			function() {
				$("#giftCartNameHint").attr("class","remind_info_book");
				$("#giftCartNameHint").html("图书专用卡仅支持购买自营及部分商家图书类商品（包含电子书）");
				$("#giftCartNameHint").show();
			},
			function() {
				$("#giftCartNameHint").hide();
			}
		);
		
		$("#commonVipName").hover(
				function() {
					$("#giftCartNameHint").attr("class","remind_info remind_info_all");
					$("#giftCartNameHint").html("全品类卡为2016年8月24日之前出售的部分礼品卡，使用范围为全场通用（除1号店、当当礼品卡、海外购商品外），全品类卡已经于2016年8月23日停止出售。");
					$("#giftCartNameHint").show();
				},
				function() {
					$("#giftCartNameHint").hide();
				}
			);
    }
    
    
    function forbid_somes_functions(result){
    	if(result['checkout_type']==6){
    		var crowdfunding_forbid=result['crowdfunding_forbid'];
            var arr = crowdfunding_forbid.split(',');
            for(i=0;i<arr.length ;i++){
            	var v=arr[i];
            	if(v=='1'){
            		$('#cf_coupon_title').hide();
                	$('#coupon').hide();
            	}else if(v=='2'){
            		$('#cf_giftcard').hide();
            	}else if(v=='4'||v=='8'){
            		$('#cf_discount_code_title').hide();
                	$('#cf_discount_code_detail').hide();
            	}
            }
    	}else if(result['checkout_type']==7){
    		$('#usedCustCashSummary').hide();
    		$('#cf_pay_title').hide();
    		
    		$('#cf_giftcard').hide();
    		//$('#cf_discount_code_title').hide();
        	//$('#cf_discount_code_detail').hide();
        	//$('#cf_coupon_title').hide();
        	//$('#coupon').hide();
        	
        	
        	$('#expandPoint').hide();
        	$('#cf_point_title').hide();
        	$('#cf_point_pay_title').hide();
        	$('#cf_point_pay_detail').hide();
        	$('#usedPointSummary').hide();
        	
    	}else if(result['checkout_type']==8||result['checkout_type']==9){
    		$('#usedCustCashSummary').hide();
    		$('#cf_pay_title').hide();
    		
    		$('#cf_giftcard').hide();
    		$('#cf_discount_code_title').hide();
        	$('#cf_discount_code_detail').hide();
        	$('#cf_coupon_title').hide();
        	$('#coupon').hide();
        	
        	
        	$('#expandPoint').hide();
        	$('#cf_point_title').hide();
        	$('#cf_point_pay_title').hide();
        	$('#cf_point_pay_detail').hide();
        	$('#usedPointSummary').hide();
    	}else if(result['isOnlyHaveOverseasOrder']){
			//$('#usedCustCashSummary').hide();
    		//$('#cf_pay_title').hide();
    		//$('#cf_giftcard').hide();
    		//$('#cf_discount_code_title').hide();
        	//$('#cf_discount_code_detail').hide();
        	//$('#cf_coupon_title').hide();
        	//$('#coupon').hide();
        	//$('#expandPoint').hide();
        	//$('#cf_point_title').hide();
        	//$('#cf_point_pay_title').hide();
        	//$('#cf_point_pay_detail').hide();
        	//$('#usedPointSummary').hide();
		}
		
    	if(result['enterprises_user']==1){
    		//$('#cf_pay_title').hide();//余额
    		//$('#usedCustCashSummary').hide();//余额
    		//$('#cf_giftcard').hide();//礼品卡
    		$('#cf_discount_code_title').hide();//优惠码
        	$('#cf_discount_code_detail').hide();//优惠码
        	$('#cf_coupon_title').hide();//礼券
        	$('#coupon').hide();//礼券
        	$('#coupons').hide();//礼券
        	$('#couponc').hide();//礼券
        	$('#expandPoint').hide();
        	$('#cf_point_title').hide();//积分
        	$('#cf_point_pay_title').hide();//积分
        	$('#cf_point_pay_detail').hide();//积分
        	$('#usedPointSummary').hide();//积分
    	}
		if(CouponType.hasFlag(degradationTypes,CouponType.CashBalance)){
			$('#expandCash').hide();
			$('#expandCash').after("<a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</a>");
			$('#cashwenan').append("<font color=\"#FF2832\">&nbsp;&nbsp;&nbsp;&nbsp;此功能暂不可用</font>");
    }
		if(CouponType.hasFlag(degradationTypes,CouponType.GiftCard)){
			$('#expandGiftcard').hide();
			$('#expandGiftcard').after("<a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</a>");
			$('#giftCardwenan').append("<font color=\"#FF2832\">&nbsp;&nbsp;&nbsp;&nbsp;此功能暂不可用</font>");
		}
		if(CouponType.hasFlag(degradationTypes,CouponType.Point)){
			$('#expandPoint').hide();
			$('#expandPoint').after("<a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</a>");
			$('#cf_point_title').append("<font color=\"#FF2832\">&nbsp;&nbsp;&nbsp;&nbsp;此功能暂不可用</font>");
		}
		if(CouponType.hasFlag(degradationTypes,CouponType.Coupon)){
			$('#expandCoupon').hide();
			$('#expandCoupon').after("<a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</a>");
			$('#wenan').append("<font color=\"#FF2832\">&nbsp;&nbsp;&nbsp;&nbsp;此功能暂不可用</font>");
		}
		if (dataSource['special_giftcard_dispaly_flag'] == 0) {
		    $('#cf_giftcard').hide();
		}
    }
    
    function show1111wenan(isShow,checkout_type) {
    	if(couponData.enterprises_user == 0){
			if(isShow && degradationTypes==0){
				if(checkout_type==8||checkout_type==9){
					//EnergySaving DepositPresale disabled
				}else if(checkout_type==6){
            		$('#cf_coupon_title').hide();
                	$('#coupon').hide();
            		$('#cf_giftcard').hide();
            		$('#cf_discount_code_title').hide();
                	$('#cf_discount_code_detail').hide();
				}else{
					$('#expandCoupon').click();
				}
			}else if(!isShow && !CouponType.hasFlag(degradationTypes,CouponType.Coupon)){
				//if(checkout_type==7){
				//	
				//}else{
					$('#wenan').append("<font color=\"#FF2832\">&nbsp;&nbsp;&nbsp;&nbsp;此订单暂无可用的礼券</font>"); 
				//}
			}
			//交易单中含有招商海外购订单和其他普通订单，混合购买时，需要显示提示文字
			 //if(couponData.isHaveOverseasOrder && !couponData.isOnlyHaveOverseasOrder){
			//	 $("#shop_overseas_nocashpay_tip").show();
			 //}
         }
    }
    
    // read coupons
    function readCoupons() {
        readCouponsAjax.OnSucceed(function (result) {
            if ((+result.error_code) === 0) {
                //updateBindings(true);
                couponData.coupons = getCoupons(result.coupons);
                for (var i = 0; i < couponData.coupons.length; i++) {
                    if (couponData.coupons[i].is_current_valid) {
                        couponData.hasValidCoupon = true;
                        break;
                    }
                }
            }
            else if((+result.error_code) === 11111){
            	//礼券获取被降级了
            	//如果使用了礼券需要取消
            	var tempDegradationTypes = degradationTypes;
            	for (var key in couponData.usedCouponOrders) {
                    if (couponData.usedCouponOrders[key].couponNum!="") {
                    	cancelCoupon(couponData.usedCouponOrders[key].couponNum);
                    }
                }
            	if(!CouponType.hasFlag(tempDegradationTypes,CouponType.Coupon)){
            		degradationTypes = tempDegradationTypes | 1;
            	}
            }
			//else if((+result.error_code) === 1){
				
			//}
            // refresh view
            bindTemplate();
            addEvents();
            show1111wenan(couponData.hasValidCoupon,couponData.checkout_type);
            updateBindings(false);
            refreshCouponView();
        });
        readCouponsAjax.invokeServer("", "POST", true, false);
    }
	
    // set data source
    self.setDataSource = function (source) {
        dataSource = source;
        hasReadCoupons = cartItemCount == +source.cart_items_count;
        cartItemCount = +source.cart_items_count;
        couponData.coupon_type = +source.coupon_type;
        couponData.showDiscountCodeReadonly = CouponType.hasFlag(+source.coupon_type, CouponType.AreaPrivilegeCode, CouponType.DiscountCode);
        couponData.couponReturnItems = getCouponReturnItems(source.colletion_promo_info);
        couponData.TradePayableAmount = +source.payable_amount;
        //如果是礼券则解析订单已经使用的礼券
        couponData.usedCouponOrders = getCouponOrderMap(source.order_list);
        couponData.couponAmount = CouponType.hasFlag(source.coupon_type, CouponType.Coupon) ? formatFloat(source.coupon_amount) : "0.00";//使用的礼券;
        couponData.custCash = formatFloat(source.cust_cash); 
        couponData.custCashUsed = formatFloat(source.cust_cash_used);
        couponData.custPoint = +source.cust_point;//积分
        couponData.custPointRate = +source.point_rate;
        couponData.custPointAsMoney = +source.point_amount;
        couponData.custPointMaxUsedAsMoney = +source.point_max_amonut;
        couponData.custPointUsed = +source.cust_point_used;//使用的积分
        couponData.custPointUsedAsMoney = formatFloat(source.point_deduction_amount);//使用的积分折合现金
        couponData.custGiftCard = formatFloat(source.gift_card_balance);//礼品卡金额
		couponData.custAllCategoryGiftCard = formatFloat(source.gift_card_all_category);  //当当礼品卡金额
		couponData.custBookGiftCard = formatFloat(source.gift_card_book_balance); //图书专用卡金额
        couponData.custGiftCardUsed =formatFloat(source.gift_card_money_used);//使用的礼品卡
        couponData.custGiftCardUsedCharge = formatFloat(source.gift_card_charge);//礼品卡收的手续费
        couponData.publicCouponNumber=source.public_coupon_number;//优惠码或区域促销码
        couponData.publicCouponAmount=CouponType.hasFlag(+source.coupon_type, CouponType.DiscountCode)?formatFloat(source.coupon_amount):"0.00"; //优惠码抵扣金额
        couponData.privilegeCodeDiscountAmount = formatFloat(source.privilege_code_discount_amount); //区域促销码
        couponData.crowdfunding_forbid=source.crowdfunding_forbid;
        couponData.checkout_type=source.checkout_type;
        couponData.enterprises_user=source.enterprises_user?1:0;//企业用户
		couponData.isOnlyHaveOverseasOrder=source.is_only_have_overseas_order;  //交易单仅包含海外购订单
		couponData.isHaveOverseasOrder=source.is_overseas;    //交易单含有海外购订单
        appSetting.isSupportPoint = source.app_setting.is_support_point==true;
        degradationTypes = source.degradation_type;
		couponData.giftCardOrderType = source.gift_card_order_type;
		couponData.giftCardUseType = source.gift_card_use_type;
		couponData.giftCardConfig = source.gift_card_config;
		couponData.maybeSupportGiftCardType = source.maybe_support_gift_card_type;
		couponData.commonVipBalance = formatFloat(source.common_vip_balance);
    };
    // set coupon bind callback
    self.setCouponBindSubmit = function (fnCallback) {
        couponBindCallback = fnCallback;
    };
    // set coupon submit callback
    self.setCouponSubmit = function (fnCallback) {
        couponSubmitCallback = fnCallback;
    };
    // set coupon cancel callback
    self.setCouponCancel = function (fnCallback) {
        couponCancelCallback = fnCallback;
    };
    self.setCashSubmitSuccessCallback = function (fnCallback) {
        cashSubmitSuccessCallback = fnCallback;
    };
    self.setGiftcardSubmitSuccessCallback = function (fnCallback) {
        giftcardSubmitSuccessCallback = fnCallback;
    };
    self.setPointSubmitSuccessCallback = function(fnCallback) {
        pointSubmitSuccessCallback = fnCallback;
    };
    // show coupons
    self.show = function () {
        // if not read coupons, read all coupons first
        if (!hasReadCoupons) {
            hasReadCoupons = true;
            readCoupons();
            return;
        }
        bindTemplate();
        addEvents();
        show1111wenan(couponData.hasValidCoupon,couponData.checkout_type);
        updateBindings(false);
        refreshCouponView();
    
    };
}