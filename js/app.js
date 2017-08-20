(function (angular) {
	'use strict';
	// Your starting point. Enjoy the ride!
	angular
		.module('todoApp', ["todoApp.dataService","ngRoute"])
		.config(function ($routeProvider) {
			$routeProvider
				.when('/:status?', {
					// 因为 app.js 最终是在 index.html 页面中执行的
					// 所以，路径是相对于 index.html 的
					templateUrl: './views/todo.html',
					controller: 'TodoCtrl'
				})
		})
		.controller('TodoCtrl', ["$scope","$location","todoService","$routeParams",function ($scope,$location,todoService,$routeParams) {
			// console.log($routeParams);
			var vm = $scope;
			var todoList = todoService.todoList;
			vm.todoList = todoList;//注意这个地方，一定要在scope中定义一下子，要不然在HTML中不能引用啊，注意注意！！
			// console.log(todoList);
		//	添加数据
			vm.addInfo = "";
			vm.addItem = function(){
				if(vm.addInfo.trim() ===""){
						return false;
				}
				todoService.addData(vm.addInfo);
				vm.addInfo = "";
			};
		//	编辑数据
			vm.editId = -1;
			vm.editData = function (id) {
				vm.editId = todoService.editItem(vm.editId,id);
			};
		//	更新数据
			vm.updateData = function (id) {
				vm.editId = -1;
			};
		//	删除数据
			vm.delItem = function (id) {
				todoService.delData(id);
			};
		//	复选框事件
		vm.check = false;
		vm.isChecked = function () {
			todoService.isCheck(vm.check);
		};
    //实现单选框全部选中是全选按钮也选中
			vm.isCheckedAll = function () {
				for(var i = 0;i < todoList.length;i++){
					if(todoList[i].isCompleted === false){
						vm.check = false;
						break;
					}else{
						vm.check = true;
					}
				}
				todoService.save();
			};
		//	清除选中的项
			vm.clearSelect = todoService.clearComplete;
		//	清除按钮的显示与隐藏
			vm.showClear = todoService.showHide;
    	//显示剩余的项数
			vm.leftNum = todoService.showLeft;
		//	显示
		//	显示不同的任务
			vm.status = undefined;
			var dataObj = {
				active:false,
				completed:true
			}
			vm.status = dataObj[$routeParams.status];
		//	根据url显示不同
		// 	$scope.location = $location;
		// 	$scope.$watch("location.url()",function (curVal,preVal) {
		// 		// console.log(curVal);
		// 		switch(curVal){
		// 			case"/":
		// 				vm.status = undefined;
		// 			break;
		// 			case "/active":
		// 				vm.status = false;
		// 			break;
		// 			case "/completed":
		// 				vm.status = true;
		// 			break;
		// 		}
		// 		todoService.save();
		// 	})
		}]);
})(angular);
