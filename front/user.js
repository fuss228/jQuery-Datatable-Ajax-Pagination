var table1 = null;
$(document).ready(function($) {
	//全选
	$("#all_checked").click(function(){
		$('[name=userselect]:checkbox').prop('checked',this.checked);//checked为true时为默认显示的状态
	});
	$('#btnDeleteAll').click(function(){
		 var a = [];
	        $('input[name="userselect"]:checked').each(function(){ 
	            a.push($(this).val());
	        });
	     
	        if (a.length == 0) {
	        	alert('请选择要删除的用户');
	        }else{
	        	console.log(a);
	        	//TODO AJAX
	        }
	});
	/*
	$.ajax({
		url: 'http://localhost:3000/user/list/',
		type: 'GET',
		dataType:'jsonp',
		// data: {param1: 'value1'},
	})
	.done(function(data) {
		console.log("success");
		var tableContent;
		$("#datatable-default tbody").empty();
		for (var i = 0; i < data.data.length; i++) {
			var user = data.data[i];

			var sex ='保密';
			if(user.gender ==0)
			{
				sex='女';
			}else if(user.gender ==1)
			{
				sex='男';

			}else{
				sex ='保密'
			}


			tableContent+="<tr class='gradeX'><th>"+user.uname+"</th><th>"+user.upwd+"</th><th>"+user.email+"</th><th>"+user.phone+"</th><th>"+sex+"</th><th class='hidden-phone'>"+user.user_name+"</th><th class='hidden-phone'><a class='bk-margin-5 btn btn-info btn-circle' href='/useredit/"+user.uid+"'><i class='fa fa-pencil-square-o'></i></a><a class='bk-margin-5 btn btn-warning btn-circle'href='/useredit/"+user.uid+"'><i class='fa fa-times'></i></a></th></tr>";
		}
		$("#datatable-default tbody").append(tableContent);

		

	})
	.fail(function() {
		console.log("error");
	});
	*/

	//datatable-default
	table1 = initializeTable();
});


function initializeTable() { //初始化table
	var table = $("#datatable-default").DataTable({
		/****************************************表格数据加载****************************************************/
		"serverSide": true,
		"ajax": { //ajax请求数据源
			"url": "http://localhost:3000/user/list/",
			"dataType": "jsonp",
			"type": "post",
			"data": function(data) { //添加额外的数据给服务器
				data.pageIndex = (data.start / data.length) + 1;
				//data.nickname = $("#nickname").val().trim();
			}
		},
		"columns": [ //列绑定
			{
				"defaultContent": ""
			}, {
				"data": "uname"
			}, {
				"data": "upwd"
			}, {
				"data": "email"
			}, {
				"data": "phone"
			}, {
				"data": "gender"
			}, {
				"data": "user_name"
			}, {
				"defaultContent": ""
			}
		],
		"columnDefs": [ //列定义
			{
				"targets": [0],
				"data": "uid",
				"render": function(data, type, full) { //全部列值可以通过full.列名获取,一般单个列值用data PS:这里的render是有多少列就执行多少次方法。。。不知道为啥
					return "<input type='checkbox' value='" + data + "' name='userselect'>";
				}
			}, {
				"targets": [5],
				"data": "gender",
				"render": function(data, type, full) { //全部列值可以通过full.列名获取,一般单个列值用data PS:这里的render是有多少列就执行多少次方法。。。不知道为啥
					if (data == 0) {
						return '女';
					} else if (data == 1) {
						return '男';

					} else {
						return '保密'
					}
				}
			}, {
				"targets": [7],
				"data": "uid",
				"render": function(data, type, full) { //全部列值可以通过full.列名获取,一般单个列值用data PS:这里的render是有多少列就执行多少次方法。。。不知道为啥
					return "<a class='bk-margin-5 btn btn-info btn-circle' href='/useredit/" + data + "'><i class='fa fa-pencil-square-o'></i></a><a class='bk-margin-5 btn btn-warning btn-circle'href='javascript:deleteUser(" + data + ")'><i class='fa fa-times'></i></a>";
				}
			},

			{
				"orderable": false,
				"targets": [0, 7]
			}, // 是否排序
			//{ "visible": false, "targets": [3, 5] }//是否可见
		],
		"rowCallback": function(row, data, displayIndex) { //行定义
			$(row).attr("class", "text-c");
		},
		"initComplete": function(settings, json) { //表格初始化完成后调用

		},
		/****************************************表格数据加载****************************************************/
		/****************************************表格样式控制****************************************************/
		"dom": "t<'dataTables_info'il>p", //表格布局
		"language": { //语言国际化
			"lengthMenu": "每页 _MENU_ 条",
			"zeroRecords": "没有找到记录",
			"info": "当前显示 _START_ 到 _END_ 条，共 _TOTAL_条",
			"infoEmpty": "无记录",
			"paginate": {
				"first": "首页",
				"previous": "前一页",
				"next": "后一页",
				"last": "末页"
			}
		},
		//"pagingType": "full_numbers",//分页格式
		"processing": true, //等待加载效果
		"ordering": false, //排序功能
		/****************************************表格样式控制****************************************************/
	});
	return table;
}

function deleteUser(uid) {
	if (confirm('确认删除')) {
		console.log(uid);
		$.ajax({
		url: 'http://localhost:3000/user/delete/',
		type: 'GET',
		dataType:'jsonp',
		data: {uid: uid},
	})
	.done(function(data) {
		console.log("success");
		alert(data.message);
		console.log("after deleteed");
		 $("#datatable-default").DataTable().ajax.reload();
		

	})
	.fail(function() {
		console.log("error");
	});

	}
}








