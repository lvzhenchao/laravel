/*
礼品包装通用函数
*/
//#region mouseoverandout
function GiftCommon() {
};

GiftCommon.mouseOverImage = function (obj_litte, obj_big, obj_big_image, big_image) {
    if (obj_big != null && obj_litte != null) {
        $1(obj_litte).onmouseover = (function (m_obj_litte, m_obj_big, m_obj_big_image, m_big_image) {
            return function () {
                if (m_obj_big_image) {
                    $1(m_obj_big_image).src = m_big_image;
                }
                $1(m_obj_big).className = $1(m_obj_big).className.replace(" hide", "");
            };
        })(obj_litte, obj_big, obj_big_image, big_image);
        
        $1(obj_litte).onmouseout = (function (m_obj_big) {
            return function () {
                $1(m_obj_big).className = $1(m_obj_big).className.replace(" hide", "");
                $1(m_obj_big).className = $1(m_obj_big).className + " hide";
            };
        })(obj_big);
    }
};
//#endregion mouseoverandout