var google_tag_params = { prodid: '', pagetype: '', pname: '', pcat: '', dangdangprice: '', marketprice: '', discountprice: '', promotionprice: '', ordervalue: '', pbrand: '', author: '', publisher: '', login: 'regpage' };
var usernameIsOk = false;
var preUsernameIsEmail = false;//�ϴ���д���û����Ƿ�Ϊ����
var nowUsernameIsEmail = false;//��ǰ�û����Ƿ�Ϊ����
var passwordIsOk = false;
var rePasswordIsOk = false;
var mobileIsOk = false;
var vcodeIsOk = false;
var mobileCodeIsOk = false;
var agreementIsOk = true;
var isUpdateEmail = false; //�û��������Ƿ����
var isUpdatePhone = false; //��֤�ֻ���绰�����Ƿ���£������û����������������
var oldUsername = ''; //��¼��һ���û����������ж��û����Ƿ�仯
var oldMobile = '';//��¼��һ����֤�绰�������жϵ绰�Ƿ�仯
var selectdomin = -1;
var getMoblieCodeInterval = 120; //�����»�ȡ�ֻ���֤��ʱ���� ��λ��
var miao = getMoblieCodeInterval;
var timeoutrun = 0; //����ʱ������
var vcodeGenerateTiem ;//����ͼ����֤�����ɵ�ʱ��
var vcodeOvertimeInterval = 10 * 60 * 1000;//ͼ����֤����Ч��Ϊ10����
var checkLogin = {
	emailNameReg: /^(([a-zA-Z0-9]+\w*((\.\w+)|(-\w+))*[\.-]?[a-zA-Z0-9]+)|([a-zA-Z0-9]))$/, //ƥ����������
    emailReg: /^(([a-zA-Z0-9]+\w*((\.\w+)|(-\w+))*[\.-]?[a-zA-Z0-9]+)|([a-zA-Z0-9]))\@[a-zA-Z0-9]+((\.|-)[a-zA-Z0-9]+)*\.[a-zA-Z0-9]+$/, //ƥ������
    mobileReg: /^1[3,4,5,7,8][0-9]{9}$/,//ƥ��绰����
    vcodeReg: /^[a-zA-Z0-9]*$/,//ƥ��ͼ����֤��
    msg: {
    	'101' : '����/�ֻ��ſ����ڵ�¼���һ����롢���ն���֪ͨ�ȷ���',
    	'102' : '����/�ֻ����벻��Ϊ��',
    	'103' : '����/�ֻ���ʽ����ȷ������������',
    	'104' : '�������ѱ�ע�ᣬ������������䣬��ʹ�ø�&nbsp;<a href=\"signin.php?Email={#Email#}\" name=\"email_login_link\" class=\"more\">�����¼</a>',
    	'105' : '���ֻ�����ע�ᣬ����������ֻ��ţ���ʹ�ø�&nbsp;<a href=\"signin.php?Email={#Email#}\" name=\"mobile_login _link\" class=\"more\">�ֻ��ŵ�¼</a>',
    	'111' : '����Ϊ6-20���ַ�������Ӣ�ġ����ּ��������',
    	'112' : '��¼���벻��Ϊ��',
    	'113' : '���볤��6-20���ַ�������������',
    	'115' : '���벻�ܰ������ո񡱣�����������',
    	'116' : '����Ϊ6-20λ�ַ�,ֻ����Ӣ�ġ����ּ��������',
    	'121' : '���ٴ���������',
    	'122' : '���벻��Ϊ��',
    	'123' : '������������벻һ�£�����������',
    	'131' : '��������Ҫ��֤���ֻ�����',
    	'132' : '��֤�ֻ��Ų���Ϊ��',
    	'133' : '�ֻ������ʽ������������ȷ���ֻ�����',
    	'141' : '�����������֤��',
    	'142' : '��֤���ѷ��ͣ���ע�����',
    	'143' : '�����ֻ������ȡ��֤�����Ƶ��������24Сʱ������',
    	'144' : '����û���յ����ţ�����24Сʱ�����ԣ��������֤�ֻ�����',
    	'145' : '���緱æ�����Ժ�����',
    	'146' : '���»�ȡ��֤��',
    	'147' : '�����֤���������ø��ֻ���¼���һ�����',
    	'148' : '��֤�����',
    	'149' : '�����ֻ������ȡ��֤�����Ƶ������2���Ӻ�����',
    	'151' : '������ͬ�⵱����������󣬲����ύע�ᡣ',
    	'161' : '����дͼƬ�е��ַ��������ִ�Сд',
    	'162' : '������ͼ����֤��',
    	'163' : 'ͼ����֤�������������������',
    	'164' : 'ͼ����֤����ʧЧ������������'
    	
    },
    userName:{
    	checkUsernameFocus: function(){
    		checkFocus('txt_username', 'spn_username_ok', 'J_tipUsername');
            $('#J_tipUsername').html(checkLogin.msg['101']);
            $("#select_emaildomain").hide();
    	},
    	checkUsernameInput: function(e){ //�����˺�ʱ���Զ���ȫ�����׺
            var inpmail = $.trim($("#txt_username").val());
            var maildomin = $("#select_emaildomain");
            if(inpmail == "" || inpmail.indexOf("@") == 0) {
                maildomin.css("display","none");
                return;
            }
            
            var e= window.event || e;
            var c = e.keyCode || e.which;
            if (c == 27) {
                maildomin.css("display","none");
                return ;
            }else {
                if (c >= 48 && c < 127 && inpmail != "") {
                    if ((checkLogin.emailNameReg.test(inpmail))) {
                        maildomin.css("display","block");
                        $('#spn_username_ok').hide();
                        maildomin.children().each(function() {
                            var mailtxt = inpmail;
                            $(this).html(mailtxt + jQuery(this).attr("domin"));
                            $(this).attr("title",mailtxt + jQuery(this).attr("domin"));
                            $(this).removeClass("hover_domain");
                        });
                    }else{
                        if(checkLogin.emailNameReg.test(inpmail)) {
                            maildomin.css("display","block");
                            $('#spn_username_ok').hide();
                            maildomin.children().each(function() {
                                var mailtxt = inpmail;
                                if(jQuery(this).attr("domin")) {
                                    mailtxt = inpmail.substr(0,inpmail.length-1);
                                }
                                $(this).html(mailtxt + jQuery(this).attr("domin"));
                                $(this).attr("title",mailtxt + jQuery(this).attr("domin"));
                                $(this).removeClass("hover_domain");
                            });
                        }else{
                            maildomin.css("display","none");
                        }
                    }
                    return  ;
                } else {
                    if (c == 8) {
                        $('#spn_username_ok').hide();
                        if (inpmail == ""||(!checkLogin.emailNameReg.test(inpmail))) {
                            maildomin.css("display","none");
                        }else {
                            maildomin.css("display","block");
                            maildomin.children().each(function() {
                                var mailtxt = $.trim($("#txt_username").val());
                                $(this).html(mailtxt + jQuery(this).attr("domin"));
                                $(this).attr("title",mailtxt + jQuery(this).attr("domin"));
                                $(this).removeClass("hover_domain");
                            });
                        }
                        return ;
                    }
                    domincount = maildomin.children().size();
                    if (c == 40) {
                        if (selectdomin < domincount) {
                            selectdomin++;
                        } else { 
                            selectdomin = 0;
                        }
                        maildomin.children().each(function(index) {
                            if (index == selectdomin) {
                                $(this).addClass("hover_domain").siblings().removeClass("hover_domain");
                            }
                        });
                        return ;
                    }
                    if (c == 38) {
                        if (selectdomin > 0) {
                            selectdomin--;
                        } else{ 
                            selectdomin = domincount;
                        }
                        maildomin.children().each(function(index) {
                            if (index ==selectdomin)
                            $(this).addClass("hover_domain").siblings().removeClass("hover_domain");
                        });
                        return ;
                    }
                    if (c == 13) {
                        if($("#select_emaildomain").is(":visible")) {
                            maildomin.children().each(function(index) {
                                if (index == selectdomin) {
                                    $("#txt_username").val($(this).attr("title"));
                                }
                            });
                            $("#select_emaildomain").css("display","none");
                            selectdomin = 0;
                            checkLogin.userName.checkUsername();
                            checkLogin.tool.showMobileAndUpdateVcode();
                        }
                        return ;
                    }
                    $("#select_emaildomain").css("display","none");
                    return ;
                }
            }
        },
        checkUsername: function(){//�����û�����֤ 
            $("#select_emaildomain").hide();
            usernameIsOk = false;
            nowUsernameIsEmail = false;
            var usernameExist = false;
            
            var username = $.trim($('#txt_username').val());
            if( oldUsername != username){
            	isUpdateEmail = true;
            	oldUsername = username;
            }
            if (username == '') {
                return false;
            }
            checkFocus('txt_username', 'spn_username_ok', 'J_tipUsername');
            if (!/^\d+$/.test(username)) {                
                if (username.length > 40 || !checkLogin.emailReg.test(username)) {
                    $('#txt_username').addClass('wrong');
                    $('#J_tipUsername').removeClass('warn').html(checkLogin.msg['103']);
                    $('#spn_username_ok').removeClass('icon_yes').addClass('icon_wrong').show();
                    return false;
                }
                if (/[ ]/.test(username)) {
                	$('#txt_username').addClass('wrong');
                	$('#J_tipUsername').removeClass('warn').html(checkLogin.msg['103']);
                	$('#spn_username_ok').removeClass('icon_yes').addClass('icon_wrong').show();
                    return false;
                }
                $.ajax({
                    type: 'POST',
                    url: 'p/email_checker.php',
                    data: 'email=' + username,
                    async: false,
                    success: function (flg) {
                        if (flg == "true") {
                        	$('#txt_username').addClass('wrong');
                        	$('#J_tipUsername').removeClass('warn').html(checkLogin.msg['104'].replace('{#Email#}', username));
                        	$('#spn_username_ok').removeClass('icon_yes').addClass('icon_wrong').show();
                            usernameExist = true;
                            return ;
                        }else{
//                        	$('#J_mobileV').show();//ʹ������ע��ʱ����Ҫ��д��֤�ֻ�����, ����֤�ֻ����������ʾ����
                        	nowUsernameIsEmail = true;//�û����������������ȷ�����䣬��δע���
                        }
                    }
                });
            } else {
                if (!checkLogin.mobileReg.test(username)) {
                    $('#txt_username').addClass('wrong');
                    $('#J_tipUsername').removeClass('warn').html(checkLogin.msg['103']);
                    $('#spn_username_ok').removeClass('icon_yes').addClass('icon_wrong').show();
                    return false;
                }
                //ʹ���ֻ�ע��ʱ������Ҫ��д��֤�ֻ�����
//                $('#J_mobileV').hide();
                $.ajax({
                    type: 'POST',
                    url: 'p/mobile_checker.php',
                    data: 'mobile=' + username,
                    async: false,
                    success: function (flg) {
                        if (flg == "true") {
                            $('#txt_username').addClass('wrong');
                            $('#J_tipUsername').removeClass('warn').html(checkLogin.msg['105'].replace('{#Email#}', username));
                            $('#spn_username_ok').removeClass('icon_yes').addClass('icon_wrong').show();                            
                            usernameExist = true;
                            return false;
                        }
                    }
                });
            }
            if (usernameExist == true) {
                return false;
            }
            $('#spn_username_ok').removeClass('icon_wrong').addClass('icon_yes').show();
            usernameIsOk = true;
            return true;
        }
    },
    password: {
    	checkPasswordFocus: function() {
    		checkFocus('txt_password', 'spn_password_ok', 'J_tipPassword');
            $('#J_tipPassword').html(checkLogin.msg['111']).show();
            $('#J_tipUpperCaseBox').hide();
            $('#spnPwdStrongTips').hide(); //����ǿ������
    	},
    	checkPasswordInput: function() {
            if($('#J_tipUpperCaseBox').is(':hidden')){
            	checkFocus('txt_password', 'spn_password_ok', 'J_tipPassword');
                $('#J_tipPassword').hide();
                $('#spnPwdStrongTips').hide();
                
                var passwordTrim = $.trim($('#txt_password').val());
                if (passwordTrim.length == 0) {
                    $('#J_tipPassword').html(checkLogin.msg['111']).show();                
                    return false;
                }
                
                if (passwordTrim.length < 6) {
                    $('#spnPwdStrongTips').show();
                    $('.j_pwdStrong').hide();
                    $('#spnPwdStrong1').show();                                
                    return false;
                }
                
                if (passwordTrim.length > 20){
                    $('#txt_password').addClass('wrong');
                    $('#spn_password_ok').removeClass('icon_yes').addClass('icon_wrong').show();
                    $('#J_tipPassword').removeClass('warn').html(checkLogin.msg['113']).show();
                    return false;
                }
                var chenum = checkLogin.password.checkStrong();
                if (chenum == 0) {
                    return false;
                } else if (chenum == 1) {
                    $('.j_pwdStrong').hide();
                    $('#spnPwdStrong1').show();
                } else if (chenum == 2) {
                    $('.j_pwdStrong').hide();
                    $('#spnPwdStrong2').show();
                } else if (chenum >= 3) {                	
                    $('.j_pwdStrong').hide();
                    $('#spnPwdStrong3').show();
                }
                $('#spnPwdStrongTips').show();
                $('#spn_password_ok').removeClass('icon_wrong').addClass('icon_yes').show();
                return true;
            }
    	},
    	checkPassword: function() {
    		checkFocus('txt_password', 'spn_password_ok', 'J_tipPassword');
    		$('#spnPwdStrongTips').hide();
            $("#J_tipUpperCaseBox").hide();
            $("#J_tipPassword").show();
            
            passwordIsOk = false;            
    		var password = $('#txt_password').val();            
            if (password == '') {
                return false;
            }
            if (password.length < 6 || password.length > 20) {
                $('#txt_password').addClass('wrong');
                $('#spn_password_ok').removeClass('icon_yes').addClass('icon_wrong').show();
                $('#J_tipPassword').removeClass('warn').html(checkLogin.msg['113']);
                return false;
            }
            if (!/^\S{1,20}$/.test(password)) {
                $('#txt_password').addClass('wrong');
                $('#spn_password_ok').removeClass('icon_yes').addClass('icon_wrong').show();
                $('#J_tipPassword').removeClass('warn').html(checkLogin.msg['115']);       
                return false;
            }
            
            for(var i=0;i<password.length;i++){
                if(password.charCodeAt(i)>127){
                    $('#txt_password').addClass('wrong');
                    $('#spn_password_ok').removeClass('icon_yes').addClass('icon_wrong').show();
                    $('#J_tipPassword').removeClass('warn').html(checkLogin.msg['116']);
                    return false; 
                }
            }
            if(!checkLogin.password.checkPasswordInput()){
            	return false;
            }
            passwordIsOk = true;
            //��ȷ�����벻Ϊ��ʱ�������޸ĺ���һ����֤ȷ������������Ƿ����
            checkLogin.rePassword.checkRePassword();
            return true; 
    	},
    	checkCapslockOpen: function(e) {
    		var  e= window.event || e;
            var  n=e.keyCode || e.which;
            var  m=e.shiftKey||(n==16)||false;
            if (((n >= 65 && n <= 90) && !m) || ((n >= 97 && n <= 122 )&& m)) {
            	$('#spnPwdStrongTips').hide();
                $('#J_tipPassword').hide();
                $("#J_tipUpperCaseBox").show();
            } else if(n >= 97 && n <= 122 && !m){
                $("#J_tipUpperCaseBox").hide();
            } else if(n==27){
                $("#J_tipUpperCaseBox").hide();
            } else{
            	$("#J_tipUpperCaseBox").hide();
            }
    	},
    	checkStrong: function(){
            var sPW = $('#txt_password').val();
            if (sPW.length < 1){
                return 0;
            }
            var Modes = 0;
            for (i = 0; i < sPW.length; i++) {
                Modes |= Evaluate(sPW.charCodeAt(i));
            }
            var num = bitTotal(Modes);
            return num;
        }
    },
    rePassword: {
    	checkRePasswordFocus: function() {
    		checkFocus('txt_repassword', 'spn_repassword_ok', 'J_tipSurePassword');
            $('#J_tipSurePassword').html(checkLogin.msg['121']);
    	},
    	checkRePassword: function() {
    		checkFocus('txt_repassword', 'spn_repassword_ok', 'J_tipSurePassword');
    		rePasswordIsOk = false;
            var passsword = $('#txt_password').val();
    		var rep_password = $('#txt_repassword').val();
            if (rep_password == '') {
                return false;
            }
            if (rep_password != passsword) {
                $('#txt_repassword').addClass('wrong');
                $('#spn_repassword_ok').removeClass('icon_yes').addClass('icon_wrong').show();            
                $('#J_tipSurePassword').removeClass('warn').html(checkLogin.msg['123']);
                return false;
            }
            $('#spn_repassword_ok').removeClass('icon_wrong').addClass('icon_yes').show();          
            rePasswordIsOk = true;
            return true;
    	}
    },
    mobile: {
    	checkMobileFocus: function(){
        	checkFocus('txt_mobile', 'spn_mobile_ok', 'J_tipMobile');
            $('#J_tipMobile').html(checkLogin.msg['131']);
    	},
    	checkMobile: function(){
    		checkFocus('txt_mobile', 'spn_mobile_ok', 'J_tipMobile');
    		mobileIsOk = false;
    		var usernameExist = false;
            
            var mobile = $.trim($('#txt_mobile').val());
            if( oldMobile != mobile){
            	isUpdatePhone = true;
            	oldMobile = mobile;
            }
            if (mobile == '') {
                return false;
            }
            
            if (!checkLogin.mobileReg.test(mobile)) {
                $('#txt_mobile').addClass('wrong');
                $('#spn_mobile_ok').removeClass('icon_yes').addClass('icon_wrong').show();            
                $('#J_tipMobile').removeClass('warn').html(checkLogin.msg['133']);
                return false;
            }
            
            $.ajax({
                type: 'POST',
                url: 'p/mobile_checker.php',
                data: 'mobile=' + mobile,
                async: false,
                success: function (flg) {
                    if (flg == "true") {
                        $('#txt_mobile').addClass('wrong');
                        $('#spn_mobile_ok').removeClass('icon_yes').addClass('icon_wrong').show(); 
                        $('#J_tipMobile').removeClass('warn').html(checkLogin.msg['105'].replace('{#Email#}', mobile));     
                        usernameExist = true;
                        return false;
                    }
                }
            });
            
            if (usernameExist == true) {
                return false;
            }
            $('#spn_mobile_ok').removeClass('icon_wrong').addClass('icon_yes').show();            
            mobileIsOk = true;
            return true;
    	}
    },
    vcode: {
    	checkVcodeFocus: function(){    		
    		checkFocus('txt_vcode', 'spn_vcode_ok', 'J_tipVcode');
            $('#J_tipVcode').html(checkLogin.msg['161']);
    	},
    	checkVcode: function(e){
    		if($('.j-vcode').is(':visible')){
    			vcodeIsOk = false;
        		checkFocus('txt_vcode', 'spn_vcode_ok', 'J_tipVcode');
        		var txtVcode = $.trim($("#txt_vcode").val());    		
        		var txtVcodeLen = txtVcode.length;
                if(checkLogin.vcodeReg.test(txtVcode)){
                	if(txtVcodeLen==4){
                		if(!checkLogin.vcode.checkVcodeOvertime()){
                			$('#J_tipVcode').removeClass('warn').html(checkLogin.msg['164']);
                			return false;
                		}
                		//��֤ͼ����֤���Ƿ���ȷ
            			checkLogin.vcode.checkVcodeIsOk(txtVcode);            		
                	}
                }else {
                	$('#txt_vcode').addClass('wrong');
                    $('#spn_vcode_ok').removeClass('icon_yes').addClass('icon_wrong').css({'display':'inline-block'});
                    $('#J_tipVcode').removeClass('warn').html(checkLogin.msg['163']);
                	return false;
                }
    		}
    	},
    	checkVcodeIsOk: function(vcode){
    		var type=0;
    		$.ajax({
    	        type: 'POST',
    	        url: 'p/vcode_check_new.php',
    	        data: 'vcode=' + vcode + '&type=' + type,
    	        async: false,
    	        success: function (flg) {
    	        	if (flg == 'false') {
    	            	$('#txt_vcode').addClass('wrong');
    	                $('#spn_vcode_ok').removeClass('icon_yes').addClass('icon_wrong').css({'display':'inline-block'});   
    	                $('#J_tipVcode').removeClass('warn').html(checkLogin.msg['163']);
    	                return false;
    	            }else{    	            	
    	            	checkFocus('txt_vcode', 'spn_vcode_ok', 'J_tipVcode');
    	            	$('#spn_vcode_ok').removeClass('icon_wrong').addClass('icon_yes').css({'display':'inline-block'});
    	            	vcodeIsOk = true;
    	            	//��ȡ������֤��
    	            	if($('#J_mobileV').is(':visible')){
    	            		if(!mobileIsOk){
    	            			return false;
    	            		}
    	            	} else {
    	            		if(!usernameIsOk){
    	            			return false;
    	            		}
    	            	}    	            	
            			checkLogin.mobileCodeBtn.sendMobileCodeFun();
    	            	return true;
    	            }
    	        }
    	    });
    	},
    	checkVcodeOvertime: function(){
    		var nowTime = new Date().getTime();
    		if( (nowTime - vcodeGenerateTiem)> vcodeOvertimeInterval ){
    			show_vcode('imgVcode');
    			return false;
    		}else{
    			return true;
    		}
    	}
    },
    mobileCodeBtn: {
    	checkEnableGetMobileCode: function(){
            // ��մ�����ʾ��Ϣ
    		$("#J_tipMobileCode").addClass("warn").html('');
            if($('#J_mobileV').is(':visible')){//�����ͨ������ע�ᣬ��֤ ����֤�ֻ��š��Ƿ�Ϊ��ȷ�ֻ���
                if( $.trim($('#txt_mobile').val()) == '' ){
                    $('#txt_mobile').addClass('wrong');
                    $('#spn_mobile_ok').removeClass('icon_yes').addClass('icon_wrong').show();
                    $('#J_tipMobile').removeClass('warn').html(checkLogin.msg['132']);
                    return false;
                }
                if(!checkLogin.mobile.checkMobile()){
                    return false;
                }
            }else{//�����ͨ���ֻ���ע�ᣬ��֤�û����Ƿ�Ϊ��ȷ�ֻ���
            	if( $.trim($('#txt_username').val()) == '' ){
                    $('#txt_username').addClass('wrong');
                    $('#spn_username_ok').removeClass('icon_yes').addClass('icon_wrong').show();
                    $('#J_tipUsername').removeClass('warn').html(checkLogin.msg['102']);
                    return false;
                }
                if(!checkLogin.userName.checkUsername()){
                    return false;
                }
            }
            return true;
    	},
    	sendMobileCodeFun: function(){//�����ȡ�ֻ���֤��
    		var mobile_phone = '';
    		var txtVcode = $('#txt_vcode').val();
    	    
    	    if($('#J_mobileV').is(':visible')){//�����ͨ������ע�ᣬ��֤ ��֤�ֻ����Ƿ�Ϊ��ȷ�ֻ���
    	        mobile_phone = $.trim($('#txt_mobile').val());
    	    }else{//�����ͨ���ֻ���ע�ᣬ��֤�û����Ƿ�Ϊ��ȷ�ֻ���
    	        mobile_phone = $.trim($('#txt_username').val());
    	    }
    	    
    	    // �ֻ���ע�ᣬ������֤�����
    	    var custid = 0;
    	    var verify_type = 5;
    	    var send_flg = false;
    	    $.ajax({
    	        type: 'POST',
    	        url: 'p/send_mobile_vcode_new.php',
    	        data: 'custid=' + custid + '&vcode=' + txtVcode + '&type=0&mobile_phone=' + mobile_phone + '&verify_type=' + verify_type,
    	        async: false,
    	        success: function (flg) {
    	        	if(flg == '-10' || flg == '-11' || flg == '-12'){
    	        		checkLogin.tool.switchVcodeArea('vcode');
    	        		$('#txt_vcode').addClass('wrong');
    	                $('#spn_vcode_ok').removeClass('icon_yes').addClass('icon_wrong').css({'display':'inline-block'});    	                
    	                $('#J_tipVcode').removeClass('warn').html(checkLogin.msg['164']);
    	                return false;
    	        	} else{
        	        	checkLogin.tool.switchVcodeArea('phoneVcode');
    	        		if (flg == "0") {    	                   
        	                // ��ʱ����ʼ��
        	                miao = getMoblieCodeInterval;
        	                changejishi();    
        	                // ��յ�����Ķ�����֤������� �� ��ʾ��Ϣ��������궨λ��������֤�������    
        	                $('#J_MobileCode').val('');
        	                $('#J_MobileCode').focus();
        	                $('#J_tipMobileCode').addClass('warn').html(checkLogin.msg['142']); 
        	                // ������֤����ųɹ�                
        	                return true;
        	            }else if (flg == "-2") {
        	                // ���췢�Ͷ��ŵĴ��������˹涨��������
        	                $('#J_tipMobileCode').removeClass('warn').html(checkLogin.msg['143']);
        	                $('#sendMobileCode').hide();
        	                $('#J_countDownTip').html(checkLogin.msg['146']).show();
        	                return false;
        	            }else if (flg == "-4" || flg == "-5" || flg == "-8") {
        	                // �ֻ���֤��������ݿ�ʧ�� ���� ������֤�뵽�û��ֻ�ʧ�� ���� ���η��ͼ������2����
        	                $('#J_tipMobileCode').removeClass('warn').html(checkLogin.msg['145']);
        	                return false;
        	            } else if ( flg == "-7" ) {
        	            	// ���η��ͼ������2����
        	                $('#J_tipMobileCode').removeClass('warn').html(checkLogin.msg['149']);
        	                return false;
        	            } else {
        	                //�������·��ͻ�ȡ��֤������
        	                $('#J_tipMobileCode').removeClass('warn').html(checkLogin.msg['144']);
        	                return false;
        	            }
    	        	} 
    	        }
    	    });
    	}
    },
    mobileCode: {
    	checkMobileCodeFocus: function() {
    		checkFocus('J_MobileCode', 'spn_mobileCode_ok', 'J_tipMobileCode');
    		$('#J_tipMobileCode').addClass('warn').html(checkLogin.msg['141']);
//    		checkFocus('J_MobileCode', 'spn_mobileCode_ok', 'J_tipMobileCode', 'no');             
    	},
    	checkMobileCode: function(){
    		checkFocus('J_MobileCode', 'spn_mobileCode_ok', 'J_tipMobileCode');
//    		checkFocus('J_MobileCode', 'spn_mobileCode_ok', 'J_tipMobileCode', 'no');
    		mobileCodeIsOk = false;
    		var mobile = $.trim($('#txt_mobile').val());
    		var usernameTrim = $.trim($('#txt_username').val());
    		var mobilePhone = '';
    		var pop_sms_vcode = $.trim($('#J_MobileCode').val());    	    
    	    if (pop_sms_vcode == '') {
    	        return false;
    	    }
    	    if (pop_sms_vcode.length != 6) {
    	        $('#J_MobileCode').addClass('wrong');
    	        $('#spn_mobileCode_ok').removeClass('icon_yes').addClass('icon_wrong').show();
    	        $('#J_tipMobileCode').removeClass('warn').html(checkLogin.msg['148']);
    	        return false;
    	    }
    	    // ǰ����֤������ֻ�������֤���Ƿ���ȷ
    	    if($('#J_mobileV').is(':visible') ) {
            	mobilePhone = mobile;
            }else if(usernameIsOk){
            	mobilePhone = usernameTrim;
            }
            var verify_type = 5;
            var type = 0;
            $.ajax({
                type: 'POST',
                url: 'p/check_mobilephone_vcode.php',
                data: 'mobile_phone=' + mobilePhone + "&verify_type=" + verify_type +"&sms_vcode=" + pop_sms_vcode + "&type=" + type,
                async: false,
                success: function (flg) {
                    if (flg == 'false') {
                        $('#J_MobileCode').addClass('wrong');
                        $('#spn_mobileCode_ok').removeClass('icon_yes').addClass('icon_wrong').show();
                        $('#J_tipMobileCode').removeClass('warn').html(checkLogin.msg['148']);                        
                        return false;
                    }else {
                    	$('#J_MobileCode').removeClass('wrong');
                    	$('#spn_mobileCode_ok').removeClass('icon_wrong').addClass('icon_yes').show();
                    	mobileCodeIsOk = true; 
                    }
                }
            });            
            return true;
    	}
    },
    agreement: {
    	checkAgreement: function() {
    		if ('checked' == $('#chb_agreement').attr('checked')) {
    			$('#J_tipAgreement').html('')
    			agreementIsOk = true;
	            return true;
	        } else {
	        	$('#J_tipAgreement').html(checkLogin.msg['151']);
	        	agreementIsOk = false;
	            return false;
	        }
    	}
    },
    tool: {
    	switchVcodeArea: function(showType){//�л�ͼ����֤�� �Ͷ�����֤����ʽ
    		if(showType === 'vcode') {
    			if($('.j-phoneVcode').is(':visible')){
    				$('.j-phoneVcode').hide();
        			show_vcode('imgVcode');
        	    	$('.j-vcode').fadeIn(800);
        	    	$('#J_MobileCode').val('');
        	    	mobileCodeIsOk = false;
        	    	checkFocus('J_MobileCode', 'spn_mobileCode_ok', 'J_tipMobileCode');
        	    	//�����ǰ���ڵ���ʱ״̬����յ���ʱ״̬
        	    	clearTimeout(timeoutrun);
        	    	$('#sendMobileCode').show();
        	    	$('#J_countDownTip').hide();
				}else {
					show_vcode('imgVcode');
				}    			
    		}else if(showType === 'phoneVcode') {
    			if ($('.j-vcode').is(':visible')){
    				$('.j-vcode').hide();
        	    	$('.j-phoneVcode').fadeIn(800);    	    	
        	    	checkFocus('txt_vcode', 'spn_vcode_ok', 'J_tipVcode');
				}
    		}
    	},
    	hideMobile: function() {//�����ֻ���֤��
    		mobileIsOk = false;
    		$('#J_mobileV').hide();
    		$('#txt_mobile').val('');
    		checkFocus('txt_mobile', 'spn_mobile_ok', 'J_tipMobile');
    	},
    	showMobileAndUpdateVcode: function(){//��ʾ��֤�ֻ������ �� ������֤��
    		//��ʾ�ֻ���֤��
    		if(nowUsernameIsEmail && preUsernameIsEmail != nowUsernameIsEmail){
    			$('#J_mobileV').show();
    		} else if(!nowUsernameIsEmail && preUsernameIsEmail != nowUsernameIsEmail){
    			checkLogin.tool.hideMobile();
    		}    		
    		//������֤��
    		var vcode = $.trim($('#txt_vcode').val());
			if(vcode!= '' && isUpdateEmail){//�û����������ݱ��
				if(!nowUsernameIsEmail || nowUsernameIsEmail!= preUsernameIsEmail){//�� ���� �滻Ϊ��������Ϊ�����
					checkLogin.tool.switchVcodeArea('vcode');										
				}				
			}else if(vcode!= '' && isUpdatePhone){//��֤�ֻ��������ݱ��
    			checkLogin.tool.switchVcodeArea('vcode');				 			
    		}
			isUpdateEmail = false;
			isUpdatePhone = false;
			preUsernameIsEmail = nowUsernameIsEmail;
			return true;
    	},
    	isFunc: function(funcName){
    	    return typeof funcName == 'function';
    	},
    	getCheatProof: function(){//��ȡ��թƭ�İ�
	    	jQuery.ajax({
	            type: 'POST',
	            url: 'p/mix_cheat_proof.php?source=registerTop',
	            async: true,
	            dataType: 'json',
	            success: function (res) {
	            	if (res) {
	            		$cheatProofDiv = jQuery('#J_cheatProofTop');
	            		if(res.cheatProof_display==='block' && res.cheatProof){
	            			//��ȡ����թ�ӿ�������ʾ�ӿ�����,������ʾĬ������
	            			if(res.cheatProof.errorCode==='0'){
	            				$cheatProofDiv.html(res.cheatProof.res);
	            			}	            			
	            			$cheatProofDiv.css({'display':'block'});
	            		}
	            		return true;
	            	}else{
	            		return false;
	            	}
	            }
	        });
    	}
    }
};      
    	
