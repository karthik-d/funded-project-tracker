var express = require('express');
var mongoose = require('mongoose');

var ProjectModel = require('../../models/project');
var ErrorHelper = require('../../helpers/error');

function create(req, res, next) {
	const project = new ProjectModel(req.body);
	project 
	.save()
	.then((resource) => {
		res.status(200).send({
			id: resource._id,
			url: resource._url,
			message: "Project created"
		});
	})
	.catch((error) => {
		res.status(400).send(
			ErrorHelper.construct_json_response(error)
		);
	});
};

function getAll(req, res, next) {
    ProjectModel
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
        ProjectModel
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
            message: "Project not found"
        });
    }
};

exports.create = create;
exports.getById = getById;
exports.getAll = getAll;

