<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;

class SignController extends Controller
{
    //
    public function sign()
    {
        return view('sign');
    }
    //注册
    public function dosign(Request $request)
    {
        // echo '111111';
        // return $request->name;
        //验证码
        // $mycode = session()->get('code');
        // if($mycode!=$request->code){
        //  return back()->with("msg",'验证码错误');
        // }
        $uname = $request->uname;
        $pword = $request->pword;
        $email = $request->email;
        $phone = $request->phone;
        $rcode = time();
        \DB::table('user')->insert(['username'=>$uname, 'password'=>$pword, 'phonenum'=>$phone, 'email'=>$email, 'rcode'=>$rcode]);

        return redirect('login');

       /* $ob = \DB::table('user')->where("username",$uname)->first();
        $id = $ob->id;
        $data = ['email'=>$email, 'name'=>$uname, 'rcode'=>$rcode, 'id'=>$id];
        \Mail::send('aaaa', $data, function($message) use($data)
        {
            $message->to($data['email'], $data['name'])->subject('欢迎注册我们的网站，请激活您的账号！');
        });
        
       return '注册成功，请在邮箱中激活';*/
    }
//验证用户名
    public function checkUname($tmp){
        $uname = \DB::table('user')->where('username',$tmp)->first();
        echo json_encode($uname);
        

    }
//执行邮箱验证
    public function doActive (Request $request) {
        // echo $request->name;
        // echo $request->id;
        // echo $request->rcode;
        $ob = \DB::table('user')->where("id",$request->id)->first();
        if($request->name == $ob->username && $request->rcode == $ob->rcode){
           $affected = \DB::update("update user set status = '1' where id = ?", [$request->id]);
           if($affected >= 1){
                return "<center style='color:green;font-size:50px;'>恭喜你，激活成功！！</center><br><center><a href='login'>点此登录</a></center>";
           }else{

                return "<center style='color:green;font-size:50px;'>您已经激活账号，无需再次激活</center><br><center><a href='login'>点此登录</a></center>";
           }
        }
    }

    //找回密码页面验证码对比
    public function checkCode($tmp) {
        $mycode = session()->get('code');
        if($mycode!=$tmp){
            echo "0";
        }else{
            echo "1";
        }
    }
}
