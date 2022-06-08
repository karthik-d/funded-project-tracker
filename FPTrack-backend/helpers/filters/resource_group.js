const ResourceGroupHelpers = require('../resource_group');

function available(rsrc_grp) {
    return Boolean(
        ResourceGroupHelpers
            .get_avl_resource_count(rsrc_grp)
    );
}

exports.available_filters = [
    'available'
];

exports.available = available;