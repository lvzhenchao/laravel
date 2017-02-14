/*整个贺卡区域*/
function GreetingCard(dataSource) {
    this.isGreetingCard = new GiftPackageRadioButton("simulate_radio after_click", "simulate_radio", "greetingcardyeslabel", "greetingcardnolabel");
    this.greetingCardContent = new GreetingCardContent();
    var that = this;
    if (dataSource) {

        this.isGreetingCard.setValue(dataSource['is_need_greetingcard']);
        this.greetingCardContent.setNickName(dataSource['gift_message_receiver']);
        this.greetingCardContent.setMainBody(dataSource['gift_message']);
        this.greetingCardContent.setSendName(dataSource['gift_message_sender']);
    }

    this.isGreetingCard.setRadioOnClick(function (obj) {
        if (/.*yeslabel/ig.test(obj)) {
            that.openWrite();
        }
        if (/.*nolabel/ig.test(obj)) {
            that.closeWrite();
        }
    });
    GiftCommon.mouseOverImage('card_image_preview', 'card_image_big');

    //私有函数，打开贺卡编写区域

    this.openWrite = function () {
        $1("greeting_card_main").className = "giftpacking_letter";
        $1("card_price_span").className = "";
    };

    this.closeWrite = function () {
        $1("greeting_card_main").className = "hide";
        $1("card_price_span").className = "hide";
    };
    
    //初始化用
    if (this.isGreetingCard.getValue() === 1) {
        this.openWrite();
    } else {
        this.closeWrite();
    }

}

GreetingCard.prototype.getIsGreetingCard = function () {
    return this.isGreetingCard.getValue()===1;
};

GreetingCard.prototype.setIsGreetingCard = function (para) {
    this.isGreetingCard.setValue(para);
    if (this.isGreetingCard.getValue() === 1) {
        this.openWrite();
    } else {
        this.closeWrite();
    }
};

GreetingCard.prototype.getGreetingCardContent = function () {
    return this.greetingCardContent;
};
