<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| This file is where you may define all of the routes that are handled
| by your application. Just tell Laravel the URIs it should respond
| to using a Closure or controller method. Build something great!
|
*/

/* Route::get('/', function () {
    return view('welcome');
}); */


//关于商城首页
 Route::get('home/',"PicController@artpic");/*function(){
	return view('shopcity/web');
 
 
 });
 
 
 
/*  //关于前台登陆
 Route::get('/login','HomeRegist\HomeRegisterController@login');
 
//关于前台注册
 Route::get('/regist','HomeRegist\HomeRegisterController@regist');
  */
 
 /**********************大分类页面开始********************/
/* Route::get('/wenyi',function(){
	return view('shopcity.bigtype.wenyi');
 });
 */
  /**********************分类页面结束********************/
 
 
  /**********************单个具体页面开始********************/
 Route::get('/shu/{id?}','OnepicController@index');
 
 
  
   /**********************单个具体页面结束********************/
 
 /**********这是路由组*********/
/*  Route::group(['prefix'=>'home','middleware'=>'detaildate\Detail'],function(){
	
	Route::get('/infor',function(){
	return view('infor.index');
 
 }); 
 
 });
   */
 //搜素
 Route::get('sousuo',"SearchController@index");

 //登录页面
Route::get('login',"LoginController@login");
//执行退出
Route::get('logout',"LoginController@logout");
//执行登录
Route::post('dologin','LoginController@dologin');
//验证码
Route::get("captcha/{tmp}","LoginController@captcha");
//注册
Route::get('sign',"SignController@sign");
//执行注册
Route::post('ddsign','SignController@dosign');
//验证用户名是否存在
Route::get('check/{tmp}','SignController@checkUname');
// Route::get('geren1',function () {
// 	return view('index1');
// });
//验证码
Route::get('ckcd/{tmp}','SignController@checkCode');
//激活
Route::get('active','SignController@doActive');
//找回密码页面 
Route::get('find',function () {
	return view('find');
});
//执行找回
Route::post('find','InforController@dofind');
//发送邮件找回密码
Route::get('domail','InforController@domail');


//个人信息页面

//二级页面
Route::get('childpage','PicController@zmune');
//二级页面遍历书籍
Route::get('bianli','PicController@bianli');
//充值页面
Route::get('payfor',function () {
	return view('payfor');
});
// 更换头像
Route::get('pic',"PicController@headPic");

Route::get('search/{id}',"PicController@search");//遍历首页出现的小图

//上传头像
Route::post('pic',"PicController@picupdate");
//修改个人信息
Route::post('userinfor','InforController@doupdate');

 
 
 
 
 
 //前台
 Route::group(["prefix"=>"/","middleware"=>"userauth"],function(){
		//个人信息

 		Route::get('geren',function(){
			return view('index');
		});
		  Route::get('/infor',function(){
			return view('infor.index');
		 });  

		 //购物车
		 Route::get('/mycar',function(){
			return view('mycar.index');
		 });
		 
		 //我的余额
		  Route::get("/res",function(){
		 
			return view('res.index');
		 });
		  
		 //评论
		  Route::get('/disc',function(){
		 
			return view('disc.index');
		 });			

		//mycar_complete成功添加到购物车开始
    	Route::get('/mycar_complete',function(){
 
			return view('mycar_complete.index');
 		});
  		
  		//支付
	 	Route::get('pay_style/{uid}','mycarController@closer');


	 	 //购物车
		Route::get('mycar','mycarController@index');
		 //删除购物车里的商品
		Route::get('mycar/{gid}/{uid}','mycarController@delgoods');
		
		//当购物车为空时跑的路由
		Route::get('kong',function(){

			return view('mycar.kong');
		});
  
  
});	
	
	
/****
*    
*
*			后台路由集合开始！！！
*
*
****/

	
/*Route::get('admin/', function () {
    return view('admin.login.login');->通过测试
});
*/

// Route::get("code/{tttttmp}","DemoController@captcha");->测试验证码通过

/*Route::get('/', function () {
    return view('admin.base.base');//后台父类

});*/


Route::get('/', function () {
    return view('admin.content.404');//404界面
});

	//1 登录表单 
Route::get('admin/login',"Admin\LoginController@login");
	//2 执行登录 post提交
Route::post("admin/dologin","Admin\LoginController@dologin");
	//3 验证码
Route::get("admin/captcha/{tmp}","Admin\LoginController@captcha");



