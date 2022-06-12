const ResourceAssignmentModel = require('../models/resource_assignment');


// todo: add `deleted_on` as a equation param
function get_resource_count_for_project(rsrc_grp_id, project_id) {
    console.log(project_id);
    console.log(rsrc_grp_id);
    return ResourceAssignmentModel
        .aggregate([
            {
                $lookup: {
                    from: 'resources',
                    localField: 'resource',
                    foreignField: '_id',
                    as: 'resource_data'
                }
            }, {
                $unwind: '$resource_data'
            }, {
                $match: {
                    deleted_on: null,
                    assigned_to: project_id,
                    'resource_data.resource_group': rsrc_grp_id
                }
            }, {
                $group: {
                    _id: null,
                    count: {
                        $sum: 1
                    }
                }
            }
        ],
            (error, [result]) => {
                if (error) {
                    throw error;
                }
                return result.count;
            });
}

exports.get_resource_count_for_project = get_resource_count_for_project;