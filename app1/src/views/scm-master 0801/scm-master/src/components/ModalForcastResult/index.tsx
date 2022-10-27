/**
 * 预测准确率弹框
 */

import React, {useEffect, useState} from 'react';

import {fetchDealDetail} from '@src/service';
import {fetchData} from '@src/service/fetch';

import {ForcastResult} from '../type';

interface ArriveItem {
  id: string;
  /**
   * 类型
   */
  type: string;
  /**
   * 链接
   */
  link: string;
  /**
   * 数量
   */
  count: number;
  /**
   * 预计交货日期
   */
  deliverDate: string;
  /**
   * 状态
   */
  qcStatus: string;
  /**
   * 出运日期
   */
  shipDate: string;
  /**
   * 运输方式
   */
  shipType: string;
  /**
   *
   */
  receiptsStatus: string;
}

export default (props: {sku: string}) => {
  const {sku} = props;

  const [detail, setDetail] = useState<ForcastResult[]>();

  useEffect(() => {
    fetchData('/lenkor-sms/forcastResult', {sku}, 'POST').then(
      (data: ForcastResult[]) => {
        setDetail(data);
      },
    );
  }, []);

  if (!detail) {
    return null;
  }

  const renderTable = () => {
    const trs = (detail || []).map((item) => {
      return (
        <tr key={item.id}>
          <td>{item.week}</td>
          <td>{item.forcastSaleCount}</td>
          <td>{item.realSaleCount}</td>
          <td>{item.rate}</td>
          <td>{item.reason}</td>
          <td>{item.memo}</td>
        </tr>
      );
    });
    return (
      <table style={{marginTop: '20px'}}>
        <thead>
          <tr>
            <th>周数</th>
            <th>预测销量</th>
            <th>实际销量</th>
            <th>准确率</th>
            <th>原因分类</th>
            <th>备注</th>
          </tr>
        </thead>
        <tbody>{trs}</tbody>
      </table>
    );
  };

  return <div>{renderTable()}</div>;
};
