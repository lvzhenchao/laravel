<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;

class InforController extends Controller
{
    //修改信息
    public function doupdate(Request $request) {
    	// echo $request->username;
    	// echo $request->email;
    	// echo $request->phonenum;
    	// echo $request->id;
    	
    	// //return "aaaaaa";
    	$affected = \DB::update("update user set phonenum= '".$request->phonenum."',sex='".$request->sex."',email='".$request->email."' where id = ?", [$request->id]);
        // echo $affected;
        $ob = \DB::table('user')->where("id",$request->id)->first();
        session()->set("adminuser",$ob);
        return redirect('geren');
    }

    //找回密码
    public function dofind(Request $request) {
        // return $request->uname."<br>".$request->rcode.'<br>'.$request->pswd.'<br>'.$request->rpswd.'<br>'.$request->Mycode.'<br>'.$request->email;
        $ob = \DB::table('user')->where("username",$request->uname)->first();
        if($request->email == $ob->email && $request->rcode == $ob->rcode){
             $affected = \DB::update("update user set password = '".$request->pswd."' where username = ?", [$request->uname]);
             if($affected >= 1){
                echo "<span style='color:green;float:left;font-size:40px;margin:0 auto;'>修改成功...</span><br/><a href='login'>请登录</a>";
             }else{
                echo "<span>修改失败</span><a href='find'>点此重试</a>";
             }
        }
    }

    //发送找回邮件
    public function domail(Request $request) {
        $ob = \DB::table('user')->where("username",$request->username)->first();
        $rcode = $ob->rcode;
        $email = $request->email;
        $name = $request->username;
        $data = ['email'=>$email, 'name'=>$name, 'rcode'=>$rcode];
        \Mail::send('bbbb', $data, function($message) use($data)
        {
            $message->to($data['email'], $data['name'])->subject('动态码');
        });
        // echo $email;
        // echo $name;
        // echo $rcode;
        // echo "1111";
    }

}
