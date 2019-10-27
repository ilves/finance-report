import * as _ from 'lodash';
export declare class Comparison {
    data: _.CollectionChain<Object>;
    opts: ComparisonOpts;
    report: Object;
    _groups: _.ObjectChain<_.Dictionary<Object[]>>;
    _value: {};
    _fields: Object[];
    constructor(data: Object[], opts: ComparisonOpts);
    groups(): string[];
    value(): {};
    fields(): Object[];
    calculateValue(): never[];
    total(): {
        [x: string]: Object;
    };
    static timeseries(dateField: string, format?: string): (item: any) => string;
}
export interface ComparisonOpts {
    sumBy: any;
    valueBy: any | string;
    groupBy: Function;
}
//# sourceMappingURL=comparison.d.ts.map