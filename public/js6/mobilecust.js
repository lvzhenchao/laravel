//#region mobile_cust
var CUST_NAME_REGULAR_EXPRESSION = '^[\\w\\u4e00-\\u9fa5]{1,20}$';
var CERT_NUMBER_REGULAR_EXPRESSION = '';
var CUST_MB_REGULAR_EXPRESSION = '^((13[0-9])|(15[^4,\\D])|(18[0-9]))\\d{8}$'; //'^(\\d|\\(|\\)|\\-)*$';//'^1[3|4|5|8][0-9]\d{4,8}$';
var CUST_TEL_REGULAR_EXPRESSION = '^(\\d|\\(|\\)|\\-)*$';

var CERT_ICON_ERROR = '<span class="icon icon-warn"></span>';
var CUST_NAME_FORMAT_ERROR = CERT_ICON_ERROR + '请输入机主姓名';
var CERT_NUMBER_EMPTY_ERROR = CERT_ICON_ERROR + '请填写身份证号';
var CERT_NUMBER_FORMAT_ERROR = CERT_ICON_ERROR + '请填写正确的身份证号';
var CERT_ADDRESS_FORMAT_ERROR = CERT_ICON_ERROR + '请填写正确的证件地址';
var CERT_EXPIRY_DATE_FORMAT_ERROR = CERT_ICON_ERROR + '请输入证件有效期';
var CERT_CUST_TEL_EMPTY_ERROR = CERT_ICON_ERROR + '请填写联系人电话';
var CERT_CUST_TEL_FORMAT_ERROR = CERT_ICON_ERROR + '联系人电话填写不正确';

//#region 证件号
function clearCertNumber(obj) {
    if (obj.value != '请填写证件号') {
        obj.style.color = '#404040'
    }
    else {
        obj.value = '';
        obj.style.color = '#404040';
    }
    $1('cert_number_valid_msg').innerHTML = '';
}

function checkCertNumber(obj) {
    if (obj.value == '') {
        obj.value = '请填写证件号';
        obj.style.color = '#878787';
        return;
    }
    if (!Card.checkCard()) {
        return;
    }
}
//#endregion 证件号

//#region 证件地址
function clearCertAddress(obj) {
    if (obj.value != '请填写证件地址信息') {
        obj.style.color = '#404040'
    }
    else {
        obj.value = '';
        obj.style.color = '#404040'
    }
}

function checkCertAddress(obj) {
    if (obj.value == '') {
        obj.value = '请填写证件地址信息';
        obj.style.color = '#878787'
    }
}
//#endregion 证件地址

//#region 证件有效期
function clearCertDate(obj) {
    if (obj.value != '格式：YYYY.MM.DD' && obj.id == 'txt_cert_expiry_start_date') {
        obj.style.color = '#404040'
    }
    else if (obj.value != '格式：YYYY.MM.DD或长期' && obj.id == 'txt_cert_expiry_end_date') {
        obj.style.color = '#404040'
    }
    else {
        obj.value = '';
        obj.style.color = '#404040';
    }
    $1('cert_expiry_date_valid_msg').innerHTML = '';
}

function checkCertDate(obj) {
    if (obj.value == '') {
        obj.value = obj.id == 'txt_cert_expiry_end_date' ? '格式：YYYY.MM.DD或长期' : '格式：YYYY.MM.DD';
        obj.style.color = '#878787';
        return false;
    }
    if (obj.id == 'txt_cert_expiry_end_date' && obj.value.trim() == '长期') {
        return true;
    }
    if (!DateReg.checkDate(obj) || !DateReg.checkDateRange(obj)) {
        $1('cert_expiry_date_valid_msg').innerHTML = '<span class="icon icon-warn"></span>' + '日期格式不正确';
        return false;
    }
    return true;
}
//#endregion 证件号

//#region 联系电话
function clearCustTel(obj) {
    if (obj.value != '请填写联系人电话') {
        obj.style.color = '#404040'
    }
    else {
        obj.value = '';
        obj.style.color = '#404040'
    }
    $1('cust_tel_valid_msg').innerHTML = '';
}

function checkCustTel(obj) {
    if (obj.value == '') {
        obj.value = '请填写联系人电话';
        obj.style.color = '#878787';
        return;
    }
    var succeed = true;
    succeed = regularExpressionValid('txt_cust_tel', CUST_MB_REGULAR_EXPRESSION, 'cust_tel_valid_msg', CERT_CUST_TEL_FORMAT_ERROR);
    succeed = succeed || regularExpressionValid('txt_cust_tel', CUST_TEL_REGULAR_EXPRESSION, 'cust_tel_valid_msg', CERT_CUST_TEL_FORMAT_ERROR);
    if (!succeed) {
        return;
    }
}
//#endregion 联系电话

var product_id = null;
var product_count = 1;
var shop_id = 0;
var plan_id = null;
var sim_card_id = null;
var plan_period_id = null;
var sim_card_province_id = null;
var sim_card_city_id = null;
var first_month_fee_type = null;
var price_structure_id = null;

