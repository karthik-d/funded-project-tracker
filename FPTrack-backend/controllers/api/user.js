var express = require('express');

var UserModel = require('../models/user');


// TODO: Add validation
function create(req, res, next) {
    const user = new UserModel(req.body);
    user
        .save()
        .then((resource) => {
            res.status(201).send({
                id: resource._id,
                message: "User created"
            })
        });
};