var mongoose = require('mongoose');
var Promise = require('promise');

var Schema = mongoose.Schema;

var UserSchema = new Schema(
    {
        first_name: { type: String, required: true, maxLength: 100 },
        last_name: { type: String, required: true, maxLength: 100 },
        date_of_birth: { type: Date },
        email: { type: String, required: true, unique: true },
        role: { type: String, required: true, enum: ['student', 'faculty'], default: 'Maintenance' },
        access: {
            type: [{ type: String, enum: ['admin', 'resource_mgr', 'user'] }],
            required: true
        },
        deleted_at: { type: Date, default: null }
    },
    {
        timestamps: {
            created_at: 'created_at',
            modified_at: 'modified_at'
        }
    }
);

// Chain <ModelName>.onlyExisting before any query to list only "non-deleted" records

// Brute Wrapper (Not proud of it!)
UserSchema
    .statics
    .onlyExisting = function () {
        return this.find().onlyExisting();
    }

UserSchema
    .query
    .onlyExisting = function () {
        return Promise.resolve(this.find({
            deleted_at: null
        }));
    };

// virtual for user fullname
UserSchema
    .virtual('name')
    .get(function () {
        var fullname = '';
        if (this.first_name && this.last_name) {
            fullname = this.last_name + ', ' + this.first_name
        }
        else if (this.first_name) {
            fullname = this.first_name;
        }
        else if (this.last_name) {
            fullname = this.last_name;
        }
        return fullname;
    });

// virtual for user URL
UserSchema
    .virtual('url')
    .get(function () {
        return '/user' + this._id;
    });

//Export model
module.exports = mongoose.model('User', UserSchema);
