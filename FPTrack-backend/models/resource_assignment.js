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

module.exports = mongoose.model('resource_assignment', ResourceAssignmentSchema);