/*global window,document,alert,$,Ajax,Hashtable,JSPanel,JSRepeater,StringBuilder,nTruncate,
cartItemsTemplate,cartItemHeaderTemplate,cartItemTemplate,cartSubItemTemplate,
cartItemErrorLack,cartItemErrorExchangeLack,cartItemErrorGiftLack,cartItemErrorGiftParentLack,
cartItemErrorExchangeParentLack,cartItemErrorUnsupportShipment,cartItemErrorUnsupportPayment,
cartItemErrorPartialLack,cartItemErrorRegionLack,cartItemErrorSetLack,cartItemErrorMaxLimit,
cartItemErrorVipMaxLimit,cartItemErrorMinLimit,cartItemErrorCollectionGiftError,cartItemErrorSelfExceptionError,
productNameTemplate,setProductNameTemplate,cartItemErrorTimeoutError*/
//虚拟捆绑品报缺时，没有做对子品报缺模板的判断，以为如果报缺，主品和虚拟子品同时报缺了，这时只报缺主品就ok，子品没有做判断
/// <reference path="model_101207.js" />
/// <reference path="templates.js" />

// cartItems.js
// purpose: cart items module for checkout page.
// author: Li Meng
// see: http://twiki.dangdang.com/twiki/bin/view.pl/Tech/CheckoutProductList
// notes:
// 1.套餐 promotion_type = 225 || 226
// 2.满额赠 promotion_type = 201, product_type = 1 || 2
// 3.商品报缺时，VIP限购不使用promotion_id作为判断条件，因为商品可能属于多个VIP限购
// 4.当主品和赠品存在不同订单上，要将赠品独立显示出来
// 5.订单级赠品(promotionType=12)，从order_gift_dic中获取，并且商品信息不在cart_items中

