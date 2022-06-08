const ResourceModel = require('../models/resource');
const ResourceAssignmentModel = require('./models/resource_assignment');

function get_resource_count(rsrc_grp) {
    return ResourceModel
        .onlyExisiting()
        .find({
            resource_group: rsrc_grp._id
        })
        .then((resources) => {
            return resources.length;
        });
}

function get_avl_resource_count(rsrc_grp) {
    var all_resources = ResourceModel
        .onlyExisiting()
        .find({
            resource_group: rsrc_grp._id,
        });
    var assignments = ResourceAssignment
}