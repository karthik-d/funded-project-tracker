var express = require('express');
var router = express.Router();

var ResourceGroupController = require('../controllers/api/resource_group');

router.get(
    '/',
    function (req, res, next) {
        ResourceGroupController.getAll(req, res, next);
    }
)

router.get(
    '/:rsrcGrpId',
    function (req, res, next) {
        ResourceGroupController.getById(req.params.rsrcGrpId, req, res, next);
    }
)

router.post(
    '/',
    function (req, res, next) {
        ResourceGroupController.create(req, res, next);
    }
);

module.exports = router;