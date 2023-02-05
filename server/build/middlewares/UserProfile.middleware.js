"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PublisherProfileMiddleware = exports.UserProfileMiddleware = void 0;
const helpers_1 = require("../helpers");
const UserProfileMiddleware = (req, res, next) => {
    if (req.body.jwt.user_type == 'ADMIN')
        return next();
    else if (req.body.jwt.user_id == req.params.user_id)
        return next();
    else
        return res.status(401).jsonp((0, helpers_1.response)(401, 'User id does not match'));
};
exports.UserProfileMiddleware = UserProfileMiddleware;
const PublisherProfileMiddleware = (req, res, next) => {
    if (req.body.jwt.user_type == 'ADMIN')
        return next();
    else if (req.body.jwt.user_id == req.params.publisher_id)
        return next();
    else
        return res.status(401).jsonp((0, helpers_1.response)(401, 'Unauthorized'));
};
exports.PublisherProfileMiddleware = PublisherProfileMiddleware;
//# sourceMappingURL=UserProfile.middleware.js.map