//����Ԫ��ָ��������ʽ
function checkFocus(inputId, iconId, tipId , clearTip) {
    $('#' + inputId).removeClass('wrong');
    $('#' + iconId).hide();
    if( clearTip === 'no'){
    	$('#' + tipId).addClass('warn');
    }else{
    	$('#' + tipId).addClass('warn').html('');
    }
    
}
//����ǿ����֤
function Evaluate(character){
    if (character >= 48 && character <= 57){
        return 1;
    } else if (character >= 65 && character <= 90) {
        return 2;
    } else if (character >= 97 && character <= 122) {
        return 4;
    } else {
        return 8;
    }
}
//����ǿ����֤
function bitTotal(num){
    var modes = 0;
    for (i = 0; i < 4; i++) {
        if (num & 1) modes++;
        num >>>= 1;
    }
    return modes;
}
//��ȡͼ����֤��
function show_vcode(img_id) {
	vcodeIsOk = false;
	vcodeGenerateTiem = new Date().getTime();
    $('#' + img_id).attr('src', 'p/tmp_proxy.php?t=' + new Date().getTime());
    $('#txt_vcode').val('');
    checkFocus('txt_vcode', 'spn_vcode_ok', 'J_tipVcode');
}

//���»�ȡ��֤��ǰ�ĵ���ʱ
function changejishi(){    
	miao--;
	var fen, smiao;
	fen = parseInt( miao/60 );
	smiao = miao - ( fen * 60 );
	var fenstr = '';
	if(fen > 0){
		fenstr = fen + '��';
	}
	if(miao > 0){
		$('#J_countDownTip').html( fenstr+smiao + '������»�ȡ' ).show();
		$('#sendMobileCode').hide();
		clearTimeout(timeoutrun);
		timeoutrun = setTimeout(changejishi, 1000);
	}else{
		$('#sendMobileCode').show();
		$('#J_countDownTip').hide();
		$('#J_tipMobileCode').html('');
	}
}

