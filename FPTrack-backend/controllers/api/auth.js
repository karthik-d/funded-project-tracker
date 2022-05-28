var express = require('express');
var mongoose = require('mongoose');
var { OAuth2Client } = require('google-auth-library');

var UserMode = require('../../models/user');
var ErrorHelper = require('../../helpers/error');


/*
ADV TODO: Update picture each time
TODO: Create Client ID env variable
*/
function getAuthUser(req, res, next) {
    console.log("HERE");
    console.log(req.body);
    var { userToken } = req.body;
    // validate token
    var auth_client = new OAuth2Client({
        clientId: `${process.env.OAUTH_CLIENTID}`
    });
    console.log(userToken);
    console.log(`${process.env.OAUTH_CLIENTID}`);
    auth_client.verifyIdToken({
        idToken: userToken,
        audience: `${process.env.OAUTH_CLIENTID}`
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

exports.getAuthUser = getAuthUser;