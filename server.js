var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var MongoClient = require('mongodb').MongoClient;//เปลี่ยนเวอน์ชั่น 3.xx npm ใหม่
var ip = require("ip");

var route = require('./route');
var login = require('./login');
var config = require('./config'); //เรียกใช้ไฟล์ config

var mongodb = {};

var app = express();// ตัวแรกที่จะเรียกใช้

app.use(cors()); //
app.use(bodyParser.json({

  limit: '50mb'
}));
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use('*', function (req, res, next) {
  res.set({
    'Access-Control-Expose-Headers': 'Authorization',
    'Content-Type': 'application/json; charset=utf-8',
    'Bind-Address': ip.address() + ':' + config.port
  }); //bind address ใส่เพื่อให้เห็นส่วนหน้า address ได้อันเดียว ข้างหลังมีหลายอัน
  next();
});

app.param('db', function (req, res, next, value) {
  req.mongodb = mongodb[value];
  next();
});

app.param('collection', function (req, res, next, value) {
  req.collection = req.mongodb.collection(value);
  next();
});

app.use('/mongodb/:db/:collection', route); // กำหนด route

app.post('/login', function (req, res, next) {
  req.url = '/login1/cores/user_db'
  next();
})
app.use('/login1/:db/:collection', login);
app.get('/servertime', function (req, res) {
  var long_date = new Date().getTime()
  res.send(long_date.toString());
});

var count = config.mongodb.length; // cout = 3

var url = "mongodb://localhost:27017";

config.mongodb.forEach(function (db_config) {  //เรียกใช้จากไฟล์ config
  MongoClient.connect(url,
    //db_config.options,
    function (err, db) {
      if (!err) {
        count--; //ลดลงไปเรื่อยๆ
        mongodb[db_config.db] = db.db(db_config.db)
        if (count == 0) {
          app.listen(config.port, function () {
            console.log('Server listening on port %d', this.address().port);
          });
        }
      }
    });
});
