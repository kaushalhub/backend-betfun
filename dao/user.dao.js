var mongoose = require('mongoose');
// var user = require('../models/user.model');
var DB = require('../models/user.model');


    exports.get = function(query, cb) {
        DB.user.find(query, cb);
    }

    exports.getByID= function(query,cb) {
        DB.user.findOne(query, cb);
    }
