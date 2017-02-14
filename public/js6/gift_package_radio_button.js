/*
礼品包装单选框
*/
function GiftPackageRadioButton(mCheckedClass, mUncheckedClass, mRadioIds) {
    this.m_radioOnClick = null;
    this.radio_ids = Array.prototype.slice.call(arguments).slice(2);
    this.radio_checked_class = mCheckedClass;
    this.radio_unchecked_class = mUncheckedClass;

    this._getAClassname = function (obj) {
        return $1(obj.substring(0, obj.indexOf('label'))).className;
    };

}

GiftPackageRadioButton.prototype.getValue = function () {
    for (var i = 0; i < this.radio_ids.length; i++) {
        if (this._getAClassname(this.radio_ids[i]) == this.radio_checked_class) {
            return i + 1;
        }
    }
    return 1;
};

GiftPackageRadioButton.prototype.setValue = function (index) {
    for (var i = 0; i < this.radio_ids.length; i++) {
        var a = this.radio_ids[i].substring(0, this.radio_ids[i].indexOf('label'));
        if (index - 1 === i) {
            $1(a).className = this.radio_checked_class;
            if ($1(a).click) {
                $1(a).click();
            }
        } else {
            $1(a).className = this.radio_unchecked_class;
        }
    }
};

GiftPackageRadioButton.prototype.radioClick = function () {

    for (var i = 0; i < this.radio_ids.length; i++) {
        $1(this.radio_ids[i]).onclick = (function (obj, mRadioIds, mRadioCheckedClass, mRadioUncheckedClass, mRadioOnClick) {

            return function () {
                for (var j = 0; j < mRadioIds.length; j++) {
                    if (obj == mRadioIds[j]) {
                        $1(obj.substring(0, obj.indexOf('label'))).className = mRadioCheckedClass;
                        if (mRadioOnClick != null) {
                            mRadioOnClick(mRadioIds[j]);
                        }
                    } else {
                        $1(mRadioIds[j].substring(0, mRadioIds[j].indexOf('label'))).className = mRadioUncheckedClass;
                    }
                }
            };

        })(this.radio_ids[i], this.radio_ids, this.radio_checked_class, this.radio_unchecked_class, this.m_radioOnClick);
    }
};

GiftPackageRadioButton.prototype.setRadioOnClick = function (radioOnClick) {
    this.m_radioOnClick = radioOnClick;
    this.radioClick();
};