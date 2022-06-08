function getFunctionByName(functionName, context) {
    var namespaces = functionName.split(".");
    var function_ = namespaces.pop();
    for (var i = 0; i < namespaces.length; i++) {
        context = context[namespaces[i]];
    }
    return context[function_];
}

exports.getFunctionByName = getFunctionByName;