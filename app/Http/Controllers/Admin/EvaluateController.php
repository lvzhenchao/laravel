<?php

namespace App\Http\Controllers\Admin;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;

class EvaluateController extends Controller
{
    //1.查看所有数据
    public function index()
    {
    	$list = \DB::table("discuss")->get();
    	// dd($list);
    	return view('admin.content.feedback-list')->with("list",$list);
    }


    
    //2.查看单条信息
    public function show($id)
    {

    }

    //7.执行删除
    public function destroy($id)
    {
    	// 1.执行删除  删除指定的id
    	// dd($id);
        $m = \DB::table('discuss')->where('id',$id)->delete();
        if($m>0){
    		return redirect("admin/feedback-list");
    	}else{
    		return "失败";
    	}
    }
    
}
