function GiftPackageHead(container_id) {
    this.giftPackageMain = new GiftPackageMain(container_id);
    this.giftCheck = $1('cb_gift_packing');
    this.giftEdit = $1('gift_packing_edit');
    this.giftDelete = $1('gift_packing_delete');

}

GiftPackageHead.prototype.show = function (is_check, datasource) {
    this.giftPackageMain.setEditStatus(0);
    this.giftPackageMain.setIsGiftPackage(is_check);
    this.giftPackageMain.setData(datasource);
    this.giftPackageMain.initData();
}

GiftPackageHead.prototype.checkedGiftPackage = function () {
    this.giftPackageMain.setEditStatus(0);
    this.giftPackageMain.setIsGiftPackage(1);
    this.giftPackageMain.initGiftPackage();
    
};

GiftPackageHead.prototype.isEditStatus = function() {
    return this.giftPackageMain.getEditStatus();
};

GiftPackageHead.prototype.checkedGiftPackageAndOpen = function () {
    this.giftPackageMain.setEditStatus(1);
    this.giftPackageMain.setIsGiftPackage(1);
    this.giftPackageMain.initGiftPackage();
};

GiftPackageHead.prototype.checkedGiftPackageAndRefresh = function (isProductPackage) {
    this.giftPackageMain.setIsGiftPackage(1);
    this.giftPackageMain.initGiftPackage(isProductPackage);
};

GiftPackageHead.prototype.uncheckedGiftPackage = function () {
    this.giftPackageMain.setEditStatus(0);
    this.giftPackageMain.setIsGiftPackage(0);
    this.giftPackageMain.initGiftPackage();
};

GiftPackageHead.prototype.getGiftPackageMain= function () {
    return this.giftPackageMain;
};

GiftPackageHead.prototype.setGiftPackageSubmit = function (setGiftPackingSubmit) {
    this.giftPackageMain.setGiftPackageSubmit(setGiftPackingSubmit);
}