function request() {
    var args = new Object();
    var query = location.search.substring(1);      // Get query string
    var pairs = query.split("&");                  // Break at ampersand
    for (var i = 0; i < pairs.length; i++) {
        var pos = pairs[i].indexOf('=');           // Look for "name=value"
        if (pos == -1) continue;                   // If not found, skip
        var argname = pairs[i].substring(0, pos); // Extract the name
        var value = pairs[i].substring(pos + 1);     // Extract the value
        value = decodeURIComponent(value);         // Decode it, if needed
        args[argname.toLocaleLowerCase()] = value;                     // Store as a property
    }
    return args;
}

function getProductIDCount() {
    var url_post_date = location.search.substr(1).split("&");
    var product_id_count = null;

    product_id_count = request().product_ids;
    if (product_id_count != null) {
        var index_temp = product_id_count.indexOf(".");
        product_id = product_id_count;
        if (index_temp > 0) {
            product_id = product_id_count.substring(0, index_temp);
            product_count = product_id_count.substring(index_temp + 1, product_id_count.length);
        }
    }
    shop_id = request().shop_id;
    plan_id = request().plan_id;
    sim_card_id = request().sim_card_id;
    plan_period_id = request().plan_period_id;
    sim_card_province_id = request().sim_card_province_id;
    sim_card_city_id = request().sim_card_city_id;
    first_month_fee_type = request().first_month_fee_type;
    price_structure_id = request().price_structure_id;
}

//#region 入网信息编辑
var MOBILE_CUST_EDITABLE_TEMPLATE = "<a name='mobile_cust_point'></a>"
+ '<div><h4>入网信息</h4></div>'
+ '<div class="info-list">'
        + '<label class="label-w75" for="">机主姓名：</label><input id="txt_cust_name" class="input-w87" type="text" placeholder="" value="{cust_name}">'
        + '<span id="cust_name_valid_msg" class="help-inline help-inline-error"></span>'
+ '</div>'
+ '<div class="info-list">'
    + '<label class="label-w75" for="">证件信息：</label>'
    + '<select class="select-h22" name="" id="">'
        + '<option value="1">身份证&nbsp;</option>'
    + '</select>'
    + '<input id="txt_cert_number" class="input-w260" type="text" placeholder="" onfocus="javascript:clearCertNumber(this);" onblur="javascript:checkCertNumber(this);" value="{cert_number}" />'
    + '<span id="cert_number_valid_msg" class="help-inline help-inline-error"></span>'
+ '</div>'
+ '<div class="info-list" id="div_consignee_addr_cust">'
    + '<label class="label-w75" for="">证件地址：</label>'
    + '<select id="sel_cert_province" class="select-h22">'
        + '<option value="">请选择</option>'
    + '</select>'
    + '<select id="sel_cert_city" class="select-h22">'
        + '<option value="">请选择</option>'
    + '</select>'
    + '<input id="txt_cert_address" class="input-w260" type="text" placeholder="" onfocus="javascript:clearCertAddress(this);" onblur="javascript:checkCertAddress(this);" value="{cert_address}">'
    + '<span class="help-inline help-inline-error" id="cert_address_valid_msg"></span>'
+ '</div>'
+ '<div class="info-list">'
    + '<label class="label-w75" for="">证件有效期：</label>'
    + '<input id="txt_cert_expiry_start_date" maxlength="40" class="input-w87" style="width:150px;" type="text" placeholder="" onfocus="javascript:clearCertDate(this);" onblur="javascript:checkCertDate(this);" value="{cert_expiry_start_date}">'
    + ' - '
    + '<input id="txt_cert_expiry_end_date" maxlength="40" class="input-w87" style="width:150px;" type="text" placeholder="" onfocus="javascript:clearCertDate(this);" onblur="javascript:checkCertDate(this);" value="{cert_expiry_end_date}">'
    + '<span id="cert_expiry_date_valid_msg" class="help-inline help-inline-error"></span>'
+ '</div>'
+ '<div class="info-list">'
        + '<label class="label-w75" for="">联系电话：</label><input id="txt_cust_tel" class="input-w178" type="text" placeholder="" onfocus="javascript:clearCustTel(this);" onblur="javascript:checkCustTel(this);" value="{cust_tel}">'
        + '<span id="cust_tel_valid_msg" class="help-inline help-inline-error"></span>'
+ '</div>'
+ '<p class="color-orange pw_tips">您在签收时必须提供机主本人<b>身份证原件</b>和<b>复印件</b>，作为入网资料在配送到达时回收。</p>'
+ '<div class="warn-box">'
    + '<p class="color-orange net-warn-title"><b>特别提示：</b></p>'
    + '<p>尊敬的用户：</p>'
    + '<p>由于联通规定，一个身份证号只能参加一次iPhone的合约计划，如果同一个身份证号多次下单将被删除订单。</p>'
    + '<ul class="list-tips">'
        + '<li>1.请您在收货前提前准备本人身份证复印件。由于手机实名制要求，办理iPhone合约计划的用户，请在收货时提供本人身份证复印件，同时在入网协议和入网登记单签字确认，当当配送人员将回收您的身份证复印件和入网协议，并交付当地联通公司妥善保存。</li>'
        + '<li>2.为保证您的合法权益，我们将在送货时对入网用户的身份进行验证，请务必确认您填写身份证信息的真实性、一致性；因用户未按规定填写身份证信息造成的一切经济损失由用户自行承担，我公司将不承担任何法律责任。</li>'
        + '<li>3.根据国家关于电话用户实名制登记工作要求，您在签收时须提供记住本人身份证原件和复印件，记住本人的有效证件复印件将作为入网资料在配送到达时一并收回。您可在有效证件复印件上注明“该复印件只用于联通用户入网”。</li>'
        + '<li>4.您在网上营业厅购买中国联通3G产品时，所填写的身份证信息必须为18位身份证号码。</li>'
        + '<li>5.活动详情请咨询联通客服10010。</li>'
    + '</ul>'
