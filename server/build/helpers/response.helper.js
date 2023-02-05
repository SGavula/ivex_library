"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.response = void 0;
const response = (status = 200, message = '', data = []) => ({
    status: status,
    message: message,
    data: data
});
exports.response = response;
//# sourceMappingURL=response.helper.js.map