var express = require('express');
var router = express.Router();

var AuthController = require('../controllers/api/auth');

router.post(
    '/',
    function (req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Methods", "GET, PUT, POST");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        AuthController.getAuthUser(req, res, next);
    }
)

module.exports = router;
