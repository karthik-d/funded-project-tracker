var express = require('express');
var router = express.Router();

var ProposalController = require('../controllers/api/proposal');

router.get(
    '/',
    function (req, res, next) {
        ProposalController.getAll(req, res, next);
    }
)

router.get(
    '/user/:userId',
    function (req, res, next) {
        ProposalController.getByUser(req.params.userId, req, res, next);
    }
)

router.get(
    '/:proposalId',
    function (req, res, next) {
        ProposalController.getById(req.params.proposalId, req, res, next);
    }
)

router.post(
    '/',
    function (req, res, next) {
        ProposalController.create(req, res, next);
    }
);

router.patch(
    '/reject/:proposalId',
    function (req, res, next) {
        ProposalController.rejectProposal(req.params.proposalId, req, res, next);
    }
)

module.exports = router;