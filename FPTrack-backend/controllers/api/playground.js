function checkCookies(req, res, next) {
    console.log(req.session);
    res.status(200).send({
        message: "Just playing around!"
    })
}

exports.checkCookies = checkCookies;