import {
  CaretRightOutlined,
  QuestionOutlined,
  ThunderboltFilled,
} from '@ant-design/icons';
import React, {useCallback, useContext} from 'react';

import {mockBeginDate, yellowRemainDays} from '@src/config';
/**
 * 绘制单条线
 */
import {
  calculateWeekIndex,
  getLocaleDateString,
  isSameDay,
  isWeekBeginDate,
} from '@src/utils/date';
import {calculateDeelInfo} from '@src/utils/ui';

import {SCMContext} from '../app/context';
import ModalArriveItem from '../ModalArriveItem';
import ModalDeal from '../ModalDeal';
import {APIS, ArriveItem, DrawerConfig, FlightInfo, StockItem} from '../type';
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
   * 线数据
   */
  stockItem: StockItem;

  apis: APIS;
}) => {
  const {root} = useContext(SCMContext);

  console.log('root data ', root);

  // 时间转化为2022-03-04格式
  const beginDateString =
    mockBeginDate || getLocaleDateString(new Date().getTime());
  const beginDate = new Date(beginDateString).getTime();

  const {weeks, size, stockItem, apis} = props;

  const {updateStockItem, updateStockItemAsync, openDrawer} = apis;

  const {
    baseCount,
    basePs,
    weekForecastMap = {},
    arriveData = [],
    flightData = [],
    dealData = [],
    extendInfo,
    skuName,
  } = stockItem || {};

  const {convertBillInfo, turnoverInfo, sellerSku} = extendInfo;

  // todo 获取安全库存天数
  const {
    // airSafeStockDays, // 空运安全天数
    seaSafeStockDays, // 海运安全天数
  } = turnoverInfo || {};

  const currentSafeStockDays = seaSafeStockDays;

  const totalDays = weeks * 7;

  const handleWeekRatioChange = (e: any, weekStr: string) => {
    const newValue = e.target.value;
    const isValidNumber = /^[\d]+$/.test(newValue);
    if (isValidNumber) {
      weekForecastMap[weekStr] = newValue;
      updateStockItem(stockItem);
    }
  };

  /**
   * 点击点时，相应事件：deal信息点击
   * @param dealInfo
   * @returns
   */
  const handleDotClick = (currentDay: number, e: any) => {
    e.preventDefault();
    const {productSeries, skuCode, platformSku} =
      stockItem.extendInfo.lineDetail;
    const title = [productSeries, skuCode, platformSku]
      .filter((item) => !!item)
      .join('-');

    openDrawer({
      title,
      width: 1000,
      children: <ModalDeal date={currentDay} skuName={skuName} />,
    });
  };

  /**
   * 相应点击arrive span的点击事件
   * @param id
   */
  const handleArriveItemClick = (currentDay: number, e: any) => {
    e.preventDefault();

    openDrawer({
      title: '在途信息明细',
      width: 1200, // 这个值控制弹框的宽度，可以自行调整
      children: (
        <ModalArriveItem
          date={currentDay}
          skuName={skuName}
          onEditCallback={() => updateStockItemAsync(sellerSku)}
          onDeleteCallback={() => updateStockItemAsync(sellerSku)}
        />
      ),
    });
  };

  // 渲染一天
  const renderOneDay = (options: {
    currentDay: number; // 当天时间：timespan格式
    currentCount: number; // 当天的数量
    currentWeekIndex: number; // 从查询时间算起，当前在查询开始时间的第几周
    currentWeek: string; // 周字符串
    currentArriveData: ArriveItem[]; // 当天的达到信息
    remainDays: number; // 剩余消耗天数
    flightItem?: FlightInfo; // 航班信息
    dealInfo: {
      firstDealId: string;
      isStart: boolean;
      dealCount: number;
    };
  }) => {
    const {
      currentDay,
      currentCount,
      currentArriveData,
      currentWeekIndex,
      currentWeek,
      remainDays,
      flightItem,
      dealInfo,
    } = options;
    const isWeekBeginDay = isWeekBeginDate(currentDay);
    const weekPs = weekForecastMap[currentWeek] || basePs;
    const weekRatio = (weekPs / basePs).toFixed(2);
    const day = new Date(currentDay).getDay();

    // 到达信息列表展示
    const arriveSpans = currentArriveData.map((item) => (
      <span
        className="badge"
        key={item.id}
        data-status={item.status || 'default'}
        data-priority={item.isPriorityShipping}
        data-qc={item.isQC}
      >
        {item.isPriorityShipping ? <ThunderboltFilled /> : null}+{item.count}
        {!item.isQC || !item.isMatched ? (
          <span className="angle" data-matched={item.isMatched}>
            <span>!</span>
          </span>
        ) : null}
      </span>
    ));

    // 当天库存展示颜色：黄色-太多了，绿色-正常，灰色-快没了，红色-已经没了
    let colorType = 'yellow';
    if (remainDays < 1) {
      colorType = 'red';
    } else if (remainDays <= currentSafeStockDays) {
      colorType = 'gray';
    } else if (remainDays <= yellowRemainDays) {
      colorType = 'green';
    }

    const dateStr = getLocaleDateString(currentDay);

    return (
      <label
        className={`timeline-item ${isWeekBeginDay ? 'week-begin' : ''}`}
        data-date={dateStr}
        data-color={colorType}
        data-day={day}
        data-deal={
          dealInfo.dealCount ? (dealInfo.isStart ? 'start' : 'normal') : 'null'
        }
        title={`${dateStr} 库存：${currentCount} ${
          dealInfo.dealCount ? '，存在促销' : ''
        }`}
      >
        {/* 每周开始的1天顶部展示扣减倍数 */}
        {isWeekBeginDay ? (
          <span className="item-top">
            <em>{weekRatio}</em>
            <input
              type="text"
              value={weekPs}
              onChange={(e) => handleWeekRatioChange(e, currentWeek)}
            />
          </span>
        ) : null}
        {flightItem ? (
          <span
            className={`iconfont fligh-ico ${
              flightItem.type === 'ship' ? 'icon-chuanzhi' : 'icon-feiji1'
            }`}
          ></span>
        ) : null}
        <span
          className="dot"
          tabIndex={1}
          onClick={(e) => handleDotClick(currentDay, e)}
        >
          {dealInfo.dealCount && dealInfo.isStart ? (
            <CaretRightOutlined />
          ) : null}
        </span>

        <span
          className="count"
          onClick={(e) => e.preventDefault()}
          data-count={currentCount}
        >
          {currentCount > 0 ? currentCount : 0}
        </span>
        <span
          className="arrive-container"
          onClick={(e) => handleArriveItemClick(currentDay, e)}
        >
          {arriveSpans}
        </span>
      </label>
    );
  };

  // 计算消耗完成的那天距离现在还有几天（算达到库存）
  const countOverDays = useCallback(
    (initialDay: number, initialCount: number, initialWeekIndex: number) => {
      let days = 0;
      let currentCount = initialCount;
      let currentWeekIndex = initialWeekIndex;
      let currentDay = initialDay + oneDay; // 从明天开始计算，看是否小于0

      while (currentCount > 0) {
        if (isWeekBeginDate(currentDay)) {
          currentWeekIndex++;
        }
        const currentWeek = calculateWeekIndex(new Date(currentDay)).weekStr;

        currentCount -= weekForecastMap[currentWeek] || basePs;

        // 扣减掉deal消耗
        const dealInfo = calculateDeelInfo(dealData, currentDay);
        currentCount -= Math.floor(dealInfo.dealCount);

        // 加上到达
        arriveData.forEach((item) => {
          if (isSameDay(item.date, currentDay)) {
            currentCount += item.count;
          }
        });

        days++;

        currentDay += oneDay;
      }

      return days;
    },
    [weekForecastMap, dealData, basePs, arriveData],
  );

  const renderDays = () => {
    const labels = [];
    let currentCount = baseCount;
    let currentWeekIndex = 0;

    for (let i = 0; i < totalDays; i++) {
      const currentDay = beginDate + i * oneDay;
      const isWeekBeginDay = isWeekBeginDate(currentDay);
      if (i !== 0 && isWeekBeginDay) {
        currentWeekIndex++;
      }

      const currentWeek = calculateWeekIndex(new Date(currentDay)).weekStr;

      // 今天到达的数量
      const currentArriveData = arriveData.filter((item) => {
        return new Date(item.date).getTime() === currentDay;
      });

      const daySaleCount = weekForecastMap[currentWeek] || basePs;
      currentCount = i === 0 ? currentCount : currentCount - daySaleCount;

      // 查询deal信息，并扣减掉
      const dealInfo = calculateDeelInfo(dealData, currentDay);
      currentCount -= dealInfo.dealCount;

      currentArriveData.forEach((item) => (currentCount += item.count));

      // 计算距离消耗完成那一天还有几天
      const remainDays = countOverDays(
        currentDay,
        currentCount,
        currentWeekIndex,
      );

      const flightItem = (flightData || []).find((item) =>
        isSameDay(item.date, currentDay),
      );

      labels.push(
        renderOneDay({
          currentDay,
          currentArriveData,
          currentCount,
          currentWeekIndex,
          currentWeek,
          flightItem,
          remainDays,
          dealInfo,
        }),
      );
    }

    return labels;
  };

  return (
    <div className={styles.timeline} data-size={size}>
      {renderDays()}
    </div>
  );
};
