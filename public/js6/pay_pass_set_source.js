/**
 * DD_Control 当当控制类
 * DD_Control.include 动态加载js和css
 * DD_Control.load_jquery 验证并加载jquery类库
 * DD_Control.cookie Cookie操作（获取、加或改、解除）
 * DD_Control.timer 全局定时器
 * DD_Control.js 自定义js操作相关函数
 */
document.write('<link href="http://customer.dangdang.com/change/static/order_form_pop.css" id="pop_css" rel="stylesheet" type="text/css">');
var DD_Control = {
    domain:"http://customer.dangdang.com/"
};
//动态调取文件css与js
DD_Control.include = {
    //调用css文件并执行参数函数
    include_css:function(file,func){
        if(!jQuery.browser.mozilla && !jQuery.browser.msie && !jQuery.browser.opera)
            var webkit_css_cont = document.styleSheets.length;//webkit浏览器css加载完成后document.styleSheets.length数量会增加1
        var h = document.getElementsByTagName('head')[0];
        var link = document.createElement('link');
        link.rel = 'stylesheet';
        link.type='text/css';
        link.href=file;
        h.appendChild(link);
        if(jQuery.browser.msie || jQuery.browser.opera){//ie和opera
            link.onreadystatechange = function(){
                if(link.readyState == 'loaded' || link.readyState == 'complete'){
                    func();
                }
            }
        }else if(jQuery.browser.mozilla){//firefox
            var ff_ld = setInterval(function(){
                try{
                    link.sheet.cssRules;//css加载完成后会有这个对象，否则没有
                    func();
                    clearInterval(ff_ld);
                }catch(e){
                    if(e.code==1000||e.code==18){
                        func();
                        clearInterval(ff_ld);
                    }
                }
            },10);
        }else{
            var webkit_ld = setInterval(function(){
                if(document.styleSheets.length > webkit_css_cont){
                    func();
                    clearInterval(webkit_ld);
                }
            },10);
        }
    },
    //调用js文件并执行参数函数
    include_js:function(file,func){
        var h=document.getElementsByTagName('head')[0];
        var link=document.createElement("script");
        link.language='javascript';
        link.type = 'text/javascript';
        link.src = file;
        if(document.all){//IE
            link.onreadystatechange = function(){
                if(link.readyState == 'complete' || link.readyState == 'loaded'){
                    func();
                }
            }
        }else{
            link.onload = function(){
                func();
            }
        }
        h.appendChild(link);
    },
    //只调用js文件
    include_js_only:function(file){
        var h=document.getElementsByTagName('head')[0];
        var link=document.createElement("script");
        link.language='javascript';
        link.type = 'text/javascript';
        link.src = file;
        h.appendChild(link);
    }
};
//载入jquery文件
DD_Control.load_jquery = {
    jquery_file : DD_Control.domain+"change/static/jquery-1.4.2.min.js",
    load:function(func,file){
        var notHave = false;
        if(typeof jQuery=='undefined')
            notHave = true;
        else if(jQuery.fn.jquery.substr(0,1)<1||jQuery.fn.jquery.substr(2,1)<4)
            notHave = true;
        if(!file)
            file = this.jquery_file;
        if(notHave)
            DD_Control.include.include_js(file,func);
        else
            func();
    }
};
//cookie操作获取、设置、删除
DD_Control.cookie = {
    get:function(name,type){
        var cookies = document.cookie.split("; ");
        var gets = [],temp;
        if(type==""||typeof type=="undefined"){
            for(var i = 0;i<cookies.length;i++){
                temp = cookies[i].split("=");
                gets[temp[0]] = unescape(temp[1]);
            }
            if(name) return gets[name];
            else return '';
        }else{
            var tempcookie = '';
            for(i=0;i<cookies.length;i++){
                if(cookies[i].indexOf(type+"=")>-1){
                    tempcookie=cookies[i].replace(type+"=","").split("&");
                    for(var x=0;x<tempcookie.length;x++){
                        temp = tempcookie[x].split("=")  ;
                        gets[temp[0]] = unescape(temp[1]);
                    }
                }
            }
            if(name) return gets[name];
            else return '';
        }
    },
    set:function(name,value,expires,path,domain,secure){
        if(!name || !value ) return false;
        if(name=="" || value=="") return false;
        var today = new Date();
        if(expires){
            if(/^[0-9]+$/.test(expires)){
                expires = new Date(today.getTime()+expires*1000).toGMTString();
            }else if(!/^wed, d{2} w{3} d{4} d{2}:d{2}:d{2} GMT$/.test(expires)){
                expires = undefined;
            }
        }else{
            expires = new Date(today.getTime()+3600000*24*365).toGMTString();
        }
        var cookies = name+"="+escape(value)+";"
        + ((expires) ? " expires="+expires+";" : "")
        + ((path) ? "path="+path+";" : "")
        + ((domain) ? "domain="+domain+";" : "")
        + ((secure && secure != 0) ? "secure" : "");
        if(cookies.length < 4096){
            document.cookie = cookies;
            return true;
        }else{
            return false;
        }
    },
    del:function(name,path,domain){
        if(!name) return false;
        if(name == "") return false;
        if(!this.Get(name)) return false;
        document.cookie = name+"=;"
        + ((path) ? "path="+path+";" : "")
        + ((domain) ? "domain="+domain+";" : "")
        + "expires=Thu, 01-Jan-1970 00:00:01 GMT;";
        return true;
    }
};
//timer计时器
DD_Control.timer = {
    timerHandle:null,
    run:function(func,time){
        if(time=="undefined") time = 1000;
        DD_Control.timer.timerHandle = setInterval(function(){
            func();
        },time);
    }
};
DD_Control.js = {
    compare:function(fobj,sobj){
        if(fobj==sobj) return true;
        var flength = 0;
        var slength = 0;
        for(var ele in fobj){
            flength++;
        }
        for(var ele in sobj){
            slength++;
        }
        if(flength!=slength) return false;
        if(fobj.constructor==sobj.constructor){
            for(var ele in fobj){
                if(typeof fobj[ele]=="object"){
                    if(!DD_Control.js.compare(fobj[ele], sobj[ele]))
                        return false;
                }else if(typeof fobj[ele]=="function"){
                    if(fobj[ele].toString()!=sobj[ele].toString())
                        return false;
                }else if(fobj[ele]!=sobj[ele])
                    return false;
            }
            return true;
        }else
            return false;
    },//比较两个对象
    randArray:function(array){
        return array[Math.floor(Math.random()*array.length)];
    }//随机获取数组值
};
//实用工具
DD_Control.util = {
    //获取浏览器类型与版本信息
    getBrowserVersion:function (customUa){
        var UNKNOW = 'unknow';
        var ua = customUa || navigator.userAgent.toLowerCase();
        if(!ua) return {
            type : UNKNOW,
            version : UNKNOW
        }
        var type = UNKNOW, version = UNKNOW, v;
        var check = function(regex){
            return regex.test(ua);
        };
        //IE
        if(check(/msie/) && !check(/opera/)){
            type = 'ie';
            v = /msie[\/|\s]*([\d+?\.?]+)/.exec(ua);
        }
        //firefox
        else if((!check(/webkit/) && check(/gecko/) && check(/firefox/)) && !check(/opera/)){
            type = 'firefox';
            v = /firefox[\/|\s]*([\d+?\.?]+)/.exec(ua);
        }
        //chrome
        else if(check(/\bchrome\b/)){
            type = 'chrome';
            v = /chrome[\/|\s]*([\d+?\.?]+)/.exec(ua);
        }
        //safari (!check(/\bchrome\b/) is ensure by non-chrome above)
        else if(check(/applewebkit/) && check(/safari/)){
            type = 'safari';
            v = /version[\/|\s]*([\d+?\.?]+)/.exec(ua);
        }else if(check(/opera/)){
            type = 'opera';
            v = /version[\/|\s]*([\d+?.?]+)/.exec(ua) || /opera[\/|\s]*([\d+?.?]+)/.exec(ua);
        }
        return {
            type : type,
            version : version = (v && v[1]) ? v[1] : UNKNOW
        };
    }

};

