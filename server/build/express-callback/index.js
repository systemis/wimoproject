"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function makeExpressCallback(controller) {
    return function (req, res, next) {
        var httpRequest = {
            context: {
                validated: Object.assign({}, req.body, req.params, req.query),
            },
            query: req.query,
            params: req.params,
            method: req.method,
            path: req.path,
            headers: {
                "Content-Type": req.get("Content-Type"),
                Referer: req.get("referer"),
                "User-Agent": req.get("User-Agent"),
            },
        };
        controller(httpRequest)
            .then(function (httpResponse) {
            if (httpResponse.headers) {
                res.set(httpResponse.headers);
            }
            res.type("json");
            res.status(httpResponse.statusCode).send(httpResponse.body);
        })
            .catch(function (errorObject) {
            console.error("More information ", errorObject);
            res.status(errorObject.statusCode).send(errorObject.body);
            next(errorObject);
        });
    };
}
exports.default = makeExpressCallback;
