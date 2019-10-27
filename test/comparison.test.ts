import * as _ from 'lodash'
import {
  Comparison
} from './../src/comparison'

const txs = [
  tx('2019-03-01', 'Intress', 15, 'stock'),
  tx('2019-02-01', 'Intress', 25, 'stock'),
  tx('2019-01-01', 'Intress', 35, 'stock'),
  tx('2019-01-01', 'Põhiosa', 55, 'stock'),
  tx('2019-02-01', 'Põhiosa', 65, 'stock'),
  tx('2019-03-01', 'Põhiosa', 75, 'stock'),
  tx('2019-02-01', 'Viivis', 12, 'stock'),
  tx('2019-01-15', 'Intress', 10, 'bond')
]

describe('Comparison', () => {
  describe('compares', () => {
    it('should work', () => {
      const report = new Comparison(txs, {
        groupBy: Comparison.timeseries('date'),
        valueBy: ({ desc }) => ({ desc }),
        sumBy: (a, b) => {
          a.value = (a.value || 0) + b.value
          return a
        }
      })
      expect(report.groups()).toEqual([
        '2019-01',
        '2019-02',
        '2019-03'
      ])
      expect(report.fields()).toEqual([
        { desc: 'Intress' },
        { desc: 'Põhiosa' },
        { desc: 'Viivis' }
      ])
      expect(report.value()).toEqual([
        {
          values: [
            {
              value: 45
            },
            {
              value: 25
            },
            {
              value: 15
            }
          ],
          field: { desc: 'Intress' }
        },
        {
          values: [
            {
              value: 55
            },
            {
              value: 65
            },
            {
              value: 75
            }
          ],
          field: { desc: 'Põhiosa' }
        },
        {
          values: [
            {
              value: NaN
            },
            {
              value: 12
            },
            {
              value: NaN
            }
          ],
          field: { desc: 'Viivis' }
        }
      ])
      expect(report.total()).toEqual({
        '2019-01': {
          value: 100
        },
        '2019-02': {
          value: 102
        },
        '2019-03': {
          value: 90
        }
      })
    })
    it('should group', () => {
      const report = new Comparison(txs, {
        groupBy: Comparison.timeseries('date'),
        valueBy: ({ group, desc }) => ({ group, desc }),
        sumBy: (a, b) => {
          a.value = (a.value || 0) + b.value
          return a
        }
      })
      expect(report.fields()).toEqual([
        { desc: 'Intress', group: 'stock' },
        { desc: 'Põhiosa', group: 'stock' },
        { desc: 'Viivis', group: 'stock' },
        { desc: 'Intress', group: 'bond' }
      ])
    })
  })
})

function tx (date, desc, value, group) {
  return { date, desc, value, group }
}
