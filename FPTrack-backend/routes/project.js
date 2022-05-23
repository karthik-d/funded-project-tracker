var express = require('express');
var router = express.Router();

var ProjectController = require('../controllers/api/project');

router.get(
    '/',
    function (req, res, next) {
        ProposalController.getAll(req, res, next);
    }
)

router.get(
    '/:projectId',
    function (req, res, next) {
        ProposalController.getById(req.params.projectId, req, res, next);
    }
)

router.post(
    '/',
    function (req, res, next) {
        ProposalController.create(req, res, next);
    }
);

module.exports = router;