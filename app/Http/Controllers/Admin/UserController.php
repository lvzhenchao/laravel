<?php

namespace App\Http\Controllers\Admin;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;

class UserController extends Controller
{
    //1.查看所有数据
    public function index()
    {
    	$list = \DB::table("user")->get();
    	// dd($list);
    	return view('admin.content.member-list')->with("list",$list);
    }

     //2.查看单条信息
    public function show($id)
    {
        return "用户的信息ID".+$id;
    }

    //3.添加信息
    public function create()
    {
    	//跳转到添加页面
    	return view('admin.content.member-add');
    }

    //4.执行添加信息
    public function store(Request $request)
    {
    	//4-1接收表单传过来的值
    	// dd($request)
    	$data = $request->only("username","password","phonenum","sex","email");
    	// $data = $request->all();
    	// dd($data);
    	//4-2将数据写入数据库
    	$id = \DB::table("user")->insertGetid($data);
    	if($id>0){
    		return redirect("admin/member-list");
    	}else{
    		return "失败";
    	}
    }

	     //5.修改信息
    public function edit($id)
    {
    	//5-1获得需要修改的数据id
    	// dd($id);
    	$stu = \DB::table("user")->where('id',$id)->first();
    	//dd($stu);
    	//5-2加载写入到视图->with("stu",$stu);

    	return view('admin.content.memberchange-password')->with("stu",$stu);
        exit;
    }

    //6.执行修改
    public function update(Request $request,$id)
    {
    	//接收表单传的值
    	// dd($id);
    	// dd($request->all());
    	$data = $request->only("password");
    	// dd($data);
    	//2,执行修改
        $a = \DB::table("user")->where("id",$id)->update($data);
        if($a>0){
    		return redirect("admin/member-list");
    	}else{
    		return "失败";
    	}
    }

     //7.执行删除
    public function destroy($id)
    {
    	// 1.执行删除  删除指定的id
    	// dd($id);
        $m = \DB::table('user')->where('id',$id)->delete();
        // dd($id);
        if($m>0){
    		return redirect("admin/member-list");
    	}else{
    		return "失败";
    	}
    }
}
