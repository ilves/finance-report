import * as _ from 'lodash';

export function groupBy (data: Object[], key: string) {
  return _.groupBy(data, (item: Object) => {
    return item[key];
  });
};

export function sum (data: Object[], key: string) {
  if (!data.length) {
    return {}
  }
  return data.reduce((obj, item) => {
    obj[key] += item[key];
    return obj;
  })
};

export function compare (data: Object, groupKey: string) {
  const groupsToCompare = _.chain(Object.keys(data))
    .flatten()
    .uniqBy(groupKey)
    .map(groupKey)
    .value();
  const result = _.chain(data)
    .map(item => _.keyBy(item, groupKey))
    .map((item: Object) => {
      _.difference(groupsToCompare, Object.keys(item))
        .forEach((group: string) => {
          item[group] = {
            [groupKey]: group
          };
        });
      return item;
    })
    .value();

  console.log(result)
}
