const ResourceGroupHelpers = require("../resource_group");

function available(rsrc_grp) {
  return new Promise((resolve, reject) => {
    console.log(rsrc_grp);
    ResourceGroupHelpers.get_avl_resource_count(rsrc_grp).then((result) => {
      console.log("Available Filter", result);
      resolve(Boolean(result));
    });
  });
}

exports.available_filters = ["available"];

exports.available = available;
