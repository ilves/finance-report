import * as _ from 'lodash'
import * as moment from 'moment'

export class Comparison {
  data: _.CollectionChain<Object>;
  opts: ComparisonOpts;
  report: Object;
  _groups: _.ObjectChain<_.Dictionary<Object[]>>
  _value: {};
  _fields: Object[];

  constructor (data: Object[], opts: ComparisonOpts) {
    this.data = _.chain(data)
    this.opts = Object.assign({}, opts)
    this.report = {}
    this._groups = this.data.groupBy(this.opts.groupBy)
    this._fields = []
    this._value = this.calculateValue()
  }

  groups () {
    return this._groups.keys().sort().value()
  }

  value () {
    return this._value
  }

  fields () {
    return this._fields
  }

  calculateValue () {
    const groupBy = (item) => {
      const key = this.opts.valueBy(item)
      const pos = _.findIndex(this._fields, (i) => _.isEqual(i, key))
      const res = pos >= 0 ? pos : this._fields.push(key) - 1
      return res
    }

    const res = this._groups
      .mapValues(values => {
        return _.chain(values).groupBy(groupBy).mapValues(val => val.reduce(this.opts.sumBy, {})).value()
      })
      .transform((result, value, key) => {
        _.forEach(value, (item, k) => {
          result[k] = result[k] || _.zipObject(this.groups(), _.map(this.groups(), () => this.opts.sumBy({}, {})))
          result[k][key] = item
        })
      }, {})
      .mapValues((values, key) => ({
        values: Object.values(values),
        field: this._fields[key]
      }))
      .values()
      .value()

    return res
  }

  total () {
    return this._groups.mapValues(val => val.reduce(this.opts.sumBy, {})).value()
  }

  static timeseries (dateField: string, format: string = 'YYYY-MM') {
    return (item) => moment(item[dateField]).format(format)
  }
}

export interface ComparisonOpts {
  sumBy: any;
  valueBy: any | string;
  groupBy: Function;
}
