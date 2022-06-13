var express = require('express');

var mongoose = require('mongoose');

var ResourceAssignmentModel = require('../../models/resource_assignment');
var ResourceModel = require('../../models/resource');

var ResourceHelper = require('../../helpers/resource');
var ErrorHelper = require('../../helpers/error');

var ResourceFilters = require('../../helpers/filters/resource');
var Utils = require('../../helpers/utils');


function create(req, res, next) {
    const rsrc = new ResourceAssignmentModel(req.body);
    rsrc
        .save()
        .then((resource) => {
            res.status(201).send({
                id: resource._id,
                url: resource.url,
                message: "Resource assignment made"
            })
        })
        .catch((error) => {
            res.status(400).send(
                ErrorHelper.construct_json_response(error)
            );
        });
};

function getAll(req, res, next) {
    ResourceAssignmentModel
        .onlyExisting()
        .then((resources) => {
            res.status(200).send(resources);
        })
        .catch((error) => {
            res.status(400).send(
                ErrorHelper.construct_json_response(error)
            );
        });
};

function getById(id, req, res, next) {
    if (mongoose.Types.ObjectId.isValid(id)) {
        ResourceAssignmentModel
            .onlyExisting()
            .getById(id)
            .then((resource) => {
                res.status(200).send(resource);
            })
            .catch((error) => {
                res.status(400).send(
                    ErrorHelper.construct_json_response(error)
                );
            });
    }
    else {
        res.status(404).send({
            message: "Resource assignment record not found"
        });
    }
};


function getByProject(id, req, res, next) {
    if (mongoose.Types.ObjectId.isValid(id)) {
        project_id = mongoose.Types.ObjectId(id);
        ResourceAssignmentModel
            .aggregate([
                {
                    $match: {
                        deleted_on: null,
                        assigned_to: project_id
                    }
                }, {
                    $lookup: {
                        from: 'resources',
                        localField: 'resource',
                        foreignField: '_id',
                        as: 'resource_data'
                    }
                }, {
                    $group: {
                        _id: '$resource_data.resource_group',
                        data: {
                            $addToSet: '$$ROOT'
                        },
                        count: {
                            $sum: 1
                        }
                    }
                }, {
                    $replaceRoot: {
                        newRoot: {
                            $mergeObjects: [{
                                assigned_qty: '$count'
                            },
                            { resource_records: '$data' }]
                        }
                    }
                }

            ],
                (error, results) => {
                    if (error) {
                        throw error;
                    }
                    return results;
                })
            .then((grouped_assigns) => {
                console.log(grouped_assigns);
                res.status(200).send(grouped_assigns);
            })
            .catch((error) => {
                res.status(400).send(
                    ErrorHelper.construct_json_response(error)
                );
            });
    }
    else {
        res.staus(404).send(
            ErrorHelper.construct_json_response({
                error: "Project not found",
                message: "Could not find a project for that ID",
                code: 801
            })
        )
    }
}


function assignResourcesToProject(req, res, next) {

    // verify id values
    if (mongoose.Types.ObjectId.isValid(req.body.rsrc_mgr_id)) {
        rsrc_mgr_id = mongoose.Types.ObjectId(req.body.rsrc_mgr_id);
    }
    else {
        return void res.staus(404).send(
            ErrorHelper.construct_json_response({
                error: "Resource Manager not found",
                message: "Could not find a user for that ID",
                code: 801
            })
        )
    }

    if (mongoose.Types.ObjectId.isValid(req.body.project_id)) {
        project_id = mongoose.Types.ObjectId(req.body.project_id);
    }
    else {
        return void res.staus(404).send(
            ErrorHelper.construct_json_response({
                error: "Project not found",
                message: "Could not find a project for that ID",
                code: 801
            })
        )
    }

    if (mongoose.Types.ObjectId.isValid(req.body.rsrc_grp_id)) {
        rsrc_grp_id = mongoose.Types.ObjectId(req.body.rsrc_grp_id);
    }
    else {
        return void res.staus(404).send(
            ErrorHelper.construct_json_response({
                error: "Resource group not found",
                message: "Could not find a resource group for that ID",
                code: 801
            })
        )
    }

    // get group's resources
    ResourceModel
        .onlyExisting()
        .find({
            resource_group: rsrc_grp_id
        })
        .then((group_resources) => {

            // get current assigned quantity
            ResourceHelper
                .get_resource_count_for_project(rsrc_grp_id, project_id)
                .then(([count_obj]) => {
                    var qty_delta = req.body.qty - count_obj.count;
                    console.log("qty_delta", qty_delta);

                    if (qty_delta < 0) {
                        // unallocate resources
                        var qty_delta = -1 * qty_delta;
                        var qty_to_modify = (
                            qty_delta > count_obj.count
                                ? count_obj.count
                                : qty_delta
                        );

                        // TODO: Filter resources for the target project!!
                        ResourceAssignmentModel
                            .onlyExisting()
                            .find({
                                assigned_to: project_id
                            })
                            .then((project_resources) => {
                                Utils
                                    .applyAsyncFilters(group_resources, [ResourceFilters.assigned])
                                    .then((resources) => {
                                        // delete that many assignments
                                        var to_unassign = resources.slice(0, qty_to_modify);
                                        Promise.all(
                                            to_unassign.map((rsrc) => {
                                                return ResourceAssignmentModel
                                                    .onlyExisting()
                                                    .updateOne({
                                                        resource: rsrc._id,
                                                        assigned_to: project_id
                                                    }, {
                                                        deleted_on: new Date()
                                                    });
                                            })
                                        )
                                            .then((_) => {
                                                res.status(201).send({
                                                    total_qty: qty_to_modify + resources.length,
                                                    assigned_qty: qty_to_modify,
                                                    project_id: project_id,
                                                    resource_group_id: rsrc_grp_id,
                                                    message: "Resource deallocations made"
                                                })
                                            })
                                            .catch((error) => {
                                                res.status(400).send(
                                                    ErrorHelper.construct_json_response(error)
                                                );
                                            });
                                    })
                            })
                    }

                    else if (qty_delta == 0) {
                        res.status(200).send({
                            total_qty: count_obj.count,
                            assigned_qty: 0,
                            message: "No resource assignments made"
                        })
                    }

                    else {
                        // get resources that can be assigned
                        Utils
                            .applyAsyncFilters(group_resources, [ResourceFilters.not_assigned])
                            .then((resources) => {

                                var qty_to_modify = (
                                    qty_delta > resources.length
                                        ? resources.length
                                        : qty_delta
                                );

                                // make assignments
                                var to_assign = resources.slice(0, qty_to_modify);
                                console.log("to_assign", qty_to_modify);
                                Promise.all(
                                    to_assign.map((rsrc) => {
                                        return new ResourceAssignmentModel({
                                            resource: rsrc._id,
                                            assigned_to: project_id,
                                            assigned_by: rsrc_mgr_id
                                        }).save();
                                    })
                                )
                                    .then((_) => {
                                        console.log(_);
                                        res.status(201).send({
                                            total_qty: qty_to_modify + count_obj.count,
                                            assigned_qty: qty_to_modify,
                                            project_id: project_id,
                                            resource_group_id: rsrc_grp_id,
                                            message: "Resource assignments made"
                                        })
                                    })
                                    .catch((error) => {
                                        res.status(400).send(
                                            ErrorHelper.construct_json_response(error)
                                        );
                                    });
                            })
                    }
                })
        })
}



exports.create = create;
exports.getById = getById;
exports.getAll = getAll;
exports.getByProject = getByProject;
exports.assignResourcesToProject = assignResourcesToProject;
