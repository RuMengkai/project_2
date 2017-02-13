var app = angular.module('myApp', ["ngCookies"]);

app.controller('myCart', function($scope,$cookies,$cookieStore) {
	$scope.all=true;//全选
	$scope.check=function(){
		for(var i in $scope.cartList){
			if (!$scope.cartList[i].check) {
				$scope.all=false;
				break;
			}
		}
	}
	$scope.checkAll=function(){
		for(var i in $scope.cartList){
			$scope.cartList[i].check=$scope.all;
		}
	}
	//增加  
	$scope.add=function(index,id){  
		$scope.cartList[index].num++; 
		var good=JSON.parse(getCookie["good"+id]);
		good.num=$scope.cartList[index].num;
		$cookies.putObject("good"+id,good);
	};  
	//减少  
	$scope.reduce= function (index,id) {  
		if($scope.cartList[index].num>1){  
			$scope.cartList[index].num--; 
			var good=JSON.parse(getCookie["good"+id]);
			good.num=$scope.cartList[index].num;
			$cookies.putObject("good"+id,good);
			console.log(index,id); 
		}else{  
			$scope.remove(index,id);  
		}  
	};  
	//移除一项  
	$scope.remove=function(index,id){  
		if(confirm('确定移除此项吗？')){  
			$scope.cartList.splice(index,1);
			$cookies.remove("good"+id);
		}  
	};  

	//清空购物车  
	$scope.removeAll=function(){  
		if(confirm('确定清空购物车')){  
			for(var i= 0;i<$scope.cartList.length;i++){  
				if ($scope.cartList[i]["check"]) {
					console.log($scope.cartList[i]["goodsID"]);
					$cookies.remove("good"+$scope.cartList[i]["goodsID"]);
					$scope.cartList.splice(i,1);
					i--;
				}
			}
		}  
	}  
	 //计算总价  
	 $scope.allSum=function(){
	 	var allPrice = 0;
	 	for(var i= 0;i<$scope.cartList.length;i++){  
	 		if ($scope.cartList[i]["check"]) {
	 			allPrice+=$scope.cartList[i].price*$scope.cartList[i].num;  
	 		}
	 	}
	 	return allPrice;  
	 }; 
	 //使得输入框中不得小于等于0  
	 $scope.change=function(index,id){  
	 	if($scope.cartList[index].num>=0){  
	 	}else{  
	 		$scope.cartList[index].num=1;  
	 	}  
	 };  
	 //计算总数量  
	 $scope.allNum=function(){  
	 	var allShu=0;  
	 	for(var i=0;i<$scope.cartList.length;i++){  
	 		if ($scope.cartList[i]["check"]) {
	 			allShu+=Number($scope.cartList[i].num);  
	 		}  
	 	}
	 	return allShu;  
	 }; 
	$scope.cartList=[];//购物车商品列表
	
	// var data=[{
	// 	"id":0,
	// 	"imgsUrl":"images/1.jpg",
	// 	"goodsName":"Casio/卡西欧 EX-TR350",
	// 	"price":5999.88,
	// 	"num":1,
	// 	"total":5999.88,
	// 	"check":true
	// },
	// {	
	// 	"id":1,
	// 	"imgsUrl":"images/2.jpg",
	// 	"goodsName":"Canon/佳能 PowerShot SX50 HS",
	// 	"price":3888.50,
	// 	"num":1,
	// 	"total":3888.50,
	// 	"check":true
	// },
	// {	
	// 	"id":2,
	// 	"imgsUrl":"images/3.jpg",
	// 	"goodsName":"Sony/索尼 DSC-WX300",
	// 	"price":1428.50,
	// 	"num":1,
	// 	"total":1428.50,
	// 	"check":true
	// },
	// {	
	// 	"id":3,
	// 	"imgsUrl":"images/4.jpg",
	// 	"goodsName":"Fujifilm/富士 instax mini 25",
	// 	"price":640.60,
	// 	"num":1,
	// 	"total":640.60,
	// 	"check":true
	// }];
	//将数据存入cookie
	// $cookies.putObject("good1",data[0]);
	// $cookies.putObject("good2",data[1]);
	// $cookies.putObject("good3",data[2]);
	// $cookies.putObject("good4",data[3]);
	// $cookies.putObject("userinfo",data[3]);
	//将数据从cookie中读出放入购物车列表
	var getCookie = $cookies.getAll();
	for (var key in getCookie) {
		//校验cookie中的信息确定是good
		if (key.substring(0,4)=="good") {
			$scope.cartList.push(JSON.parse(getCookie[key]));
		}
	}


	var aaa=$cookieStore.get("person1");
	$cookies.put("a1","aaa");
	$cookies.put("a2","bbb");
	var bb=$cookies.getAll();
	console.log(bb)



	// console.log($scope.cartList);
	// console.log(JSON.parse(getCookie["good1"]));
	// $cookies.putObject("goodList",$scope.cartList);
	// console.log(($scope.cartList));
	// console.log(JSON.parse(getObject["goodList"]));
});
