var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    const dbConnect = dbo.getDb();
  res.send('respond with a resource');
});

router.post('/', function(req, res, next) {
    res.status(201).json(req.body);
});

module.exports = router;
