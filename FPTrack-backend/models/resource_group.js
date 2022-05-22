var mongoose = require('mongoose');
var Promise = require('promise');

var Schema = mongoose.Schema;

var ResourceGroupSchema = new Schema(
    {
        name: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: false
        },
        kind: {
            type: String,
            enum: ['software', 'hardware'],
            required: true
        },
        // mainly for equipments like GPU, Software access, etc.
        is_multi_assignable: {
            type: Boolean,
            required: true
        },
    },
    {
        timestamps: {
            created_at: 'created_at',
            modified_at: 'modified_at'
        }
    }
);

//-- 

ResourceGroupSchema
    .statics
    .onlyExisting = function () {
        return this.find().onlyExisiting();
    };

ResourceGroupSchema
    .query
    .onlyExisting = function () {
        return this.find({
            deleted_at: null
        });
    };

//--

// virtual for URL
ResourceGroupSchema
    .virtual('url')
    .get(function () {
        return '/api/resource-group/' + this._id;
    });


module.exports = mongoose.model('resource_group', ResourceGroupSchema);