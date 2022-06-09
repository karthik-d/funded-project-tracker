function construct_json_response(error) {
    var json_response = {};
    [
        'error',
        'message',
        'meta_info',
        'code'
    ].map((key) => {
        if (error.hasOwnProperty(key)) {
            json_response = Object.assign(
                json_response,
                { [key]: error[key] }
            )
        }
    })
    return json_response;
}

exports.construct_json_response = construct_json_response;