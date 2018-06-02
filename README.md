#jQuery Datatable Ajax Pagination Demo
MySQL + Express + jQuery DataTable
## 使用方法
创建数据库，导入数据库 DB.sql文件

修改 end 目录下的 setting.js 文件，配置你的mysql。
```javascript
module.exports = {
    mysql: {
        host: '127.0.0.1',
        port: 3306,
        user: 'root',
        password: 'yourpassword',
        database: 'yourdbname'
    }
}
```

启动后端
```javascript
cd end
npm install
node bin/www
```

浏览front/userlist.html

![效果](https://github.com/fuss228/jQuery-Datatable-Ajax-Pagination/raw/master/Screenshots/1.png)

