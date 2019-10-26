import {
  groupBy,
  sum,
  compare
} from './../src';

const txs = [
  tx('2019-01-01', 'Intress', 15),
  tx('2019-02-01', 'Intress', 25),
  tx('2019-03-01', 'Intress', 35),
  tx('2019-01-01', 'Põhiosa', 55),
  tx('2019-02-01', 'Põhiosa', 65),
  tx('2019-03-01', 'Põhiosa', 75),
  tx('2019-02-01', 'Viivis',  12),
]

describe('lib', () => {
  describe('group-by', () => {
    it('should work', () => {
      expect(groupBy([], null)).toEqual({});
      expect(groupBy([{foo: 'bar'}], 'foo')).toEqual({bar: [{foo: 'bar'}]});
      expect(groupBy([{foo: 'bar'}, {foo: 'rab'}], 'foo')).toEqual({bar: [{foo: 'bar'}], rab: [{foo: 'rab'}]});
      expect(groupBy([{foo: 'bar'}, {foo: 'bar'}], 'foo')).toEqual({bar: [{foo: 'bar'}, {foo: 'bar'}]});
    });
  });
  describe('sum', () => {
    it('should work', () => {
      expect(sum([], null)).toEqual({});
      expect(sum([{foo: 'bar', value: 5}], 'value')).toEqual({ foo: 'bar', value: 5 });
      expect(sum([{foo: 'bar', value: 5}, {foo: 'bar', value: 10}], 'value')).toEqual({foo: 'bar', value: 15});
    });
  });
  describe('compare', () => {
    it('should work', () => {
      compare(groupBy(txs, 'date'), 'desc');
    });
  });
});

function tx (date, desc, value) {
  return { date, desc, value };
};
