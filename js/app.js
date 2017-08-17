(function (angular) {
	'use strict';

	// Your starting point. Enjoy the ride!
	angular
		.module('todoApp', [])
		.controller('TodoController', ['$scope', function ($scope) {
			var vm = $scope;
			// 数据：
			// name 表示任务名称
			// isCompleted 表示任务是否完成的状态
			// id 唯一标识
			vm.todoList = [
				{ id: 1, name: '抽烟', isCompleted: false },
				{ id: 2, name: '喝酒', isCompleted: false },
				{ id: 3, name: '烫头', isCompleted: false }
			];

			var todoList = vm.todoList;

		//	添加数据

			vm.addInfo = "";
			vm.addItem = function () {
				if(vm.addInfo.trim() ===""){
					return false;
				}
				var id,
					lenght = todoList.length;
				id = lenght === 0 ? 1 : todoList[lenght-1].id + 1;
				todoList.push({id:id,
				name:vm.addInfo,
				isCompleted:false});
				vm.addInfo = "";
			}

		//	编辑数据
			vm.editId = -1;
			vm.editData = function (id) {
				vm.editId =  id;
			}

		//	更新数据

			vm.updateData = function (id) {
				vm.editId = -1;
			}
		//	删除数据

			// vm.del = false;
			vm.delItem = function (id) {
				for(var i = 0; i < todoList.length;i++){
					if(todoList[i].id === id){
						todoList.splice(i,1);
					}
				}
			}

		//	复选框事件
		vm.check = false;
		vm.isChecked = function () {
			for(var i = 0;i < todoList.length;i++){
				todoList[i].isCompleted = vm.check;
			}

		}
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
			}

		//	清除选中的项

			vm.clearSelect = function () {
				var tempArr = [];
				for(var i = 0; i < todoList.length;i++){
					if(!todoList[i].isCompleted){
						tempArr.push(todoList[i]);
					}
				}
				todoList.length = 0;
				[].push.apply(todoList,tempArr);

			}

		//	清除按钮的显示与隐藏
			vm.showClear = function () {
				var ret = false;
				for(var i = 0; i < todoList.length;i++){
					if (todoList[i].isCompleted){
						ret = true;
						break;
					}
				}
				return ret;
			}

    //显示剩余的项数

			vm.leftNum = function () {
				var count = 0;
				for(var i = 0 ;i < todoList.length;i++){
					if(!todoList[i].isCompleted){
						count++;
					}
				}
				return count;
			}
		}]);

})(angular);
