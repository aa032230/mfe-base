/**
 * 每条线顶部的table区域
 */

import {Input, Select, Switch} from 'antd';
import React from 'react';

import ModalForcast from '../ModalForcast';
import ModalForcastResult from '../ModalForcastResult';
import {APIS, StockItem} from '../type';
import styles from './index.less';

export default (props: {stockItem: StockItem; apis: APIS}) => {
  const {
    stockItem,
    apis: {updateStockItem, openDrawer},
  } = props;

  const {
    skuName,
    rps,
    mps,
    saleEventPs,
    week1,
    week2,
    week3,
    week4,
    shipped,
    orderPedding,
    sellable,
    turnover,
    baseCount,
    basePs,
    extendInfo,
  } = stockItem || {};

  const {salesForecastInfoList} = extendInfo;

  const handleForcastModal = () => {
    openDrawer({
      title: '预测曲线',
      width: 800,
      children: (
        <ModalForcast
          sku={skuName}
          salesForecastInfoList={salesForecastInfoList}
        />
      ),
    });
  };

  // 预测准确率弹框
  const handleForcastResult = () => {
    openDrawer({
      title: '预测准确率',
      width: 800,
      children: <ModalForcastResult sku={skuName} />,
    });
  };

  return (
    <table className={styles.lineTop}>
      <thead>
        <tr>
          <th>型系</th>
          <th>SKU</th>
          <th>Base PS</th>
          <th>RPS</th>
          <th>MPS</th>
          <th>Sale Event PS</th>
          <th>-1</th>
          <th>-2</th>
          <th>-3</th>
          <th>-4</th>
          <th>Shipped</th>
          <th>Order Pending</th>
          <th>Sellable</th>
          <th>计总Turnover</th>
          <th>
            <button className="ant-btn ant-btn-sm" onClick={handleForcastModal}>
              查看预测曲线
            </button>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>型号</td>
          <td>{skuName}</td>
          <td>
            <Input
              type="number"
              style={{width: 60}}
              value={basePs}
              step="1"
              min="0"
              onChange={(e) =>
                updateStockItem({
                  ...stockItem,
                  basePs: parseInt(e.target.value),
                })
              }
            />
          </td>
          <td>{rps}</td>
          <td>{mps}</td>
          <td>{saleEventPs}</td>
          <td>{week1}</td>
          <td>{week2}</td>
          <td>{week3}</td>
          <td>{week4}</td>
          <td>{shipped}</td>
          <td>{orderPedding}</td>
          <td>{sellable}</td>
          <td>{turnover}</td>
          <td>
            <button
              className="ant-btn ant-btn-sm"
              onClick={handleForcastResult}
            >
              查看预测准确率
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  );
};
