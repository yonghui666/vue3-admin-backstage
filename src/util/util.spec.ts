/*
 * @Author: yonghui666
 * @Date: 2021-12-25 15:49:33
 * @LastEditors: yonghui666
 * @LastEditTime: 2022-06-10 17:22:59
 * @Description: 文件描述
 */
import { StrUtil } from './str.util';
import * as _ from 'lodash';
import * as moment from 'moment';
import { TimeUtil } from './time.util';
import { AreaList } from './area';
import { IdUtil } from './id.util';

describe('util', () => {
  it('ccc', () => {
    const def = { a: 1, ab: { a: 1, b: 2, d: { t1: 44, t2: 55 } } };
    const now = { b: 2, ab: { a: 2, c: 3 } };
    const d3 = _.defaultsDeep(now, def);
    console.log(
      '========= def',
      def,
      '======= now',
      now,
      '================ d3',
      d3,
    );

    const tO = {
      a: null,
      bY: 1,
      c: undefined,
      dY: 0,
      eY: false,
      f: NaN,
      g: '',
      h: [],
      i: {},
    };
    const tORes2 = _(tO).omitBy(_.isNil).omitBy(_.isNaN).value();
    console.log('========== tORes2', tORes2, '=========== tO', tO);

    const tORes3 = _.pickBy(tO, (value) => {
      if ([null, undefined, NaN, ''].includes(value)) return false;
      if (_.isObject(value) && _.isEmpty(value)) return false;
      return true;
    });
    console.log('========== tORes3', tORes3, '=========== tO', tO);

    const nowTime = moment().valueOf();
    console.log('========== nowTime', nowTime);
    console.log(
      '========== nowTimeStr',
      moment(nowTime).format('YYYY-MM-DD HH:mm:ss'),
    );
  });

  it('ttttt', () => {
    const nowTime = moment().valueOf();

    console.log(
      '============== ',
      TimeUtil.getNeedTime(nowTime),
      TimeUtil.getNeedTime(moment(nowTime).format()),
    );
  });

  it('AreaList', () => {
    const ccc = TimeUtil.getThanOneYear();
    console.log('===============', ccc);
  });

  it('nowtime', () => {
    const xxx = IdUtil.dateId();
    console.log('===============', xxx);
  });
});
