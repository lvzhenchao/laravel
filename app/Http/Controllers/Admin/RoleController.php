<?php

namespace App\Http\Controllers\Admin;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;

class RoleController extends Controller
{
    //1.查看角色
    public function index()
    {
    	$list = \DB::table("role")->get();
    	// dd($list);
    	return view('admin.content.admin-role')->with('list',$list);
    }
}
