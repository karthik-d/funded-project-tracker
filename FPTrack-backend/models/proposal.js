var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var ProposalSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
            maxLength: 100
        },
        decription: {
            type: String
        },
        domains: {
            type: [{
                type: String,
                enum: ['machine_learning', 'web_development', 'iot', 'computer_vision', 'nlp', 'cybersecurity']
            }],
            required: true
        },
        supervisors: {
            type: [{
                type: Schema.Types.ObjectId,
                ref: 'user'
            }],
            required: true
        },
        // the user type of leader determines if project is Student project or Faculty project
        leader: {
            type: Schema.Types.ObjectId,
            ref: 'user',
            required: true
        },
        members: {
            type: [{
                type: Schema.Types.ObjectId,
                ref: 'user'
            }],
            required: true
        },
        funding_type: {
            type: String,
            enum: ['internal', 'external'],
            required: true
        },
        // TODO: Convert this to an enum type with possibility of adding new fuding agencies??
        funding_agency: {
            type: String,
            required: true
        },
        // Accepts file sizes upto 16MB -- Indicate limit as 8MB on Frontend 
        // Transit as Base64 string on JSON 
        pdf_document: {
            type: Buffer,
            required: true
        },
        budget: {
            type: Number,
            required: true
        }
    }
);

// virtual for executive members
ProposalSchema
    .virtual('executive_members')
    .get(function () {
        var all_members = [];
        all_members = all_members.concat([leader], members)
        return all_members;
    });

// virtual for executive members
ProposalSchema
    .virtual('all_members')
    .get(function () {
        var all_members = [];
        all_members = all_members.concat(executive_members, supervisors);
        return all_members;
    });

// virtual for user URL
ProposalSchema
    .virtual('url')
    .get(function () {
        return '/proposal' + this._id;
    });

//Export model
module.exports = mongoose.model('Proposal', ProposalSchema);
