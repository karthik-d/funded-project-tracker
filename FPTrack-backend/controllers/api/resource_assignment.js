var express = require('express');

var mongoose = require('mongoose');

var ResourceAssignmentModel = require('../../models/resource_assignment');
var ErrorHelper = require('../../helpers/error');


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
                        as: 'resource_ref'
                    }
                }, {
                    $group: {
                        _id: '$resource_ref.resource_group',
                        assigned_qty: {
                            $sum: 1
                        }
                    }
                }

            ])
            .then((grouped_assigns) => {
                console.log(grouped_assigns);
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


exports.create = create;
exports.getById = getById;
exports.getAll = getAll;
exports.getByProject = getByProject;
