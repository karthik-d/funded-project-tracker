const ResourceGroupHelpers = require('../resource_group');

function is_available(rsrc_grp) {
    return Boolean(
        ResourceGroupHelpers
            .get_avl_resource_count(rsrc_grp)
    );
}

exports.is_available = is_available;