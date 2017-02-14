<?php

namespace App\Http\Controllers\Admin;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;

class AdminController extends Controller
{
    //1.查看所有数据
    public function index()
    {
    	$list = \DB::table("manage")->get();
    	// dd($list);
    	return view('admin.content.admin-list')->with("list",$list);
    }

    //2.查看单条信息
    public function show($id)
    {

    }

    //3.添加信息
    public function create()
    {
    	//跳转到添加页面
    	return view('admin.content.admin-add');
    }

    //4.执行添加信息
    public function store(Request $request)
    {
    	//4-1接收表单传过来的值
    	$data = $request->only("account","scode","male","tel");
    	// $data = $request->all();
    	// dd($data);
    	//4-2将数据写入数据库
    	$id = \DB::table("manage")->insertGetid($data);
    	if($id>0){
    		return redirect("admin/admin-list");
    	}else{
    		return "失败";
    	}
    }

    //5.修改信息
    public function edit($id)
    {
    	//5-1获得需要修改的数据id
    	// dd($id);
    	$stu = \DB::table("manage")->where('id',$id)->first();
    	// dd($stu);
    	//5-2加载写入到视图
    	return view('admin.content.admin-update')->with("stu",$stu);

    }

    //6.执行修改
    public function update(Request $request,$id)
    {
    	//接收表单传的值
    	// dd($id);
    	// dd($request->all());
    	$data = $request->only("account","scode","tel");
    	// dd($data);
    	//2,执行修改
        $a = \DB::table("manage")->where("id",$id)->update($data);
        if($a>0){
    		return redirect("admin/admin-list");
    	}else{
    		return "失败";
    	}
    }

    //7.执行删除
    public function destroy($id)
    {
    	// 1.执行删除  删除指定的id
    	// dd($id);
        $m = \DB::table('manage')->where('id',$id)->delete();
        if($m>0){
    		return redirect("admin/admin-list");
    	}else{
    		return "失败";
    	}
    }
    
} 
