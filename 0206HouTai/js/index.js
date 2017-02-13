var _app=angular.module("AngularApp",['ngRoute']);
function getMenu($http,$scope) {
	$scope.state=false;
	$scope.menter=function(target) {
		$(".left-menu ul li a").css("background","transparent");
		$(target).css("background","#fff");
	}
	$scope.show=function(target) {
		// console.log(target);
		$scope.state=true;
		$(".left-menu ul li a").css("display","none");
		$scope.a_class=(target.getAttribute('data'));
		$("."+$scope.a_class).css("display","block");
	}
	$http.post("api/menu.json").then(function getdata(data, status, headers, config) {
		$scope.menu=data.data;
	}).catch(function(data, status, headers, config){
		console.log("error");
	})
}
_app.config(function($routeProvider){
	$routeProvider.when("/password",{
		templateUrl:"password.html",
		controller:"passwordController"
	}).when("/contect",{
		templateUrl:"contect.html",
		controller:"contectController"
	})
})
_app.controller("menu",getMenu);




