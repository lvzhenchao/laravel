/*商品是否包装*/
function ProductPackage(dataSource) {
    this.littleImageList = new LittleImageList("preview_pack_image_list");
    this.bigImageList = new BigImageList("big_image_list");
    this.isPackageProductRadio = new GiftPackageRadioButton("simulate_radio after_click", "simulate_radio", "packageproductyeslabel", "packageproductnolabel");
    this.illegalProduct = new IllegalProduct('illegal_product');
    this.dataSource = dataSource;
    var isChoiceOpen = true;

	var giftPackingAjax = new Ajax("/giftpackage/action");
	giftPackingAjax.OnSucceed((function(littleImageList, bigImageList, illegalProduct) {
		return function(result) {
			littleImageList.initData(result["image_list"]);
			bigImageList.initData(result["image_list"]);
			illegalProduct.initData(result["illegal_product"]);
		};
	})(this.littleImageList, this.bigImageList, this.illegalProduct));
	
    var postData = new Hashtable();
    postData["method"] = "getPreviewImageAndIllegalProduct";
    giftPackingAjax.invokeServer(postData, 'POST', false);
    
    //私有函数 打开选择包装区域
    this.openChoice = ((function (that) {
        return function (isFrontOper, isCheck) {

            isChoiceOpen = true;
            if (that.illegalProduct.isHaveIllegalProduct()) {
                that.illegalProduct.displayIllegalProduct();
                $1('product_package_tips').className = 'hide';
                $1('package_name').className = 'hide';
            } else {
                if (isFrontOper && !isCheck) {
                    $1("big_image_list").className = 'hide';
                    isChoiceOpen = false;
                } else {
                    $1("big_image_list").className = 'giftpacking_choose_pic clearfix';
                }
                $1('illegal_product_operate').className = 'hide';
                $1("preview_pack_image_list").className = 'hide';
                if (that.dataSource['package_name']) {
                    $1("package_name").className = 'giftpacking_price';
                } else {
                    $1("package_name").className = 'hide';
                }
                $1('product_package_tips').className = 'giftpacking_error';
            }

        };
    })(this));


    this.closeChoice = function () {

        isChoiceOpen = false;
        $1("big_image_list").className = 'giftpacking_choose_pic clearfix hide';
        $1("preview_pack_image_list").className = 'packing_pic_wrap';
        $1("package_name").className = 'hide';
        $1('illegal_product_operate').className = 'hide';
        $1('product_package_tips').className = 'hide';
        $1("area_giftpackage_save_tips").className = 'hide';

    };

    if (dataSource) {
        this.isPackageProductRadio.setValue(dataSource['is_product_package']);
        this.bigImageList.setSelectItem(dataSource['package_id']);
    }

    this.isPackageProductRadio.setRadioOnClick((function (that) {
        return function (obj) {

            if (/.*yeslabel/ig.test(obj)) {

                that.openChoice();
            }
            if (/.*nolabel/ig.test(obj)) {
                that.closeChoice();
            }
        };
    })(this));
    this.bigImageList.setImageClick((function (that) {
        return function (obj, package_name, package_id, package_price, little_image_url) {
            if (obj) {
                that.closeChoice();
                $1("package_name_image").src = little_image_url;
                $1('package_name_info').innerHTML = package_name + ' ¥' + package_price;
                $1("big_image_" + package_id).className = "after_click click";
                $1("package_name").className = 'giftpacking_price';
                $1("preview_pack_image_list").className = 'hide';
            }
        };
    })(this));

    this.illegalProduct.setcancelProductPackageCallBack((function (that) {
        return function () {
            that.closeChoice();
            that.isPackageProductRadio.setValue(2);
        };
    })(this));

    this.illegalProduct.setPutBackCartItemCallbackForProductPackage((function (that) {
        return function () {
            that.openChoice();
        };
    })(this));

    this.getIsChoiceOpen = function () {
        return isChoiceOpen;
    };
}

ProductPackage.prototype.getIsPackage = function () {
    return this.isPackageProductRadio.getValue() === 1;
};

ProductPackage.prototype.setIsPackage = function (para) {
    this.isPackageProductRadio.setValue(para);
};

ProductPackage.prototype.getPackageName = function () {
    return this.bigImageList.getSelectName();
};


ProductPackage.prototype.getPackageType = function () {
    return this.bigImageList.getSelectType();
};
ProductPackage.prototype.setSelectPackage = function (packageId) {
    this.bigImageList.setSelectItem(packageId);
};

ProductPackage.prototype.getPackagePrice = function () {
    return this.bigImageList.getSelectPrice();
};

ProductPackage.prototype.getIllegalProduct = function () {
    return this.illegalProduct;
};