const ResourceModel = require("../models/resource");

const ResourceFilters = require("./filters/resource");
const Utils = require("../helpers/utils");

function get_resource_count(rsrc_grp) {
  return ResourceModel.onlyExisting()
    .find({
      resource_group: rsrc_grp._id,
    })
    .then((resources) => {
      return resources.length;
    });
}

function get_avl_resource_count(rsrc_grp) {
  return new Promise((resolve, reject) => {
    ResourceModel.onlyExisting()
      .find({
        resource_group: rsrc_grp._id,
      })
      .then((resources) => {
        Utils.applyAsyncFilters(resources, [ResourceFilters.not_assigned]).then(
          (resources) => {
            console.log("Resovled size", resources.length);
            resolve(resources.length);
          }
        );
      });
  });
}

function get_unavl_resource_count(rsrc_grp) {
  return ResourceModel.onlyExisting()
    .find({
      resource_group: rsrc_grp._id,
    })
    .then((resources) => {
      return resources.filter(ResourceFilters.assigned).length;
    });
}

exports.get_resource_count = get_resource_count;
exports.get_avl_resource_count = get_avl_resource_count;
exports.get_unavl_resource_count = get_unavl_resource_count;
