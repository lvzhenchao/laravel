function GiftMobile(parameters) {
    this.input = $1('txt_gift_sender_phone');
    if (this.input.value=='') {
        this.input.value = '输入您的手机号';
    }

    this.input.onclick = function () {
        if (this.value === '输入您的手机号') {
            this.value = '';
        }
    };

    this.input.onblur = function () {
        if (this.value === '') {
            this.value = '输入您的手机号';
        }
    };


    this.input.onkeydown = function () {

    };
    this.input.onkeyup = function () {
        var reg = new RegExp(REGEX_SHIP_MB);
        if (this.value && reg.test(this.value) || this.value == '输入您的手机号') {
            $1('illegal_phone_tip').className = 'hide';
        }
    };
}

GiftMobile.prototype.getPhoneNum = function () {
    if (this.input.value == '输入您的手机号') {
        return '';
    }
    return this.input.value;
};
GiftMobile.prototype.checkPhoneNum = function () {
    var reg = new RegExp(REGEX_SHIP_MB);
    if (this.input.value && reg.test(this.input.value) || this.input.value == '输入您的手机号') {
        $1('illegal_phone_tip').className = 'hide';
        return true;
    } else {
        $1('illegal_phone_tip').className = 'help-inline help-inline-error help-inline-large';
        return false;
    }
};