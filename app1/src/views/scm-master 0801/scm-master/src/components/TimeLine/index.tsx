/**
 * 绘制单条线
 */

import React from 'react';

import {mockBeginDate, weekDayBegin} from '@src/config';
import {calculateWeekIndex, isSameDay} from '@src/utils/date';

import {FlightInfo} from '../type';
import styles from './index.less';

const oneDay = 24 * 60 * 60000;

export default (props: {
  /**
   * 一共展示的周数
   */
  weeks: number;
  /**
   * 尺寸
   */
  size: string;
  /**
   * 航班信息
   */
  flightData?: FlightInfo[];
}) => {
  const beginDate = mockBeginDate
    ? new Date(mockBeginDate).getTime()
    : Date.now();

  // 展示10周
  const {weeks, size, flightData} = props;

  const totalDays = weeks * 7;

  const renderOneDay = (timespan: number) => {
    const time = new Date(timespan);
    const month = time.getMonth() + 1;
    const date = time.getDate();
    const day = time.getDay();

    const {weekIndex, weekStr} = calculateWeekIndex(new Date(timespan));
    const flightItem = (flightData || []).find((item) =>
      isSameDay(item.date, timespan),
    );

    return (
      <label
        className={`timeline-item ${day === weekDayBegin ? 'week-begin' : ''}`}
      >
        <span>
          {month}/{date}
        </span>
        {flightItem && (
          <span
            className={`iconfont fligh-ico ${
              flightItem.type === 'sea' ? 'icon-chuanzhi' : 'icon-feiji1'
            }`}
          ></span>
        )}
        {/* 周字符暂时标记在周三 */}
        {day === 2 ? <span className="weektag">{weekStr}</span> : null}
      </label>
    );
  };

  const renderDays = () => {
    const labels = [];
    for (let i = 0; i < totalDays; i++) {
      labels.push(renderOneDay(beginDate + i * oneDay));
    }

    return labels;
  };

  return (
    <div className={styles.timeline} data-size={size}>
      {renderDays()}
    </div>
  );
};