//�ύע��
function check_register() {
    var usernameTrim = $.trim($('#txt_username').val());
    var passwordTrim = $.trim($('#txt_password').val());
    var repasswordTrim = $.trim($('#txt_repassword').val());
    var mobile = $.trim($('#txt_mobile').val());
    var vcode = $.trim($('#txt_vcode').val());
    var mobileCode = $.trim($('#J_MobileCode').val());
    var mobilePhone = ''; //��֤�ֻ����룬 ����û�ʹ���ֻ���ע�ᣬ��ô��֤�ֻ��ź�ע���ֻ������
    if (usernameTrim == "" || passwordTrim == "" || repasswordTrim == "" || vcode == '' 
    	|| ($('#J_mobileV').is(':visible') && mobile=='')
    	|| ($('.j-phoneVcode').is(':visible') && mobileCode == "")) {
        if (usernameTrim == "") {
            $('#txt_username').addClass('wrong');
            $('#spn_username_ok').removeClass('icon_yes').addClass('icon_wrong').show();
            $('#J_tipUsername').removeClass('warn').html(checkLogin.msg['102']);
        }
        if (passwordTrim == "") {
        	$('#txt_password').addClass('wrong');
            $('#spn_password_ok').removeClass('icon_yes').addClass('icon_wrong').show();
            $('#J_tipPassword').removeClass('warn').html(checkLogin.msg['112']);
            $('#J_tipUpperCaseBox').hide();            
            $('#spnPwdStrongTips').hide();            
        }
        if (repasswordTrim == "") {
        	$('#txt_repassword').addClass('wrong');
            $('#spn_repassword_ok').removeClass('icon_yes').addClass('icon_wrong').show();
            $('#J_tipSurePassword').removeClass('warn').html(checkLogin.msg['122']);            
        }
        if( $('#J_mobileV').is(':visible') && mobile=='' ) {
        	$('#txt_mobile').addClass('wrong');
            $('#spn_mobile_ok').removeClass('icon_yes').addClass('icon_wrong').show();
            $('#J_tipMobile').removeClass('warn').html(checkLogin.msg['132']);
        }
        if( vcode =='' ) {
        	$('#txt_vcode').addClass('wrong');
            $('#spn_vcode_ok').removeClass('icon_yes').addClass('icon_wrong').css({'display':'inline-block'});
            $('#J_tipVcode').removeClass('warn').html(checkLogin.msg['162']);
        }
        if (mobileCode == "") {
            $('#J_MobileCode').addClass('wrong');
            $('#spn_mobileCode_ok').removeClass('icon_yes').addClass('icon_wrong').show();
            $('#J_tipMobileCode').removeClass('warn').html(checkLogin.msg['141']);
        }
        //��ֹ�ظ��ύ
        submitBtnAvailability('enable');
        return false;
    }
    if(!vcodeIsOk){
    	$('#txt_vcode').addClass('wrong');
        $('#spn_vcode_ok').removeClass('icon_yes').addClass('icon_wrong').css({'display':'inline-block'});
        $('#J_tipVcode').removeClass('warn').html(checkLogin.msg['163']);
        submitBtnAvailability('enable');
        return false;
    }
    //�����û����������������׺�Զ���ȫ���ʱ���õ���setTimeout��
    	//���½������û�����ֱ�ӵ����ύ��ťʱ����Ϊ���û���������֤��������Դ˴�����û���������һ����֤��
    checkLogin.userName.checkUsername();
	checkLogin.tool.showMobileAndUpdateVcode();
	
    if(usernameIsOk && passwordIsOk && rePasswordIsOk && vcodeIsOk  && mobileCodeIsOk && agreementIsOk
    		&& ((!$('#J_mobileV').is(':visible')) || mobileIsOk) ){    
        $('#hdn_username').val(usernameTrim);
        $('#hdn_password').val(passwordTrim);
        $('#hdn_mobile').val(mobile);        
        // �ֻ�ע�����������֤����ύ
        $("#register_form").attr("onsubmit","return true;");
        $('#btn_confirm').click();
        //��ֹ�ظ��ύ
        submitBtnAvailability('enable');
        return true;
    }
    //��ֹ�ظ��ύ
    submitBtnAvailability('enable');
    return false;
}
//��ֹ�ظ��ύע��
function submitBtnAvailability( type ){
	if( type == 'disable' ) {
		$('#J_submitRegisterUnclick').show();
		$('#J_submitRegister').hide();
	} else {
		$('#J_submitRegisterUnclick').hide();
		$('#J_submitRegister').show();
	}
}

