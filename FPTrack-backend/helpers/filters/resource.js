const ResourceAssignmentModel = require('../../models/resource_assignment');

function assigned(rsrc) {
    return Boolean(
        ResourceAssignmentModel
            .onlyExisting()
            .find({
                resource: rsrc._id
            })
            .length
    );
}

function not_assigned(rsrc) {
    return !assigned(rsrc);
}

exports.assigned = assigned;
exports.not_assigned = not_assigned;