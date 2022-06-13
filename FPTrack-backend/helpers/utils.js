function getFunctionByName(functionName, context) {
    var namespaces = functionName.split(".");
    var function_ = namespaces.pop();
    for (var i = 0; i < namespaces.length; i++) {
        context = context[namespaces[i]];
    }
    return context[function_];
}


function applyAsyncFilters(data, filters) {
    return new Promise((resolve, reject) => {
        Promise.all(
            data.map(_mixin_applyAsyncFilters(filters))
        )
            .then((truths) => {
                resolve(data.filter((_, idx) => truths[idx]));
            })
            .catch((error) => {
                reject(error);
            });
    });
}


function _mixin_applyAsyncFilters(filters) {
    return ((item) => {
        return new Promise((resolve, reject) => {
            Promise.all(filters.map((fltr) => {
                return fltr(item);
            }))
                .then((filter_truths) => {
                    resolve(filter_truths
                        .every(Boolean)
                    );
                })
                .catch((error) => {
                    reject(error);
                });
        })
    });

}

function timeDelta_days(date_to, date_from) {
    return Math.round((date_to - date_from) / (1000 * 60 * 60 * 24));
}

exports.getFunctionByName = getFunctionByName;
exports.applyAsyncFilters = applyAsyncFilters;
exports.timeDelta_days = timeDelta_days;