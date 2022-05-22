var express = require('express');

var mongoose = require('mongoose');

var ResourceModel = require('../../models/resource');
var ErrorHelper = require('../../helpers/error');


function create(req, res, next) {
    const rsrc_grp = new ResourceModel(req.body);
    rsrc_grp
        .save()
        .then((resource) => {
            res.status(201).send({
                id: resource._id,
                url: resource.url,
                message: "Resource created"
            })
        })
        .catch((error) => {
            res.status(400).send(
                ErrorHelper.construct_json_response(error)
            );
        });
};

function getAll(req, res, next) {
    ResourceModel
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
        ResourceModel
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
            message: "Resource not found"
        });
    }
};

exports.create = create;
exports.getById = getById;
exports.getAll = getAll;