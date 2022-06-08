var mongoose = require('mongoose');
var Promise = require('promise');

var Schema = mongoose.Schema;

// Key validation points:
// - If is_multi_assignable is 'false', allow ONLY ONE element in resource_assignment
// - (add on ...)
ResourceSchema = new Schema(
    {
        resource_group: {
            type: Schema.Types.ObjectId,
            ref: 'resource_group'
        },
        remarks: {
            type: String,
            required: false
        },
        scan_code: {
            type: String,
            required: false,
            unique: true
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
        },
        toJSON: { virtuals: true },
        toObject: { virtuals: true }
    }
);


//-- 

ResourceSchema
    .statics
    .onlyExisting = function () {
        return this.find().onlyExisting();
    };

ResourceSchema
    .query
    .onlyExisting = function () {
        return this.find({
            deleted_at: null
        });
    };

//--

ResourceSchema
    .statics
    .getById = function (id) {
        return this.find().getById(id);
    }

ResourceSchema
    .query
    .getById = function (id) {
        return this.find({
            _id: id
        });
    }

//--

ResourceSchema
    .statics
    .getByScanCode = function (code) {
        return this.find().getByScanCode(code);
    }

ResourceSchema
    .query
    .getByScanCode = function (code) {
        return this.find({
            scan_code: code
        });
    }

// virtual for URL
ResourceSchema
    .virtual('url')
    .get(function () {
        return '/api/resource/' + this._id;
    });


module.exports = mongoose.model('resource', ResourceSchema);