+ '</div>'
+ '<p class="btn-bar">'
    + '<a href="javascript:void(0)" id="btn_mobile_cust_save" class="btn btn-large-orange mr-10">确认入网信息</a>'
    + '<span class="deal-contact"><input type="checkbox" id="xieyi_chk" >同意《入网协议》</span><a id="ckxy" href="javascript:void(0)">查看入网协议</a>'
    + '<span class="help-inline help-inline-error" id="span_mobile_cust_save_tips"></span>'
+ '</p>'
+ '<div class="net-identify"><img src="images/net_identify.jpg" alt=""></div>'
+ "<span id='xy_content' style='position:absolute;display:none;z-index:100000000;width:861px'>"
    + "<div class='new_window new_window_xy' >"
      + "<div class='wind_top' id='xieyi_title_bar'>"
        + "<div class='title_left'>中国联通移动业务客户入网服务协议</div>"
        + "<div class='w_close'><a href='javascript:for_99click();' title='关闭' id='xieyi_box_id'>关闭窗口</a></div>"
      + "</div>"
      + "<div class='window_content' id='xieyi_content_bar'>"
        + "<textarea name='textarea' id='textarea' class='case_textarea'>甲方（客户）："
            + "乙方：中国联合网络通信有限公司北京市分公司"
            + "根据《中华人民共和国合同法》、《中华人民共和国电信条例》等有关法律、条例规定，甲乙双方在平等、自愿、公平、诚信的基础上，基于对乙方移动通信服务的了解和需求，甲方自愿申请成为乙方移动用户，并达成协议如下："
            + "第一条 网络服务"
            + "（一）乙方在现有技术条件下的网络覆盖范围内，向甲方提供通信服务。国际漫游服务只能在与乙方签订漫游协议的电信运营商网络覆盖范围内享有。"
            + "（二）乙方提供的网络服务应符合国家规定的通信质量标准。"
            + "（三）乙方依法保障甲方的通信自由和通信秘密。"
            + "第二条 入网要求"
            + "（一）甲方办理入网、变更手续时，应提交以下登记资料："
            + "1、个人客户：提供个人有效身份证件原件（委托他人办理的应同时提交本人及代理人/监护人有效证件），有效身份证件包括居民身份证、军/警官证、港澳居民往来内地通行证、台胞证、护照等；"
            + "2、单位客户：提供单位介绍信（加盖单位公章）、真实有效的注册登记证照副本原件、代理人有效身份证件原件。"
            + "（二）甲方应使用国家给予入网许可标志的移动电话终端设备，当申请开通默认服务以外的服务项目时，移动电话终端设备还应具备相应功能，否则可能无法支持所选服务，甲方将自行承担损失。"
            + "第三条　客户资料"
            + "（一）甲方应保证入网登记资料真实有效、准确完整，并有义务配合乙方对登记资料进行核实。协议有效期内，甲方登记资料如有变更，应主动办理变更手续。如乙方发现甲方登记资料失实，乙方有权暂停甲方网络服务。"
            + "（二）因甲方提供的客户资料不详、不实或变更后未通知乙方并办理变更手续等原因，使乙方无法向甲方提供服务的，乙方不承担相应责任。"
            + "（三）客户的服务密码是甲方办理业务的重要凭证，除非另有约定或说明，凡使用服务密码定制、变更或终止业务的行为均被视为甲方或甲方授权的行为，因此引起的义务与责任均由甲方承担。甲方入网后应立即修改初始服务密码，并妥善保管。如因甲方未及时修改初始服务密码或不慎泄露服务密码导致的影响和损失，由甲方自行承担。"
            + "（四）乙方对甲方提供的信息资料依法负有保密义务，但法律法规另行规定的除外。"
            + "第四条　费用标准和费用交纳"
            + "（一）乙方应在国家电信资费主管部门允许的范围内设定资费标准、向客户明码标价，公告计费方式、缴费期限等信息；甲方应在乙方明示的期限内足额交纳各项通信费用。"
            + "（二）如遇国家统一调整通信费用标准的，按国家统一规定的时间执行。如遇乙方发布、调整资费的，在乙方公告确定的生效日起执行。"
            + "（三）甲方未在约定期限内足额交纳通信费用的，乙方有权暂停甲方网络服务；甲方超过缴费时限，每日须按欠缴金额３‰的标准支付违约金；甲方缴清欠费和违约金后，除甲方明确提出不开通或已销号外，乙方应在24小时内恢复甲方网络服务。 对前述情形，乙方将保留追缴欠费及违约金的权利，也有权以通知单、委托第三方等形式追缴欠费。"
            + "（四）计费周期为自然月，即每月1日00:00至当月最后一日24:00。（由于网络设备产生话单及相关处理会有时延，可能会发生当月部分话费计入后期话费中收取的情况。）"
            + "（五）甲方定制第三方增值业务或其它收费业务，乙方可以代第三方向甲方收取信息费、功能费等，甲方使用第三方提供的增值业务或其它收费业务由第三方制定收费标准并公布。 "
            + "（七）因甲方手机终端中的软件自动升级等原因产生的网络流量，甲方应承担该笔流量所产生的费用。"
            + "（八）甲方如需开通国际及台港澳业务，乙方可根据甲方的信用评级情况要求甲方交纳一定的预付款。"
            + "第五条 风险控制"
            + "（一）甲方应妥善保管自己的移动电话不被非法盗用，若发现通信费用异常增长，经初步核查确有问题的，可及时拨打客服热线10010或到乙方营业网点办理暂时停机手续，并向公安机关报案，乙方应积极配合公安部门调查相关情况，但乙方不承担上述情形对甲方所造成的不良后果。"
            + "（二）甲方未付的通信费用达到话费信用额度时（信用额度是指用户可以用于透支消费的最高话费额度），应及时补充交纳通信费用；当甲方未付的通信费用超过话费信用额度时，乙方有权暂停甲方网络服务。（超过信用额度停机不受约定缴费期限的限制）"
            + "（三）甲方发送违法及其他违反公序良俗内容的信息，或未经接收客户同意大量发送商业广告信息的，乙方有权依据接收客户举报或投诉关闭甲方信息发送功能。"
            + "（四）甲方在欠费情况下，乙方有权拒绝为甲方开办其他业务（含移动、固网、宽带等所有业务），直至其补交全部欠费及违约金。"
            + "（五）一方违约给对方造成损失的，应当依法承担赔偿责任，但任何一方应承担的赔偿损失的责任范围不包括对方未实现的预期利润或利益、商业信誉的损失、数据的丢失、第三方损失及其他间接损失。"
            + "第六条　客户服务"
            + "（一）乙方向甲方提供客户服务电话10010、网上营业厅www.10010.com，以便甲方咨询了解乙方网络服务、业务推广、各类营销优惠活动等内容。乙方还应向甲方免费提供通话所在地（仅限国内不含台港澳）火警119、匪警110、医疗急救120、交通事故报警122等公益性电信服务。"
            + "（二）乙方免费提供给甲方最近5个月的通话详单查询、月结帐单查询（不含查询当月），对甲方通信费用方面的疑问应予以认真核实、详细解答。"
            + "（三）乙方向甲方提供需要甲方支付月功能费的服务项目时，应征得甲方同意；乙方开通服务项目让客户进行体验时，不得收取服务项目月功能费。"
            + "（四）对于甲方通信服务开通/关闭申请，乙方应在承诺的时限内操作完成（双方另有约定的除外）。乙方超过时限未及时开通/关闭的，应减免甲方由此产生的不合理费用。"
            + "（五）乙方因设备搬迁、工程割接、网络及软件升级等可预见的原因，影响或可能影响客户使用的，应提前72小时公告或以其他方式通告所涉及的客户。"
            + "（六）当发生移动电话通信障碍，乙方应在甲方申告障碍时起的48小时内修复，移动电话通信障碍指非手机原因引起的障碍。"
            + "（七）为保证甲方权益，乙方对销号的移动电话号码至少冻结90日后，方可重新投入使用。"
            + "（八）为方便向甲方提供更好的服务，方便甲方了解中国联通各类业务服务和信息，乙方可以以短信、彩信、wappush、电话、电子邮件、信函等方式与甲方就业务和服务进行沟通。"
            + "第七条　号码变更与转让"
            + "（一）由于非甲方原因需要更改其移动号码时，乙方至少提前45日通知甲方，至少提前15日告知甲方新的移动号码。号码更改实施日起，至少应在45日内，乙方向甲方提供所有来话播放改号提示音。"
            + "（二）甲方欲转让移动号码使用权应先缴清通信费等所有费用，转让时须由双方持有效证件原件（委托他人办理的应同时提交本人及代理人/监护人有效证件及授权书）到乙方指定营业网点办理变更登记手续。"
            + "（三）在甲方通过过户成为新机主的情形下，如因原机主未亲自到场办理过户而导致原机主就此提出异议，甲方应无条件放弃因过户产生的全部权益，并承担由此对原机主及对乙方造成的一切损失。过户代理人对此承担连带责任。"
            + "第八条　移动通信卡规定"
            + "（一）甲方可自行设置和清除移动通信卡的个人识别码(初始密码为1234)，连续三次输入错误密码将会锁卡。发生锁卡时，请勿自行解锁，应携带本人有效证件，前往乙方营业网点解锁。因甲方操作不当致使移动通信卡损坏或锁死的，甲方应自行承担换卡所需费用。"
            + "（二）协议期内，甲方若发生移动通信卡遗失、被盗、人为损坏等情形，可向乙方申请办理 “停机”、“补卡”业务，避免损失扩大。甲方不能以此为由拒绝按本协议约定支付通信费用。"
            + "第九条　不可抗力"
            + "因不可抗力导致本协议部分或全部不能履行的，双方可部分或全部免除责任。"
            + "第十条　技术进步"
            + "因技术进步或依据国家有关政策，乙方为提升服务质量对移动电话网络进行整体换代升级而导致移动通信服务无法继续履行的，乙方应该至少提前90日发布公告，并提出合理的解决方案。甲方可就解决方案与乙方协商，但不得要求乙方继续履行本协议。"
            + "第十一条　协议的变更"
            + "乙方在本协议外以公告、使用手册、资费单页等书面形式公开做出的服务承诺，甲方办理各类业务所签署的表单、业务协议等均自动成为本协议的补充协议；与本协议冲突部分以补充协议为准，补充协议中未约定部分以本协议为准。"
            + "第十二条　协议的解除"
            + "甲方要求终止网络服务的（双方另有约定的除外），应在缴清相关费用后办理退网手续，话费余额等按照乙方业务规定和双方约定进行处理。有下列情形之一的，乙方有权单方解除协议，收回号码，并保留追究甲方违约责任的权利："
            + "（一）甲方提供的有效身份证件（包括代理人或监护人提供的有效证件）虚假不实，可能给乙方带来经营风险；"
            + "（二）该手机号码被国家司法机关认定用于违法犯罪活动或其它不当用途；"
            + "（三）乙方收到国家行政管理部门发文要求停止甲方网络服务；"
            + "（四）甲方欠费停机后（含欠费停机当月）3个月内仍未缴清通信费用和违约金。"
            + "第十三条　争议解决方式"
            + "有关协议争议，双方可沟通协商解决；协商不成的，甲方可向当地通信管理局或消费者协会申请进行调解；任何一方均可向乙方住所地的人民法院起诉。"
            + "第十四条　协议生效 "
            + "本协议自双方签字盖章且业务开通之日起生效，有效期一年。到期后，若双方均无异议，本协议以一年为周期逐年自动顺延。"
            + "（甲方承诺：本人已经充分、完整阅读并理解本协议所述全部条款及条件。）"
            + "</textarea>"
        + "<input class='split_ok02' name='' type='button' value='已阅读，同意' id='xieyi_agree'/>"
      + "</div><div id='xieyi_loading_bar' class='loading_gift' style='display: none;'></div>"
    + "</div></span>";
