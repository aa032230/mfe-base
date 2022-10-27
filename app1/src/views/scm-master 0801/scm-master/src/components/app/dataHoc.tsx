import {Drawer, Modal} from 'antd';
import React, {useEffect, useReducer, useState} from 'react';

import {shippingTypeArr} from '@src/config';
import {oneDay} from '@src/const';
import useDrawer from '@src/hocs/useDrawer';
import {
  fetchBrands,
  fetchModels,
  fetchSaleAreas,
  fetchShops,
  fetchWarehouses,
} from '@src/service';
import {fetchData} from '@src/service/fetch';
import {
  calculateWeekIndex,
  getLocaleDateString,
  getSearchStartDateStr,
  isOverDate,
} from '@src/utils/date';
import {getTransferType} from '@src/utils/ui';

import {
  CommonSelectType,
  FetchParams,
  StockInfo,
  StockItem,
  WrapedCompType,
} from '../type';
import {SCMContext} from './context';

/**
 * 计算单条线上的航班离当天的距离
 * // 空运取analysisWarehouseProperty.shipmentType="空运"的
 * // analysisWarehouseProperty.shipPeriod+analysisWarehouseProperty.overseaLocationPutOnSalePeriod+lineInfo.turnoverInfo.orderCycle+lineInfo.turnoverInfo.productCycle+lineInfo.turnoverInfo.airSafeStockDays+lineInfo.turnoverInfo.bufferDay
 * @param type 货运类型：海运|空运
 * @param turnoverInfo 线上的turnover信息
 * @returns
 */
const calcShipDiffDay = (
  type: string,
  turnoverInfo: any,
  analysisWarehouseProperty: any,
) => {
  const targetAnalysisWarehouseProperty = analysisWarehouseProperty.find(
    (item: any) => item.shipmentType === type,
  );
  return (
    (targetAnalysisWarehouseProperty?.shipPeriod || 0) +
    (targetAnalysisWarehouseProperty?.overseaLocationPutOnSalePeriod || 0) +
    (turnoverInfo?.orderCycle || 0) +
    (turnoverInfo?.productCycle || 0) +
    ((type === '空运'
      ? turnoverInfo?.airSafeStockDays
      : turnoverInfo?.seaSafeStockDays) || 0) +
    (turnoverInfo?.bufferDay || 0)
  );
};

/**
 * 转化单条线的数据，返回制定格式
 * @param item
 * @returns
 */
