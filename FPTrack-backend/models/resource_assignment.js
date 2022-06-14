/* Relates a SINGLE PAIR OF project-resource in a many-many relationship model */

var mongoose = require('mongoose');

var Schema = mongoose.Schema;

// Validations to consider:
// - assigned_by should be a resource_mgr
// - don't allow duplicate assignment for resources!!
// - (add on...)
var ResourceAssignmentSchema = new Schema(
    {
        resource: {
            type: Schema.Types.ObjectId,
            ref: 'resource',
            required: true
        },
        assigned_to: {
            type: Schema.Types.ObjectId,
            ref: 'project',
            required: true,
            validate: {
                validator: function (given_proj) {
                    var rsrc_assign = this;
                    return new Promise(
                        function (resolve, reject) {
                            rsrc_assign.populate('assigned_to')
                                .then((project_rsrc) => {
                                    project_rsrc.assigned_to.populate('proposal')
                                        .then((project_rsrc) => {
                                            return resolve(
                                                project_rsrc.proposal.funding_type == 'internal'
                                            )
                                        })
                                })
                        }
                    );
                },
                message: props => `The given project is not a internal`
            },
        },
        assigned_by: {
            type: Schema.Types.ObjectId,
            ref: 'user',
            required: true,
            validate: {
                validator: function (given_proj) {
                    var rsrc_assign = this;
                    return new Promise(
                        function (resolve, reject) {
                            rsrc_assign.populate('assigned_by')
                                .then((rsrc_assign_pop) => {
                                    console.log(rsrc_assign_pop.assigned_by.role);
                                    return resolve(
                                        rsrc_assign_pop.assigned_by.access.includes('resource_mgr')
                                    )
                                })
                        }
                    );
                },
                message: props => `The user is not a resource manager`
            },
        },
        deleted_on: {
            type: Date,
            default: null,
            required: false
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

ResourceAssignmentSchema
    .statics
    .onlyExisting = function () {
        return this.find().onlyExisting();
    };

ResourceAssignmentSchema
    .query
    .onlyExisting = function () {
        return this.find({
            deleted_at: null
        });
    };

//--

ResourceAssignmentSchema
    .statics
    .getById = function (id) {
        return this.find().getById(id);
    };

// <<<<<<< HEAD
ResourceAssignmentSchema
    // =======
    // ResoureAssignmentSche/ma
    // >>>>>>> 8ef04d9992f6a449617d22334dbf60719305c3a5
    .query
    .getById = function (id) {
        return this.find({
            deleted_at: null
        });
    };


//--

//--

// virtual for URL
ResourceAssignmentSchema
    .virtual('url')
    .get(function () {
        return '/api/resource-assignment/' + this._id;
    });


module.exports = mongoose.model('resource_assignment', ResourceAssignmentSchema);
