import {
  Comparison
} from './../src/comparison';

const txs = [
  tx('2019-03-01', 'Intress', 15),
  tx('2019-02-01', 'Intress', 25),
  tx('2019-01-01', 'Intress', 35),
  tx('2019-01-01', 'Põhiosa', 55),
  tx('2019-02-01', 'Põhiosa', 65),
  tx('2019-03-01', 'Põhiosa', 75),
  tx('2019-02-01', 'Viivis',  12),
  tx('2019-01-15', 'Intress', 10),
]

describe('Comparison', () => {
  describe('compares', () => {
    it('should work', () => {
      const report = new Comparison(txs, {
        groupBy: Comparison.timeseries('date'),
        valueBy: 'desc',
        amountReducer: (items) => items.reduce((sum, cur) => sum + cur.value, 0)
      });
      expect(report.groups()).toEqual([
        "2019-01",
        "2019-02",
        "2019-03",
      ]);
      expect(report.fields).toEqual([
        "Intress",
        "Põhiosa",
        "Viivis",
      ]);
    });
  });
});

function tx (date, desc, value) {
  return { date, desc, value };
};