function formatedLineItem(
  item: any,
  analysisWarehouseProperty: any,
  searchWeeks: number,
) {
  const {weekStr} = calculateWeekIndex();
  // 计算-1,-2,-3，-4的值
  const weekMap = {} as any;
  if (item?.salesHisAvg?.length) {
    item.salesHisAvg.forEach((item: any) => {
      const {weekNum, avgSalesVolume} = item;
      const diff = parseInt(weekNum) - parseInt(weekStr);
      weekMap[diff] = avgSalesVolume;
    });
  }

  const airShipDiffDay = calcShipDiffDay(
    '空运',
    item.turnoverInfo,
    analysisWarehouseProperty,
  );
  const seaShipDiffDay = calcShipDiffDay(
    '海运',
    item.turnoverInfo,
    analysisWarehouseProperty,
  );

  // 线上需要标记的航班/船运数组
  const lineFlightData = [
    {
      date: getLocaleDateString(new Date().getTime() + oneDay * airShipDiffDay),
      type: 'air',
    },
    {
      date: getLocaleDateString(new Date().getTime() + oneDay * seaShipDiffDay),
      type: 'sea',
    },
  ];

  const searchStartDate = getSearchStartDateStr();

  // 补足数据，不存在的补成跟basePs一致，不然变更数据时不好控制
  const weekForecastMap = {} as any;
  item.salesForecastInfoList.forEach((forecastItem: any) => {
    const {forecastTime, forecastQty} = forecastItem;
    weekForecastMap[forecastTime] = forecastQty;
  });
  let startTime = new Date(searchStartDate).getTime();
  const endTime = startTime + (searchWeeks || 20) * 7 * oneDay;
  while (startTime < endTime) {
    const thisWeekStr = calculateWeekIndex(new Date(startTime)).weekStr;
    if (!weekForecastMap[thisWeekStr]) {
      weekForecastMap[thisWeekStr] = item.basePs;
    }
    startTime += oneDay * 7;
  }

  const arriveData = item.convertBillInfo.map((convertBillItem: any) => {
    const isPassed = isOverDate(convertBillItem.predictArrivalDate);
    const date = isPassed
      ? searchStartDate
      : convertBillItem.predictArrivalDate;
    return {
      date,
      count: convertBillItem.qty,
      isQC: convertBillItem.QCStatus === 'YES', // todo 这里的值没返回，质检会标记三角形
      isPriorityShipping: '', // todo 这里的值没有，优先出运会标记闪电符号
      // 状态控制颜色,未结单据-红色，海运已交货-蓝色，空运已交货-灰色，未通过审核的备货计划-绿色，其他-虚线红
      status: getTransferType(convertBillItem.shippingType),
    };
  });

  return {
    skuName: item.skuCode,
    basePs: item.basePs,
    rps: item.rps,
    mps: item.mps,
    saleEventPs: item.saleEventPs,
    week1: weekMap[-1] || '',
    week2: weekMap[-2] || '',
    week3: weekMap[-3] || '',
    week4: weekMap[-4] || '',
    shipped: item.shippedQty,
    orderPedding: item.pendingQty,
    sellable: item.sellableQty,
    turnover: item.totalTurnover,
    baseCount: item.totalStockQty,
    weekForecastMap,
    arriveData,
    dealData: item.lineDetail.activitiesList.map((activeItem: any) => {
      return {
        startDate: activeItem.startDate,
        holdDays: activeItem.days,
        count: activeItem.predictionAmount,
      };
    }),
    flightData: lineFlightData,
    // 下面是附加的其他数据
    extendInfo: item,
  };
}

/**
 * 后端返回的数据格式化
 * @param data
 */
function formatedSkuStockInfoData(data: any, searchWeeks: number) {
  const {current, total, records} = data;
  const {
    analysisWarehouseProperty,
    shippingSchedule, // 原始航运信息
    lineInfo,
  } = records;

  const flightData = shippingSchedule.map((item: any) => {
    return {
      type: (shippingTypeArr as any)[item?.transportProperty?.dicValue]?.name,
      date: item?.cutOffDate, // todo 这里使用哪个date:截仓日期? 预计出运日期? 预计到货日期?
    };
  });

  const stockItems = lineInfo.map((item: any) =>
    formatedLineItem(item, analysisWarehouseProperty, searchWeeks),
  );

  const stockInfo = {
    page: current,
    pageCount: total,
    analysisWarehouseProperty,
    searchWeeks: searchWeeks || 20,
    flightData,
    stockItems,
  } as StockInfo;

  console.log('转化后的主数据', stockInfo);

  return stockInfo;
}

