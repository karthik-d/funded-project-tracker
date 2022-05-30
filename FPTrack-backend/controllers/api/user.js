var express = require('express');
var mongoose = require('mongoose');

var UserModel = require('../../models/user');
var ErrorHelper = require('../../helpers/error');

// TODO: Add validation
function create(req, res, next) {
    const user = new UserModel(req.body);
    user
        .save()
        .then((resource) => {
            res.status(201).send({
                id: resource._id,
                url: resource.url,
                message: "User created"
            })
        })
        .catch((error) => {
            res.status(400).send(
                ErrorHelper.construct_json_response(error)
            );
        });
};

function getAll(req, res, next) {

    // Extract filters
    const filterables = UserModel.getDirectFilterFields();
    const filters = Object.keys(req.query)
        .filter((field) => {
            return filterables.includes(field);
        })
        .reduce((obj, field) => {
            return Object.assign(
                obj,
                { [field]: req.query[field] }
            );
        }, {});

    // Get records
    UserModel
        .onlyExisting()
        .where(filters)
        .then((resources_partial) => {
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
        UserModel
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
            message: "User not found"
        });
    }
};

exports.create = create;
exports.getById = getById;
exports.getAll = getAll;