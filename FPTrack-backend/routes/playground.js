var express = require('express');
var router = express.Router();

var PlaygroundController = require('../controllers/api/playground');

/* GET home page. */
router.get('/session-check', function (req, res, next) {
    console.log("In the playground..");
    PlaygroundController.checkCookies(req, res, next);
});

module.exports = router;