//#endregion 入网信息编辑

//#region 入网信息显示
var MOBILE_CUST_READONLY_TEMPLATE =
     '<h4>入网信息<a id="btn_mobile_cust_edit" href="javascript:void(0)">修改入网信息</a></h4>'
    + '<div class="net-infro"><i class="infro_title">机主姓名：</i><span>{cust_name}&nbsp;</span></div>'
    + '<div class="net-infro"><i class="infro_title">证件信息：</i><span>身份证</span>，<span>{cert_number}&nbsp;</span></div>'
    + '<div class="net-infro"><i class="infro_title">证件地址：</i><span>{cert_province_name}&nbsp;</span><span>{cert_city_name}&nbsp;</span><span>{cert_address}&nbsp;</span></div>'
    + '<div class="net-infro"><i class="infro_title">证件有效期：</i><span>{cert_expiry_start_date}&nbsp;</span>&nbsp;-&nbsp;<span>{cert_expiry_end_date}&nbsp;</span></div>'
    + '<div class="net-infro"><i class="infro_title">联系电话：</i>{cust_tel}&nbsp;</div>';
//#endregion

function openMobileCust() {
    $1('div_mobile_cust_edit_info_display').className = 'consignee_modify consignee_modify_none02';
}

function MobileCust(container_id) {
    var m_data_source = null;
    var m_mobile_cust_save = null;
    var m_mobile_cust_close = null;
    var m_show_status = null;
    var m_mobile_cust_panel = new JSPanel(container_id);
    var objRegion = new Region('div_consignee_addr_cust','0_0','page',0);
    var xieyi_Dialog = null;

    this.setDataSource = function (data_source) {
        m_data_source = data_source;
        m_mobile_cust_panel.DataSource = data_source;
        getProductIDCount();
    };

    this.showReadOnly = function () {
        m_show_status = 0;
        m_mobile_cust_panel.Template = MOBILE_CUST_READONLY_TEMPLATE;
        m_mobile_cust_panel.DataBind();
        $1('div_mobilecust').className = 'item-list';

        $1('btn_mobile_cust_edit').onclick = this.showEditable;
    }

    var btn_mobile_cust_save_click = function () {
        var region_value = null;
        if (!mobile_cust_save_check()) {
            //openMobileCust();
            return;
        }

        region_value = objRegion.getCertValue();
        if (!region_value) {
            return;
        }

        if (!txt_cert_address_check()) {
            return;
        }

        if (!checkCertDate($1('txt_cert_expiry_start_date'))) {
            return;
        }

        if (!checkCertDate($1('txt_cert_expiry_end_date'))) {
            return;
        }

        if (!txt_cust_tel_check()) {
            return;
        }

        if (!$1('xieyi_chk').checked) {
            $1('span_mobile_cust_save_tips').innerHTML = '<span class="icon icon-warn"></span>' + '您需要同意入网协议';
            return;
        }
        else {
            $1('span_mobile_cust_save_tips').innerHTML = '';
        }

        if ($F('txt_cust_name').indexOf('<') >= 0 || $F('txt_cert_address').indexOf('<') >= 0) {
            return;
        }

        var mobile_cust_data = new Hashtable();
        mobile_cust_data['order_sequence_id'] = m_data_source['order_sequence_id'];
        mobile_cust_data['cust_name'] = $F('txt_cust_name');
        mobile_cust_data['cert_type_name'] = '';
        mobile_cust_data['cert_number'] = $F('txt_cert_number');
        mobile_cust_data['cert_province_id'] = region_value['cert_province_id'];
        mobile_cust_data['cert_city_id'] = region_value['cert_city_id'];
        mobile_cust_data['cert_address'] = $F('txt_cert_address');
        mobile_cust_data['cert_expiry_start_date'] = $F('txt_cert_expiry_start_date');
        mobile_cust_data['cert_expiry_end_date'] = $F('txt_cert_expiry_end_date');
        mobile_cust_data['cust_tel'] = $F('txt_cust_tel');
        mobile_cust_data['cur_edit_area'] = 1;
        mobile_cust_data['shop_id'] = m_data_source['shop_id'];
        //必须把套餐信息带上才行，因为套餐信息只有在提交订单的时候才会写入库中。
        
        mobile_cust_data["product_id"] = product_id;
        mobile_cust_data["product_count"] = product_count;
        mobile_cust_data["plan_id"] = plan_id;
        mobile_cust_data["sim_card_id"] = sim_card_id;
        mobile_cust_data["plan_period_id"] = plan_period_id;
        mobile_cust_data["sim_card_province_id"] = sim_card_province_id;
        mobile_cust_data["sim_card_city_id"] = sim_card_city_id;
        mobile_cust_data["first_month_fee_type"] = first_month_fee_type;
        mobile_cust_data["price_structure_id"] = price_structure_id;

        m_mobile_cust_save(mobile_cust_data);
    }

    this.showEditable = function () {
        m_show_status = 1;
        m_mobile_cust_panel.Template = MOBILE_CUST_EDITABLE_TEMPLATE;
        m_mobile_cust_panel.DataBind();
        $1('div_mobilecust').className = 'item-net';

        SHIP_MB_REGULAR_EXPRESSION = m_data_source["ship_mb_regular_expression"];

        objRegion.setCertValue(m_data_source['cert_province_id'], m_data_source['cert_city_id']);

        if ($1('txt_cert_number').value == '') {
            $1('txt_cert_number').value = '请填写证件号';
            $1('txt_cert_number').style.color = '#878787';
        }
        else {//当用户已经保存过入网信息的时候，那么同意协议选项为选中状态
            $1('xieyi_chk').checked = true;
        }

        if ($1('txt_cert_address').value == '') {
            $1('txt_cert_address').value = '请填写证件地址信息';
            $1('txt_cert_address').style.color = '#878787';
        }

        if ($1('txt_cust_tel').value == '') {
            $1('txt_cust_tel').value = '请填写联系人电话';
            $1('txt_cust_tel').style.color = '#878787';
        }

        $1('btn_mobile_cust_save').onclick = btn_mobile_cust_save_click;
        if (m_data_source['town_id'] > 0) {
            //$1('btn_mobile_cust_close').className = '';
            //$1('btn_mobile_cust_close').onclick = function () {
            //    m_mobile_cust_close();
            //};

            //#region 协议相关
            xieyi_Dialog = new DivModelDialog('xy_content', 'xieyi_title_bar', 'xieyi_box_id', 'div_shield', 'xieyi_content_bar', 'xieyi_loading_bar');

            $1('ckxy').onclick = function () {
                var win_size = getWinSize();
                
                xieyi_Dialog.show((win_size[0] - 1300) / 2, getScrollTop() - 300);
            }

            $1('xieyi_agree').onclick = function () {
                $1('xieyi_chk').checked = true;
                $1('xieyi_box_id').click();
            }

            //#endregion
        }
        //else {
        //    $1('btn_mobile_cust_close').className = 'objhide';
        //}
    }

    this.isEditStatus = function () {
        return m_show_status == 1;
    }

    this.setMobileCustSave = function (mobile_cust_save) {
        m_mobile_cust_save = mobile_cust_save;
    }

    this.setMobileCustClose = function (mobile_cust_close) {
        m_mobile_cust_close = mobile_cust_close;
    }

    var txt_cust_name_check = function () {
        return requireFieldValid('txt_cust_name', 'cust_name_valid_msg', CUST_NAME_FORMAT_ERROR);
    }

    var txt_cert_number_check = function () {
        var cert_number = $1('txt_cert_number').value.trim();
        if (cert_number == '') {
            $1('cert_number_valid_msg').innerHTML = CERT_CUST_TEL_FORMAT_ERROR;
            $1('cert_number_valid_msg').style.visibility = 'visible';
            return false;
        }
        var succeed = Card.checkCard(); //regularExpressionValid('txt_cert_number', CERT_NUMBER_REGULAR_EXPRESSION, 'cert_number_valid_msg', CERT_NUMBER_FORMAT_ERROR);

        return succeed;
    }

    var txt_cert_address_check = function () {
        var flag = true;
        if ($1('txt_cert_address').value == '请填写证件地址信息' || $1('txt_cert_address').value == '') {
            $1('cert_address_valid_msg').innerHTML = CERT_ADDRESS_FORMAT_ERROR;
            flag = false;
        }
        return flag;
    }

    var txt_cust_tel_check = function () {
        var cust_tel = $1('txt_cust_tel').value.trim();
        if (cust_tel == '') {
            $1('cust_tel_valid_msg').innerHTML = CERT_CUST_TEL_FORMAT_ERROR;
            $1('cust_tel_valid_msg').style.visibility = 'visible';
            return false;
        }

        var succeed = true;
        succeed = regularExpressionValid('txt_cust_tel', CUST_MB_REGULAR_EXPRESSION, 'cust_tel_valid_msg', CERT_CUST_TEL_FORMAT_ERROR);
        succeed = succeed || regularExpressionValid('txt_cust_tel', CUST_TEL_REGULAR_EXPRESSION, 'cust_tel_valid_msg', CERT_CUST_TEL_FORMAT_ERROR);
        return succeed;
    }

    var mobile_cust_save_check = function () {
        return txt_cust_name_check() && txt_cert_number_check()/* && txt_cert_address_check() && txt_cust_tel_check()*/;
    }

    this.setHignLight = function () {
        $1('btn_mobile_cust_save').className = 'save_button';
        $1('mobile_cust_tips').className = 'consignee list_wrong consignee_rw';
    }

    this.setDisabled = function () {
        $disabled('btn_mobile_cust_save');
        $wait('btn_mobile_cust_save');
    }

    this.setMobileCustSaveConfig = function (config_tips) {
        $1('span_mobile_cust_save_tips').innerHTML = config_tips;
        $1('span_mobile_cust_save_tips').className = 'news_red2';
    }

    this.setSubmitConflictTips = function () {
        var region_value = null;
        if (!mobile_cust_save_check()) {
            return;
        }
        region_value = objRegion.getCertValue();
        if ($F('txt_cust_name').indexOf('<') >= 0 || $F('txt_cert_address').indexOf('<') >= 0) {
            return;
        }
    }
}
//#endregion mobile_cust 

