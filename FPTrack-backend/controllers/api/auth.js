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
                .findByEmail(payload.email)
                .then((user) => {
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