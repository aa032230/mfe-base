import TextArea from 'antd/lib/input/TextArea';
import {Button, DatePicker, Form, Input, Select, Switch, message} from 'antd';
import React, {useState} from 'react';

import {fetchData} from '@src/service/fetch';

import {APIS} from '../type';
import styles from './index.less';

const {Option} = Select;

export default (props: {skuName: string; apis: APIS}) => {
  const {skuName, apis} = props;
  const [editLoading, setEditLoading] = useState(false);

  const onFinish = async (params: any) => {
    setEditLoading(true);
    const res = await fetchData(
      '/lenkor-sms/sales/activities/saveSalesActivities',
      params,
      'POST',
    );
    setEditLoading(false);
    if (res) {
      message.success('保存成功');
      apis.closeModal();
      apis.updateStockItemAsync(skuName);
    }
  };

  return (
    <Form
      initialValues={{remember: true}}
      autoComplete="off"
      layout="inline"
      size="small"
      onFinish={onFinish}
      className={styles.searchForm}
    >
      <Form.Item
        label="数量"
        name="predictionAmount"
        rules={[{required: true, message: '必填项'}]}
      >
        <Input type="number" style={{width: 150}} />
      </Form.Item>

      <Form.Item label="类型" name="type">
        <Select style={{width: 150}} onChange={() => undefined}>
          {/* {getOptions(shops)} */}
        </Select>
      </Form.Item>

      <Form.Item
        label="活动价格"
        name="型号"
        rules={[{required: true, message: '必填项'}]}
      >
        <Input type="number" style={{width: 150}} />
      </Form.Item>

      <div className="block">
        <Form.Item label="开始时间" name="startDate">
          <DatePicker style={{width: 150}} />
        </Form.Item>

        <Form.Item label="结束时间" name="endDate">
          <DatePicker style={{width: 150}} />
        </Form.Item>
      </div>

      <div className="block">
        <Form.Item label="备注" name="remark" style={{width: '460px'}}>
          <TextArea style={{width: '100%', height: 60}} />
        </Form.Item>
      </div>

      <div className="block" style={{textAlign: 'center'}}>
        <Button
          type="primary"
          size="middle"
          htmlType="submit"
          style={{width: '100px'}}
          loading={editLoading}
        >
          保存
        </Button>
      </div>
    </Form>
  );
};