//#region 验证身份证相关

var vcity = {
    11: "北京", 12: "天津", 13: "河北", 14: "山西", 15: "内蒙古",
    21: "辽宁", 22: "吉林", 23: "黑龙江", 31: "上海", 32: "江苏",
    33: "浙江", 34: "安徽", 35: "福建", 36: "江西", 37: "山东", 41: "河南",
    42: "湖北", 43: "湖南", 44: "广东", 45: "广西", 46: "海南", 50: "重庆",
    51: "四川", 52: "贵州", 53: "云南", 54: "西藏", 61: "陕西", 62: "甘肃",
    63: "青海", 64: "宁夏", 65: "新疆", 71: "台湾", 81: "香港", 82: "澳门", 91: "国外"
};

var Card = window.Card || {};

Card.checkCard = function () {
    var card = $1("txt_cert_number").value;
    //是否为空
    if (card === '') {
        //alert('请输入身份证号，身份证号不能为空');
        $1('cert_number_valid_msg').innerHTML = CERT_NUMBER_FORMAT_ERROR;
        $1('cert_number_valid_msg').style.visibility = 'visible';
        return false;
    }
    //校验长度，类型
    if (Card.isCardNo(card) === false) {
        //alert('您输入的身份证号码不正确，请重新输入');
        $1('cert_number_valid_msg').innerHTML = CERT_NUMBER_FORMAT_ERROR;
        $1('cert_number_valid_msg').style.visibility = 'visible';
        return false;
    }
    //检查省份
    if (Card.checkProvince(card) === false) {
        //alert('您输入的身份证号码不正确,请重新输入');
        $1('cert_number_valid_msg').innerHTML = CERT_NUMBER_FORMAT_ERROR;
        $1('cert_number_valid_msg').style.visibility = 'visible';
        return false;
    }
    //校验生日
    if (Card.checkBirthday(card) === false) {
        //alert('您输入的身份证号码生日不正确,请重新输入');
        $1('cert_number_valid_msg').innerHTML = CERT_NUMBER_FORMAT_ERROR;
        $1('cert_number_valid_msg').style.visibility = 'visible';
        return false;
    }
    //检验位的检测
    if (Card.checkParity(card) === false) {
        //alert('您的身份证校验位不正确,请重新输入');
        $1('cert_number_valid_msg').innerHTML = CERT_NUMBER_FORMAT_ERROR;
        $1('cert_number_valid_msg').style.visibility = 'visible';
        return false;
    }
    return true;
};