export default (WrapedComp: React.FC) => {
  return useDrawer((props: any) => {
    const {
      openDrawer,
      closeDrawer,
      openModal,
      closeModal,
      drawerConfig,
      modalConfig,
    } = props;

    const [brands, setBrands] = useState<CommonSelectType[]>([]);
    const [warehouses, setWarehouses] = useState<CommonSelectType[]>([]);
    const [saleAreas, setSaleAreas] = useState<CommonSelectType[]>([]);
    const [shops, setShops] = useState<CommonSelectType[]>([]);
    const [models, setModels] = useState<CommonSelectType[]>([]);
    const [searchParams, setSeachParams] = useState<FetchParams>();

    const [isLoading, setIsLoading] = useState<boolean>(false);

    /**
     * 主数据
     */
    const [stockInfo, setStockInfo] = useState<StockInfo>();

    // 请求基础数据
    const fetchCommonData = async () => {
      const [brandsVal, warehousesVal, saleAreasVal, shopsVal, modelsVal] =
        await Promise.allSettled([
          fetchBrands(),
          fetchWarehouses(),
          fetchSaleAreas(),
          fetchShops(),
          fetchModels(),
        ]);

      if (brandsVal.status === 'fulfilled') {
        setBrands(brandsVal.value);
      }

      if (warehousesVal.status === 'fulfilled') {
        setWarehouses(warehousesVal.value);
      }

      if (saleAreasVal.status === 'fulfilled') {
        setSaleAreas(saleAreasVal.value as CommonSelectType[]);
      }

      if (shopsVal.status === 'fulfilled') {
        setShops(shopsVal.value as CommonSelectType[]);
      }

      if (modelsVal.status === 'fulfilled') {
        setModels(modelsVal.value as CommonSelectType[]);
      }
    };

    // 获取主数据
    const fetchSkuStock = async (params: FetchParams) => {
      setSeachParams(params as any);
      setIsLoading(true);
      const data = await fetchData(
        '/lenkor-sms/stockTool/queryStockToolList',
        params as unknown as Record<string, unknown>,
        'POST',
      );
      const formatedData: StockInfo = formatedSkuStockInfoData(
        data,
        params.weekNum,
      );

      setIsLoading(false);
      setStockInfo(formatedData);
    };

    // 修改系数等操作时，临时保存数据并反馈到线上
    const updateStockItem = (stockItem: StockItem) => {
      const index = stockInfo?.stockItems.findIndex(
        (item) => item.skuName === stockItem.skuName,
      ) as number;
      stockInfo?.stockItems.splice(index, 1, stockItem);
      const newStockInfo = {
        ...stockInfo,
      } as StockInfo;
      setStockInfo(newStockInfo);
    };

    /**
     * 保存系数和basePs值
     * @returns
     */
    const saveAllForecastData = async () => {
      const params = stockInfo?.stockItems.map((item) => {
        return {
          skuName: item.skuName,
          basePs: item.basePs,
          weekForecastMap: item.weekForecastMap,
        };
      });

      const resp = await fetchData(
        '/lenkor-sms/stockTool/saveAllForecastData',
        {
          data: params,
        },
        'POST',
      );

      return resp;
    };

    /**
     * 根据sku更新一条线的数据
     * @param sellerSku
     */
    const updateStockItemAsync = async (skuName: string) => {
      if (!stockInfo?.stockItems?.length) {
        return;
      }

      const resp = await fetchData(
        '/lenkor-sms/stockTool/updateStockItem',
        {
          skuName,
        },
        'POST',
      );

      const newItem = formatedLineItem(
        resp,
        stockInfo?.analysisWarehouseProperty,
        (searchParams as FetchParams).weekNum,
      );
      updateStockItem(newItem);
    };

    useEffect(() => {
      fetchCommonData();
    }, []);

    const apis = {
      fetchSkuStock,
      updateStockItem,
      updateStockItemAsync,
      openDrawer,
      closeDrawer,
      openModal,
      closeModal,
      saveAllForecastData,
    };

    const root = {
      brands,
      warehouses,
      saleAreas,
      shops,
      models,
      stockInfo,
      isLoading,
    };

    const {title, visible, children, width, content} = drawerConfig;
    const {
      title: modalTitle,
      visible: modalVisible,
      children: modalChildren,
      width: modalWidth,
    } = modalConfig;

    return (
      <SCMContext.Provider value={{apis, root}}>
        <WrapedComp
        // {...props}
        />
        <Drawer
          destroyOnClose={true}
          width={width}
          title={title}
          placement="right"
          onClose={closeDrawer}
          visible={visible}
        >
          {children}
        </Drawer>
        <Modal
          destroyOnClose={true}
          title={modalTitle}
          centered
          visible={modalVisible}
          footer={null}
          width={modalWidth}
          onCancel={closeModal}
        >
          {modalChildren}
        </Modal>
      </SCMContext.Provider>
    );
  });
};
