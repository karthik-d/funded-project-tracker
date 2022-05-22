/* A `proposal` becomes a `project` when it is approved */

var mongoose = require('mongoose');
var Promise = require('promise');

var Schema = mongoose.model.Schema;


// Child schema
var UpdatesSchema = new Schema(
    {
        title: {
            type: String,
            required: true
        },
        description: {
            type: String,
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

// Child schema
var OutcomesSchema = new Schema(
    {
        title: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: false
        },
        kind: {
            type: String,
            enum: ['research_paper', 'patent', 'incubation', 'scaled', 'other'],
            required: true
        },
        // URL to publication, patent, etc.
        reference: {
            type: String,
            required: true
        }
    }
)

// Valiations to consider:
// - Allow resources ONLY for Internal Projects
// - (add on...)
var ProjectSchema = new Schema(
    {
        proposal: {
            type: Schema.Types.ObjectId,
            ref: 'proposal',
            required: true
        },
        status_updates: {
            type: [{
                type: UpdatesSchema
            }],
            default: () => [{}]
        },
        outcomes: {
            type: [{
                type: OutcomesSchema
            }],
            default: () => [{}]
        },
        approved_budget: {
            type: Number,
            required: true
        },
        completed_on: {
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

ProjectSchema
    .statics
    .onlyExisting = function () {
        return this.find().onlyExisiting();
    };

ProjectSchema
    .query
    .onlyExisting = function () {
        return this.find({
            deleted_at: null
        });
    };

//--

// virtual for URL
ProjectSchema
    .virtual('url')
    .get(function () {
        return '/api/project/' + this._id;
    });


module.exports = mongoose.model('project', ProjectSchema);