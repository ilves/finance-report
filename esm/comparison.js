import * as _ from 'lodash';
import * as moment from 'moment';
var Comparison = /** @class */ (function () {
    function Comparison(data, opts) {
        this.data = _.chain(data);
        this.opts = Object.assign({}, opts);
        this.report = {};
        this._groups = this.data.groupBy(this.opts.groupBy);
        this._fields = [];
        this._value = this.calculateValue();
    }
    Comparison.prototype.groups = function () {
        return this._groups.keys().sort().value();
    };
    Comparison.prototype.value = function () {
        return this._value;
    };
    Comparison.prototype.fields = function () {
        return this._fields;
    };
    Comparison.prototype.calculateValue = function () {
        var _this = this;
        var groupBy = function (item) {
            var key = _this.opts.valueBy(item);
            var pos = _.findIndex(_this._fields, function (i) { return _.isEqual(i, key); });
            var res = pos >= 0 ? pos : _this._fields.push(key) - 1;
            return res;
        };
        var res = this._groups
            .mapValues(function (values) {
            return _.chain(values).groupBy(groupBy).mapValues(function (val) { return val.reduce(_this.opts.sumBy, {}); }).value();
        })
            .transform(function (result, value, key) {
            _.forEach(value, function (item, k) {
                result[k] = result[k] || _.zipObject(_this.groups(), _.map(_this.groups(), function () { return _this.opts.sumBy({}, {}); }));
                result[k][key] = item;
            });
        }, {})
            .mapValues(function (values, key) { return ({
            values: Object.values(values),
            field: _this._fields[key]
        }); })
            .values()
            .value();
        return res;
    };
    Comparison.prototype.total = function () {
        var _this = this;
        return this._groups.mapValues(function (val) { return val.reduce(_this.opts.sumBy, {}); }).value();
    };
    Comparison.timeseries = function (dateField, format) {
        if (format === void 0) { format = 'YYYY-MM'; }
        return function (item) { return moment(item[dateField]).format(format); };
    };
    return Comparison;
}());
export { Comparison };
//# sourceMappingURL=comparison.js.map