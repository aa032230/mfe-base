import {Switch} from 'antd';
import {
  CaretUpOutlined,
  MinusCircleOutlined,
  PlusCircleOutlined,
  ThunderboltFilled,
  WarningFilled,
  WarningOutlined,
} from '@ant-design/icons';
import React, {useState} from 'react';

import styles from './index.less';

export default (props: {
  defaultValue?: number;
  onChange: (key: string, val: any) => void;
}) => {
  const {defaultValue = 0, onChange} = props;

  const [val, setVal] = useState(defaultValue);

  const handleClick = (plus: number) => {
    const currentVal = val + plus;
    if (currentVal >= 0 && currentVal < 2) {
      setVal(currentVal);
      onChange('size', currentVal === 0 ? 'normal' : 'lg');
    }
  };

  const handleHideArriveClick = (isHide: boolean) => {
    onChange('hideArriveItem', isHide);
  };

  return (
    <div className={`scm-top-tools ${styles.container}`}>
      <div className="left">
        <MinusCircleOutlined onClick={() => handleClick(-1)} />
        <PlusCircleOutlined onClick={() => handleClick(1)} />
        <span>
          显示备货预测：
          <Switch
            size="small"
            onChange={(val) => {
              onChange('showForecast', val);
            }}
          />
        </span>
        <span>
          隐藏在途单据：
          <Switch size="small" onChange={handleHideArriveClick} />
        </span>
      </div>
      <div className="right">
        <span>
          <ThunderboltFilled /> - 优先出运
        </span>
        <span>
          <CaretUpOutlined /> - 未质检（已过期）
        </span>
        <span>
          <WarningFilled /> - 无预计交货日期或未匹配出运计划
        </span>
        <span className="badge" data-color="red">
          - 未结单据
        </span>
        <span className="badge" data-color="blue">
          - 海运已交货
        </span>
        <span className="badge" data-color="grey">
          - 空运已交货
        </span>
        <span className="badge" data-color="green">
          - 未通过审核的备货计划
        </span>
        <span className="badge" data-color="default">
          - 默认单据
        </span>
      </div>
    </div>
  );
};
