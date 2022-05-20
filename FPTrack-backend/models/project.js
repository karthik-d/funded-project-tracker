/* A `proposal` becomes a `project` when it is approved */

var mongoose = require('mongoose');
var Promise = require('promise');

var Schema = mongoose.model.Schema;


// Valiations to consider:
// - Allow resources ONLY for Internal Projects
// - (add on...)
var ProjectSchema = Schema({
    proposal: {
        type: Schema.Types.ObjectId,
        ref: 'proposal',
        required: true
    },
    resources_allocated: {
        type: [{
            type: Schema.Types.ObjectId,
            ref: 'resource_assignment'
        }],
        default: () => [{}]
    },
    budget_approved: {
        type: Number,
        required: true
    }
});

//-- 

ProjectSchema
    .statics
    .onlyExisting = function () {
        return this.find().onlyExisiting();
    };

ProjectSchema
    .query
    .onlyExisting = function () {
        return this.find({
            deleted_at: null
        });
    };

//--

// virtual for URL
ProjectSchema
    .virtual('url')
    .get(function () {
        return '/api/project/' + this._id;
    });


module.exports = mongoose.model('project', ProjectSchema);