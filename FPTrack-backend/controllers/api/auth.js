var express = require('express');
var mongoose = require('mongoose');
var { OAuth2Client } = require('google-auth-library');

var UserModel = require('../../models/user');
var ErrorHelper = require('../../helpers/error');


/*
ADV TODO: Update picture each time
TODO: Create Client ID env variable
*/
function getAuthUser(req, res, next) {
    // validate token
    var auth_client = new OAuth2Client({
        clientId: `${process.env.OAUTH_CLIENTID}`
    });
    auth_client.verifyIdToken({
        idToken: req.body.token,
        audience: `${process.env.OAUTH_CLIENTID}`
    })
        .then((ticket) => {
            var payload = ticket.getPayload();
            console.log(payload);
            // retreive user
            UserModel
                .onlyExisting()
                .getByEmail(payload.email)
                .then((user) => {
                    if (user == null) {
                        res.status(404).send({
                            error_code: 901,
                            message: "User must be created",
                            url: "/api/user/",
                            method: "POST"
                        })
                    }
                    else {
                        user.auth_token = req.body.token;
                        res.status(200).send(user);
                    }
                })
                .catch((error) => {
                    res.status(400).send(
                        ErrorHelper.construct_json_response(error)
                    )
                });
        })
        .catch((error) => {
            res.status(400).send(
                ErrorHelper.construct_json_response(error)
            )
        });
}

exports.getAuthUser = getAuthUser;