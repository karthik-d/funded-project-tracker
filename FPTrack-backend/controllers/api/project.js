var express = require('express');
var mongoose = require('mongoose');

var ProjectModel = require('../../models/project');
var ErrorHelper = require('../../helpers/error');

function create(req, res, next) {
    const project = new ProjectModel(req.body);
    project
        .save()
        .then((resource) => {
            res.status(201).send({
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


function getByUser(user_id, req, res, next) {

    function getProjectsForRole(role_field, user_id) {
        return ProjectModel
            .onlyExisting()
            .find({
                [proposal + role_field]: user_id
            });
    };

    if (mongoose.Types.ObjectId.isValid(user_id)) {
        user_id = mongoose.Types.ObjectId(user_id);
        Promise.all([
            getProjectsForRole('supervisors', user_id),
            getProjectsForRole('members', user_id),
            getProjectsForRole('leader', user_id)
        ])
            .then(([supervisor_projects, member_projects, leader_projects]) => {
                res.status(200).send({
                    as_supervisor: supervisor_projects,
                    as_member: member_projects,
                    as_leader: leader_projects
                });
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

