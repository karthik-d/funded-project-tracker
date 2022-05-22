var mongoose = require('mongoose');
var Promise = require('promise');

var Schema = mongoose.Schema;

// Key validation points:
// - If is_multi_assignable is 'false', allow ONLY ONE element in resource_assignment
// - (add on ...)
ResourceSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            maxLength: 100
        },
        resource_group: {
            type: Schema.Types.ObjectId,
            ref: 'resource_group'
        },
        description: {
            type: String,
            required: false
        },
        scan_code: {
            type: String,
            required: false
        },
        // if required, eg: for a software license
        expiry: {
            type: Date,
            required: false
        },
        // Store only most recent fault here --- history will be maintained in a separate 
        // `tokens` collection
        faulted_at: {
            type: Date,
            default: null
        },
        deleted_at: {
            type: Date,
            default: null
        }
    },
    {
        timestamps: {
            created_at: 'created_at',
            modified_at: 'modified_at'
        }
    }
);

//-- 

ResourceSchema
    .statics
    .onlyExisting = function () {
        return this.find().onlyExisiting();
    };

ResourceSchema
    .query
    .onlyExisting = function () {
        return this.find({
            deleted_at: null
        });
    };

//--

// virtual for URL
ResourceSchema
    .virtual('url')
    .get(function () {
        return '/api/resource/' + this._id;
    });


module.exports = mongoose.model('resource', ResourceSchema);