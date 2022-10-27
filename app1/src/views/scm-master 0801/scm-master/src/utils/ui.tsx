import Select, {DefaultOptionType} from 'antd/lib/select';
import React from 'react';

import {CommonSelectType, DealInfo} from '@src/components/type';
import {mockBeginDate} from '@src/config';

import {getLocaleDateString, isInDealDay, isSameDay} from './date';

const {Option} = Select;

/**
 * 获取Select的option选项
 * @param data
 * @param options
 * @returns
 */
export function getOptions(
  data: CommonSelectType[],
  options: {
    isAddDefault?: boolean;
  } = {
    isAddDefault: true,
  },
) {
  const optionEles = (data || []).map((item, index) => (
    <Option key={item.id + '_' + index} value={item.id}>
      {item.text}
    </Option>
  ));

  if (options?.isAddDefault) {
    optionEles.unshift(
      <Option key="novalue" value="">
        请选择
      </Option>,
    );
  }

  return optionEles;
}

/**
 * 计算当天的deal信息
 */
export function calculateDeelInfo(dealData: DealInfo[], timespan: number) {
  const dealInfo = {
    firstDealId: '',
    isStart: false,
    dealCount: 0, // 因deal扣减的库存
  };
  (dealData || []).forEach((item) => {
    if (isSameDay(item.startDate, timespan)) {
      if (!dealInfo.firstDealId) {
        dealInfo.firstDealId = item.id;
      }
      dealInfo.isStart = true;
    }
    if (isInDealDay(item, timespan)) {
      dealInfo.dealCount += item.count;
    }
  });

  return dealInfo;
}

/**
 * 获取运输方式类型
 * @param type
 * @returns 'air' | 'sea' | undefined
 */
export function getTransferType(type: string) {
  if (!type) {
    return;
  }
  if (type.includes('空运')) {
    return 'air';
  }
  if (type.includes('海运')) {
    return 'sea';
  }

  return;
}
