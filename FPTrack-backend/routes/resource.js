var express = require('express');
var router = express.Router();

var ResourceController = require('../controllers/api/resource');

router.get(
    '/',
    function (req, res, next) {
        ResourceController.getAll(req, res, next);
    }
);

router.get(
    '/:rsrcId',
    function (req, res, next) {
        ResourceController.getById(req.params.rsrcId, req, res, next);
    }
)

router.post(
    '/',
    function (req, res, next) {
        ResourceController.create(req, res, next);
    }
);

module.exports = router;