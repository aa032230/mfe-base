import {Popconfirm, message} from 'antd';
import React, {useContext} from 'react';

import {shippingTypeArr} from '@src/config';
import {fetchData} from '@src/service/fetch';
import {getLocaleDateString} from '@src/utils/date';

import {SCMContext} from '../app/context';
import ModalDealEdit from '../ModalDealEdit';
import ModalStockUp from '../ModalStockUp';
import ModalTransferStock from '../ModalTransferStock';
import {
  APIS,
  DealDetail,
  DrawerConfig,
  ShippingScheduleVo,
  StockItem,
} from '../type';

export default (props: {date: number; skuName: string}) => {
  const {date, skuName} = props;
  const {root, apis} = useContext(SCMContext);
  const {stockInfo} = root;
  const stockItem = stockInfo?.stockItems.find(
    (item) => item.skuName === skuName,
  );
  if (!stockItem) {
    return null;
  }

  const {extendInfo} = stockItem;
  const {lineDetail, warehouseInfo, salesGroupId} = extendInfo;
  const {id: analysisWarehouseId, name: analysisWarehouseName} = warehouseInfo;

  if (!lineDetail) {
    return null;
  }

  const {
    suppilerList,
    activitiesList,
    shippingScheduleVoList,
    productionCycle,
  } = lineDetail as DealDetail;

  /**
   * 新增备货
   * @param item
   * @param e
   */
  const handleStockupClick = (
    item: ShippingScheduleVo,
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    apis.openModal({
      title: '新增备货计划',
      width: 560,
      children: <ModalStockUp skuName={skuName} item={item} apis={apis} />,
    });
  };

  /**
   * 点击转仓
   * @param item
   * @param e
   */
  const handleTransferStockClick = (
    item: ShippingScheduleVo,
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    apis.openModal({
      title: '转仓',
      width: 560,
      // children: <ModalTransferStock skuName={skuName} item={item} apis={apis} />,
    });
  };

  // 新增销售活动
  const handleAddDealClick = () => {
    apis.openModal({
      title: '编辑',
      width: 560,
      children: <ModalDealEdit skuName={skuName} apis={apis} />,
    });
  };

  // 删除销售活动
  const handleDeleteDealClick = async (id: number) => {
    const res = await fetchData(
      `/lenkor-sms/sales/activities/deleteSalesActivities/${id}`,
      {},
      'POST',
    );
    if (res) {
      message.success('删除成功');
      apis.updateStockItemAsync(skuName);
    }
  };

  // 渲染供应商table
  const renderSupplierTable = () => {
    const trs = suppilerList.map((item) => {
      return (
        <tr key={item.suppilerId}>
          <td>{item.suppilerName}</td>
          <td>{item.boxAmount}</td>
          <td>{item.moq}</td>
        </tr>
      );
    });
    return (
      <table>
        <thead>
          <tr>
            <th>供应商</th>
            <th>整箱数</th>
            <th>MOQ</th>
          </tr>
        </thead>
        <tbody data-length={suppilerList?.length || 0}>{trs}</tbody>
      </table>
    );
  };

  // const renderPoTable = () => {
  //   const {pos} = dealDetail;
  //   const trs = (pos || []).map((item) => {
  //     return (
  //       <tr key={item.id}>
  //         {/* <td>
  //           <input type="radio" value={item.id} name="slcPo" />
  //         </td> */}
  //         <td>{item.name}</td>
  //         <td>{item.status}</td>
  //         <td>{item.count}</td>
  //         <td>{item.deliveryDate}</td>
  //       </tr>
  //     );
  //   });
  //   return (
  //     <table style={{marginTop: '20px'}}>
  //       <thead>
  //         <tr>
  //           {/* <th>选择</th> */}
  //           <th>PO</th>
  //           <th>状态</th>
  //           <th>数量</th>
  //           <th>预计交货时间</th>
  //         </tr>
  //       </thead>
  //       <tbody>{trs}</tbody>
  //     </table>
  //   );
  // };

  const renderFlightTable = () => {
    const trs = (shippingScheduleVoList || []).map((item, index) => {
      return (
        <tr key={'运输表单' + index}>
          <td>{(shippingTypeArr as any)[item.shippingType]?.text}</td>
          <td>{getLocaleDateString(item.cutOffDate)}</td>
          <td>{getLocaleDateString(item.predictShippingDate)}</td>
          <td>{getLocaleDateString(item.logisticsArrivalDate)}</td>
          <td>{getLocaleDateString(item.predictArrivalDate)}</td>
          <td>{getLocaleDateString(item.latestOrderDate)}</td>
          <td>{item.country}</td>
          <td>
            <button
              type="button"
              style={{margin: '0 4px'}}
              className="ant-btn ant-btn-sm"
              onClick={(e) => handleStockupClick(item, e)}
            >
              备货
            </button>
            <button
              type="button"
              className="ant-btn ant-btn-sm"
              onClick={(e) => handleTransferStockClick(item, e)}
            >
              转仓
            </button>
          </td>
        </tr>
      );
    });
    return (
      <table style={{marginTop: '20px'}}>
        <thead>
          <tr>
            <th>运输方式</th>
            <th>ETW</th>
            <th>ETD</th>
            <th>物流 ETA</th>
            <th>渠道 ETA</th>
            <th>最晚下单日期</th>
            <th>目的国</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody data-length={shippingScheduleVoList?.length || 0}>{trs}</tbody>
      </table>
    );
  };

  const renderDealTable = () => {
    const thisDayDeals = (activitiesList || []).filter((item) => {
      return item.startDate >= date && item.endDate <= date;
    });
    const trs = thisDayDeals.map((item) => {
      return (
        <tr key={item.id}>
          <td>{analysisWarehouseName}</td>
          <td>{salesGroupId}</td>
          <td>{'todo: 销售渠道'}</td>
          <td>{item.predictionAmount}</td>
          <td>{item.days}</td>
          {/* todo:活动类型定义 */}
          <td>{item.type}</td>
          <td>{item.price}</td>
          <td>{getLocaleDateString(item.startDate)}</td>
          <td>{getLocaleDateString(item.endDate)}</td>
          <td>{item.remark}</td>
          <td>{item.status}</td>
          <td>{item.createUserName}</td>
          <td>
            <Popconfirm
              placement="topLeft"
              title="确认删除该项"
              onConfirm={() => handleDeleteDealClick(item.id)}
              okText="Yes"
              cancelText="No"
            >
              <button
                type="button"
                className="ant-btn  ant-btn-sm ant-btn-primary ant-btn-dangerous"
              >
                删除
              </button>
            </Popconfirm>
          </td>
        </tr>
      );
    });
    return (
      <table>
        <thead>
          <tr>
            <th>分析仓库</th>
            <th>销售区域</th>
            <th>销售渠道</th>
            <th>数量</th>
            <th>天数</th>
            <th>类型</th>
            <th>活动价格</th>
            <th>开始时间</th>
            <th>结束时间</th>
            <th>备注</th>
            <th>状态</th>
            <th>创建人</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody data-length={thisDayDeals.length}>{trs}</tbody>
      </table>
    );
  };

  return (
    <div>
      <p>生产周期（天）：{productionCycle}</p>
      <div className="sp">
        <h3>供应商信息：</h3>
      </div>
      {renderSupplierTable()}
      {/* <div className="sp">
      <h3>PO信息：</h3>
    </div>
    {renderPoTable()} */}
      <div className="sp">
        <h3>航班信息：</h3>
      </div>
      {renderFlightTable()}
      <div className="sp">
        <h3>促销信息：</h3>
        <button
          type="button"
          className="ant-btn  ant-btn-sm ant-btn-primary"
          onClick={handleAddDealClick}
        >
          新增
        </button>
      </div>
      {renderDealTable()}
    </div>
  );
};