//��̨��֤���ִ��󲢷�����ʾ��Ϣ�����ڴ������
function show_error(err_code) {
    switch (err_code) {
        case 0:
            break;
        case 1: //��֤�����
            break;
        case 2: //�������ѱ�ע��
        	$('#txt_username').addClass('wrong');
        	$('#spn_username_ok').removeClass('icon_yes').addClass('icon_wrong').show();
        	$('#J_tipUsername').removeClass('warn').html(checkLogin.msg['104'].replace('{#Email#}', $('#txt_username').val()));
        	break;
        case 3: //����/�ֻ���ʽ����ȷ
        	$('#txt_username').addClass('wrong');
        	$('#spn_username_ok').removeClass('icon_yes').addClass('icon_wrong').show();
        	$('#J_tipUsername').removeClass('warn').html(checkLogin.msg['103']);        	
            break;
        case 4: //�绰��֤����� ͼ����֤�����
            break;
        case 5: // ����/�ֻ���ʽ����ȷ   	
        	$('#J_MobileCode').val('');
        	if($('#J_mobileV').is(':visible')) {
        		$('#txt_mobile').addClass('wrong');
            	$('#spn_mobile_ok').removeClass('icon_yes').addClass('icon_wrong').show();
            	$('#J_tipMobile').removeClass('warn').html(checkLogin.msg['133']); 
        	}else{
        		$('#txt_username').addClass('wrong');
            	$('#spn_username_ok').removeClass('icon_yes').addClass('icon_wrong').show();
            	$('#J_tipUsername').removeClass('warn').html(checkLogin.msg['103']); 
        	}
            break;
        case 6: //��֤�����
        	$('#J_MobileCode').addClass('wrong').val('');
        	$('#spn_mobileCode_ok').removeClass('icon_yes').addClass('icon_wrong').show();
        	$('#J_tipMobileCode').removeClass('warn').html(checkLogin.msg['148']);           
            break;
        case 7://���ֻ�����ע�� 
        	$('#J_MobileCode').val('');
        	if($('#J_mobileV').is(':visible')) {
        		$('#txt_mobile').addClass('wrong');
            	$('#spn_mobile_ok').removeClass('icon_yes').addClass('icon_wrong').show();
            	$('#J_tipMobile').removeClass('warn').html(checkLogin.msg['105'].replace('{#Email#}', $('#txt_username').val())); 
        	}else{
        		$('#txt_username').addClass('wrong');
            	$('#spn_username_ok').removeClass('icon_yes').addClass('icon_wrong').show();
            	$('#J_tipUsername').removeClass('warn').html(checkLogin.msg['105'].replace('{#Email#}', $('#txt_username').val())); 
        	}
            break;
        case 8: //���緱æ�����Ժ�����  
        	$('#J_MobileCode').removeClass('wrong').val('');
        	$('#spn_mobileCode_ok').hide();
        	$('#J_tipAgreement').removeClass('warn').html(checkLogin.msg['145']);        	
            break;
        case 9: //���볤��6-20���ַ�,����������
        	$('#txt_password').addClass('wrong');
        	$('#spn_password_ok').removeClass('icon_yes').addClass('icon_wrong').show();
        	$('#J_tipPassword').removeClass('warn').html(checkLogin.msg['113']).show();        	
            break;
        default:
            break;
    }
}

