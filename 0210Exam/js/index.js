var app = angular.module("myApp", []);

app.controller("myCtrl",["$scope","$http","$httpParamSerializerJQLike",function($scope,$http,$httpParamSerializerJQLike){
	$http.get("http://datainfo.duapp.com/shopdata/getGoods.php?callback=").then(function(response){
		var result = response.data;
		console.log(result);
		//JAON.parse()
		var data = eval(result);
		console.log(data);
		$scope.proList = data;
	});
	$http.get("http://datainfo.duapp.com/shopdata/getclass.php").then(function(response){
		$scope.classList = response.data
	});
	$scope.isLoading = true
	$scope.goProList = function(classItem){
		console.log(classItem.classID)
		$scope.classID = classItem.classID;
		$scope.pageCode = 0;
		$http({
			url: "http://datainfo.duapp.com/shopdata/getGoods.php?callback=",
			method: 'POST',
			data: $httpParamSerializerJQLike({
				classID:classItem.classID,
			}),
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded'
			}
		}).then(function(response){
			var data = eval(response.data);
			console.log(data);
			if(data == "0"){
				alert("暂未数据")
			}
			$scope.proList = data;
		})
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
		if(type == ""){
			$http({
				url: "http://datainfo.duapp.com/shopdata/getGoods.php?callback=",
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
				console.log(data);
				if(data == "0"){
					alert("暂未数据")
					$scope.pageCode = $scope.pageCode-1;
				}

				$scope.proList = data;
			})
		}else{
			$http({
				url: "http://datainfo.duapp.com/shopdata/getGoods.php?callback=",
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
				var data = eval(response.data);
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
		$scope.httpRequest();
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

