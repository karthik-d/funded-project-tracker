/* Relates a SINGLE PAIR OF project-resource in a many-many relationship model */

var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var ResourceAssignmentSchema = new Schema(
    {
        assignee: {
            type: Schema.Types.ObjectId,
            ref: 'project',
            required: true,
        },
        assigned_on: {
            type: Date,
            required: true
        },
        assigned_by: {
            type: Schema.Types.ObjectId,
            ref: 'user',
            required: true,
        }
    }
);

//-- 

ResourceAssignmentSchema
    .statics
    .onlyExisting = function () {
        return this.find().onlyExisiting();
    };

ResourceAssignmentSchema
    .query
    .onlyExisting = function () {
        return this.find({
            deleted_at: null
        });
    };

//--

// virtual for URL
ResourceAssignmentSchema
    .virtual('url')
    .get(function () {
        return '/api/rsrc-assign/' + this._id;
    });


module.exports = mongoose.model('resource_assignment', ResourceAssignmentSchema);