function CartItems(cartItemsContainerID) {
    var self = this;

    // data source
    var dataSource;
    // cart items data
    var cartItemsData;
    // whether show error in cart item
    var showError = true;
    var lack_prods = "";
    var giftPackageStatus = false;
    // ajax
    var deleteCartItemAjax = new Ajax("/cartitem/remove");

    // callbacks
    var deleteCartItemCallback;
    var changeConsigneeCallback;
    var changeShipmentCallback;
    var changePaymentCallback;

    // templates
    var cartItems = new JSRepeater(cartItemsContainerID);

    function getSubItemByDeleteKey(deleteKey) {
        var result;
        cartItemsData.items.each(function (item) {
            item.subItems.each(function (subItem) {
                if (subItem.deleteKey === deleteKey) {
                    result = subItem;
                }
            });
        });
        return result;
    }
    function getSubItemsByError(error, byPromotion, isLimitBuyPord) {
        var result = [],
            productID = error.product_id,
            promotion_id = error.promotion_id || 0,
            parent_product_id = error.parent_product_id || 0;
        if (isLimitBuyPord) {
            promotion_id = error.hash_promotion_id;
        }
        cartItemsData.items.each(function (item) {
            item.subItems.each(function (subItem) {
                if (+subItem.product_id === +productID
                        && (!byPromotion || +subItem.promotion_id === +promotion_id)
						&& (+subItem.parent_product_id === +parent_product_id)) {
                        //&& (!parent_product_id || +subItem.parent_product_id === +parent_product_id)) {
                    result.push(subItem);
                }
            });
        });
        // * if mismatch by promotion, get error item without promotion. (this is an exception handler)
        if (byPromotion && result.length === 0) {
            result = getSubItemsByError(error, false);
        }
        return result;
    }
	
	function getCartItemByProductID(productID, parentProductID) {
        var result;
        dataSource.cart_items.each(function (cartItem) {
            if (+cartItem.product_id === +productID &&
                    (!parentProductID || +cartItem.parent_product_id === +parentProductID)) {
                result = cartItem;
            }
        });
        return result;
    }
	
	
    
    function getCartItemByPromotionId(productID, promotionId) {
        var result;
        dataSource.cart_items.each(function (cartItem) {
            if (+cartItem.product_id === +productID &&
                    (+cartItem.promotion_id === +promotionId)) {
                result = cartItem;
            }
        });
        return result;
    }

    function getSetDeleteKeys(promotionID) {
        var keys = "", items = cartItemsData.items;
        items.each(function (item) {
            item.subItems.each(function (subItem) {
                if (+subItem.promotion_id === +promotionID) {
                    if (subItem.deleteKey) {
                        if (keys) {
                            keys += ",";
                        }
                        keys += subItem.deleteKey;
                    }
                }
            });
        });
        return { keys: keys};
    }
    function internalDeleteCartItem(product_keys) {
        var postData = new Hashtable();
        postData.product_keys = product_keys;
        //postData.product_counts = product_counts;
        postData.is_uncheck_operation = false;
       // postData.order_sequence_id = dataSource.order_sequence_id;

        deleteCartItemAjax.OnSucceed(function (result) {
            if ((+result.error_code) === 0) {
                if (deleteCartItemCallback) {
                    deleteCartItemCallback(result);
                    change_car_count(CKCookie.getCookie("cart_items_count"));
                }
            } else if ((+result.error_code) === 10102) {
                location.replace(result.shoppingCartUrl);
            }
            else {
                alert("删除商品失败");
            }
        });
        deleteCartItemAjax.invokeServer(postData, "POST", true);
    }
    function internalUncheckCartItem(product_keys) {
        var postData = new Hashtable();
        postData.product_keys = product_keys;
        //postData.product_counts = product_counts;
        postData.is_uncheck_operation = true;
        //postData.order_sequence_id = dataSource.order_sequence_id;

        deleteCartItemAjax.OnSucceed(function (result) {
            if ((+result.error_code) === 0) {
                if (deleteCartItemCallback) {
                    deleteCartItemCallback(result);
                }
            } else if ((+result.error_code) === 10102) {
                location.replace(result.shoppingCartUrl);
            }
            else {
                alert("无法将商品放回购物车");
            }
        });
        deleteCartItemAjax.invokeServer(postData, "POST", true);
    }

    // data-click functions
    var functions = {
        addFavorite: function (deleteKey) {
            functions.deleteCartItem(deleteKey);
        },
        deleteSet: function (deleteKey) {
            var subItem = getSubItemByDeleteKey(deleteKey);
            if (!subItem) {
                alert("商品不存在");
                return;
            }
            // get set keys and counts
            var result = getSetDeleteKeys(subItem.promotion_id);
            internalDeleteCartItem(result.keys);
        },
        deleteCartItem: function (deleteKey) {
            var subItem = getSubItemByDeleteKey(deleteKey);
            if (!subItem) {
                alert("商品不存在");
                return;
            }
            internalDeleteCartItem(subItem.deleteKey);
        },
        deleteCartItemMore: function (deleteKey) {
            var subItem = getSubItemByDeleteKey(deleteKey);
            if (!subItem) {
                alert("商品不存在");
                return;
            }
            lack_prods = lack_prods + "," + subItem.parent_product_id + "_" + subItem.product_id;
            if (lack_prods.substring(0, 1) == ",") {
                lack_prods = lack_prods.substring(1, lack_prods.length);
            }
            subItem.errorClassName = "hide";
            updateErrorStatus();
            bindTemplate();
        },
        uncheckCartItem: function (deleteKey) {
			if(dataSource.baby_in_book_order){
				window.open("http://babyinbook.dangdang.com/preview/"+dataSource.baby_in_book_id);
				return;
			}
            var subItem = getSubItemByDeleteKey(deleteKey);
            if (!subItem) {
                alert("商品不存在");
                return;
            }
            internalUncheckCartItem(subItem.deleteKey);
        },
        changeConsignee: function () {
            if (changeConsigneeCallback) {
                changeConsigneeCallback(dataSource.order_sequence_id);
            }
        },
        changeShipment: function () {
            if (changeShipmentCallback) {
                changeShipmentCallback(dataSource.order_sequence_id);
            }
        },
        changePayment: function () {
            if (changePaymentCallback) {
                changePaymentCallback(dataSource.order_sequence_id);
            }
        }
    };
    function bindDataClickFunction(element, functionName, parameters) {
        var i;
        for (i = 0; i < parameters.length; i += 1) {
            parameters[i] = parameters[i].trim();
        }
        element.onclick = function () {
            functions[functionName].apply(self, parameters);
        };
    }
    function resolveDataClickFunctions(containerID) {
        var elements = document.getElementById(containerID).getElementsByTagName("*"),
            i;
        for (i = 0; i < elements.length; i += 1) {
            var element = elements[i],
                dataClick = element.getAttribute("data-click");

            if (dataClick) {
                var matches = /([\w]+)\(([\w\W]*)\)/.exec(dataClick),
                    functionName = matches[1],
                    parameters = matches[2].split(",");

                bindDataClickFunction(element, functionName, parameters);
            }
        }
    }
    function bindCartSubItems(item, subItems) {
        var containerID = "order" + item.order_sequence_id + "Item" + item.item_index + "SubItems";
        var cartSubItems = new JSRepeater(containerID);
        if (item.presale_type == 1) {
            for (var i = 0; i < subItems.length; i++) {
                var subItem = subItems[i];
                var vip_price = 0;
                if (subItem["vip_price"] != null) {
                    vip_price = parseFloat(subItem["vip_price"]);
                }
                var deposit_amount = 0;
                if (subItem["deposit_amount"] != null) {
                    deposit_amount = parseFloat(subItem["deposit_amount"]);
                }
                subItem["balance_amount"] = "&yen;" + (+(vip_price - deposit_amount)).toFixed(2);
				subItem["deposit_amount"] = "&yen;" + (+subItem["deposit_amount"]).toFixed(2);
            }
            cartSubItems.ItemTemplate = cartSubItemDepositPresaleTemplate
        } else if (item.presale_type == 2) {
            for (var i = 0; i < subItems.length; i++) {
                var subItem = subItems[i];
                subItem["balance_amount"] = "未生成";
				subItem["deposit_amount"] = "&yen;" + (+subItem["deposit_amount"]).toFixed(2);
            }
            cartSubItems.ItemTemplate = cartSubItemDepositPresaleTemplate
        }
        else if (item.order_sequence_id == "0_0" || item.order_sequence_id == "0_70") {
            if (item.order_products_type == 80) {
                cartSubItems.ItemTemplate = cartSubItemCMobileSelfTemplate;
            } else if(item.energy_saving_order){
				cartSubItems.ItemTemplate = cartSubItemDirectBuySelfTemplate;
			} else {
                cartSubItems.ItemTemplate = cartSubItemSelfTemplate;
            }
        }
        else if (item.order_sequence_id == "0_51" || item.order_sequence_id == "0_55" || item.order_sequence_id =="0_10" || item.order_sequence_id == "0_101") {
            cartSubItems.ItemTemplate = cartSubItemDirectBuySelfTemplate;
        }
        else if (item.order_sequence_id != "0_0" && item.order_products_type == 80) {
            cartSubItems.ItemTemplate = cartSubItemCMobileTemplate;
        } else if (item.order_type == 97 || item.shop_type==5) {
            if (item.order_sequence_id == "0_97") {
                cartSubItems.ItemTemplate = cartSubItemDirectBuySelfTemplate;
            } else {
                cartSubItems.ItemTemplate = cartSubItemDirectBuyTemplate;
            }

        } else {
            cartSubItems.ItemTemplate = cartSubItemTemplate;
        }
        cartSubItems.DataSource = subItems;
        cartSubItems.DataBind();
    }
    function bindCartItems() {
        var items = cartItemsData.items;
        cartItems.DataSource = items;
        if (items[0].presale_type == 1 || items[0].presale_type == 2) {
            cartItems.HeaderTemplate = cartItemDepositPresaleHeaderTemplate;
        }
        else if (items[0].order_sequence_id == "0_0" || items[0].order_sequence_id == "0_70") {
            if (items[0].order_products_type == 80) {
                cartItems.HeaderTemplate = cartItemDirectBuySelfHeaderTemplate;
            } else if(items[0].energy_saving_order){
				cartItems.HeaderTemplate = cartItemDirectBuySelfHeaderTemplate;
			} else {
                cartItems.HeaderTemplate = cartItemSelfHeaderTemplate;
            }
        }
        else if (items[0].order_sequence_id == "0_51" || items[0].order_sequence_id == "0_55" || items[0].order_sequence_id == "0_10" ||items[0].order_sequence_id == "0_101") {
            cartItems.HeaderTemplate = cartItemDirectBuySelfHeaderTemplate;
        }
        else if (items[0].order_sequence_id != "0_0" && items[0].order_products_type == 80) {
            cartItems.HeaderTemplate = cartItemDirectBuyHeaderTemplate;
        } else if (items[0].order_type == 97 || items[0].shop_type==5) {
            if (items[0].order_sequence_id == "0_97") {
                cartItems.HeaderTemplate = cartItemDirectBuySelfHeaderTemplate;
            } else {
                cartItems.HeaderTemplate = cartItemDirectBuyHeaderTemplate;
            }
        } else {
            cartItems.HeaderTemplate = cartItemHeaderTemplate;
        }
        cartItems.ItemTemplate = cartItemTemplate;
        cartItems.DataBind();

        var i;
        for (i = 0; i < items.length; i += 1) {
            bindCartSubItems(items[i], items[i].subItems);
        }
    }
    function splitValue(value, splitChar) {
        if (!value) {
            return [];
        }
        splitChar = splitChar || ",";
        return value.toString().split(splitChar);
    }
    function isSetItem(subItem) {
        var result = splitValue(subItem.promotion_type);
        return result.contains("225") || result.contains("226");
    }

    // 订单赠品
    function isOrderGift(subItem) {
        return subItem.is_order_gift;
    }
    // 满额赠
    function isCollectionGift(subItem) {
        return subItem.cart_prod_type
            && subItem.cart_prod_type.indexOf("Z&") === 0
            && (+subItem.product_type === 1 || +subItem.product_type === 2);
    }
    // 单品赠品
    function isProductGift(subItem) {
        return subItem.is_gift_product;
    }
    function isGift(subItem) {
        return isProductGift(subItem) || isCollectionGift(subItem) || isOrderGift(subItem);
    }
    function isExchange(subItem) {
        return subItem.is_exchange_product;
    }
    //是否为虚拟捆绑品的子品
    function isRelationProduct(subItem) {
        return subItem.is_relation_product;
    }
    //是否为黄牛限购超出限购数量，当成普通品卖的商品
    function isLimitBuyExcessProduct(subItem) {
        return subItem.is_limit_buy_excess_product;
    }
    function isLimitBuy(subItem) {
        var result = splitValue(subItem.promotion_type);
        return result.contains("102");
    }
    // 是否和主品分在不同订单的赠品和换购品
    function isAloneGiftOrExchange(items, cartItem) {
        if (isProductGift(cartItem) || isExchange(cartItem)) {
            var alone = true;
            items.each(function (item) {
                item.subItems.each(function (subItem) {
                    if (subItem.cart_item === cartItem) {
                        alone = false;
                    }
                });
            });
            return alone;
        }
        return false;
    }
    function addSubItemError(subItem, error, errorTemplate) {
        error.deleteKey = subItem.deleteKey;
        subItem.error = errorTemplate ? new StringBuilder().appendFormat(errorTemplate, error).toString() : null;
    }
    function addProductsLackError(error, data) {
        getSubItemsByError(error, true).each(function (subItem) {
            var errorTemplate;
            if ((+subItem.product_type === 88 || +subItem.product_type === 89 || +subItem.product_type === 90) && error.lack_type == 4) {
                errorTemplate = cartItemErrorTimeoutError;
            }
            else if (error.is_not_satisfied_collection_gift_product) {
                // collection gift error
                errorTemplate = cartItemErrorCollectionGiftError;
            } else if (isGift(subItem) && subItem.is_parent_product_no_stock) {
                // gift parent lack
                errorTemplate = cartItemErrorGiftParentLack;
            } else if (isGift(subItem) && splitValue(subItem.promotion_type).contains("30")) {
                // more gift lack
                errorTemplate = cartItemErrorMoreGiftLack;
            } else if (isGift(subItem)) {
                // gift lack
                errorTemplate = cartItemErrorGiftLack;
            } else if (isExchange(subItem) && subItem.is_parent_product_no_stock) {
                // exchange parent lack
                errorTemplate = cartItemErrorExchangeParentLack;
            } else if (isExchange(subItem)) {
                // exchange lack
                errorTemplate = cartItemErrorExchangeLack;
            } else if (isSetItem(subItem)) {
                // set lack
                errorTemplate = cartItemErrorSetLack;
            } else if ((+error.lack_type) === 1) {
                // region lack
                error.address_name = data.lack_property[0].address_names;
                errorTemplate = cartItemErrorRegionLack;
            } else if ((+error.lack_type) === 3) {
                // partial lack
                errorTemplate = cartItemErrorPartialLack;
            } else if ((+error.lack_type) === 99) {
                // no common shipment error
                errorTemplate = cartItemErrorNoCommonShipmentError;
            } else {
                errorTemplate = cartItemErrorLack;
            }
            addSubItemError(subItem, error, errorTemplate);
        });
    }
    function addBuyLimitError(error) {
        // see note 3
        var promotionType = splitValue(error.promotion_type);
        var byPromotion = promotionType.contains("6") ? false : true;        
        getSubItemsByError(error, byPromotion, true).each(function (subItem) {
            var errorTemplate,
                buy_count = error.buyed_prd_count || 0,
                max_buy_count = (error.limit_buy_count || 0) - buy_count,
                min_buy_count = error.min_buy_count || 0;

            // add to error for bind
            error.max_buy_count = max_buy_count < 0 ? 0 : max_buy_count;
            error.min_buy_count = min_buy_count < 0 ? 0 : min_buy_count;
            if (max_buy_count > 0) {
                error.can_buy_desc = "还能购买" + max_buy_count + "件，";
            } else {
                error.can_buy_desc = "";
            }
            
            if (promotionType.contains("6")) {
                errorTemplate = cartItemErrorVipMaxLimit;   // VIP limit
            } else if (promotionType.contains("51") && error.min_buy_count > 0) { // min buy limit
                errorTemplate = cartItemErrorMinLimit;
            } else if (promotionType == null || promotionType == "") {
                errorTemplate = cartItemErrorProductMaxLimit;
            } else {
                errorTemplate = cartItemErrorPromotionMaxLimit;
            }
            addSubItemError(subItem, error, errorTemplate);
        });
    }
    function addShipmentLimitError(error, data) {
        getSubItemsByError(error, true).each(function (subItem) {
            error.shipment_name = data.ship_type_name;
            addSubItemError(subItem, error, cartItemErrorUnsupportShipment);
        });
    }
    function addCodLimitError(error, data) {
        getSubItemsByError(error, true).each(function (subItem) {
            error.payment_name = data.pay_type_name;
            addSubItemError(subItem, error, cartItemErrorUnsupportPayment);
        });
    }
    function addSelfExceptions(error, data) {
        error.product_id = error.self_exception_id;
        getSubItemsByError(error, false).each(function (subItem) {
            error.payment_name = data.pay_type_name || "您选择的支付方式";
            addSubItemError(subItem, error, cartItemErrorSelfExceptionError);
        });
    }
    function updateError(data) {
        dataSource.prods_limit_ship = data.prods_limit_ship;
        dataSource.prods_limit_cod = data.prods_limit_cod;
        dataSource.limit_buy = data.limit_buy;
        dataSource.self_exceptions = data.self_exceptions;
        dataSource.prods_lack = data.prods_lack;
    }
    function addErrors(data) {
        (data.prods_limit_ship || []).each(function (error) {
            addShipmentLimitError(error, data);
        });
        (data.prods_limit_cod || []).each(function (error) {
            addCodLimitError(error, data);
        });
        (data.limit_buy || []).each(function (errors) {
            var key;
            for (key in errors) {
                if (errors.hasOwnProperty(key)) {
                    errors[key].each(addBuyLimitError);
                }
            }
        });
        (data.self_exceptions || []).each(function (error) {
            addSelfExceptions(error, data);
        });
        (data.prods_lack || []).each(function (error) {
            addProductsLackError(error, data);
        });
    }
    function bindTemplate() {
        bindCartItems();
        resolveDataClickFunctions(cartItemsContainerID);
    }
    //如果这个品（赠品，换购品，虚拟捆绑的子品）有主品，且主品也报缺，则这个品不再显示报缺信息
    function isItemError(subItem) {
        if (subItem.parent_item && isItemError(subItem.parent_item)) {
            return false;
        }
        return subItem.error && showError;
    }
    function isShowProductPriceAndAmount(subItem) {
        // gift except collection gift doesn't show price and amount
        if (isGift(subItem) && !isCollectionGift(subItem)) {
            return false;
        }
        //虚拟捆绑子品不显示价格和折扣
        if (isRelationProduct(subItem)) {
            return false;
        }
        return true;
    }
    function isShowProductDiscount(subItem) {
        return isShowProductPriceAndAmount(subItem) && subItem.discount && (+subItem.discount) !== 100;
    }
    function containsErrorSubItem(item) {
        var result = false;
        item.subItems.each(function (subItem) {
            if (isItemError(subItem) && !isHideItem(subItem)) {
                result = true;
            }
        });
        return result;
    }
    function updateErrorStatus() {
        var showError = false;
        cartItemsData.items.each(function (item) {
            item.errorClassName = containsErrorSubItem(item) ? "item-error" : null;
            item.subItems.each(function (subItem) {
                //alert(subItem.product_id);
                if (!isHideItem(subItem)) {
                    subItem.errorClassName = isItemError(subItem) ? "sub-item-error" : null;
                    subItem.error_name = isItemError(subItem) ? subItem.error : "";
                } else {
                    subItem.errorClassName = "hide";
                    subItem.error_name = "";
                }
                if (giftPackageStatus) {
                    subItem.giftPackagingClassName = subItem.is_gift_packaging ? "hide" : "giftpacking_no";
                }
                else {
                    subItem.giftPackagingClassName = "hide";
                }
                if (subItem.is_set_main || isItemError(subItem)) {
                    subItem.giftPackagingClassName = "hide";
                }
            });
            if (item.errorClassName) {
                showError = true;
            }
        });
        if (showError) {
            window.location.hash = cartItemsContainerID;
        }
    }
    function isHideItem(subItem) {
        var prods = lack_prods.split(",");
        var parent_product;
        for (var i = 0; i < prods.length; i++) {
            parent_product = prods[i].split("_");
            if (parent_product[0] == subItem.parent_product_id && parent_product[1] == subItem.product_id) {
                return true;
            }
        }
        return false;
    }
    function updateSubItemProductType(subItem) {
        if (isExchange(subItem)) {
			if(subItem.promotion_type==229){
				subItem.product_type_class_name = "color-orange";
				subItem.product_type_name = "[加价购]";
				subItem.product_class_name = "color-grey";
				subItem.operation_name = "";
			}
			else{
				subItem.product_type_class_name = "color-orange";
				subItem.product_type_name = "[换购商品]";
				subItem.product_class_name = "color-grey";
				subItem.operation_name = "";
			}
        } else if (isGift(subItem)) {
            subItem.product_type_class_name = "color-orange";
            subItem.product_type_name = "[赠品]";
            subItem.product_class_name = "color-grey";
            subItem.operation_name = "";
            subItem.store_name = "";
        } else if (isRelationProduct(subItem)) {
            subItem.product_type_class_name = "color-orange";
            subItem.product_type_name = "[子品]";
            subItem.product_class_name = "color-grey";
            subItem.operation_name = "";
            subItem.store_name = "";
        } else if (subItem.is_set_main) {
            subItem.product_type_class_name = "color-grey_big";
            subItem.product_type_name = "[套餐]";
            subItem.operation_name = "";
        } else if (subItem.is_presale) {
            subItem.product_type_class_name = "color-purple";
            subItem.product_type_name = "[预售]";
        } else if (isLimitBuy(subItem)) {
            subItem.product_type_class_name = "restrict_buy";
            subItem.product_type_name = "限购";
        } else if (subItem.is_limit_buy_excess_product == 1) {
            subItem.operation_name = "";
        } else if (subItem.district_mall_product_type > 0) {
            subItem.product_type_class_name = "color-orange";
            subItem.product_type_name = "[区域促销]";
    	} else if (subItem.has_seckill_promotion) {
    		subItem.product_type_class_name = "restrict_buy";
            subItem.product_type_name = "秒杀";
    	}
    }
    function updateProductName(subItem) {
        var trunc_length = 27;
        if (isExchange(subItem)) {
            trunc_length = 22;
        } else if (isGift(subItem)) {
            trunc_length = 24;
        } else if (isRelationProduct(subItem)) {
            trunc_length = 24;
        } else if (subItem.is_presale) {
            trunc_length = 24;
        }
        subItem.product_name_trunc = nTruncate(subItem.product_name, trunc_length - (subItem.product_type_name || "").length);
        subItem.product_name_template = subItem.is_set_main ?
                new StringBuilder().appendFormat(setProductNameTemplate, subItem).toString() :
                    new StringBuilder().appendFormat(productNameTemplate, subItem).toString();
    }
    function getDiscountName(subItem) {
        var discount = (+getDiscount(subItem)).toFixed(0);
        if (discount % 10 === 0 || discount < 10) {
            discount = discount / 10;
        }
        if (discount < 0.1) {
            discount = 0.1;
        }
        return "(" + discount + "折)";
    }
    function getDiscount(subItem) {
        return subItem.discount;
    }
    function getProductCount(subItem) {
        return subItem.product_count;
    }
    function getDangPrice(subItem) {
        return subItem.dangdang_price;
    }
    function getSalePrice(subItem) {
        return subItem.vip_price;
    }
	function getDepositAmount(subItem){
		return subItem.deposit_amount;
	}
    function getStoreName(subItem) {
        return subItem.store_name;
    }
    function getSalePriceName(subItem) {
        if (!isShowProductPriceAndAmount(subItem)) {
            return "";
        }
        // exchange and discount show sale price
        if (isExchange(subItem) || subItem.is_have_discount) {
            return "&yen;" + (+getSalePrice(subItem)).toFixed(2);
        }
        return "- -";
    }
    function getAmount(subItem) {
		//订金预售商品，商品清单栏小计显示订金乘以数量
		if(subItem.is_presale && subItem.presale_type==2){
			return (+getDepositAmount(subItem)) * (+getProductCount(subItem));
		}else{
        return (+getSalePrice(subItem)) * (+getProductCount(subItem));
    }
        
    }
    function getSetMainProductName(subItem) {
        var result;
        if (subItem.promo_model) {
            subItem.promo_model.each(function (item) {
                if (+item.promotion_id === +subItem.promotion_id) {
                    result = item.promotion_name;
                }
            });
        }
        return result;
    }
    function getSetMainItem(cartItem) {
        var subItem = {
            is_set_main: true,
            promotion_id: cartItem.promotion_id,
            promotion_type: cartItem.promotion_type,
            promo_model: cartItem.promo_model
        };

        subItem.product_name = getSetMainProductName(subItem);

        updateSubItemProductType(subItem);
        updateProductName(subItem);

        return subItem;
    }
    function getDeleteKey(subItem) {
        return subItem.item_id + "_" + (subItem.parent_product_id || 0) + "_" + (subItem.virtual_exchange_product_id || subItem.product_id) + "_" + (subItem.promotion_id || 0);
    }
    function updateSubItemProperties(subItem) {

        subItem.store_name = getStoreName(subItem);
        subItem.dangdang_price_name = isShowProductPriceAndAmount(subItem) ? "&yen;" + (+getDangPrice(subItem)).toFixed(2) : "";
        subItem.discount_name = isShowProductDiscount(subItem) ? getDiscountName(subItem) : "";
        subItem.sale_price_name = getSalePriceName(subItem);
        subItem.sale_price_class_name = subItem.is_have_discount ? "" : "no-discount";
        subItem.product_count_name = getProductCount(subItem);

        var amount = getAmount(subItem);
        subItem.amount_name = isShowProductPriceAndAmount(subItem) ? "&yen;" + amount.toFixed(2) : "";
		if(dataSource.baby_in_book_order){
			subItem.operation_name = "预览";
		}else{
			subItem.operation_name = "放回购物车";
		}
        

        //联通合约机
        if (subItem.product_type == 80) {
            // tj 2014-01-14 add
            var isDepositMoneyFree = subItem.is_deposit_money_free;
            if (isDepositMoneyFree) {
                // 可免
                subItem['discount_amount'] = "&yen;" + formatFloat(subItem.sim_card_balance);
                subItem['sim_card_balance_bargin_price'] = "&yen;"  + formatFloat("0");
            } else {
                subItem['discount_amount'] = "&yen;" + formatFloat("0");
                subItem['sim_card_balance_bargin_price'] = "&yen;" + formatFloat(subItem.sim_card_balance);
            }
            subItem.sim_card_balance = "&yen;" + formatFloat(subItem.sim_card_balance);
        }
        updateSubItemProductType(subItem);
        updateProductName(subItem);

        // compose a delete key with product_id and promotion_id
        subItem.deleteKey = getDeleteKey(subItem);
    }
    function getSubItem(cartItem, subItem) {
        subItem = subItem || {};
        subItem.cart_item = cartItem;   // add reference

        // extend from a cart item
        var property;
        for (property in cartItem) {
            if (cartItem.hasOwnProperty(property) && subItem[property] === undefined) {
                subItem[property] = cartItem[property];
            }
        }

        updateSubItemProperties(subItem);
        return subItem;
    }
    function getItem(items, cartItem) {
        return {
            order_sequence_id: dataSource.order_sequence_id,
            item_index: items.length,
            promotion_id: cartItem.promotion_id,
            promotion_type: cartItem.promotion_type,
            order_products_type: dataSource.order_products_type,
            order_type:dataSource.order_type,
			shop_type:dataSource.shop_type,
			energy_saving_order:dataSource.energy_saving_order,
			presale_type: dataSource.presale_type,
            subItems: []
        };
    }
    function getItemByPromotionID(items, promotionID) {
        // return the last item with same promotion
        var result;
        items.each(function (item) {
            if (+item.promotion_id === +promotionID) {
                result = item;
            }
        });
        return result;
    }
    
    //添加黄牛限购品的被拆行的普通品
    function addLimitBuyExcessProduct(items, subItem) {
        items.each(function (item) {
            item.subItems.each(function (subItem) {
                if (splitValue(subItem.promotion_type).contains("102")) {
                    dataSource.cart_items.each(function (cartItem) {
                        if (cartItem.is_limit_buy_excess_product == 1 && subItem.product_id == cartItem.product_id) {
                            item.subItems.push(getSubItem(cartItem));
                        }
                    });
                }
            });
        });
    }
    
    function addGiftSubItems(item, subItem) {
        if (!subItem.gift_product_items) { return; }

        subItem.gift_product_items.each(function (gift) {
            var gift_sub_item = {
                is_gift_product: true,
                is_exchange_product: false, // 避免同时成为换购品和赠品的情况
                product_id: gift.gift_product_id,
                parent_product_id: subItem.product_id,
                parent_item: subItem,
                product_count: gift.gift_product_count,
                dangdang_price: gift.sale_price,
                vip_price: gift.gift_exchange_price,
                virtual_exchange_product_id: gift.virtual_exchange_product_id
            };

            if (gift.gift_product_name) {
                gift_sub_item.product_name = gift.gift_product_name;
            }

            var cartItem = getCartItemByProductID(gift_sub_item.product_id, gift_sub_item.parent_product_id);
			if (cartItem) {

                gift_sub_item = getSubItem(cartItem, gift_sub_item);
                item.subItems.push(gift_sub_item);
            }
        });
    }
    function addExchangeSubItems(item, subItem) {
        if (!subItem.exchange_product_items) { return; }

        subItem.exchange_product_items.each(function (exchange) {
            var exchange_sub_item = {
                is_exchange_product: true,
                is_gift_product: false, // 避免同时成为赠品和换购品的情况
                product_id: exchange.exchange_product_id,
                parent_product_id: subItem.product_id,
                parent_item: subItem,
                product_count: exchange.exchange_product_count,
                dangdang_price: exchange.sale_price,
                vip_price: exchange.gift_exchange_price,
                virtual_exchange_product_id: exchange.virtual_exchange_product_id
            };

            if (exchange.exchange_product_name) {
                exchange_sub_item.product_name = exchange.exchange_product_name;
            }

            var cartItem = getCartItemByProductID(exchange_sub_item.product_id, exchange_sub_item.parent_product_id);
            if (cartItem) {
                exchange_sub_item = getSubItem(cartItem, exchange_sub_item);
                item.subItems.push(exchange_sub_item);
            }
        });
    }
    function addGiftsAndExchanges(items) {
        items.each(function (item) {
            item.subItems.each(function (subItem) {
                addGiftSubItems(item, subItem);
                addExchangeSubItems(item, subItem);
            });
        });
    }
    function addCollectionGifts(items) {
        dataSource.cart_items.each(function (cartItem) {
            if (isCollectionGift(cartItem)) {
                var mainItem = getItemByPromotionID(items, cartItem.promotion_id),
                    item = getItem(items, cartItem),
                    subItem = getSubItem(cartItem);

                item.subItems.push(subItem);
                // add gift after its main item
                if (mainItem) {
                    items.splice(mainItem.item_index + 1, 0, item);
                    items.each(function(item) {
                        item.item_index = items.indexOf(item);
                    });
                } else {
                    items.push(item);
                }
            }
        });
    }
    function addAloneGiftsAndExchanges(items) {
        dataSource.cart_items.each(function (cartItem) {
            if (isAloneGiftOrExchange(items, cartItem)) {
                var item = getItem(items, cartItem),
                    subItem = getSubItem(cartItem);

                item.subItems.push(subItem);
                items.push(item);
            }
        });
    }
    function addOrderGift(items) {
        var order_gift = dataSource.order_gift_dict;
        if (!order_gift) { return; }

        var cartItem = {
            is_order_gift: true,
            product_id: order_gift.gift_product_id,
            product_name: order_gift.gift_product_name,
            promotion_id: dataSource.promotion_id,
            promotion_type: dataSource.promotion_type,
            gift_product_count: 1,  // order gift count always 1
            dangdang_price: +order_gift.gift_original_price || 0,
            vip_price: +order_gift.gift_sale_price || 0
        }, item = getItem(items, cartItem);

        item.subItems.push(getSubItem(cartItem));
        items.push(item);
    }
    function addRelationSubItems(items) {
        items.each(function (item) {
            item.subItems.each(function (subItem) {
				//1001是福袋主品，福袋主品不显示其下的子品
                if (!subItem.relation_product_items || subItem.product_activity_type==1001) { return; }
                subItem.relation_product_items.each(function (relation_prod) {
                    var relation_sub_item = {
                        is_gift_product: false,
                        is_exchange_product: false,
                        is_relation_product: true,
                        product_id: relation_prod.relation_product_id,
                        parent_product_id: subItem.product_id,
                        parent_item: subItem,
                        product_count: relation_prod.relation_product_count
                    };

                    if (relation_prod.relation_product_name) {
                        relation_sub_item.product_name = relation_prod.relation_product_name;
                    }

                    var cartItem = getCartItemByProductID(relation_sub_item.product_id, relation_sub_item.parent_product_id);
                    if (cartItem) {

                        relation_sub_item = getSubItem(cartItem, relation_sub_item);
                        item.subItems.push(relation_sub_item);
                    }
                })
            })
        });
    }
    function isMainItem(items, cartItem) {
        if (isProductGift(cartItem) || isExchange(cartItem) || isLimitBuyExcessProduct(cartItem)) {
            return false;
        }
        if (isSetItem(cartItem) && getItemByPromotionID(items, cartItem.promotion_id)) {
            return false;
        }

        if (splitValue(cartItem.promotion_type).contains("206") && getItemByPromotionID(items, cartItem.promotion_id)) { // N元场
            return false;
        }

        return true;
    }
    
    function getItems() {
        var items = [], i, item;
        for (i = 0; i < dataSource.cart_items.length; i += 1) {
            var cartItem = dataSource.cart_items[i],
                promotion_id = cartItem.promotion_id;

            // skip gift and exchange so make sure they are after the main item.
            if (!isGift(cartItem) && !isExchange(cartItem) && !isRelationProduct(cartItem) && !isLimitBuyExcessProduct(cartItem)) {
                if (isMainItem(items, cartItem)) {
                    // add new item
                    item = getItem(items, cartItem);

                    if (isSetItem(cartItem)) {
                        // add set main item
                        item.subItems.push(getSetMainItem(cartItem));
                    }
                    item.subItems.push(getSubItem(cartItem));
                    items.push(item);

                } else {
                    item = getItemByPromotionID(items, promotion_id);
                    if (item) {
                        item.subItems.push(getSubItem(cartItem));
                    }
                }
            }
        }
        // and limit buy excess product
        addLimitBuyExcessProduct(items);
        // add gifts and exchanges
        addGiftsAndExchanges(items);

        //添加虚拟捆绑子品
        addRelationSubItems(items);

        // add collection gift
        addCollectionGifts(items); 

        // add alone gifts and exchanges, set note 4
        addAloneGiftsAndExchanges(items);

        // add order gift, see note 5
        if (+dataSource.promotion_type === 12) {
            addOrderGift(items);
        }

        // set "last" class name;
        if (items.length > 0) {
            items[items.length - 1].lastClassName = "last";
        }
        return items;
    }
    function getLackProds() {
        var i, promo_type, parent_product_id, product_id;
        var prod_ids = "";
        for (i = 0; i < dataSource.prods_lack.length; i++) {
            promo_type = dataSource.prods_lack[i].promotion_type;
            parent_product_id = dataSource.prods_lack[i].parent_product_id;
            product_id = dataSource.prods_lack[i].product_id;
            if (/*promo_type == 30*/splitValue(promo_type).contains("30") && parent_product_id > 0) {
                prod_ids = prod_ids + parent_product_id + "_" + product_id + ',';
            }
        }
        if (prod_ids != "") {
            lack_prods = prod_ids.substring(0, prod_ids.length - 1);
        }
    }
    function isSubItemHasGiftCardCharge(subItem) {
        return subItem.gift_card_rate && +subItem.gift_card_rate > 0
             && !isGift(subItem) && !isExchange(subItem) && !isRelationProduct(subItem);
    }
    function isSubItemHasGiftCardCharges(subItem, gift_card_charge) {
        return subItem.gift_card_rate && +subItem.gift_card_rate > 0
             && !isGift(subItem) && !isExchange(subItem) && !isRelationProduct(subItem) && gift_card_charge > 0;
    }
    function updateGiftCardChargeVisibility(gift_card_charge) {
        cartItemsData.items.each(function (item) {
            item.gift_card_charge_visiable = "hide";
            item.subItems.each(function (subItem) {
                if (isSubItemHasGiftCardCharges(subItem, gift_card_charge)) {
                    item.gift_card_charge_visiable = "";
                }
            });
        });
    }
    function onDataSourceChanged(gift_card_charge) {
        // set gift cart charge visibility
        updateGiftCardChargeVisibility(gift_card_charge);
    }
    self.setDataSource = function (data, updateErrorOnly) {
        if (updateErrorOnly) {
            // refresh error only
            updateError(data);
        } else {
            dataSource = data;
        }

        // create cart items for data bind
        cartItemsData = {
            orderID: dataSource.order_id,
            items: getItems(data)
        };
        // add errors
        addErrors(data);

        onDataSourceChanged(data.gift_card_charge);
    };
    self.setDeleteCartItemCallback = function (fnCallback) {
        deleteCartItemCallback = fnCallback;
    };
    self.setChangeConsigneeCallback = function (fnCallback) {
        changeConsigneeCallback = fnCallback;
    };
    self.setChangeShipmentCallback = function (fnCallback) {
        changeShipmentCallback = fnCallback;
    };
    self.setchangePaymentCallback = function (fnCallback) {
        changePaymentCallback = fnCallback;
    };
    self.show = function (isShowError) {
        showError = isShowError;
        if (showError == false) {
            getLackProds();
        }
        updateErrorStatus();
        bindTemplate();
    };
    self.hasGiftCardCharge = function () {
        if (!cartItemsData) { return false; }

        var result = false;
        cartItemsData.items.each(function (item) {
            item.subItems.each(function (subItem) {
                if (isSubItemHasGiftCardCharge(subItem)) {
                    result = true;
                }
            });
        });
        return result;
    };
    self.getLackProdIds = function () {
        return lack_prods;
    }
    self.setGiftPackageStatus = function (isGiftPackage) {
        giftPackageStatus = isGiftPackage;
    };
}