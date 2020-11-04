var xss = require('xss');
var crypto = require('crypto');

const { json } = require('body-parser');
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});


router.get('/v', function (req, res, next) {
  var userPwd = 'sdasd';
  var end_paw = md5.update(userPwd).digest('hex');//加密後的密碼
  console.log(md5)
  console.log(end_paw)

  res.send('This is localhost:3000/v' + end_paw)
});



// get http://127.0.0.1:3000/v2
router.get('/v2', function (req, res, next) {
  var db = req.con;
  var data = "";
  db.query('SELECT * FROM typhoon', function (err, rows) {
    if (err) {
      console.log(err);
    }
    var data = rows;
    console.log(data)
    console.log(JSON.stringify(data))
    res.send(JSON.stringify(data))
  });
});

// get http://127.0.0.1:3000/v3
router.get('/v3', function (req, res, next) {
  var db = req.con;
  var test_num = 201709;
  test_num = xss(test_num)
  // console.log(connection.escape(userId))
  db.query('SELECT * FROM `typhoon` where `typhoon_no` = ? and path = ?', [test_num, '2'], function (err, rows) {
    if (err) {
      console.log(err);
    }
    var data = rows;
    console.log(data)
    res.send(JSON.stringify(data))
  });
});

// fail(無法成功)   reference:https://www.veracode.com/blog/secure-development/how-prevent-sql-injection-nodejs
router.get('/v4', function (req, res, next) {
  var db = req.con;
  var typhoon_no = 201709;
  db.query('SELECT * FROM `typhoon` where `typhoon_no` = :typhoon_no ', { typhoon_no: typhoon_no }, function (err, rows) {
    if (err) {
      console.log(err);
    }
    var data = rows;
    console.log('2');
    console.log(data)
    res.send('3')
  });
});

// get   http://127.0.0.1:3000/v5  (prevent xss)
router.get('/v5', function (req, res, next) {
  var test_num = '<script>alert("xss");</script>';
  console.log(test_num)
  test_num = xss(test_num)
  console.log(test_num)
  // console.log(connection.escape(userId))
  res.send('test_xss')
});


router.get('/crypto', function (req, res, next) {
  var userPwd = 'test';
  var md5 = crypto.createHash('sha256');   //crypto模組功能是加密並生成各種雜湊,此處所示為MD5方式加密

  var end_paw = md5.update(userPwd).digest('hex');//加密後的密碼


  var text = "123|12312312123123121231231212312312123123121231231212312312";
  var hasher = crypto.createHash("md5");
  hasher.update(text);
  var hashmsg = hasher.digest('hex');//hashmsg為加密之後的資料

  console.log(hashmsg)

  let hmac = crypto.createHmac('md5', '123456');
  let ret = hmac.update('hello').digest('hex');

  console.log(ret);

  res.send('This is localhost:3000/v' + end_paw)
});

// get http://localhost:3000/get_test/123?qt=5
router.get('/get_test/:id', function (req, res, next) {
  var params = req.params;
  console.log(params);   //{ id: '123' }
  var params2 = req.params.id;
  console.log(params2);  //123
  var query = req.query;
  console.log(query);   //{ qt: '5' }
  var query2 = req.query.qt;
  console.log(query2);   // 5
  res.send(params);
});

// post http://localhost:3000/post_test    1.(x-www-form-urlencoded) key:ab value:c
// post http://localhost:3000/post_test    2.(row)  {"a":123}
router.post('/post_test', function (req, res, next) {
  var body = req.body;
  console.log(body);  // { ab: 'c' }
  var body2 = req.body.ab;
  console.log(body2) // c
  // var json_body = bodyParser.json()
  // console.log(json_body)
  res.send(body);
});

module.exports = router;
