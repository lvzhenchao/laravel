<?php

namespace App\Http\Controllers\Admin;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;
use Gregwar\Captcha\CaptchaBuilder;//使用验证码的类

class LoginController extends Controller
{
    // 1 登录表单
    public function login()
    {
    	return view("admin.login.login");
    }

    //2 执行登录
    public function dologin(Request $request)
    {
    	//1 验证码
    	$mycode = session()->get("code");
    		// $mycode = Session::get("code");
    		// dd($mycode);
    		// dd($request->input('code'));
    	if($mycode!=$request->input('code')){
    		return back()->with("msg","验证码错误");//后退

    		// session()->flash("msg","验证码错误");//写入错误信息
    		// return redirect("admin/login");//重定向
	    }

    	//2 用户名和密码
	    $name = $request->input("name");
	    $password = $request->input("password");
    	$ob = \DB::table('manage')->where("account",$name)->first();

    	if($ob){
    		if($ob->scode == $password){
    			//如果存在写入session
    			session()->set("adminuser",$ob);
    			//再跳转到后台页面
    			return redirect("admin/");//路由回去跳转
    		}
    		return back()->with("msg","用户或密码错误");
    	}

    	return back()->with("msg","用户或密码错误");
    } 

	//3 验证码
    public function captcha($tmp)
    {
        //生成验证码图片的Builder对象，配置相应属性
        $builder = new CaptchaBuilder;
        //可以设置图片宽高及字体
        $builder->build($width = 100, $height = 40, $font = null);
        //获取验证码的内容
        $phrase = $builder->getPhrase();

        //把内容存入session
        // Session::flash('code', $phrase); //类调用方法
        session()->flash('code',$phrase);

        //生成图片
        // header("Cache-Control: no-cache, must-revalidate");
        // header('Content-Type: image/jpeg');
        // $builder->output();
        // exit;
        return response($builder->output())->header('Content-Type','image/jpeg');
    }

    //4 执行退出
	public function logout()
	{
		//忘记session
		session()->forget("adminuser");
		//重定向
		return redirect("admin/login");
	}
}
