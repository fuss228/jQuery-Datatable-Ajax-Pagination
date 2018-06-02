var database = require('./database')
var url = require('url');
var qs = require('querystring');

exports.userlist = function(req, res) {
    // var data = [];
    // var data = {};

console.log(req.body);
    // var query = url.parse(req.url).query;
    // var getreqjson = JSON.stringify(qs.parse(query));
    // console.log("------------------------------");
    // console.log(getreqjson);
    // console.log("------------------------------");
    //
    // console.log(req.query.draw);
    // console.log(req.query.start);//limit
    // console.log(req.query.length);//每页显示多少条
    // console.log(req.query.pageIndex);//页数 同draw 索引需-1
    // console.log(req.query.search.value);//搜索的内容
    // console.log(req.query.search.regex);//搜索是否使用正则表达式

    // "start":"0",
    // "length":"10",
    // "search[value]":"",
    // "search[regex]":"false",
    // "pageIndex":"1",
    var totalcount = 0;
    var start = req.query.start;
    var pageCount = req.query.length;




    var sql = `select * from xz_user limit ${start},${pageCount}` ;
    var connection = database.getConnection();




    connection.query('select count(*) as totalCount from xz_user', function (err, results, fields) {

            if (err) {
                throw err;
            }
            if(results)
            {
                totalcount = results[0].totalCount;
                console.log("总行数:"+totalcount);
            }
        connection.end();
        }
    );


    connection.query(sql, function(err, rows, fields) {
        if (err) throw err;
        // console.log(rows.length);
        // console.log(rows);
        // for(var i=0; i < rows.length; i++) {
        //     data[i] = {
        //         uid: rows[i].uid,
        //         username: rows[i].uname,
        //         nikename: rows[i].user_name
        //     }
        // }

        var result = {
            // status: 200,
            draw:req.query.draw,
            recordsTotal:rows.length,        //总记录数
            recordsFiltered:totalcount,     //过滤后的总记录数
            data: rows
        }

        return res.jsonp(result);
    });

};

exports.getUserInfo = function(req, res) {
    // console.log(req.body.toString());
    // console.log(req.query.name);
    // console.log(req.params.key);//输出index
    // console.log(req.query.draw);//输出表单get提交的login_name

    // console.log("req.query.aoData===="+req.query);

    // jsonStr = JSON.parse(req.query.aoData);
    // console.log("json===="+jsonStr[0]["value"]);//current request page 请求第N页的数据  从1开始
    // console.log("json===="+jsonStr[4]["value"]);//pre page count 每页显示N个



/*
    var data = [];
    // var data = {};
    var sql = "select RealName,Age,sex,Constellation,Province,IDNumber,CellPhone,Email from Info limit 0,50";
    var connection = database.getConnection();
    connection.query(sql, function(err, rows, fields) {
        if (err) throw err;
        // console.log(rows.length);
        // console.log(rows);
        for(var i=0; i < rows.length; i++) {
            data[i] = {
                RealName: rows[i].RealName,
                Age: rows[i].Age,
                sex: rows[i].sex,
                Constellation:rows[i].Constellation,
                Province:rows[i].Province,
                IDNumber:rows[i].IDNumber,
                CellPhone:rows[i].CellPhone,
                Email:rows[i].Email
            }
        }

        var result = {
            "draw": 1,
            "recordsTotal": 50,
            "recordsFiltered": 50,
            "data": data
            //error

        }


        return res.jsonp(result);
    });
*/
};


exports.deleteUserInfo = function(req, res) {

    console.log(req.query.uid);
    var sql = `delete from xz_user where uid = ${req.query.uid}` ;

    var connection = database.getConnection();
    connection.query(sql, function(err, result) {
        if (err) throw err;

        console.log("删除后 受影响的行数"+result.affectedRows);
        var message;
        if (result.affectedRows > 0 )
        {
            message = "删除成功";
        }else
        {
            message = "删除失败";
        }

        var result = {
            "message": message
        }


        return res.jsonp(result);
    });

};
