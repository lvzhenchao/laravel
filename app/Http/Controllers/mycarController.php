<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;

class mycarController extends Controller
{
    
    public function index(Request $request)
    {
    	 //dd($request->session()->all());
  		$user=$request->session()->all()['adminuser'];
			
		$goods=$request->session()->all()['sad'];
		
		//获得mycar表里各个字段所需的值
		$gname=$goods[0]->bookname;
		$uid=$user->id;
		$gid=$goods[0]->id;
		$gpic=$goods[0]->pic;
		$bnprice=$goods[0]->newprice;
		$gnum=1;

		//这里获取购物车的总价的初始值
		//先获得用户的uid，再根据这个uid，去查找各个商品的数量和价格，求出总价格
		//
		//$stan="\DB::select(select * from mycar where uid=".$uid);
		// if(!empty($stan=\DB::select("select * from mycar where uid=".$uid)))
		// {
		// 	return $stan['uid'];


		// }









		$check=\DB::table('mycar')->where('gid','=',$gid)->where('uid','=',$uid)->first();
		if(empty($check))
		{
			//echo '空';
			$row=\DB::table('mycar')->insert(
				['uid'=>$uid,'gid'=>$gid,'gname'=>$gname,'gpic'=>$gpic,'bnprice'=>$bnprice,'gnum'=>$gnum]);

			if($row>0)
			{
					
				$list =\DB::select('select * from mycar where uid='.$uid);
				// 	echo '<pre>';
    //         		var_dump($list);
    //         		echo '</pre>';
				// return '插入成功';

		}
			else
			{
				
				$list = \DB::select('select * from mycar where uid='.$uid);
				// 	echo '<pre>';
    //         		var_dump($list);
    //         		echo '</pre>';
				// return '不插入成功';


			}






		}
		else
		{
			// echo '<hr>';
			// echo '非空';
			$checkGid=$check->gid;
			$checkId=$check->id;
			$checkNum=($check->gnum)+1;
			$k=\DB::table('mycar')
            ->where('id',$checkId)
            ->update(['gnum' => $checkNum]);
            if($k>0)
            {
            		
            	$list = \DB::select('select * from mycar where uid='.$uid);
            		// echo '<pre>';
            		// var_dump($list);

            		// echo '</pre>';
            	 // return '修改成功';
            	
            }
           	else
           	{
           		
           		$list = \DB::select('select * from mycar where uid='.$uid);
           		// 	echo '<pre>';
            	// 	var_dump($list);
            	// 	echo '</pre>';
           		// return '修改失败';

           	}



		}
		

		return view('mycar.index')->with('list',$list);
		//return view('mycar.empty');








    }


 public function delgoods($gid,$uid)
 {
	  
	  //$blue = \DB::delete('delete from mycar where gid='.$gid.' and uid='.$uid);
	 	//return redirect('/mycar');
	 	//这是修改的开始
	 	
	 	$blue = \DB::delete('delete from mycar where gid='.$gid.' and uid='.$uid);
	 	
	 $yellow = \DB::select('select * from mycar where uid='.$uid);
	 	if(empty($yellow))
	 	{
	 		return redirect('/kong');

	 	}
	 	else
	 	{

	 		return redirect('/mycar');

	 	}
	 	




 }
 
 
 public function closer($uid)
 {
 	//return $uid;
 	$a=\DB::table('mycar')->where('uid','=',$uid)->delete();
 	
 		
 		return view('mycar_complete.complete');

 	

 }
  












}