//检查号码是否符合规范，包括长度，类型
Card.isCardNo = function (card) {
    //身份证号码为15位或者18位，15位时全为数字，18位前17位为数字，最后一位是校验位，可能为数字或字符X
    var reg = /(^\d{15}$)|(^\d{17}(\d|X)$)/;
    if (reg.test(card) === false) {
        return false;
    }

    return true;
};

//取身份证前两位,校验省份
Card.checkProvince = function (card) {
    var province = card.substr(0, 2);
    if (vcity[province] == undefined) {
        return false;
    }
    return true;
};

//检查生日是否正确
Card.checkBirthday = function (card) {
    var len = card.length;
    //身份证15位时，次序为省（3位）市（3位）年（2位）月（2位）日（2位）校验位（3位），皆为数字
    if (len == '15') {
        var re_fifteen = /^(\d{6})(\d{2})(\d{2})(\d{2})(\d{3})$/;
        var arr_data = card.match(re_fifteen);
        var year = arr_data[2];
        var month = arr_data[3];
        var day = arr_data[4];
        var birthday = new Date('19' + year + '/' + month + '/' + day);
        return Card.verifyBirthday('19' + year, month, day, birthday);
    }
    //身份证18位时，次序为省（3位）市（3位）年（4位）月（2位）日（2位）校验位（4位），校验位末尾可能为X
    if (len == '18') {
        var re_eighteen = /^(\d{6})(\d{4})(\d{2})(\d{2})(\d{3})([0-9]|X)$/;
        var arr_data = card.match(re_eighteen);
        var year = arr_data[2];
        var month = arr_data[3];
        var day = arr_data[4];
        var birthday = new Date(year + '/' + month + '/' + day);
        return Card.verifyBirthday(year, month, day, birthday);
    }
    return false;
};