/**
*
*
*	***路由群组实现***  "middleware"=>"myauth"=>中间件控制过滤
*
**/

Route::group(["prefix"=>"admin","middleware"=>"myauth"],function(){
		/*登录后的界面*/
		Route::get("/","Admin\IndexController@index");//后台界面路由->首页
		//退出
		Route::get("logout","Admin\LoginController@logout");

	
			
		//用户
		Route::resource("/member-list","Admin\UserController");	

		//评论
		Route::resource("/feedback-list","Admin\EvaluateController");	

		//评论区查看会员信息
		Route::get('/member-show', function () {
	    	return view('admin.content.member-show');
			});

		//管理员
		Route::resource("/admin-list","Admin\AdminController");

		//管理员角色管理
		Route::get('/admin-role',"Admin\RoleController@index");
		
			//添加角色
			Route::get('/admin-role-add', function () {
			    return view('admin.content.admin-role-add');
			});

		//权限管理
		Route::get('/admin-permission',"Admin\NodeController@index"); 



		//系统设置
		Route::get('/system-base', function () {
    		return view('admin.content.system-base');
		});

		//网站配置信息提交   走的前台控制器
		Route::post('/system-base/add',"PicController@upsys"
		);

		//友情链接删除链接功能
		Route::get('system-category/del/{id}',"Admin\contantController@del");

		//栏目管理(遍历)
		 Route::get('/system-category',"Admin\contantController@upd");

		 Route::get('/system-category-add',"Admin\contantController@add");
		 
		 Route::post('url/add','Admin\contantController@urlAdd');

		//栏目管理
		Route::get('/system-category', function () {
    		return view('admin.content.system-category');
		});
			//添加栏目
			Route::get('/system-category-add', function () {
	    		return view('admin.content.system-category-add');
			});

		//数据字典
		Route::get('/system-data', function () {
   			 return view('admin.content.system-data');
		});

		//屏蔽词
		Route::get('/system-shielding', function () {
    		return view('admin.content.system-shielding');
		});

		//日志
		Route::get('/system-log', function () {
    		return view('admin.content.system-log');
		});

		//刘志鹏的产品管理
		/*  Route::get('/product-list', function () {
		return view('admin.content.product-list');//产品管理 */
		Route::get('/product-list', 'admin\TypeManageController@index');
		
		//类别的删除
		Route::get('/product-list/del/{id?}', 'admin\TypeManageController@dodel');

		//我的图片管理
		Route::get('/picture-list','DoaddPicController@piclist'); 

		//我的商品上下架
		Route::get('/product/sale/{id?}/{onsale?}','DoaddPicController@onsheet');  

		//我的修改商品信息 
		Route::get('/product/edit/{id?}','DoaddPicController@mend');  

		//我的执行商品信息修改 
		Route::any('/product/doedit','DoaddPicController@domend');

		Route::get('/product/del/{id?}','DoaddPicController@dodell');  //我的商品删除


		//添加图片
		Route::get('/picture-add', function () {
	    return view('admin.content.picture-add');

	   

	});


});

 Route::post('/test','DoaddPicController@deal'); //执行添加图片
		//Route::any('/test','DoaddPicController@domend');

	

// Route::get('/picture-list', function () {
//     return view('admin.content.picture-list');//图片管理
// });
		
		//展示图片
		Route::get('/picture-show', function () {
	    return view('admin.content.picture-show');
	});


Route::get('/product-brand', function () {
    return view('admin.content.product-brand');//品牌管理
});

Route::get('/product-category', function () {
    return view('admin.content.product-category');//分类管理
});

Route::get('/product-category-add', function () {
    return view('admin.content.product-category-add');//添加分类
});

/*Route::get('/product-list', function () {
    return view('admin.content.product-list');//产品分类
});*/
		//添加产品
		Route::get('/product-add', function () {
	    return view('admin.content.product-add');
	});


Route::get('/member-del', function () {
    return view('admin.content.member-del');//会员删除
});

Route::get('/member-record-browse', function () {
    return view('admin.content.member-record-browse');//浏览收藏
});


/*Route::get('/admin-role', function () {
    return view('admin.content.admin-role');//管理员角色管理
});*/
	//添加角色
/*	Route::get('/admin-role-add', function () {
    return view('admin.content.admin-role-add');
});
*/
// Route::get('/admin-permission', function () {
//     return view('admin.content.admin-permission');//权限管理
// });





/**
*	后台路由结束
*
*/



	
	
	
	
  