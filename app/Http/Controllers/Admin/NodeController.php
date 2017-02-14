<?php

namespace App\Http\Controllers\Admin;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;

class NodeController extends Controller
{
    //1.查看权限
    public function index()
    {
    	$list = \DB::table('node')->get();
    	// dd($list);
    	return view('admin.content.admin-permission')->with('list',$list);
    }
}