//校验日期
Card.verifyBirthday = function (year, month, day, birthday) {
    var now = new Date();
    var now_year = now.getFullYear();
    //年月日是否合理
    if (birthday.getFullYear() == year && (birthday.getMonth() + 1) == month && birthday.getDate() == day) {
        //判断年份的范围（3岁到100岁之间)
        var time = now_year - year;
        if (time >= 3 && time <= 100) {
            return true;
        }
        return false;
    }
    return false;
};

//校验位的检测
Card.checkParity = function (card) {
    //15位转18位
    card = Card.changeFivteenToEighteen(card);
    var len = card.length;
    if (len == '18') {
        var arrInt = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2);
        var arrCh = new Array('1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2');
        var cardTemp = 0, i, valnum;
        for (i = 0; i < 17; i++) {
            cardTemp += card.substr(i, 1) * arrInt[i];
        }
        valnum = arrCh[cardTemp % 11];
        if (valnum == card.substr(17, 1)) {
            return true;
        }
        return false;
    }
    return false;
};

//15位转18位身份证号
Card.changeFivteenToEighteen = function (card) {
    if (card.length == '15') {
        var arrInt = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2);
        var arrCh = new Array('1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2');
        var cardTemp = 0, i;
        card = card.substr(0, 6) + '19' + card.substr(6, card.length - 6);
        for (i = 0; i < 17; i++) {
            cardTemp += card.substr(i, 1) * arrInt[i];
        }
        card += arrCh[cardTemp % 11];
        return card;
    }
    return card;
};
//#endregion

