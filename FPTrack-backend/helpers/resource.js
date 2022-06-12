const ResourceAssignmentModel = require('../models/resource_assignment');

function get_resource_count_for_project(rsrc_grp_id, project_id) {
    return ResourceAssignmentModel
        .aggregate([
            {
                $lookup: {
                    from: 'resources',
                    as: 'resource_data',
                    let: {
                        assigned_to: '$assigned_to',
                        deleted_on: '$deleted_on'
                    },
                    pipeline: [{
                        $match: {
                            $expr: {
                                $and: [
                                    { $eq: ['$$deleted_on', null] },
                                    { $eq: ['$$assigned_to', project_id] }
                                ]
                            }
                        }
                    }]
                }
            }
        ],
            (error, results) => {
                if (error) {
                    throw error;
                }
                return results;
            });
}

exports.get_resource_count_for_project = get_resource_count_for_project;