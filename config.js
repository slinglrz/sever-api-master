var _dbs = ['cores','database1','database2'];

var uriQuerySet = "mongodb://localhost:27017";

var mongodb = []; // [] new Array

//for(var i=0; i<_dbs.length;i++){
//  console.log(_dbs[i]); }  ลูปเหมือนกับ foreach

_dbs.forEach(function(dbName) {
  // console.log(dbName) เหมือนบรรทัด 8
  var obj = new Object(); // () new obj
  obj.db = dbName, 
  obj.url = uriQuerySet+"/"+dbName,
  mongodb.push(obj); 
});

module.exports.mongodb = mongodb;
module.exports.port = "80";