//#region 验证日期

var DateReg = window.DateReg || {};

DateReg.checkDate = function (obj) {
    /// <summary>检测日期格式是否正确 日期格式为 2012-12-19 孟凡威 20121022</summary>
    /// <param name="" type="int"></param>
    /// <param name="" type="int"></param>
    /// <returns type="" />

    //    var A = /^(?:(?!0000)[0-9]{4}\/(?:(?:0[1-9]|1[0-2])\/(?:0[1-9]|1[0-9]|2[0-8])|(?:0[13-9]|1[0-2])\/(?:29|30)|(?:0[13578]|1[02])\/31)|(?:[0-9]{2}(?:0[48]|[2468][048]|[13579][26])|(?:0[48]|[2468][048]|[13579][26])00)\/02\/29)$/;
    var A = /^(?:(?!0000)[0-9]{4}.(?:(?:0[1-9]|1[0-2]).(?:0[1-9]|1[0-9]|2[0-8])|(?:0[13-9]|1[0-2]).(?:29|30)|(?:0[13578]|1[02]).31)|(?:[0-9]{2}(?:0[48]|[2468][048]|[13579][26])|(?:0[48]|[2468][048]|[13579][26])00).02.29)$/;
    var C = obj.value.trim().split(".");
    if (C.length == 3) {
        if (C[1].length == 1) {
            C[1] = "0" + C[1]
        }
        if (C[2].length == 1) {
            C[2] = "0" + C[2]
        }
        obj.value = C[0] + "." + C[1] + "." + C[2];
        return A.test(obj.value)
    }
    return false;
}

DateReg.checkDateNull = function (obj) {
    /// <summary>检测日期是否输入 孟凡威 20121022</summary>
    /// <param name="" type="int"></param>
    /// <param name="" type="int"></param>
    /// <returns type="" />
    var C = obj.value.trim().split("-");
    if (C.length <= 0) {
        return false;
    }
    return true;
}

DateReg.checkDateRange = function (obj) {
    var C = obj.value.trim().split(".");
    if (C.length <= 0) {
        return false;
    }
    var y = C[0];
    if (y < 1795 || y > 9999) {
        return false;
    }
    return true;
}

//#endregion
