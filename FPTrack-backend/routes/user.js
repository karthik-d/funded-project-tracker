var express = require('express');
var router = express.Router();

var UserController = require('../controllers/api/user');

/*
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});
*/

router.get(
  '/',
  function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    UserController.getAll(req, res, next);
  }
)

router.get(
  '/:userId',
  function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    UserController.getById(req.params.userId, req, res, next);
  }
)

router.post(
  '/',
  function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    UserController.create(req, res, next);
  }
)

module.exports = router;
