import * as _ from 'lodash';
import * as moment from 'moment';

export class Comparison {
  data: Object[];
  opts: ComparisonOpts;
  report: Object;
  fields: String[];

  constructor (data: Object[], opts: ComparisonOpts) {
    this.data = data;
    this.opts = Object.assign({}, opts);
    this.calculate();
  }

  calculate () {
    this.fields = Object.keys(_.groupBy(this.data, this.opts.valueBy));
    this.report = _.chain(this.data)
      .groupBy(this.opts.groupBy)
      .mapValues(values => _.groupBy(values, this.opts.valueBy))
      .value();
    this.report = this.fields.reduce((all, field) => {
      all[field] = this.groups().map(group => this.opts.amountReducer(this.report[group][field] || []));
      return all;
    }, {});
  }

  groups () {
    return Object.keys(this.report).sort();
  }

  values () {
    return Object.values(this.report)
  }

  static timeseries (dateField: string, format: string = 'YYYY-MM') {
    return (item) => moment(item[dateField]).format(format);
  }
}

export interface ComparisonOpts {
  amountReducer: Function;
  valueBy: Function | string;
  groupBy: Function;
}