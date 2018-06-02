var express = require('express');
var router = express.Router();
var user =  require('../controller/user')
/* GET users listing. */
// router.get('/', function(req, res, next) {
//     res.send('respond with a resource');
// });

router.get('/list', user.userlist);
router.get('/delete', user.deleteUserInfo);


module.exports = router;
