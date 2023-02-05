"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTrimester = void 0;
function getTrimester() {
    const currentMonth = new Date().getMonth();
    let trimester;
    if (currentMonth <= 2)
        trimester = 1;
    else if (currentMonth > 2 && currentMonth <= 5)
        trimester = 2;
    else if (currentMonth > 5 && currentMonth <= 8)
        trimester = 3;
    else if (currentMonth > 8)
        trimester = 4;
    return trimester;
}
exports.getTrimester = getTrimester;
//# sourceMappingURL=trimester.helper.js.map