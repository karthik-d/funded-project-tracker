var express = require('express');
var router = express.Router();

var ProjectController = require('../controllers/api/project');

router.get(
    '/',
    function (req, res, next) {
        ProjectController.getAll(req, res, next);
    }
)

router.get(
    '/:projectId',
    function (req, res, next) {
        ProjectController.getById(req.params.projectId, req, res, next);
    }
)

router.get(
    '/user/:userId',
    function (req, res, next) {
        ProjectController.getByUser(req.params.userId, req, res, next);
    }
)

router.post(
    '/',
    function (req, res, next) {
        ProjectController.create(req, res, next);
    }
);

router.patch(
    '/update-status',
    function (req, res, next) {
        ProjectController.updateStatus(req, res, next);
    }
);

router.patch(
    '/update-outcome',
    function (req, res, next) {
        ProjectController.updateOutcome(req, res, next);
    }
)

module.exports = router;