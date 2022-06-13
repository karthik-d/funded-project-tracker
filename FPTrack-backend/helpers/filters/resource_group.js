const ResourceGroupHelpers = require('../resource_group');

function available(rsrc_grp) {
    return new Promise((resolve, reject) => {
        ResourceGroupHelpers
            .get_avl_resource_count(rsrc_grp)
            .then((result) => resolve(
                Boolean(result)
            ));
    });
}

exports.available_filters = [
    'available'
];

exports.available = available;