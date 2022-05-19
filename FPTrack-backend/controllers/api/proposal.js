var express = require('express');

var ProposalModel = require('../../models/proposal');


// TODO: Add file conversion to bit-string
// TODO: Add validation
function create(req, res, next) {
    console.log(req.body);
    const proposal = new ProposalModel(req.body);
    proposal
        .save()
        .then((resource => {
            res.status(201).send({
                id: resource._id,
                message: "Proposal created"
            })
        }))
        .catch((error) => {
            res.status(400).send({
                error: error.name,
                message: error.message,
                code: error.code
            })
        });
};


function getAll(req, res, next) {
    ProposalModel
        .onlyExisting()
        .then((resources) => {
            res.status(200).send(resources)
        })
        .catch((error) => {
            res.status(400).send({
                error: error.name,
                message: error.message,
                code: error.code
            })
        });
};

exports.create = create;
exports.getAll = getAll;