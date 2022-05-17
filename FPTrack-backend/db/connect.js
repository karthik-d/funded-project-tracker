//Set up mongoose connection
var mongoose = require('mongoose');

var mongoDB = 'mongodb+srv://fpt_root:cchZf36i4TBv6GlK@fpt-cluster-j2k2.f81v7.mongodb.net/FPT_DB?retryWrites=true&w=majority';

mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

module.exports = db;
