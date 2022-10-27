import TextArea from 'antd/lib/input/TextArea';
import {Button, DatePicker, Form, Input, Select, Switch, message} from 'antd';
import React, {useState} from 'react';

import {fetchData} from '@src/service/fetch';

import {APIS, ShippingScheduleVo} from '../type';
import styles from './index.less';

const {Option} = Select;

interface FormParams {
  forecastGoodsId: number; //商品id
  warehouseId: number;
  shippingType: number; //运输方式 1空运 2海运
  plannedOrderDate: string; //传最晚下单日期
  plannedArrivalDate: string; //计划到货时间（传渠道ETA）
  choiceQty: number; //备货数量
  remark: string; //备注
}

export default (props: {
  skuName: string;
  item: ShippingScheduleVo;
  apis: APIS;
}) => {
  const {skuName, apis} = props;
  const [editLoading, setEditLoading] = useState(false);

  const onFinish = async (params: FormParams) => {
    setEditLoading(true);
    const res = await fetchData(
      '/lenkor-sms/supplier/stockToolSaveStockPlan',
      params as any,
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
    <div>
      {/* todo 其他带出来的数据 */}
      <Form
        initialValues={{remember: true}}
        autoComplete="off"
        layout="inline"
        size="small"
        onFinish={onFinish}
        className={styles.searchForm}
      >
        <Form.Item label="目的仓库" name="warehouseId">
          <Select style={{width: 150}} onChange={() => undefined}>
            {/* todo {getOptions(shops)} */}
          </Select>
        </Form.Item>

        <Form.Item
          label="数量"
          name="choiceQty"
          rules={[{required: true, message: '必填项'}]}
        >
          <Input type="number" style={{width: 150}} />
        </Form.Item>

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
    </div>
  );
};
