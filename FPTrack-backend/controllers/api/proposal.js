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
        }));
};