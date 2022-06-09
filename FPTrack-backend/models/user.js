var mongoose = require('mongoose');
var Promise = require('promise');

var Schema = mongoose.Schema;

var UserSchema = new Schema(
    {
        first_name: { type: String, required: true, maxLength: 100 },
        last_name: { type: String, required: true, maxLength: 100 },
        date_of_birth: { type: Date },
        email: { type: String, required: true, unique: true },
        role: { type: String, required: true, enum: ['student', 'faculty'] },
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
        },
        toJSON: { virtuals: true },
        toObject: { virtuals: true }
    }
);

// Chain <ModelName>.onlyExisting before any query to list only "non-deleted" records
// Be sure to use either find() or self-defined wrappers (convention used: get...() ), in these chains

UserSchema
    .statics
    .getDirectFilterFields = function () {
        const filter_fields = [
            'first_name',
            'last_name',
            'email',
            'role'
        ];
        let return_fields = [];
        Object.keys(this.schema.paths).forEach(
            function (field) {
                if (filter_fields.includes(field)) {
                    return_fields.push(field);
                }
            }
        )
        console.log(return_fields);
        return return_fields;
    }

// Brute Wrapper (Not proud of it!)
UserSchema
    .statics
    .onlyExisting = function () {
        return this.find().onlyExisting();
    }

UserSchema
    .query
    .onlyExisting = function () {
        return this.find({
            deleted_at: null
        });
    };

// --

UserSchema
    .statics
    .getById = function (id) {
        return this.find().getById();
    }

UserSchema
    .query
    .getById = function (id) {
        return this.find({
            _id: id
        });
    };

// --

UserSchema
    .statics
    .getByEmail = function (email) {
        return this.find().findByEmail(email);
    };

UserSchema
    .query
    .getByEmail = function (_email) {
        return this.findOne({
            email: _email
        });
    };

// --

UserSchema
    .statics
    .getByEmails = function (emails) {
        return this.find().getByEmails(emails);
    };

UserSchema
    .query
    .getByEmails = function (emails) {
        return this.find({
            email: { $in: emails }
        });
    };

// --

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
        return '/api/user/' + this._id;
    });

//Export model
module.exports = mongoose.model('user', UserSchema);
