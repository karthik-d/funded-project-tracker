const ResourceAssignmentModel = require('../../models/resource_assignment');

function assigned(rsrc) {
    return new Promise((resolve, reject) => {
        ResourceAssignmentModel
            .onlyExisting()
            .find({
                resource: rsrc._id
            })
            .then((result) => resolve(
                Boolean(result.length)
            ));
    })
}

function not_assigned(rsrc) {
    return new Promise((resolve, reject) => {
        ResourceAssignmentModel
            .onlyExisting()
            .find({
                resource: rsrc._id
            })
            .then((result) => resolve(
                !Boolean(result.length)
            ));
    })
}

exports.available_filters = [
    'assigned',
    'not_assigned'
];

exports.assigned = assigned;
exports.not_assigned = not_assigned;