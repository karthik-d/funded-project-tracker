var express = require('express');

var mongoose = require('mongoose');

var ResourceGroupModel = require('../../models/resource_group');
var ErrorHelper = require('../../helpers/error');

var ResourceGroupFilters = require('../../helpers/filters/resource_group');
var Utils = require('../../helpers/utils');


function create(req, res, next) {
    const rsrc_grp = new ResourceGroupModel(req.body);
    rsrc_grp
        .save()
        .then((resource) => {
            res.status(201).send({
                id: resource._id,
                url: resource.url,
                message: "Resource Group created"
            })
        })
        .catch((error) => {
            res.status(400).send(
                ErrorHelper.construct_json_response(error)
            );
        });
};

function getAll(req, res, next) {
    var custom_filters = Object.keys(req.query).map(
        (param) => {
            if (ResourceGroupFilters.available_filters.includes(param)) {
                return Utils.getFunctionByName(param, ResourceGroupFilters);
            }
        }
    )
    console.log(custom_filters);
    ResourceGroupModel
        .onlyExisting()
        .then((resources) => {
            var resources = resources
                .filter(Utils.applyAsyncFilters(custom_filters))
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
        ResourceGroupModel
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
            message: "Resource Group not found"
        });
    }
};

exports.create = create;
exports.getById = getById;
exports.getAll = getAll;