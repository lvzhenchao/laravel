function GiftPackageMain(container_id) {

    var mDataSource = null;
    var mPanel = new JSPanel(container_id);
    var giftPackingAjax = new Ajax("/giftpackage/action");
    var productPackage;
    var greetingCard;
    var printPrice;
    var giftMobile;

    var editStatus = 0;
    var isGiftPackage = 0;
    var mSetGiftPackingSubmit;
    //getElementById

    var conflitCheck = function (isFrontOper, isCheck) {

        //隐藏修改按钮
        $1("area_giftpackage_save_tips").className = 'hide';

        if (editStatus === 1) {
            $1("gift_packing_edit").className = 'hide';
            $1("gift_packing_delete").className = 'edit';
            $1('cb_gift_packing').checked = true;
            $1("gift_packing_detail").className = '';

        } else {
            $1("gift_packing_edit").className = 'edit';
            $1('cb_gift_packing').checked = false;
            $1("gift_packing_detail").className = "hide";

            if (isGiftPackage === 1) {
                $1('cb_gift_packing').checked = true;
            } else {
                $1("gift_packing_edit").className = 'hide';
                $1("gift_packing_delete").className = 'hide';
            }
        }

        if ($1('cb_gift_packing').checked == true) {
            $1('cb_gift_packing').disabled = true;
        } else {
            $1('cb_gift_packing').disabled = false;

        }

        //内部选项
        /*                          */
        if (productPackage.getIsPackage() && (productPackage.getIsChoiceOpen() || productPackage.getIllegalProduct().isHaveIllegalProduct() || isCheck)) {
            productPackage.openChoice(isFrontOper, isCheck);
        } else {
            productPackage.closeChoice();
        }

        if (greetingCard.getIsGreetingCard()) {
            greetingCard.getGreetingCardContent().show();
        } else {
            greetingCard.getGreetingCardContent().hide();
        }

        if (!giftMobile.checkPhoneNum()) {
            return false;
        }

        return true;

    };

    this.initGiftPackage = function (isProductPackage) {
        refreshGiftPackage(isProductPackage);
    };
    this.setEditStatus = function (mEditStatus) {
        editStatus = mEditStatus;
    };

    this.getEditStatus = function () {
        return editStatus;
    };

    this.setIsGiftPackage = function (para) {
        isGiftPackage = para;
    };

    this.getProductPackage = function () {
        return productPackage;
    };

    var bindTemplate = function () {
        mPanel.Template = GIFT_PACKING_TEMPLATE_SECOND;
        mPanel.DataBind();

    };

    //取消函数
    var cancelEdit = function () {
        switchMainDetail();
        editStatus = 0;
        conflitCheck();
    };

    var addEvents = function () {
        //初始化各个模块
        greetingCard = new GreetingCard(mDataSource);
        printPrice = new PrintPrice(mDataSource);
        productPackage = new ProductPackage(mDataSource);
        giftMobile = new GiftMobile();


        // 主选项
        $1("cb_gift_packing").onclick = function () {
            switchMainDetail(!$1("cb_gift_packing").checked);
            conflitCheck(true,true);
        };

        //修改
        $1("gift_packing_edit").onclick = function () {
            editGiftPacking();
            editStatus = 1;
            conflitCheck(true);
        };



        //取消
        $1("gift_packing_delete").onclick = function () {
            cancelGiftPacking();
        };
        //取消
        $1("gift_packing_cancel").onclick = function () {
            cancelGiftPacking();
        };

        $1('gift_packing_submit').onclick = function () {
            submitGiftPacking();
        };
    };
    var switchMainDetail = function (is_hide) {
        if (is_hide || arguments.length == 0) {
            editStatus = 0;
        } else {
            editStatus = 1;
        }
    };
    var setDataSource = function (data_source) {
        data_source['card_price'] = formatFloat(data_source['card_price']);
        data_source['gift_package_price'] = formatFloat(data_source['gift_package_price']);
        mDataSource = data_source;
        mPanel.DataSource = data_source;
    };

    var checkProductPackage = function (config_tips) {
        if (productPackage.getIsChoiceOpen()) {
            $1("area_giftpackage_save_tips").className = 'help-inline help-inline-error help-inline-middle';
            $1("span_area_giftpackage_save_tips").innerHTML = config_tips;
            return false;
        } else {
            $1("area_giftpackage_save_tips").className = "hide";
            return true;
        }
    };


    var submitGiftPacking = function () {

        if (!checkProductPackage('请选择包装')) {
            return false;
        }

        if (!giftMobile.checkPhoneNum()) {
            return false;
        }

        isGiftPackage = 1;
        switchMainDetail();
        if (!conflitCheck()) {
            switchMainDetail(false);
            conflitCheck();
            return false;
        }
        var postData = new Hashtable();

        postData.is_gift_package = 1;


        //礼品是否包装
        var isProductPackage = productPackage.getIsPackage();
        if (isProductPackage) {
            postData.is_product_package = 1;
            postData.package_name = productPackage.getPackageName();
            postData.package_type_id = productPackage.getPackageType();
            postData.gift_package_price = productPackage.getPackagePrice();

        } else {
            postData.is_product_package = 0;
            postData.package_name = productPackage.getPackageName();
            postData.package_type_id = productPackage.getPackageType();
        }
        //贺卡信息
        if (greetingCard.getIsGreetingCard()) {
            postData.is_greetingcard = 1;
        } else {
            postData.is_greetingcard = 0;
        }
        var greetingCardContent = greetingCard.getGreetingCardContent();
        postData.gift_message_receiver = greetingCardContent.getNickName();
        postData.gift_message = greetingCardContent.getMainBody();
        postData.gift_message_sender = greetingCardContent.getSendName();

        //是否打印价格
        if (printPrice.getIsPrintPrice()) {
            postData.is_print_price = 1;
        } else {
            postData.is_print_price = 0;
        }
        //手机号

        postData.gift_sender_phone = giftMobile.getPhoneNum();

        //请求类型
        postData.order_sequence_id = '0_0';
        postData.method = 'saveGiftPacakge';

        giftPackingAjax.OnSucceed(function (result) {
            if ((+result.error_code) == 0) {
                mSetGiftPackingSubmit(result);
            }

        });

        giftPackingAjax.invokeServer(postData, "POST", false);
    };
    var editGiftPacking = function () {
        refreshGiftPackage();
        switchMainDetail(false);

    };
    var cancelGiftPacking = function () {
        var postData = new Hashtable();
        postData.is_gift_package = '0';
        postData.order_sequence_id = "0_0";
        postData.method = 'saveGiftPacakge';
        isGiftPackage = 0;
        cancelEdit();

        giftPackingAjax.OnSucceed(function (result) {
            if ((+result.error_code) == 0) {
                mSetGiftPackingSubmit(result);

            }
        });
        giftPackingAjax.invokeServer(postData, "POST", false);

    };
    var refreshGiftPackage = function (isProductPackage) {
        var postData = new Hashtable();

        postData.method = 'getGiftPacakge';
        postData.order_flow_id = mDataSource.order_flow_id;
        postData.order_sequence_id = mDataSource.order_sequence_id;
        giftPackingAjax.OnSucceed(function (result) {

            if (result != null && result['error_code'] == 0) {
                var giftPackageData = result["gift_package"];
                setDataSource(giftPackageData);
                bindTemplate();
                addEvents();
                //包装
                if (isProductPackage === undefined) {
                    giftPackageData.is_product_package ? productPackage.setIsPackage(1) : productPackage.setIsPackage(2);
                } else {
                    isProductPackage ? productPackage.setIsPackage(1) : productPackage.setIsPackage(2);
                }
                //贺卡
                giftPackageData.is_need_greetingcard ? greetingCard.setIsGreetingCard(1) : greetingCard.setIsGreetingCard(2);
                //打印价格
                giftPackageData.is_print_price ? printPrice.setPrintPrice(1) : printPrice.setPrintPrice(2);
                productPackage.setSelectPackage(giftPackageData['package_type_id']);
                conflitCheck();
            }
        });

        giftPackingAjax.invokeServer(postData, "POST", false);


    };
    this.setGiftPackageSubmit = function (setGiftPackingSubmit) {
        mSetGiftPackingSubmit = setGiftPackingSubmit;
    };
    this.setData = function (data) {
        mDataSource = data;
    };
    this.initData = function (isProductPackage) {
        setDataSource(mDataSource);
        bindTemplate();
        addEvents();
        //包装
        if (isProductPackage === undefined) {
            mDataSource.is_product_package ? productPackage.setIsPackage(1) : productPackage.setIsPackage(2);
        } else {
            isProductPackage ? productPackage.setIsPackage(1) : productPackage.setIsPackage(2);
        }
        //贺卡
        mDataSource.is_need_greetingcard ? greetingCard.setIsGreetingCard(1) : greetingCard.setIsGreetingCard(2);
        //打印价格
        mDataSource.is_print_price ? printPrice.setPrintPrice(1) : printPrice.setPrintPrice(2);
        productPackage.setSelectPackage(mDataSource['package_type_id']);
        conflitCheck();
    }

    this.setGiftPackageSaveConfig = function (config_tips) {
        $1("area_giftpackage_save_tips").className = 'help-inline help-inline-error help-inline-middle';
        $1("span_area_giftpackage_save_tips").innerHTML = config_tips;
    };
}



