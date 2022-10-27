import Select, {DefaultOptionType} from 'antd/lib/select';
import React from 'react';

import {CommonSelectType} from '../type';
const {Option} = Select;

export default (props: {
  defaultValue?: string;
  style?: React.CSSProperties;
  onChange?:
    | ((value: string, option: DefaultOptionType | DefaultOptionType[]) => void)
    | undefined;
  data?: CommonSelectType[];
}) => {
  const {data, ...otherProps} = props;
  const options = (data || []).map((item) => (
    <Option key={item.id} value={item.id}>
      {item.text}
    </Option>
  ));
  options.unshift(<Option value="">请选择</Option>);

  return <Select {...props}>{options}</Select>;
};
