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

function timeDelta_days(date_to, date_from) {
    return Math.round((date_to - date_from) / (1000 * 60 * 60 * 24));
}

exports.getFunctionByName = getFunctionByName;
exports.applyAsyncFilters = applyAsyncFilters;
exports.timeDelta_days = timeDelta_days;