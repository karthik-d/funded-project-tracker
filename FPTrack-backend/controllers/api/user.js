var express = require('express');
const { default: mongoose } = require('mongoose');
var mongoos = require('mongoose');

var UserModel = require('../../models/user');


// TODO: Add validation
function create(req, res, next) {
    const user = new UserModel(req.body);
    user
        .save()
        .then((resource) => {
            res.status(201).send({
                id: resource._id,
                message: "User created"
            })
        })
        .catch((error) => {
            res.status(400).send({
                error: error.name,
                message: error.message,
                code: error.code
            })
        });
};

function getAll(req, res, next) {
    UserModel.onlyExisting()
        .then((resources) => {
            console.log(resources)
            res.status(200).send(resources);
        })
        .catch((error) => {
            res.status(400).send({
                error: error.name,
                message: error.message,
                code: error.code
            })
        });
};

function getById(id, req, res, next) {
    if (mongoose.Types.ObjectId.isValid(id)) {
        UserModel
            .findById(id)
            .then((resource) => {
                res.status(200).send(resource);
            })
            .catch((error) => {
                res.status(400).send({
                    error: error.name,
                    message: error.message,
                    code: error.code
                })
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