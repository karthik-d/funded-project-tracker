var express = require('express');
var mongoose = require('mongoose');

var ProjectModel = require('../../models/project');
var ProposalModel = require('../../models/proposal');
var ErrorHelper = require('../../helpers/error');
const proposal = require('../../models/proposal');

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
            .then((updation_data) => {
                // create a new project
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
                    console.log(Object.keys(resources[0]))
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
            .populate({
                path: 'proposal',
                match: {
                    [role_field]: user_id
                }
            })
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

// Proposal field it explicitly popuated
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

exports.create = create;
exports.getById = getById;
exports.getAll = getAll;
exports.getByUser = getByUser;

