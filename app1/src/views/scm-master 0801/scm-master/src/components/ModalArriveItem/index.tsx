import {Button, Input, Popconfirm, Popover, message} from 'antd';
import React, {useContext, useEffect, useState} from 'react';

import {fetchData} from '@src/service/fetch';
import {
  getLocaleDateString,
  getSearchStartDateStr,
  isOverDate,
} from '@src/utils/date';

import {SCMContext} from '../app/context';
import styles from './index.less';

interface ConvertBillItem {
  billType: string;
  billAbbr: string;
  billNo: string;
  qty: number;
  QCStatus: string;
  endWarehouseId: string;
  endWarehouseName: string;
  predictArrivalDate: string;
  logisticsArrivalDate: string;
  shippingType: string;
  billStatus: string;
}

export default (props: {
  date: number;
  skuName: string;
  onEditCallback: () => void;
  onDeleteCallback: () => void;
}) => {
  const {skuName} = props;
  const {root, apis} = useContext(SCMContext);

  const {date, onEditCallback, onDeleteCallback} = props;
  const [editVisible, setEditVisible] = useState(false);
  const [editLoading, setEditLoading] = useState(false);

  const {stockInfo} = root;
  if (!stockInfo) {
    return null;
  }
  const convertBillInfo: ConvertBillItem[] = stockInfo.stockItems.find(
    (item) => item.skuName === skuName,
  )?.extendInfo.convertBillInfo;

  const dateStr = getLocaleDateString(date);
  const searchStartDate = getSearchStartDateStr();
  const isBeginDate = dateStr === searchStartDate;

  // 获取出当天的数据，如果是第一天的话，则过滤出所有之前的数据
  const filterDataList = convertBillInfo.filter((item) => {
    if (item.predictArrivalDate === dateStr) {
      return true;
    }
    if (isBeginDate && isOverDate(item.predictArrivalDate)) {
      return true;
    }

    return false;
  });

  console.log('渲染ModalArriveItem', convertBillInfo);

  if (!convertBillInfo) {
    return null;
  }

  const handleDeleteClick = async (id: string) => {
    const res = await fetchData(
      '/lenkor-sms/deleteBillQty',
      {
        billNo: id,
      },
      'POST',
    );
    if (res) {
      message.success('删除成功');
      onDeleteCallback && onDeleteCallback();
    }
  };

  const handleEditQty = async (
    id: string,
    e: React.MouseEvent<HTMLElement, MouseEvent>,
  ) => {
    const val = (e.target as any).parentElement.parentElement.querySelector(
      'input',
    ).value;
    setEditLoading(true);

    const res = await fetchData(
      '/lenkor-sms/updateBillQty',
      {
        billNo: id,
        qty: val,
      },
      'POST',
    );
    setEditLoading(false);
    if (res) {
      setEditVisible(false);
      message.success('保存成功');
      onEditCallback && onEditCallback();
    }
  };

  const renderTable = () => {
    const trs = (filterDataList || []).map((item) => {
      // 到达明细改数量判断：(单据类型 = ’备货计划‘ | 转仓计划 ) && 单据状态 === NEW_CREATE
      const canEdit =
        ['备货计划', '转仓计划'].includes(item.billType) &&
        item?.billStatus === 'NEW_CREATE';
      return (
        <tr key={item.billNo}>
          <td>{item.billType}</td>
          <td>{'todo 在途状态'}</td>
          <td>{item.endWarehouseName}</td>
          <td>
            {/* todo 写上链接 */}
            <a href="" target="_blank">
              {item.billNo}
            </a>
          </td>
          <td>{item.billStatus}</td>
          <td>
            {canEdit ? (
              <Popover
                content={
                  <div className="popover-form">
                    数量：
                    <Input
                      type="number"
                      width={80}
                      defaultValue={item.qty}
                      min="0"
                    />
                    <Button
                      loading={editLoading}
                      onClick={(e) => handleEditQty(item.billNo, e)}
                      className="ant-btn ant-btn-primary"
                      style={{marginTop: '12px'}}
                    >
                      保存
                    </Button>
                  </div>
                }
                title="编辑数量"
                trigger="click"
                visible={editVisible}
                onVisibleChange={(newVisible) => setEditVisible(newVisible)}
              >
                <span className="spanQty" data-edit="true">
                  {item.qty}
                </span>
              </Popover>
            ) : (
              <span className="spanQty">{item.qty}</span>
            )}
          </td>
          <td>{item.predictArrivalDate}</td>
          <td>{item.logisticsArrivalDate}</td>
          <td>{'todo 优先出运'}</td>
          <td>{item.shippingType}</td>
          <td>{'todo 供应商'}</td>
          <td>{'todo 供应商交货日期'}</td>
          <td>{item.QCStatus}</td>
          <td>
            {canEdit ? (
              <Popconfirm
                placement="topLeft"
                title="确认删除该项"
                onConfirm={() => handleDeleteClick(item.billNo)}
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
            ) : null}
          </td>
        </tr>
      );
    });
    return (
      <table className={styles.tableContainer} style={{marginTop: '20px'}}>
        <thead>
          <tr>
            <th>单据类型</th>
            <th>在途状态</th>
            <th>目的仓库</th>
            <th>单据号</th>
            <th>单据状态</th>
            <th>数量</th>
            <th>物流ETA</th>
            <th>渠道ETA</th>
            <th>优先出运日期</th>
            <th>运输方式</th>
            <th>供应商</th>
            <th>供应商交货日期</th>
            <th>质检状态</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>{trs}</tbody>
      </table>
    );
  };

  return <div>{renderTable()}</div>;
};
