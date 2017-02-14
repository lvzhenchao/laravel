/*是否打印价格区域*/
function PrintPrice(dataSource) {
    var self = this;
    this.isPrintPrice = new GiftPackageRadioButton("simulate_radio after_click", "simulate_radio", "printpriceyeslabel", "printpricenolabel");

    if (dataSource) {
        this.isPrintPrice.setValue(dataSource['is_print_price']);
    }

    this.isPrintPrice.setRadioOnClick(function (obj) {
        if (/.*yeslabel/ig.test(obj)) {
            self.printPrice();
        }
        if (/.*nolabel/ig.test(obj)) {
            self.unPrintPrice();
        }
    });
    //图片预览
    GiftCommon.mouseOverImage('print_price_preview', 'print_price_big');

    //私有函数 打印价格
    this.printPrice = function() {
        $1("print_price_big").children[0].src = 'http://checkoutb.dangdang.com/resources/images/barcode_big_yes.png';
    };
    
    //私有函数 不打印价格

    this.unPrintPrice = function() {
        $1("print_price_big").children[0].src = 'http://checkoutb.dangdang.com/resources/images/barcode_big_no.png';
    };
    
    if (this.isPrintPrice.getValue() === 1) {
        this.printPrice();
    } else {
        this.unPrintPrice();
    }
}

PrintPrice.prototype.getIsPrintPrice = function () {
    return this.isPrintPrice.getValue()===1;
};

PrintPrice.prototype.setPrintPrice = function(para) {
    this.isPrintPrice.setValue(para);
    if (this.isPrintPrice.getValue() === 1) {
        this.printPrice();
    } else {
        this.unPrintPrice();
    }
};
