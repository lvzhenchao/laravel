(function(g,I,c){function k(a){return Object.prototype.toString.call(a)==="[object Array]"}_py.getLast=function(f){for(var d=this.length-1;0<=d;d--){if(k(this[d])){if(this[d][0]==f){return this[d][1]}}}return null};var H=_py.getLast("a"),B=["R6","CV","9b","g2","xT","_d"],x=H&&H.split(".")[0],j=true;for(var C=0;C<B.length;C++){if(B[C]==x){j=false;break}}if(j){var w=_py.getLast("p"),G=_py.getLast("pi"),t=_py.getLast("pv"),E=_py.getLast("e"),F=_py.getLast("domain"),A=_py.getLast("mapping");(function(i,q,p,f,e){i._CommandName_=f;i[f]=i[f]||function(){(i[f].q=i[f].q||[]).push(arguments);i[f].track=function(){(i[f].q[i[f].q.length-1].t=[]).push(arguments)};return i[f]},i[f].a=e,i[f].l=1*new Date();var u=q.createElement(p);u.async=1;u.src="//fm.ipinyou.com/j/a.js";var m=q.getElementsByTagName(p)[0];m.parentNode.insertBefore(u,m)})(g,I,"script","py",H);if(t!=null){py("set","user",{category:t})}if(E!=null){py("set","extend",E)}if(F!=null){py("set","domain",F)}if(A!=null&&!(A!==1)){py("set","mapping",0)}if(G!=null){var v={};v.product_no=G.id;v.name=G.name;v.brand=G.brand;v.orig_price=G.origPrice;v.price=G.price;v.pc_pic_url=G.imgUrl;v.product_url=G.productUrl;v.category=G.category;v.sold_out=G.soldOut;py("event","viewItem",v)}else{if(w!=null){py("event","viewItem",w)}else{py("event","viewPage")}}}else{function k(a){return Object.prototype.toString.call(a)==="[object Array]"}var y=function(){var i=location.hostname;var d=/^\d{1,3}.\d{1,3}.\d{1,3}.\d{1,3}$/;var a=i.split(".");var f=a.length-2;if(d.test(i)||2===a.length){return i}for(;0<=f;--f){if("www"===a[f]){return a.slice(f+1).join(".")}if(-1===",com,net,org,gov,edu,info,name,int,mil,arpa,asia,biz,pro,coop,aero,museum,ac,ad,ae,af,ag,ai,al,am,an,ao,aq,ar,as,at,au,aw,az,ba,bb,bd,be,bf,bg,bh,bi,bj,bm,bn,bo,br,bs,bt,bv,bw,by,bz,ca,cc,cf,cg,ch,ci,ck,cl,cm,cn,co,cq,cr,cu,cv,cx,cy,cz,de,dj,dk,dm,do,dz,ec,ee,eg,eh,es,et,ev,fi,fj,fk,fm,fo,fr,ga,gb,gd,ge,gf,gh,gi,gl,gm,gn,gp,gr,gt,gu,gw,gy,hk,hm,hn,hr,ht,hu,id,ie,il,in,io,iq,ir,is,it,jm,jo,jp,ke,kg,kh,ki,km,kn,kp,kr,kw,ky,kz,la,lb,lc,li,lk,lr,ls,lt,lu,lv,ly,ma,mc,md,me,mg,mh,ml,mm,mn,mo,mp,mq,mr,ms,mt,mv,mw,mx,my,mz,na,nc,ne,nf,ng,ni,nl,no,np,nr,nt,nu,nz,om,pa,pe,pf,pg,ph,pk,pl,pm,pn,pr,pt,pw,py,qa,re,ro,ru,rw,sa,sb,sc,sd,se,sg,sh,si,sj,sk,sl,sm,sn,so,sr,st,su,sy,sz,tc,td,tf,tg,th,tj,tk,tm,tn,to,tp,tr,tt,tv,tw,tz,ua,ug,uk,us,uy,va,vc,ve,vg,vn,vu,wf,ws,ye,yu,za,zm,zr,zw,".indexOf(","+a[f]+",")){return a.slice(f).join(".")}}return i};_py.getLast=function(f){for(var d=this.length-1;0<=d;d--){if(k(this[d])){if(this[d][0]==f){return this[d][1]}}}};_py.serialize=function(){function q(i,J){for(var m=0;m<i.length;m++){if(i[m]===J){return m}}return -1}for(var p=["domain","urlParam","pi","e","p","mapping"],a=[],f=[],s=[],e,d=0;d<this.length;d++){e=this[d][0],-1===q(p,e)&&(f[e]=f[e]||[],0<f[e].length?-1===q(f[e],this[d][1])&&f[e].push(this[d][1]):(f[e].push(this[d][1]),a.push([e,f[e]])))}for(d=0;d<a.length;d++){s.push(a[d][0]+"="+c(a[d][1].join(",")))}return s.join("&")};g.ipy={r:/(^|&)jump=(\d*)/i,cookie:{set:function(i,f,e,a,d){z=new Date();z.setTime(z.getTime()+(e||0));I.cookie=i+"="+c(f||"")+(e?"; expires="+z.toGMTString():"")+";path=/; domain="+(a||location.host)+(d?"; secure":"")},get:function(d){return(d=I.cookie.match(RegExp("(^|;)\\s*"+d+"=([^;]*)","i")))?decodeURIComponent(d[2]):""}},setCookie:function(d,a){ipy.cookie.set(d,a,31536000000,y())},setSession:function(d,a){ipy.cookie.set(d,a,0,y())},getJump:function(){var a=ipy.cookie.get("ipysession");return a&&(a=a.match(ipy.r))?parseInt(a[2]):0},setJump:function(a){var d=ipy.cookie.get("ipysession");d?d.match(ipy.r)?ipy.setSession("ipysession",d.replace(/jump=(\d*)/,"jump="+a)):ipy.setSession("ipysession",d+"&jump="+a):ipy.setSession("ipysession","jump="+a)},getInfo:function(f){var a=ipy.cookie.get(f);if(a){return a}try{if(g.localStorage){if(localStorage.getItem(f)){return localStorage.getItem(f)}}}catch(d){}return""},setInfo:function(f,a){if(a==null||a==""){return}ipy.setCookie(f,a);try{if(g.localStorage){localStorage.setItem(f,a)}}catch(d){}},getQueryString:function(e){if(e==""||e==null){return}var m=g.location.href,a=m.split(e),d="";if(a.length>1){m=a[1];d=m.split("&")[0].replace("=","");return d}var f=new RegExp("(^|&)"+e+"=([^&]*)(&|$)"),i=g.location.search.substr(1).match(f);if(i!=null&&i){return i[2]}var p=g.location.hash.substr(1).match(f);if(p!=null&&p){return p[2]}return""},setExendParam:function(m,q,i){var d=m||"",a=q||"",f=i||"";ipy.getExtendParam(d,a,f)},getExtendParam:function(a,f,p){var m="",d="";if(a!=null&&a){m="p="+a}if(f!=null&&f){_py.push(["pv",f])}if(p!=null&&p){m+="&ext="+p}ipy.extendSend(m)},itemInfo:function(e){var a=[],p;switch(typeof e){case"string":p=e;break;case"object":var f=["id","name","origPrice","price","brand","imgUrl","productUrl","categoryId","category","promotion","discount","soldOut","domain","currency"];for(var d=0;d<f.length;d++){var m=(e[f[d]]==undefined)?"":e[f[d]];m=m.toString();a.push(c(m))}ipy.id=e.id||"";p=a.join(",");break;default:return p=""}return p},extendSend:function(a){var d="";if(_py.getLast("e")){d="e="+_py.getLast("e")+"&"}d+=a,n=_py.getLast("domain"),w=("https:"==location.protocol?"https":"http")+"://"+n+"/adv?"+_py.serialize()+ipy.getSession()+"&e="+h(d)+"&rd="+new Date().getTime();(new Image()).src=w},getSession:function(){var d=_py.getLast("c");if(d&&d!=null){var a=ipy.getJump();if(!isNaN(a)&&a==0){ipy.setJump(a+1);return""}a++;ipy.setJump(a);return"&s="+a}return""},getP:function(){var a=_py.getLast("p");var d=ipy.id?ipy.id:"";a=a?a:d;return a}};if(_py.getLast("mapping")!==1){var D="http:"!=location.protocol?"https://cm.ipinyou.com/cmas.html?a="+_py.getLast("a"):"http://fm.p0y.cn/cm/cma.html?a="+_py.getLast("a")}var w=location.href,o=I.referrer,E,G,r;g.parent!=g&&(w=o,o="");w&&_py.push(["u",w]);o&&_py.push(["r",o]);var l=_py.getLast("urlParam")||"pyck",F=ipy.getQueryString(l);F=F?F:ipy.getInfo("ipycookie");ipy.setInfo("ipycookie",F);F&&_py.push(["c",F]);var n=_py.getLast("domain");var E=_py.getLast("e");if(E!=""&&E){E="e="+_py.getLast("e")}else{E=""}G=ipy.itemInfo(_py.getLast("pi"));w=("https:"==location.protocol?"https":"http")+"://"+n+"/adv?"+_py.serialize()+ipy.getSession()+"&pi="+c(G)+"&p="+c(ipy.getP())+"&e="+c(E)+"&rd="+new Date().getTime()+"&v=1";function b(){if(I.body){var a=I.createElement("script");a.type="text/javascript";a.async=!0;a.src=w;a.onload=a.onreadystatechange=function(){if(!this.readyState||this.readyState=="loaded"||this.readyState=="complete"){a.parentNode.removeChild(a);var d=I.createElement("iframe");d.sandbox="allow-scripts allow-same-origin";d.style.display="none";d.src=D;I.body.insertBefore(d,I.body.firstChild)}};I.body.insertBefore(a,I.body.firstChild)}else{setTimeout(b,50)}}setTimeout(b,10)}})(window,document,encodeURIComponent);