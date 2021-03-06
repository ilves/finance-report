Object.defineProperty(exports, "__esModule", { value: true });
var _ = require("lodash");
function groupBy(data, key) {
    return _.groupBy(data, function (item) {
        return item[key];
    });
}
exports.groupBy = groupBy;
;
function sum(data, key) {
    if (!data.length) {
        return {};
    }
    return data.reduce(function (obj, item) {
        obj[key] += item[key];
        return obj;
    });
}
exports.sum = sum;
;
function compare(data, groupKey) {
    var groupsToCompare = _.chain(Object.keys(data))
        .flatten()
        .uniqBy(groupKey)
        .map(groupKey)
        .value();
    var result = _.chain(data)
        .map(function (item) { return _.keyBy(item, groupKey); })
        .map(function (item) {
        _.difference(groupsToCompare, Object.keys(item))
            .forEach(function (group) {
            var _a;
            item[group] = (_a = {},
                _a[groupKey] = group,
                _a);
        });
        return item;
    })
        .value();
    console.log(result);
}
exports.compare = compare;
//# sourceMappingURL=index.js.map