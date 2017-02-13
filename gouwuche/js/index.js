var app = angular.module("myApp",["ngCookies"]);

app.controller("myCtrl",["$scope","$cookies","$http","$httpParamSerializerJQLike",function($scope,$cookies,$http,$httpParamSerializerJQLike){
	$scope.classID=1;
	$http.get("api/goodData.json").then(function(response){
		var result = response.data;
		var data = eval(result);
		for(var key in data){
			if (data[key]["classID"]==1) {
				$scope.proList = data[key]["good"];
			}
		}
	});
	$http.get("api/goodData.json").then(function(response){
		$scope.classList = response.data;
	});
	$scope.isLoading = true
	$scope.goProList = function(classItem){
		$scope.classID = classItem.classID;
		$scope.pageCode = 0;
		$scope.proList = classItem.good;
		console.log($scope.proList);
		if($scope.proList == ""){
			alert("暂未数据")
		}
	}
	$scope.sortData = function(id){
		var arr = $scope.proList;
		console.log("arr",arr)
		arr.sort(function(a,b){
			if(id == 0){
				return a.price-b.price;
			}else if(id == 1){
				return b.price-a.price;
			}else if(id == 2){
				return a.discount-b.discount;
			}else if(id == 3){
				return b.discount-a.discount;
			}
			
		})
		$scope.proList = arr;
	}
	$scope.pageCode = 0;
	$scope.lineNumber = 4;
	$scope.pageChange = function(id,classID){
		console.log("pageCode",$scope.pageCode)
		console.log("lineNumber",$scope.lineNumber)
		if(classID != undefined){
			console.log("classID",classID)
			$scope.pageCode = 0;
		}
		if(id == 0){
			if($scope.pageCode < 1){
				$("#prevBtn").attr("disabled","disabled");
			}else{
				$scope.pageCode--;
				$scope.httpRequest();
				$("#prevBtn").attr("disabled","");
			}
		}else{
			$scope.pageCode++;
			$scope.httpRequest();
		}
	}
	
	$scope.httpRequest = function(type){
		console.log($scope.classID);//= classItem.classID;
		if(type == ""){
			$http({
				url: "api/goodData.json",
				method: 'POST',
				data: $httpParamSerializerJQLike({
					pageCode:$scope.pageCode,
					linenumber:$scope.lineNumber,
				}),
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded'
				}
			}).then(function(response){
				var data = eval(response.data);
				data=data[$scope.classID]["good"];
				console.log(data);
				if(data == "0"){
					alert("暂未数据")
					$scope.pageCode = $scope.pageCode-1;
				}
				$scope.proList = data.good;
			})
		}else{
			$http({
				url: "api/goodData.json",
				method: 'POST',
				data: $httpParamSerializerJQLike({
					pageCode:$scope.pageCode,
					linenumber:$scope.lineNumber,
					classID:$scope.classID
				}),
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded'
				}
			}).then(function(response){
				var data = eval(response.data.good);
				console.log(data);
				if(data == "0"){
					alert("暂未数据")
					$scope.pageCode = $scope.pageCode-1;
				}
				$scope.proList = data;
			})
		}
	}
	$scope.changeNum = function(item){
		$scope.lineNumber = item;
	}
	$scope.addcart=function (proItem) {
		var getCookie = $cookies.getAll();
		console.log(getCookie);
		var cookies_num=0;
		for(var key in getCookie){
			cookies_num++;
		}
		if (cookies_num!=0) {
			for (var key in getCookie) {
				if (proItem.goodsID==JSON.parse(getCookie[key]).goodsID) {
					var good=JSON.parse(getCookie[key]);
					good.num++;
					$cookies.putObject("good"+proItem.goodsID,good);
					break;
				}else{
					$cookies.putObject("good"+proItem.goodsID,proItem);
				}
			}
		}else{
			$cookies.putObject("good"+proItem.goodsID,proItem);
			// console.log("yijingcunzai");
		}
		alert("添加成功");
	}
	$scope.go_cart=function() {
		window.open("demo.html");
	}
}]);
app.filter("discountFilter",function(){
	return function(discount){
		if(discount == "0"){
			return "不打"
		}else{
			return discount;
		}
	}
});

