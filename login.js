var uuid = require('node-uuid');
var JSONStream = require('JSONStream');
var express = require('express');
var login = express.Router();

login.post('*', function (req, res) {
    var opt = { limit: 1 };
    var value = req.headers.user;
    var collection = req.collection;

    let form = {
        user: value
    }


    collection.findOne(form, opt, function (err, doc) {

        if (!err) {
            if (!doc) {
                res.json({
                    'ok': false,
                    'message': 'Not Found'
                });
            } else {
                let result = {
                    'ok': true,
                    pass: doc.pass
                }
                res.json(result);
            }
        } else {
            res.json({
                'ok': false,
                'message': err
            });
        }
    })
});


module.exports = login;