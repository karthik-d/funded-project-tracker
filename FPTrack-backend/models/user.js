var mongoose = require('mongoose');

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
        }
    }
);

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
