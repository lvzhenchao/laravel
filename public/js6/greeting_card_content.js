/*var main_body
贺卡正文区域
*/
function GreetingCardContent() {
    /** **/
    var NICK_NAME_CUSTOM_VALUE = "对方昵称";
    var SENDER_NAME_CUSTOM_VALUE = "你的署名";
    var MAIN_BODY_CUSTOM_VALUE = "输入你想说的话...";
    var MAIN_BODY_VALUE_MAX = 120;
    this.nickName = $1('card_nick_name');
    this.senderName = $1('card_sender_name');
    this.mainBody = $1('card_main_body');

    //正文字数控制
    this.main_body_keyup = (function(obj) {
        return function() {
            var len; //记录剩余字符串的长度
            var now_value = obj.value;
            if (now_value==MAIN_BODY_CUSTOM_VALUE) {
                now_value = '';
            }
            if (now_value.length >= MAIN_BODY_VALUE_MAX) {
                len = 0;
                if (now_value.length > MAIN_BODY_VALUE_MAX) {
                    obj.value = now_value.substr(0, MAIN_BODY_VALUE_MAX);
                }
            } else {
                len = MAIN_BODY_VALUE_MAX - now_value.length;
            }
            document.getElementById("card_number").innerHTML = len;
        };
    })(this.mainBody);

    this.main_body_onkeydown = (function (obj) {
        return function() {
            if (obj.value.length >= MAIN_BODY_VALUE_MAX) {
                return;
            }
        };
    })(this.mainBody);
    this.mainBody.onkeyup = this.main_body_keyup;
    this.mainBody.onkeydown = this.main_body_onkeydown;

    var mousekeyMonitor = function (obj, customValue,type) {

        if (type=="focus") {
            if (obj.value == customValue) {
                obj.value = "";
                return;
            }
        }
        if (type=="blur") {
            if (obj.value == "") {
                obj.value = customValue;
                return;
            }
        }
    };

    var customTip = function (obj, customValue) {
        
        obj.onfocus = (function() {
            return function() {
                mousekeyMonitor(this, customValue,"focus");
            };
        })();
        
        obj.onblur = (function () {
            return function () {
                mousekeyMonitor(this, customValue,"blur");
            };
        })();
    };

    customTip(this.nickName, NICK_NAME_CUSTOM_VALUE);
    customTip(this.senderName, SENDER_NAME_CUSTOM_VALUE);
    customTip(this.mainBody, MAIN_BODY_CUSTOM_VALUE);

}

GreetingCardContent.prototype.setNickName = function (dNickName) {
    if (dNickName) {
        this.nickName.value = dNickName;
    } else {
        this.nickName.value = '对方昵称';
    }
};

GreetingCardContent.prototype.getNickName = function () {
    if (this.nickName.value != '对方昵称') {
        return this.nickName.value;
    }
    return '';
};

GreetingCardContent.prototype.setSendName = function (dSendName) {
    if (dSendName) {
        this.senderName.value = dSendName;
    } else {
        this.senderName.value = '你的署名';
    }
};

GreetingCardContent.prototype.getSendName = function () {
    if (this.senderName.value != '你的署名') {
        return this.senderName.value;

    }
    return '';
};

GreetingCardContent.prototype.setMainBody = function (dMainBody) {
    if (dMainBody) {
        this.mainBody.innerHTML = dMainBody;
    } else {
        this.mainBody.innerHTML = '输入你想说的话...';
    }
    this.main_body_keyup(this);
    this.main_body_onkeydown(this);
};

GreetingCardContent.prototype.getMainBody = function () {
    if (this.mainBody.value != '输入你想说的话...') {
        return this.mainBody.value;
    }
    return '';
};

GreetingCardContent.prototype.show = function () {
    $1("greeting_card_main").className = "giftpacking_letter";
};

GreetingCardContent.prototype.hide = function () {
    $1("greeting_card_main").className = "hide";
};

