/* A `proposal` becomes a `project` when it is approved */

var mongoose = require('mongoose');
var Promise = require('promise');

var Schema = mongoose.model.Schema;

var ProjectSchema = Schema({
    proposal: {
        type: Schema.Types.ObjectId,
        ref: 'proposal',
        required: true
    },
    // budget_approved: 
})