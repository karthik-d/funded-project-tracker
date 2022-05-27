var express = require('express');
var mongoose = require('mongoose');
var OAuthClient = require('google-auth-library');

var UserMode = require('../../models/user');
var ErrorHelper = require('../../helpers/error');


/*
ADV TODO: Update picture each time
TODO: Create Client ID env variable
*/
function getAuthUser(req, res, next) {
    var { userToken } = req.body;
    // validate token
    OAuthClient.verifyIdToken({
        idToken: userToken,
        audient: `${process.env.OAUTH_CLIENTID}`
    })
        .then((ticket) => {
            var payload = ticket.getPayload();
            // retreive user
            UserModel
                .onlyExisting
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
                    user.auth_token = token;
                    res.status(200).send(user);
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