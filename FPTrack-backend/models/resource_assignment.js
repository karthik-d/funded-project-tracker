/* Relates a SINGLE PAIR OF project-resource in a many-many relationship model */

var mongoose = require('mongoose');

var Schema = mongoose.Schema;

// Validations to consider:
// - assigned_by should be a resource_mgr
// - (add on...)
var ResourceAssignmentSchema = new Schema(
    {
        assigned_to: {
            type: Schema.Types.ObjectId,
            ref: 'project',
            required: true,
            validate: [checkProjectType, "Project should be internal!"]
        },
        assigned_by: {
            type: Schema.Types.ObjectId,
            ref: 'user',
            required: true,
        }
    },
    {
        timestamps: {
            created_at: 'created_at',
            modified_at: 'modified_at'
        }
    }
);

function checkProjectType(given_proj){
    this.populate('assigned_to')
        .then((project_rsrc) => {
            project_rsrc.assigned_to.populate('proposal')
                .then((proposal_rsrc) => {
                    return (proposal_rsrc.proposal.funding_type=='internal');
                })
        })
}

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

ResourceAssignmentSchema
	.statics
	.getById = function (id){
		return this.find().getById(id);
	};

ResourceAssignmentSchema
	.query
	.getById = function (id) {
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
