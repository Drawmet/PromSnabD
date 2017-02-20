var mongoose = require('mongoose');
var config = require('nodejs-config')(__dirname + './config');

mongoose.connect(config.get('mongoose.uri'),config.get('mongoose.options'));

module.exports = mongoose;