$(function() {
	show_error($('#J_errorCode').val());
	show_vcode('imgVcode');
	
	if ($('#txt_username') != '') {
        if(!$('#txt_username').hasClass('wrong')) {
            $('#txt_username').focus();
//            $('#J_tipUsername').html(checkLogin.msg['101']);
        }
    }
	
	//������꽹�����������ʱ��ʾ��Ϣ
    $('#txt_username').bind("focus",function(){ 
    	checkLogin.userName.checkUsernameFocus();
    });
    //��������ʱ�������׺�Զ�����
    $("#txt_username").keyup(function(e){
    	checkLogin.userName.checkUsernameInput(e);
    });
    //�˺������ʧȥ����ʱ�������˺źϷ�����֤
    $("#txt_username").blur(function(){
    	//���������׺�Զ���ȫ���ܵĵ����¼���������ȷ˳��Ӧ������Ӧ���ڸ��¼�֮��ִ�У�����ҵ�񽻻���Ҫ���ò����Ӻ�����ʹ��setTimeout�¼�
        setTimeout(function(){ 
        	checkLogin.userName.checkUsername();
        	checkLogin.tool.showMobileAndUpdateVcode();
        }, 200);
    });
    
    $("#select_emaildomain").children().click(function() {
        $("#txt_username").val($(this).attr("title"));
        $("#select_emaildomain").hide();
        selectdomin = 0;
    }); 

    //��ʾͷ������թ�İ�
    checkLogin.tool.getCheatProof();
    //��������� 
    $('#txt_password').bind("focus",function(){ 
        checkLogin.password.checkPasswordFocus();
    });
    $("#txt_password").keyup(function(){ 
        checkLogin.password.checkPasswordInput();
    });
    $("#txt_password").blur(function(){
        checkLogin.password.checkPassword();
    });
    $("#txt_password").keypress(function(e) {
        checkLogin.password.checkCapslockOpen(e);
    });
    
    //ȷ����������� 
    $('#txt_repassword').bind("focus",function(){ 
        checkLogin.rePassword.checkRePasswordFocus();
    });
    $("#txt_repassword").blur(function(){
        checkLogin.rePassword.checkRePassword();
    });   
    
    //�ֻ���֤����� 
    $('#txt_mobile').bind("focus",function(){
    	checkLogin.mobile.checkMobileFocus();
    });
    $("#txt_mobile").blur(function(){
        checkLogin.mobile.checkMobile();
        checkLogin.tool.showMobileAndUpdateVcode();
    });
    //ͼ����֤��
    jQuery('#vcodeImgWrap, #vcodeImgBtn').click(function(){
		show_vcode('imgVcode');
	});
    $('#txt_vcode').bind("focus",function(e){
    	checkLogin.vcode.checkVcodeFocus(e);
    });
    $('#txt_vcode').blur(function(e){
    	checkLogin.vcode.checkVcode(e);
    });
    $("#txt_vcode").keyup(function(e){
        checkLogin.vcode.checkVcode(e);
    });
    //��ȡ�ֻ���֤��
    $('#sendMobileCode').bind("click",function(){
    	checkLogin.mobileCodeBtn.sendMobileCodeFun();    
    });
    
    //������֤��
    $('#J_MobileCode').bind("focus",function(){
    	checkLogin.mobileCode.checkMobileCodeFocus();
    });
    $("#J_MobileCode").blur(function(){
        checkLogin.mobileCode.checkMobileCode();
    });
    
    //�������ѡ
    $('#chb_agreement').bind("click",function(){
    	checkLogin.agreement.checkAgreement();
    });
    
    //�ύע��
    $('#J_submitRegister').bind("click",function(){
    	//��ֹ�ظ��ύ
    	submitBtnAvailability('disable');
//    	setTimeout(function(){
    		check_register();
//        }, 300);
    	
    });
});