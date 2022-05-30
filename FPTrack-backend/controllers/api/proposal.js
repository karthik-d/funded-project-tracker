var express = require('express');

var ProposalModel = require('../../models/proposal');
var UserModel = require('../../models/user');
var ErrorHelper = require('../../helpers/error');


// TODO: Add file conversion to bit-string
// TODO: Add validation for all basic cases such as length, existence, sanity, etc.
// TODO: Add validation for semantic integrity:
//      - supervisors MUST be faculty
//      - members must NOT contain the leader - if so, remove it
//      - (add on...)
function create(req, res, next) {

    function getUsersFromEmails(emailArr) {
        return UserModel
            .onlyExisting()
            .getByEmails(emailArr);
    }

    // change the document format to Buffer from Base64
    try {
        var document_b64 = req.body.pdf_document;
        req.body.pdf_document = Buffer.from(document_b64, 'base64');
    }
    catch (error) {
        // terminal return
        return void res.status(400).send(
            ErrorHelper.construct_json_response(error)
        );
    }
    // decode emails into user objects - supervisor, leader, members
    // syntactic convenience in leader array - only ONE leader

    Promise.all([
        getUsersFromEmails(req.body.supervisors),
        getUsersFromEmails(req.body.members),
        getUsersFromEmails([req.body.leader])
    ])
        .then(([supervisors, members, [leader]]) => {
            if (supervisors.includes(null)) {
                res.status(400).send({
                    message: "One or more invalid emails for supervisors"
                });
            }
            else if (members.includes(null)) {
                res.status(400).send({
                    message: "One or more invalid emails for members"
                });
            }
            else if (leader == null) {
                res.status(400).send({
                    message: "Invalid leader email"
                });
            }
            else {
                req.body.supervisors = supervisors;
                req.body.members = members;
                req.body.leader = leader;
                const proposal = new ProposalModel(req.body);
                proposal.save()
                    .then((resource) => {
                        resource.pdf_document = resource.document_b64;
                        res.status(201).send({
                            id: resource._id,
                            url: resource.url,
                            message: "Proposal created"
                        })
                    })
            }
        })
        .catch((error) => {
            res.status(400).send(
                ErrorHelper.construct_json_response(error)
            );
        });


    /*
    function getUsersFromEmails(emailArr) {
        destnArr = [];
        emailArr.forEach(
            function (email, idx) {
                destnArr.push(
                    UserModel
                        .onlyExisting()
                        .getByEmail(email)
                );
            }
        );
        return Promise.all(destnArr);
    }
    */

    // req.body.members.forEach(
    //     get_converter_callbk(member_ids)
    // );
    // [req.body.leader].forEach(
    //     get_converter_callbk(leader_ids)
    // );
    // console.log(supervisor_ids);
    // console.log(leader_ids);
    // console.log(member_ids);

    //console.trace();
    // return void res.status(402).send({ id: "test" });
    /*
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
    */
};


function getAll(req, res, next) {
    ProposalModel
        .onlyExisting()
        .then((resources) => {
            resources.forEach(
                function (rsrc, idx) {
                    rsrc.pdf_document = rsrc.document_base64;
                }
            );
            res.status(200).send(resources)
        })
        .catch((error) => {
            res.status(400).send(
                ErrorHelper.construct_json_response(error)
            );
        });
};


function getByUser(user_id, req, res, next) {
    ProposalModel
        .onlyExisting()

}


function getById(id, req, res, next) {
    ProposalModel
        .onlyExisting()
        .getById(id)
        .populate('leader')
        .populate('members')
        .populate('supervisors')
        .then(([resource]) => {
            resource.pdf_document = resource.document_base64;
            res.status(200).send(resource);
        })
        .catch((error) => {
            res.status(400).send(
                ErrorHelper.construct_json_response(error)
            );
        });
};

exports.create = create;
exports.getAll = getAll;
exports.getById = getById;