//支付密码弹出层
var pay_pass_set={
    mobile_data_url_domin:"http://login.dangdang.com/",
    mobile_win_css:"http://customer.dangdang.com/change/static/order_form_pop.css",
    windowbackhtml:"<div style=\"width: 100%; left: 0px; top: 0px; z-index: 9999; display: block; position: absolute; background-color:silver;filter:alpha(opacity = 50);opacity:.5;zoom:1; \" id=\"paypass_background\"></div>",
    window_login_div_html:"<div  id=\"paypass_window\" style=\"display:none;position: absolute; top: 0px;left: 0;margin-left: 0px;z-index: 10000;\"></div>",
    return_data:'',

    paypass_step01_html:"<!--支付密码第一步:手机-->\n\
    <div class=\"window_payment\">\n\
      <div class=\"wind_top\">\n\
        <div class=\"title_left\">支付密码</div>\n\
        <div class=\"w_close\"><a href=\"javascript:pay_pass_set.close_mobile_win();\" title=\"关闭\">关闭窗口</a></div>\n\
      </div>\n\
      <div class=\"window_content\">\n\
        <div class=\"payment_tophint\">为了您的账户安全，必须先进行支付密码设置！</div>\n\
        <div class=\"payment_step\"><span class=\"step01\">1.验证身份</span><span>2.设置支付密码</span><span>3.完 成</span></div>\n\
        <div class=\"payment_firststep\">\n\
          <p><span class=\"title\" id=\"account_type_name\"></span><b id=\"account_type_data\"></b></p>\n\
          <p class=\"clearfix obtain_box\"><input id=\"get_mobile_vcode_btn\" name=\"get_mobile_vcode_btn\" onclick=\"pay_pass_set.sendMobileVcodeStep1()\" type=\"button\" value=\"获取验证码\" width=\"90px\" /><span class=\"wrong\" id=\"get_mobile_vcode_err_desc\"></span></p>\n\
        </div>\n\
        <div class=\"payment_input\">\n\
        <div >\n\
          <p id=\"mobile_vcode_p\"><label>验证码：</label><input id=\"mobile_vcode_txt\" onfocus=\"pay_pass_set.step1VcodeOnFocus('mobile_vcode_txt','mobile_vcode_err_desc')\" onblur=\"pay_pass_set.checkMobileVcode()\" onkeydown=\"pay_pass_set.CheckdoSubmit(event,pay_pass_set.summitStep1)\" maxlength=\"6\" name=\"mobile_vcode_txt\"  type=\"text\" class=\"vcode\" /><span class=\"wrong\" id=\"mobile_vcode_err_desc\"></span></p>\n\
          <p class=\"tit\"><span class=\"hint02\"></span></p>\n\
        </div>\n\
        <div id=\"graphic_vcode_div\" style=\"display:none\">\n\
          <p id=\"graphic_vcode_p\"><label>图形验证码：</label><input id=\"graphic_vcode_txt\" onkeydown=\"pay_pass_set.CheckdoSubmit(event,pay_pass_set.summitStep1)\" onblur=\"pay_pass_set.check_graphic_vcode_null()\" onfocus=\"pay_pass_set.step1VcodeOnFocus('graphic_vcode_txt','graphic_vcode_err_desc')\"  maxlength=\"4\" name=\"graphic_vcode_txt\"  type=\"text\" class=\"vcode\" /><span class=\"hint02\"><a id=\"vcode_img_a\" href=\"javascript:ddvcode.show_vcode('imgVcode')\"><img id=\"imgVcode\" width=\"100\" height=\"30\" /></a></span><span class=\"wrong\" id=\"graphic_vcode_err_desc\"></span></p>\n\
          <p class=\"tit\"><span class=\"hint02\"></span></p>\n\
        </div>\n\
        <input type=\"hidden\" id=\"action\" name=\"action\" value=\"mobile_verify\" />\n\
          <p class=\"btn\" ><button id=\"button\" onclick=\"javascript:void(pay_pass_set.summitStep1())\">下一步</button></p>\n\
        </div>\n\
        <div class=\"payment_service\">身份验证遇到了问题？请联系客服：400-106-6666</div>\n\
        </div>\n\
    </div>", 
    paypass_step02_html:"<!--支付密码第二步-->\n\
    <div class=\"window_payment\">\n\
      <div class=\"wind_top\">\n\
        <div class=\"title_left\">支付密码</div>\n\
        <div class=\"w_close\"><a href=\"javascript:pay_pass_set.close_mobile_win();\" title=\"关闭\">关闭窗口</a></div>\n\
      </div>\n\
      <div class=\"window_content\">\n\
        <div class=\"payment_step\"><span class=\"step01\">1.验证身份</span><span class=\"step02\">2.设置支付密码</span><span>3.完 成</span></div>\n\
        <div class=\"payment_input\">\n\
            <input type=\"hidden\" id=\"mobile_vcode_txt\" name=\"mobile_vcode_txt\" value=\"\" />\n\
            <input type=\"hidden\" id=\"action\" name=\"action\" value=\"mobile_verify\" />\n\
          <p><label>支付密码：</label><input onselectstart=\"return false;\" onpaste=\"return false;\" name=\"txt_new_pass\"  id=\"txt_new_pass\" maxlength=\"20\" onKeyUp=\"pay_pass_set.paymentWStrength(this.value)\" type=\"password\" onfocus=\"pay_pass_set.focuscheckPaymentPwd()\" onblur=\"pay_pass_set.checkSetPaymentPwd()\" /><span class=\"intensity\" id=\"span_intensity_check_blur\"></span><span class=\"hint\" id=\"span_pass_strength\"><span>弱</span><span id=\"span_intensity_check\" class=\"strength01\"><i class=\"now\"><b></b></i><i><b></b></i></span><span>强</span></span></p>\n\
          <p class=\"tit\"><span class=\"wrong\" id=\"txt_new_pass_err_desc\"></span><span id=\"txt_new_pass_focus_desc\" class=\"hint02\"></span><span class=\"hint02\">&nbsp;</span></p>\n\
          <p><label>确认支付密码：</label><input onselectstart=\"return false;\" onpaste=\"return false;\" name=\"txt_pass_repeat\" maxlength=\"20\" id=\"txt_pass_repeat\" type=\"password\" onkeydown=\"pay_pass_set.CheckdoSubmit(event,pay_pass_set.summitStep2)\" onfocus=\"pay_pass_set.focusRepeatSetPwd()\" onblur=\"pay_pass_set.checkRepeatSetPwd()\" /><span class=\"intensity\" id=\"span_intensity_check_repeat_blur\"><span class=\"tips_txt\">&nbsp;</span></span></p>\n\
          <p class=\"tit\"><span class=\"wrong\" id=\"txt_pass_repeat_err_desc\"></span><span id=\"txt_pass_repeat_err\" class=\"hint02\"></span><span class=\"hint02\">&nbsp;</span></p>\n\
          <p class=\"btn\"><button onclick=\"javascript:void(pay_pass_set.summitStep2())\">下一步</button></p>\n\
        </div>\n\
      </div>\n\
    </div>",
    paypass_step03_html:"<!--支付密码第三步-->\n\
    <div class=\"window_payment\">\n\
      <div class=\"wind_top\">\n\
        <div class=\"title_left\">支付密码</div>\n\
        <div class=\"w_close\"><a href=\"javascript:pay_pass_set.close_mobile_win_succ();\" title=\"关闭\">关闭窗口</a></div>\n\
      </div>\n\
      <div class=\"window_content\">\n\
        <div class=\"payment_step\"><span class=\"step01\">1.验证身份</span><span class=\"step02\">2.设置支付密码</span><span class=\"step03\">3.完 成</span></div>\n\
        <div class=\"payment_success\">\n\
          <p class=\"title\">设置支付密码成功!</p>\n\
          <p class=\"hint\">给您的账户加把锁，保证您的账户资金更安全。</p>\n\
          <button id=\"guanbi_id\" onclick=\"pay_pass_set.close_mobile_win_succ();\" style=\"*width:200px\" >关闭窗口（3秒后将自动关闭）</button>\n\
        </div>\n\
      </div>\n\
    </div>",

    callback:null,
    iscallback:0,
    init:function(cbfn){
        DD_Control.load_jquery.load(pay_pass_set.showmobilbind);
        pay_pass_set.callback=cbfn;
    },
    showmobilbind:function(){
        DD_Control.include.include_css(pay_pass_set.mobile_win_css,pay_pass_set.MakeHTML);
    },

    MakeHTML:function(){        
        if(!jQuery("#paypass_window")[0]){
            jQuery(document.body).append(pay_pass_set.windowbackhtml);
            jQuery(document.body).append(pay_pass_set.window_login_div_html);
        }
        if(DD_Control.util.getBrowserVersion().type=='chrome'){
            jQuery("#paypass_background").height(document.body.scrollHeight);
        }else{
            var height=document.body.clientHeight + 330;
            jQuery("#paypass_background").height(height+'px');
        }                
        pay_pass_set.show_mobile_win();
    },
    //ajax检测图形验证码输入是否正确
    /*check_vcode_result: function(){
        var vcode_val = jQuery("#graphic_vcode_txt").val();

        jQuery.ajax({
            url: "http://customer.dangdang.com/change/p/vcode_checker_ajax.php",
            cache:false,
            data:"vcode="+vcode_val,
            jsonp:"jsoncallback",
            dataType:"jsonp",
            type:"GET",
            success:function(data){
                if(data.code=='true'){
                    jQuery("#graphic_vcode_err_desc").html(' ');
                    pay_pass_set.return_data = 'true';
                }else{
                    jQuery("#graphic_vcode_err_desc").html('验证码错误');
                    pay_pass_set.return_data = 'false';
                }
            }
        });
       
    },*/
    //检测图形验证码输入框是否为空
    check_graphic_vcode_null:function(){
        var vcode_val = jQuery("#graphic_vcode_txt").val();
        if(vcode_val=='' || vcode_val==null){
            jQuery("#graphic_vcode_err_desc").html('请输入验证码');
        }
    },
    //第一个展示页面。提示用户发送验证码，并填写验证码信息
    show_mobile_win:function(){
        //判断用户验证身份的类型
        jQuery.ajax({
            url: "http://customer.dangdang.com/change/p/account_type_checker.php",
            cache:false,
            data:"",
            jsonp:"jsoncallback",
            dataType:"jsonp",
            type:"GET",
            success:function(data){
                json=data;
                var m_win=jQuery("#paypass_window");
                if(json.type=='1'){
                    jQuery.ajax({
                        url:'http://customer.dangdang.com/change/p/remote_check_verify_vcode_num.php',
                        cache:false,
                        data:'type=12',
                        jsonp:"jsoncallback",
                        dataType:"jsonp",
                        type:"GET",
                        success:function(data){
                            if(data.verify_type=='false'){
                                ddvcode.show_vcode("imgVcode");
                                jQuery("#graphic_vcode_div").show();
                            }
                        }
                    });
                    jQuery('#get_mobile_vcode_btn').attr("disabled","");
                    m_win.html(pay_pass_set.paypass_step01_html);
                    jQuery("#account_type_name").html("手机号：");
                    jQuery("#account_type_data").html(json.data);
                    jQuery("#action").val("mobile_verify");

                }
                else if(json.type=='2'){
                    jQuery.ajax({
                        url:'http://customer.dangdang.com/change/p/remote_check_verify_vcode_num.php',
                        cache:false,
                        data:'type=13',
                        jsonp:"jsoncallback",
                        dataType:"jsonp",
                        type:"GET",
                        success:function(data){
                            //alert(data);
                            if(data.verify_type=='false'){
                                ddvcode.show_vcode("imgVcode");
                                jQuery("#graphic_vcode_div").show();
                            }
                        }
                    });

                    m_win.html(pay_pass_set.paypass_step01_html);
                    jQuery("#account_type_name").html("邮 箱：");
                    jQuery("#account_type_data").html(json.data);
                    jQuery("#action").val("email_verify");

                }
                //                 else if(json.type=='4'){
                //                        var m_win=jQuery("#paypass_window");
                //                            m_win.html(pay_pass_set.paypass_step02_html);
                //                            jQuery("#mobile_vcode_txt").val(mobile_vcode_txt);
                //                          //  jQuery("#action").val("mobile_verify");
                //                            jQuery('#span_pass_strength').hide();
                //                            jQuery('#span_intensity_check_repeat_blur').hide();
                //
                //                }
                else if(json.type=='5'){
        
       
                    m_win.html(pay_pass_set.paypass_step01_html);
                    jQuery("#account_type_name").hide();
                    jQuery("#account_type_data").html("<font color='#666666' style='padding-left:30px;'>请先到我的当当-安全中心设置邮箱或绑定手机</font>");
                    jQuery("#mobile_vcode_p").hide();
                    jQuery("#get_mobile_vcode_btn").hide();
                    jQuery("#button").hide();
                    jQuery("#action").hide();

                }
                else{
                    m_win.html(pay_pass_set.paypass_step01_html);
                }
                var toppx = parseInt((jQuery(window).height() - m_win.height()) / 2) + jQuery(document).scrollTop()*0.7;
                var leftpx = parseInt((jQuery(window).width() - m_win.width()) / 2);
                m_win.css({
                    top: toppx + "px",
                    left: leftpx + "px"
                });                
                m_win.show();
                jQuery("#paypass_background").show();
            }
        });
    },

    close_mobile_win:function(){

        jQuery('#get_mobile_vcode_btn').attr("disabled","");
        jQuery("#paypass_background").hide();
        jQuery("#paypass_window").hide();
    },
    //成功执行后
    close_mobile_win_succ:function(){
        jQuery("#paypass_background").hide();
        //        jQuery("#paypass_window").offset({
        //            top:0,
        //            left:0
        //        });
        jQuery("#paypass_window").hide();
        pay_pass_set.iscallback=1;
        pay_pass_set.callback();
    },

    //发送验证码
    sendMobileVcodeStep1:function(){
        mobile = jQuery("#mobile_txt").val();
        var cnt=0;
        var step1_action=jQuery("#action").val();
        //jQuery("#mobile_vcode_err_desc").html("");
        if(step1_action=='mobile_verify'){
            var flag=true;

            jQuery.ajax({
                url: "http://customer.dangdang.com/change/p/pay_pass_step01_sendsms_vcode.php",
                cache:false,
                data:"",
                jsonp:"jsoncallback",
                dataType:"jsonp",
                type:"GET",
                success:function(data){
                    flag=data.return_data;
                    if(flag=="1"){
                        jQuery("#get_mobile_vcode_err_desc").html("请输入正确的验证码");
                        return false;
                    }
                    else if(flag=="2"){
                        jQuery("#get_mobile_vcode_err_desc").html("您今天发送次数超过5次！");
                        return false;
                    }
                    else if(flag=="3"){
                        jQuery("#get_mobile_vcode_err_desc").html("发送手机验证码失败");
                        return false;
                    }
                    else if(flag=="4"||flag=="5"){
                        jQuery("#get_mobile_vcode_err_desc").html("发送手机验证码失败");
                        return false;
                    }else if(flag=="0"){
                        jQuery("#get_mobile_vcode_err_desc").html("<font color='#666666'>验证码已发送到您的手机上</font>");
                        jQuery("#get_mobile_vcode_btn").attr("disabled", "disabled");
                        pay_pass_set.time_miao=119;
                        setTimeout(pay_pass_set.changejishi,1000);
                    }
                }
            });
        }else if(step1_action=='email_verify'){
            jQuery.ajax({
                url: "http://customer.dangdang.com/change/p/pay_pass_step01_get_email_vcode.php",
                cache:false,
                data:"",
                jsonp:"jsoncallback",
                dataType:"jsonp",
                type:"GET",
                success:function(data){
                    if(data.return_data=="0"){
                        var $email=jQuery("#account_type_data").html();
                        var showemail=pay_pass_set.loginEmail($email,false);
                        if(showemail==undefined){
                            jQuery("#get_mobile_vcode_err_desc").html("<font color='#666666'>验证码已发送！</font>");
                        }else{
                            jQuery("#get_mobile_vcode_err_desc").html("<font color='#666666'>验证码已发送！</font> <a href=\""+showemail+"\" target=\"_blank\">立即登录邮箱</a>");
                        }
                    }else{
                        jQuery("#get_mobile_vcode_err_desc").html("发送邮件验证码失败");
                    }
                }
            });
        //jQuery("#mobile_vcode_txt").focus();
        }
        return true;
    },
    //step1提交时的方法
    summitStep1:function(){
        var vcode_val = jQuery("#graphic_vcode_txt").val();
     
        if(jQuery("#graphic_vcode_div").css('display')!='none'){//图型验证码已显示
            if(vcode_val=='' || vcode_val==null){//判断图像验证码输入框是否为空
                jQuery("#graphic_vcode_err_desc").html('请输入验证码');
                return;//停止执行
            }else{
                //不为空，检测输入正确性
                //pay_pass_set.check_vcode_result(pay_pass_set.test);
                jQuery.ajax({
                    url: "http://customer.dangdang.com/change/p/vcode_checker_ajax.php",
                    cache:false,
                    data:"vcode="+vcode_val,
                    jsonp:"jsoncallback",
                    dataType:"jsonp",
                    type:"GET",
                    success:function(data){
                        if(data.code=='true'){
                            jQuery("#graphic_vcode_err_desc").html(' ');
                            pay_pass_set.return_data = 'true';
                            pay_pass_set.step1_vcode_txt_check();
                            return;
                        }else{
                            jQuery("#graphic_vcode_err_desc").html('验证码错误');
                            ddvcode.show_vcode("imgVcode");
                            pay_pass_set.return_data = 'false';                           
                            //pay_pass_set.step1_vcode_txt_check();
                            return;
                        }
                    }
                });
            }
        }else{
            //alert("3");
            pay_pass_set.step1_vcode_txt_check();
            return;
        }
        
        
    //jQuery("#form1").submit();
    },
    step1_vcode_txt_check:function(){
        var step1_action=jQuery("#action").val();

        if(step1_action=='mobile_verify'){
            if(pay_pass_set.checkMobileVcode()){
                var mobile_vcode_txt=jQuery("#mobile_vcode_txt").val();
                //alert(mobile_vcode_txt);
                jQuery.ajax({
                    url: "http://customer.dangdang.com/change/p/pay_pass_step01.php",
                    cache:false,
                    data:"mobile_vcode_txt="+mobile_vcode_txt,
                    jsonp:"jsoncallback",
                    dataType:"jsonp",
                    type:"GET",
                    success:function(data){
                        //alert(date.return_data);
                        if(data.return_data=="0"){
                            var m_win=jQuery("#paypass_window");
                            m_win.html(pay_pass_set.paypass_step02_html);
                            jQuery("#mobile_vcode_txt").val(mobile_vcode_txt);
                            jQuery("#action").val("mobile_verify");
                            jQuery('#span_pass_strength').hide();
                            jQuery('#span_intensity_check_repeat_blur').hide();
                            jQuery('#txt_new_pass_err_desc').hide();
                            jQuery('#txt_pass_repeat_err_desc').hide();
                        }else if(data.return_data=='1'){
                            jQuery("#mobile_vcode_err_desc").html("验证码错误，请重新输入");
                            return false;
                        }else{
                            jQuery("#mobile_vcode_err_desc").html("验证码错误，请重新输入");
                            ddvcode.show_vcode("imgVcode");
                            jQuery("#graphic_vcode_div").show();
                            pay_pass_set.return_data ='false';
                            return false;
                        }
                    }
                });
            }
        }else if(step1_action=='email_verify'){
            if(pay_pass_set.checkMobileVcode()){
                var email_vcode_txt=jQuery("#mobile_vcode_txt").val();
                jQuery.ajax({
                    url: "http://customer.dangdang.com/change/p/pay_pass_email_step01.php",
                    cache:false,
                    data:"email_vcode_txt="+email_vcode_txt,
                    jsonp:"jsoncallback",
                    dataType:"jsonp",
                    type:"GET",
                    success:function(data){
                        //alert(data.return_data);
                        if(data.return_data=="0"){
                            var m_win=jQuery("#paypass_window");
                            m_win.html(pay_pass_set.paypass_step02_html);
                            jQuery("#mobile_vcode_txt").val(email_vcode_txt);
                            jQuery("#action").val("email_verify");
                            jQuery('#span_pass_strength').hide();
                            jQuery('#span_intensity_check_repeat_blur').hide();
                            jQuery('#txt_new_pass_err_desc').hide();
                            jQuery('#txt_pass_repeat_err_desc').hide();
                        }else if(data.return_data=="4"){
                            jQuery("#mobile_vcode_err_desc").html("验证码错误，请重新输入");
                            ddvcode.show_vcode("imgVcode");
                            jQuery("#graphic_vcode_div").show();
                            pay_pass_set.return_data ='false';
                            return false;
                        }else{
                            jQuery("#mobile_vcode_err_desc").html("验证码错误，请重新输入");
                            return false;
                        }
                    }
                });
            }
        }else{
            return;
        }
    },
    //step2提交时的方法
    summitStep2:function(){
        var enter1=pay_pass_set.checkSetPaymentPwd();
        var enter2=pay_pass_set.checkRepeatSetPwd();
        if(enter1&&enter2){
            var txt_new_pass=jQuery("#txt_new_pass").val();
//            if((!/^\S{6,20}$/.test(txt_new_pass))){
//                 
//            }
            jQuery.ajax({
                url: "http://customer.dangdang.com/change/p/pay_pass_step02_check_new_paymentpass.php",
                cache:false,
                data:"newpass="+encodeURIComponent(txt_new_pass),
                jsonp:"jsoncallback",
                dataType:"jsonp",
                type:"GET",
                success:function(data){
                    if(data.return_data=="0"){
                        pay_pass_set.set_paypass();
                    }
                    else{
                        jQuery("#span_pass_strength").hide();
                        jQuery("#txt_new_pass_err_desc").width("200px");
                        jQuery("#txt_new_pass_err_desc").html("支付密码不能与当当登录密码相同");
                        jQuery("#txt_new_pass_err_desc").show();
                        jQuery("#txt_new_pass_focus_desc").hide();
                    }
                }
            });
        }

    },
    //将支付密码写入数据库
    set_paypass:function(){
        var mobile_vcode_txt=jQuery("#mobile_vcode_txt").val();
        var action=jQuery("#action").val();
        var txt_new_pass=jQuery("#txt_new_pass").val();
        jQuery.ajax({
            url: "http://customer.dangdang.com/change/p/remote_set_payment_pass.php",
            cache:false,
            data:"mobile_vcode_txt="+mobile_vcode_txt+"&action="+action+"&txt_new_pass="+encodeURIComponent(txt_new_pass),
            jsonp:"jsoncallback",
            dataType:"jsonp",
            type:"GET",
            success:function(data){
                if(data.return_data=="0"){
                    var m_win=jQuery("#paypass_window");
                    m_win.html(pay_pass_set.paypass_step03_html);
                    //jQuery("#pay_pass_txt").val(txt_new_pass);
                    jQuery("#input_pay_password").val(txt_new_pass);
                    pay_pass_set.guanbi();
                }
                else{
                    jQuery("#span_pass_strength").hide();
                    jQuery("#txt_new_pass_err_desc").width("200px");
                    jQuery("#txt_new_pass_err_desc").html("设置支付密码失败！");
                    jQuery("#txt_new_pass_err_desc").show();
                    jQuery("#txt_new_pass_focus_desc").hide();
                }
            }
        });
    },
    //step1时校验手机验证码
    checkMobileVcode:function(){
        var mobile_vcode_txt=jQuery("#mobile_vcode_txt").val();

        if(mobile_vcode_txt==""){
            jQuery("#mobile_vcode_err_desc").html("请输入正确的验证码");
            return false;
        }
        //校验是不是6位数字，如果不需要可以注释掉
        if(!/\w{6}/.test(mobile_vcode_txt)){
            jQuery("#mobile_vcode_err_desc").html("请输入正确的验证码");
            return false;
        }
        jQuery("#mobile_vcode_err_desc").html("");
        return true;
    },
    time_miao:0,
    changejishi:function(){
        var miao=pay_pass_set.time_miao--;
        var fen,smiao;
        fen=parseInt(miao/60)
        smiao=miao-(fen*60);
        var fenstr="";
        if(fen>0){
            fenstr=fen+"分";
        }
        if(miao>0 && jQuery("#paypass_background").css('display')!='none'){
            jQuery('#get_mobile_vcode_btn').attr("disabled","disabled");
            jQuery('#get_mobile_vcode_btn').val(fenstr+smiao+"秒后重新获取");
            setTimeout(pay_pass_set.changejishi,1000);
            jQuery('#get_mobile_vcode_btn').width('120px');
        }else{
            jQuery('#get_mobile_vcode_btn').attr("disabled","");
            jQuery('#get_mobile_vcode_btn').val("获取验证码");
            jQuery('#get_mobile_vcode_btn').width('90px');
        }
    },
    time_guan:3,
    guanbi:function(){
        var miao=pay_pass_set.time_guan--;
        if(miao>0){
            jQuery('#guanbi_id').html("关闭窗口（"+miao+"秒后将自动关闭）");

            //jQuery("#guanbi_id").width("200px");
            setTimeout(pay_pass_set.guanbi,1000);
        }else{
            if(pay_pass_set.iscallback==1){
                pay_pass_set.close_mobile_win();
            }else{
                pay_pass_set.close_mobile_win_succ();
            }

        }
    },

    CheckdoSubmit:function(e,callback){
        var ev = window.event || e;
        if(ev.keyCode == 13)
        {
            callback();
            //ev.keyCode=9;
            return false;
        }
        return false;
    },
    enterSubmit:function(e,callback,input_id){
        var ev = window.event || e || arguments.callee.caller.arguments[0];
        if (ev.keyCode == 13 && jQuery('#'+input_id).val()!=''){
            callback();
            //ev.keyCode=9;
            return false;
        }
        return false;
    },
    step1VcodeOnFocus:function(vcodeId,errId){
        jQuery("#"+vcodeId).val("");
        //jQuery("#get_mobile_vcode_err_desc").html("");

        jQuery("#"+errId).html("");
    },
    paymentWStrength:function(pwd) {

        var password = jQuery('#txt_new_pass').val();
        jQuery('#span_intensity_check_blur').hide();
        if(password.length == 0) {

            jQuery("#span_pass_strength").hide();
            return ;
        }
        jQuery("#txt_new_pass_focus_desc").html("");
        if(password.length < 6) {
            //jQuery('#span_intensity_check').html("密码强度：<span class=\"s1\">弱</span><span>中</span><span>强</span>");
            jQuery('#span_intensity_check').removeClass();
            jQuery('#span_intensity_check').addClass("strength01");
            jQuery("#txt_new_pass_err_desc").hide();
            jQuery('#span_pass_strength').show();

            return ;
        }
        var chenum = pay_pass_set.checkStrong(password);
        if(chenum == 0) {
            jQuery('#span_pass_strength').hide();
            return ;
        } else if(chenum == 1 ) {
            //jQuery('#span_intensity_check').html("密码强度：<span class=\"s1\">弱</span><span>中</span><span>强</span>");
            jQuery('#span_intensity_check').removeClass();
            jQuery('#span_intensity_check').addClass("strength01");
        } else if(chenum == 2) {
            //jQuery('#span_intensity_check').html("密码强度：<span class=\"s1\">弱</span><span  class=\"s2\">中</span><span>强</span>");
            jQuery('#span_intensity_check').removeClass();
            jQuery('#span_intensity_check').addClass("strength02");
        } else if(chenum >= 3) {
            //jQuery('#span_intensity_check').html("密码强度：<span class=\"s1\">弱</span><span class=\"s2\">中</span><span  class=\"s3\">强</span>");
            jQuery('#span_intensity_check').removeClass();
            jQuery('#span_intensity_check').addClass("strength03");
        }
        jQuery('#txt_new_pass_err_desc').hide();
        jQuery('#span_pass_strength').show();

    },
    focuscheckPaymentPwd:function(){

        // jQuery("#span_intensity_check").hide();
        jQuery("#txt_new_pass_err_desc").hide();
        jQuery("#txt_new_pass_err_desc").html("");
        jQuery('#span_pass_strength').hide();
        jQuery('#span_intensity_check_blur').hide();
        jQuery("#txt_new_pass_focus_desc").html("密码为6-20个字符，不能与当当登录密码相同");
        jQuery("#txt_new_pass_focus_desc").show();

    },
    //校验新密码
    checkSetPaymentPwd:function(){

        jQuery("#txt_new_pass_focus_desc").html('');
        jQuery("#span_pass_strength").hide();

        var txt_new_pass=jQuery("#txt_new_pass").val();
        if(txt_new_pass==""){


            jQuery("#txt_new_pass_err_desc").html("请设置您的支付密码");
            jQuery("#txt_new_pass_err_desc").width("200px");
            jQuery("#txt_new_pass_err_desc").show();

            return false;
        }
        //如果新密码不是6-20个字符
        if(!/^\S{6,20}$/.test(txt_new_pass)){
            jQuery("#txt_new_pass_err_desc").width("200px");

            jQuery("#txt_new_pass_err_desc").html("密码为6-20个字符，请重新输入");
            jQuery("#txt_new_pass_err_desc").show();

            return false;
        }


        var chenum = pay_pass_set.checkStrong(txt_new_pass);

        if(chenum == 1) {
            jQuery("#txt_new_pass_err_desc").width("0px");
            jQuery("#txt_new_pass_err_desc").hide();
            jQuery('#span_intensity_check_blur').html("<span class=\"tips_txt\">强度：<i>弱</i></span>");

        } else if(chenum == 2) {
            jQuery('#span_intensity_check_blur').html("<span class=\"tips_txt\">强度：<i class=\"tips_y\">中</i></span>");
        } else if(chenum >= 3) {
            jQuery('#span_intensity_check_blur').html("<span class=\"tips_txt\">强度：<i class=\"tips_g\">强</i></span>");
        }

        //check过的话，要把错误描述移除掉
        jQuery("#txt_new_pass_focus_desc").html('');
        jQuery("#txt_new_pass_err_desc").show();
        jQuery('#span_intensity_check_blur').show();

        return true;


    },
    //CharMode函数
    //测试某个字符是属于哪一类.
    CharMode:function(iN){
        if (iN>=48 && iN <=57) //数字
            return 1;
        if (iN>=65 && iN <=90) //大写字母
            return 2;
        if (iN>=97 && iN <=122) //小写
            return 4;
        else
            return 8; //特殊字符
    },

    //bitTotal函数
    //计算出当前密码当中一共有多少种模式
    bitTotal:function(num){
        modes=0;
        for (i=0;i<4;i++){
            if (num & 1) modes++;
            num>>>=1;
        }
        return modes;
    },

    //checkStrong函数
    //返回密码的强度级别
    checkStrong:function(sPW){
        if (sPW.length < 6)
            return 0; //密码太短
        Modes=0;
        for (i=0;i<sPW.length;i++){
            //测试每一个字符的类别并统计一共有多少种模式.
            Modes|=pay_pass_set.CharMode(sPW.charCodeAt(i));
        }

        return pay_pass_set.bitTotal(Modes);

    },
    focusRepeatSetPwd:function(){
        jQuery('#txt_pass_repeat_err_desc').hide();
        jQuery('#txt_pass_repeat_err_desc').html("");
        jQuery("#span_intensity_check_repeat_blur").hide();
        jQuery("#txt_pass_repeat_err").html("请再次输入您设置的支付密码");
        jQuery("#txt_pass_repeat_err").show();
    //  jQuery("#txt_new_pass_err_desc").html("");
    },
    //校验确认密码
    checkRepeatSetPwd:function(){

        var txt_pass_repeat=jQuery("#txt_pass_repeat").val();
        jQuery('#txt_pass_repeat_err_desc').show();
        jQuery('#txt_pass_repeat_err').html("");
        if(txt_pass_repeat==""){
            jQuery("#txt_pass_repeat_err_desc").html("请再次输入您设置的支付密码");
            jQuery("#txt_pass_repeat_err_desc").show();
            jQuery("#txt_pass_repeat_err").hide();
            return false;
        }
        var txt_new_pass=jQuery("#txt_new_pass").val();

        if(txt_new_pass!=txt_pass_repeat){
            jQuery("#txt_pass_repeat_err_desc").html("两次输入的密码不一致，请重新输入");
            jQuery("#txt_pass_repeat_err_desc").show();
            jQuery("#txt_pass_repeat_err").hide();
            return false;
        }
        //如果新密码不是6-20个字符
        if(!/^\S{6,20}$/.test(txt_pass_repeat)){
            jQuery("#txt_pass_repeat_err_desc").html("密码为6-20个字符，请重新输入");
            jQuery("#txt_pass_repeat_err_desc").show();
            jQuery("#txt_pass_repeat_err").hide();
            return false;
        }
        //check过的话，要把错误描述移除掉
        //jQuery(#txt_pass_repeat_err_desc).innerHTML='<span class="tips_txt">密码强度：<i>弱</i></span>';
        jQuery("#txt_pass_repeat_err_desc").html("");        
        jQuery("#txt_pass_repeat_err_desc").hide();
        jQuery('#txt_pass_repeat_err').html("&nbsp;");
        jQuery('#txt_pass_repeat_err').show();
        jQuery("#span_intensity_check_repeat_blur").show();
        return true;
    },
    loginEmail:function(email,returnval){

        var hash={
            'qq.com': 'http://mail.qq.com',
            'gmail.com': 'http://mail.google.com',
            'sina.com': 'http://mail.sina.com.cn',
            '163.com': 'http://mail.163.com',
            '126.com': 'http://mail.126.com',
            'yeah.net': 'http://www.yeah.net/',
            'sohu.com': 'http://mail.sohu.com/',
            'tom.com': 'http://mail.tom.com/',
            'sogou.com': 'http://mail.sogou.com/',
            '139.com': 'http://mail.10086.cn/',
            'hotmail.com': 'http://www.hotmail.com',
            'live.com': 'http://login.live.com/',
            'live.cn': 'http://login.live.cn/',
            'live.com.cn': 'http://login.live.com.cn',
            '189.com': 'http://webmail16.189.cn/webmail/',
            'yahoo.com.cn': 'http://mail.cn.yahoo.com/',
            'yahoo.cn': 'http://mail.cn.yahoo.com/',
            'eyou.com': 'http://www.eyou.com/',
            '21cn.com': 'http://mail.21cn.com/',
            '188.com': 'http://www.188.com/',
            'foxmail.com': 'http://www.foxmail.com'
        };

        var url = email.split('@')[1];

        if(hash[url]!=undefined){
            if(!returnval)return hash[url];
        };
        if(hash[url]!=undefined)window.open(hash[url]);

    }

}

