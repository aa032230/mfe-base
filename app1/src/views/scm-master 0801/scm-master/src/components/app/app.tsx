import React, {useContext, useEffect, useState} from 'react';

import Line from '../Line/index';
import LineTop from '../LineTop/index';
import ScaleTool from '../ScaleTool/index';
import SearchForm from '../SearchForm/index';
import TimeLine from '../TimeLine/index';
import styles from './app.less';
import {SCMContext} from './context';
import dataHoc from './dataHoc';

export default dataHoc(() => {
  const {root, apis} = useContext(SCMContext);

  const {stockInfo, isLoading, brands, warehouses, saleAreas, shops, models} =
    root;

  const [pageShowControl, setPageShowControl] = useState<{
    size: 'normal' | 'lg';
    showForecast: boolean;
    hideArriveItem: boolean;
  }>({
    size: 'normal',
    showForecast: false,
    hideArriveItem: false,
  });

  // 工具状态变化处理函数
  const onScaleToolChange = (key: string, val: any) => {
    (pageShowControl as any)[key] = val;
    setPageShowControl({
      ...pageShowControl,
    });
  };

  useEffect(() => {
    // todo 删除这一行
    apis.fetchSkuStock({} as any);
  }, []);

  // 渲染sku的库存情况
  const renderContent = () => {
    const {searchWeeks, stockItems = [], flightData} = stockInfo || {};

    if (!stockInfo || !searchWeeks || !stockItems.length) {
      return null;
    }

    console.log('render lines', stockItems);

    const lines = stockItems.map((item) => {
      return (
        <>
          <LineTop key={item.skuName + '_table'} stockItem={item} apis={apis} />
          <Line
            key={item.skuName + '_line'}
            weeks={searchWeeks}
            stockItem={item}
            size={pageShowControl.size}
            apis={apis}
          />
        </>
      );
    });

    return (
      <div
        className={`content-container`}
        data-loading={isLoading}
        data-hide-arrive-item={pageShowControl.hideArriveItem}
        data-show-forecast={pageShowControl.showForecast}
      >
        <TimeLine
          weeks={searchWeeks}
          size={pageShowControl.size}
          flightData={flightData}
        />
        {lines}
      </div>
    );
  };

  return (
    <div className={styles.container}>
      <SearchForm />
      <ScaleTool onChange={onScaleToolChange} />
      {renderContent()}
    </div>
  );
});
