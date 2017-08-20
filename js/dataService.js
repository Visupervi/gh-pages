
/**
 * Created by Administrator on 2017/8/19 0019.
 */
(function (angular) {
	angular.module("todoApp.dataService",[])
		.service("todoService",["$window",function ($window) {
			var localStorage = $window.localStorage;
			this.todoList = JSON.parse(localStorage.getItem("todo")) || [];
			//	获取数据
			this.getData = function () {
				return this.todoList;
			}
			//	数据保存到localStorage
			this.save = function () {
				localStorage.setItem("todo",JSON.stringify(this.todoList))
			}
			//	添加数据函数
			this.addData =  function (addInfo) {
				var id,
					length = this.todoList.length;
				id = length === 0 ? 1 : this.todoList[length - 1].id + 1;
				this.todoList.push({id:id,
					name:addInfo,
					isCompleted:false});
				this.save();
			};
			//	编辑数据
			this.editItem = function (preId,curId) {

				preId = curId;
				return preId;
			};
			//	删除数据
			this.delData = function (id) {
				for(var i = 0; i < this.todoList.length;i++){
					if(this.todoList[i].id === id){
						this.todoList.splice(i,1);
					}
				}
				this.save();
			};
			//	复选框事件
			// 	this.check = false;
			this.isCheck = function(argus){
				for(var i = 0;i < this.todoList.length;i++){
					this.todoList[i].isCompleted = argus;
				}
				this.save();
			};
			//清除完成项
			this.clearComplete = function () {
				var tempArr = [];
				for(var i = 0; i < this.todoList.length;i++){
					if(!this.todoList[i].isCompleted){
						tempArr.push(this.todoList[i]);
					}
				}
				this.todoList.length = 0;
				// console.log(tempArr);
				[].push.apply(this.todoList,tempArr);
				// console.log(this.todoList);
				// this.save();
			};
			//清除按钮的显示与隐藏
			this.showHide = function () {
				var ret = false;
				for(var i = 0; i < this.todoList.length;i++){
					if (this.todoList[i].isCompleted){
						ret = true;
						break;
					}
				}
				return ret;
			};
			// 显示剩余项数量
			this.showLeft = function () {
				var count = 0;
				for(var i = 0 ;i < this.todoList.length;i++){
					if(!this.todoList[i].isCompleted){
						count++;
					}
				}
				return count;
			}
		}])
})(angular);
