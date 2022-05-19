function construct_json_response(error) {
    return {
        error: error.name,
        message: error.message,
        code: error.code
    }
}

exports.construct_json_response = construct_json_response;