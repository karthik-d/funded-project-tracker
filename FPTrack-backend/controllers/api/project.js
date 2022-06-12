var express = require('express');
var mongoose = require('mongoose');

var ProjectModel = require('../../models/project');
var ProposalModel = require('../../models/proposal');

var ErrorHelper = require('../../helpers/error');
var Utils = require('../../helpers/utils');

// TODO: Do NOT allow updates within 1-day intervals

function create(req, res, next) {

    if (mongoose.Types.ObjectId.isValid(req.body.proposal)) {
        proposal_id = mongoose.Types.ObjectId(req.body.proposal);
        // check if corresonding proposal is pending status - udpate only if so
        new Promise((resolve, reject) => {
            ProposalModel
                .onlyExisting()
                .getById(proposal_id)
                .then(([proposal]) => {
                    if (!proposal.isAwaitingDecision()) {
                        reject({
                            name: "Proposal not awaiting decision",
                            message: "Proposal not awating decision. It has already been approved or rejected",
                            code: 951
                        });
                    }
                    else {
                        // update status of the proposal
                        ProposalModel
                            .updateOne({
                                _id: proposal_id,
                            }, {
                                approved_on: Date.now()
                            })
                            .then((result) => {
                                resolve(result);
                            })
                    }
                })
        })
            .then((updation_meta) => {
                // create a new project
                if (!updation_meta.acknowledged) {
                    throw {
                        name: "Proposal status could not be updated",
                        message: "Error occurred when updating proposal status. Try later",
                        code: 952
                    };
                }
                const project = new ProjectModel(req.body);
                project
                    .save()
                    .then((resource) => {
                        res.status(201).send({
                            id: resource._id,
                            url: resource._url,
                            message: "Project created. Proposal updated"
                        });
                    })
            })
            .catch((error) => {
                res.status(400).send(
                    ErrorHelper.construct_json_response(error)
                )
            });
    }
    else {
        res.status(404).send({
            message: "Proposal not found"
        });
    }
};


function getAll(req, res, next) {
    ProjectModel
        .onlyExisting()
        .then((resources) => {
            Promise.all(resources.map((rsrc) => {
                return rsrc
                    .populate('proposal');
            }))
                .then((resources) => {
                    res.status(200).send(resources);
                });
        })
        .catch((error) => {
            res.status(400).send(
                ErrorHelper.construct_json_response(error)
            );
        });
};


function getByUser(user_id, req, res, next) {

    // Ashamed of the inelegance in this function!!
    function getProjectsForRole(role_field, user_id) {
        return ProjectModel
            .onlyExisting()
            .then((with_proposal) => {
                return (with_proposal.filter(
                    function (project) {
                        return (project.proposal != null)
                    }
                ));
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

// Proposal field is explicitly popuated
function getById(id, req, res, next) {
    if (mongoose.Types.ObjectId.isValid(id)) {
        ProjectModel
            .onlyExisting()
            .getById(id)
            .populate('proposal')
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

function updateStatus(req, res, next) {

    // make update subdocument first
    if (mongoose.Types.ObjectId.isValid(req.body.id)) {
        project_id = mongoose.Types.ObjectId(req.body.id);
        outcome_obj = {};
        ['title', 'description'].map((key) => {
            if (req.body.hasOwnProperty(key)) {
                Object.assign(outcome_obj, { [key]: req.body[key] })
            }
        })

        // check if last update was at least 2 days ago
        new Promise((resolve, reject) => {
            ProjectModel.getById(project_id)
                .then(([project]) => {
                    let last_update = project.getMostRecentUpdate();
                    if (last_update != null &&
                        Utils.timeDelta_days(
                            Date.now(),
                            last_update.createdAt
                        ) < 2) {
                        reject({
                            name: "Status update too frequent",
                            message: "Previous status update was made less than 2 days ago",
                            meta_info: {
                                previous_update: last_update.createdAt
                            },
                            code: 961
                        });
                    }
                    resolve(project);
                });
        })
            .then((project) => {
                // make update
                ProjectModel
                    .onlyExisting()
                    .updateOne({
                        _id: project_id
                    }, {
                        $addToSet: {
                            status_updates: outcome_obj
                        }
                    })
                    .then((updation_meta) => {
                        if (!updation_meta.acknowledged) {
                            throw {
                                name: "Project update could not be written",
                                message: "Error occurred when updating project. Try later",
                                code: 952
                            }
                        }
                        res.status(204).send({
                            id: project_id,
                            message: "Project status updated",
                            update_title: req.body.title
                        })
                    })
            })
            .catch((error) => {
                res.status(400).send(
                    ErrorHelper.construct_json_response(error)
                );
            })
    }
    else {
        res.status(404).send({
            message: "Project not found"
        });
    }
}


function updateOutcome(req, res, next) {
    // make updation subdocument first
    if (mongoose.Types.ObjectId.isValid(req.body.id)) {
        project_id = mongoose.Types.ObjectId(req.body.id);
        outcome_obj = {};
        ['title', 'description', 'kind', 'reference'].map((key) => {
            if (req.body.hasOwnProperty(key)) {
                Object.assign(outcome_obj, { [key]: req.body[key] })
            }
        })

        // check if last outcome update was at least 2 days ago
        new Promise((resolve, reject) => {
            ProjectModel.getById(project_id)
                .then(([project]) => {
                    let last_outcome = project.getMostRecentOutcome();
                    if (last_outcome != null &&
                        Utils.timeDelta_days(
                            Date.now(),
                            last_outcome.createdAt
                        ) < 2) {
                        reject({
                            name: "Outcome update too frequent",
                            message: "Previous outcome update was made less than 2 days ago",
                            meta_info: {
                                previous_outcome: last_outcome.createdAt
                            },
                            code: 961
                        });
                    }
                    resolve(project);
                });
        })
            .then((project) => {
                // make update
                ProjectModel
                    .onlyExisting()
                    .updateOne({
                        _id: project_id
                    }, {
                        $addToSet: {
                            outcomes: outcome_obj
                        }
                    })
                    .then((updation_meta) => {
                        if (!updation_meta.acknowledged) {
                            throw {
                                name: "Project outcome update could not be written",
                                message: "Error occurred when updating project. Try later",
                                code: 952
                            }
                        }
                        res.status(204).send({
                            id: project_id,
                            message: "Project outcomes updated",
                            update_title: req.body.title
                        })
                    })
            })
            .catch((error) => {
                res.status(400).send(
                    ErrorHelper.construct_json_response(error)
                );
            })
    }
    else {
        res.status(404).send({
            message: "Project not found"
        });
    }
}


exports.create = create;
exports.getById = getById;
exports.getAll = getAll;
exports.getByUser = getByUser;
exports.updateStatus = updateStatus;
exports.updateOutcome = updateOutcome

