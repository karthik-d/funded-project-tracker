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
                            $first: '$$ROOT'
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
                                '$data']
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

    // get resource for the group
    ResourceModel
        .onlyExisting()
        .find({
            resource_group: rsrc_grp_id
        })
        .then((resources) => {
            Utils
                .applyAsyncFilters(resources, [ResourceFilters.not_assigned])
                .then((resources) => {
                    // get current quantity
                    ResourceHelper
                        .get_resource_count_for_project(rsrc_grp_id, project_id)
                        .then((count) => {
                            console.log(count);
                        })
                })
        })


}



exports.create = create;
exports.getById = getById;
exports.getAll = getAll;
exports.getByProject = getByProject;
exports.assignResourcesToProject = assignResourcesToProject;
