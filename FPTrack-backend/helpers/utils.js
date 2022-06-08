function getFunctionByName(functionName, context) {
    var namespaces = functionName.split(".");
    var function_ = namespaces.pop();
    for (var i = 0; i < namespaces.length; i++) {
        context = context[namespaces[i]];
    }
    return context[function_];
}

function applyAsyncFilters(filters) {
    return ((item) => {
        return Promise.all(filters.map((fltr) => {
            return fltr(item);
        }))
            .then((filter_truths) => {
                return filter_truths
                    .every(Boolean)
            })
    });

}

exports.getFunctionByName = getFunctionByName;
exports.applyAsyncFilters = applyAsyncFilters;