const ResourceModel = require('../../models/resource');

function is_available(rsrc_grp) {
    ResourceModel
        .onlyExisting()
        .find({
            resource_group: rsrc_grp._id
        })
}

exports.is_available = is_available;