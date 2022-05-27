var express = require('express');
var router = express.Router();

var AuthController = require('../controllers/api/auth');

router.post(
    '/',
    function (req, res, next) {
        AuthController.getAuthUser(req, res, next);
    }
)

module.exports = router;
