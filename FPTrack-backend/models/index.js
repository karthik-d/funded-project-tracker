const mongoose = require('mongoose');

const User = require('./user');

const Resource = require('./resource');
const ResourceGroup = require('./resource_group');

const connection = require('../db/connect');

module.exports.Resource = Resource;
module.exports.ResourceGroup = ResourceGroup;
module.exports.User = User;