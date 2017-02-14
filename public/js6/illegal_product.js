function IllegalProduct(container_id) {

    var templateNotAll = "    <p class='giftpacking_error hide'>" +
        "        <i class='giftpacking_hotspot' id='put_back_shopcart_desc'>订单中有部分不能包装的商品<span class='triangle'></span>请&nbsp;</i>" +
        "        <a href='javascript:void(0)' id='put_back_shopcart'>放回购物车</a>&nbsp;或&nbsp;" +
        "        <a href='javascript:void(0)' id='cancel_product_package'>取消包装</a>" +
        "    </p>";

    var templateAll = "    <p class='giftpacking_error hide'>" +
    "        <i class='giftpacking_hotspot' id='put_back_shopcart_desc'>订单中没有可以包装的商品<span class='triangle'></span>请&nbsp;</i>" +
    "        <a href='javascript:void(0)' id='cancel_product_package'>取消包装</a>" +
    "    </p>";

    var illegalProductRepeater = new JSRepeater(container_id);
    illegalProductRepeater.ItemTemplate = '<div>{product_name}</div>';
    var isHaveIllegalProduct;
    var cancelProductPackageCallBack;
    var deleteCartItemAjax = new Ajax("/cartitem/remove");
    var that = this;
    var dataSource;
    var isAllProductNotSupport;
    this.initData = function (result) {
        dataSource = result["not_support_package_products"];
        isAllProductNotSupport = result["is_all_product_not_support"];
        illegalProductRepeater.DataSource = dataSource;
        if (illegalProductRepeater.DataSource && illegalProductRepeater.DataSource.length > 0) {
            isHaveIllegalProduct = true;
        } else {
            isHaveIllegalProduct = false;
        }
    };

    this.displayIllegalProduct = function () {
        illegalProductRepeater.DataBind();
        if (!$1('cancel_product_package')) {
            if (isAllProductNotSupport) {
                $1('illegal_product_operate').innerHTML = templateAll + $1('illegal_product_operate').innerHTML;
            } else {
                $1('illegal_product_operate').innerHTML = templateNotAll + $1('illegal_product_operate').innerHTML;
            }
        }

        $1('illegal_product_operate').className = 'giftpacking_order';


        //绑定函数
        var cancelProductPackage = $1('cancel_product_package');
        var putBackShopcart = $1('put_back_shopcart');

        cancelProductPackage.onclick = function () {
            cancelProductPackageCallBack();
        };

        if (putBackShopcart) {
            putBackShopcart.onclick = function () {
                var productKey = '';
                if (dataSource) {
                    for (var i = 0; i < dataSource.length - 1 ; i++) {
                        productKey += dataSource[i].item_id + '_' + dataSource[i].parent_product_id + '_' + dataSource[i].product_id + '_' + dataSource[i].promotion_id + ',';
                    }
                    productKey += dataSource[i].item_id + '_' + dataSource[i].parent_product_id + '_' + dataSource[i].product_id + '_' + dataSource[i].promotion_id;

                }
                internalUncheckCartItem(productKey);
            };
        }
    };

    this.isHaveIllegalProduct = function () {
        return isHaveIllegalProduct;
    };

    this.setIsHaveIllegalProduct = function (value) {
        isHaveIllegalProduct = value;
    };

    this.putShoppingCart = function () {
        var postData = new Hashtable();
        postData.product_keys = product_keys;
        postData.product_counts = product_counts;
        postData.is_uncheck_operation = false;
        postData.order_sequence_id = dataSource.order_sequence_id;

        deleteCartItemAjax.OnSucceed(function (result) {
            if ((+result.error_code) === 0) {
                if (deleteCartItemCallback) {
                    deleteCartItemCallback(result);
                    change_car_count(CKCookie.getCookie("cart_items_count"));
                }
            } else {
                alert("删除商品失败");
            }
        });
        deleteCartItemAjax.invokeServer(postData, "POST", true);
    };

    this.cancelProductPackage = function () {

    };

    this.setcancelProductPackageCallBack = function (fnCallback) {
        cancelProductPackageCallBack = fnCallback;
    };
    this.setPutBackCartItemCallbackForProductList = function (fnCallback) {
        putBackCartItemCallbackForProductList = fnCallback;
    };
    this.setPutBackCartItemCallbackForProductPackage = function (fnCallback) {
        putBackCartItemCallbackForProductPackage = fnCallback;
    };

    var internalUncheckCartItem = function (product_keys, product_counts) {
        var postData = new Hashtable();
        postData.product_keys = product_keys;
        postData.product_counts = product_counts;
        postData.is_uncheck_operation = true;
        postData.order_sequence_id = dataSource.order_sequence_id;

        deleteCartItemAjax.OnSucceed((function (_that) {
            return function (result) {

                if ((+result.error_code) === 0) {
                    _that.setIsHaveIllegalProduct(false);
                    if (putBackCartItemCallbackForProductList) {
                        putBackCartItemCallbackForProductList(result);
                    }
                    if (putBackCartItemCallbackForProductPackage) {
                        putBackCartItemCallbackForProductPackage();
                    }


                } else {
                    alert("无法将商品放回购物车");
                }
            };
        })(that));
        deleteCartItemAjax.invokeServer(postData, "POST", true);
    };



}