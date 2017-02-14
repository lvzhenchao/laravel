/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

try {
    document.domain='dangdang.com';
}
catch(err) {}
var show_vcode_domin="vcode.dangdang.com";
var ddvcode={
    
    //  imgVcodeHTML:"<img id=\"imgVcode\" width=\"66\" height=\"31\" />",
    new_vcode_url:"http://"+show_vcode_domin+"/show_vcode.php",
    check_vcode_url:"http://"+show_vcode_domin+"/p/vcode_checker.php",
    show_vcodetxt_url:"http://"+show_vcode_domin+"/p/vcode_txt2.php",
    show_vcode:function(parentImgVcodeId){

        if(document.getElementById(parentImgVcodeId)){
            document.getElementById(parentImgVcodeId).src=ddvcode.new_vcode_url+"?t="+new Date().getTime();


        }
    },



    check_vcode:function(verifyVcodeId,callback)
    {
      
        verifycode=document.getElementById(verifyVcodeId).value;
 
        url = ddvcode.check_vcode_url+"?callname="+callback+"&verifycode="+verifycode;
 
        try {
            var vcodeCheck=ddvcode.request("checkScript",url);
          
        //  var vcodeCheck=ddvcode.create_Jquert(url,callback,"checkScript");
        } catch (e) {
            alert(e.name + ": " + e.message);
        }
    },
    create_Jquert:function(url,callback,temp_scriptname){
        var jq_script=document.getElementById(temp_scriptname);
        if(jq_script!=null && document.all)
        {
            jq_script.src = url;
            return;
        }
        var head=document.documentElement.firstChild
        var script=document.createElement('script');
        script.id=temp_scriptname;
        script.type = 'text/javascript';
        script.src = url;
        if(jq_script!=null)
            head.replaceChild(script,jq_script);
        else
            head.appendChild(script);
        // var cb=new callbackobj();
        // cb.callbackfunction=callback;
        var done = false;
        script.onload = script.onreadystatechange = function() {
            if ( !done && (!this.readyState || this.readyState === "loaded" || this.readyState === "complete") ) {
                //cb.callbackfunction();
                script.onload = script.onreadystatechange = null;
            }
        }
    },
    request:function(id,url){
 
        oScript = document.getElementById(id);
        var head = document.getElementsByTagName("head").item(0);
        if (oScript) {
            head.removeChild(oScript);
        }
        oScript = document.createElement("script");
        oScript.setAttribute("src", url);
        oScript.setAttribute("id",id);
        oScript.setAttribute("type","text/javascript");
        oScript.setAttribute("language","javascript");
         
        head.appendChild(oScript);
        return oScript;
    }
}


