var express = require('express');

var ProposalModel = require('../../models/proposal');
var ErrorHelper = require('../../helpers/error');

// TODO: Add file conversion to bit-string
// TODO: Add validation
function create(req, res, next) {
    // change the document format to Buffer from Base64
    try {
        var document_b64 = req.body.pdf_document;
        req.body.pdf_document = Buffer.from(document_b64, 'base64');
    }
    catch (error) {
        return void res.status(400).send(
            ErrorHelper.construct_json_response(error)
        );
    }
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
            res.status(400).send(
                ErrorHelper.construct_json_response(error)
            );
        });
};


function getAll(req, res, next) {
    ProposalModel
        .onlyExisting()
        .then((resources) => {
            res.status(200).send(resources)
        })
        .catch((error) => {
            res.status(400).send(
                ErrorHelper.construct_json_response(error)
            );
        });
};

exports.create = create;
exports.getAll = getAll;