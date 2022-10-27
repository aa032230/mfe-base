import {Button, Form, Input, Select, message} from 'antd';
import React, {useContext, useState} from 'react';

import {pageSize, trueOrFalse} from '@src/config';
import {getOptions} from '@src/utils/ui';

import {SCMContext} from '../app/context';
import {FetchParams} from '../type';
import styles from './index.less';

export default () => {
  const {root, apis} = useContext(SCMContext);
  const [searchParams, setSearchParams] = useState<FetchParams>();
  const {brands, warehouses, saleAreas, shops, models, stockInfo} = root;

  const [saveLoading, setSaveLoading] = useState(false);

  // todo 转多选
  const onFinish = (values: FetchParams) => {
    console.log('表单查询: ', values);
    apis.fetchSkuStock(values).then(() => {
      setSearchParams({
        ...values,
        pageSize: pageSize,
        currentPage: 1,
      });
    });
  };

  const handleSaveAllForecastData = async (
    e: React.MouseEvent<HTMLElement, MouseEvent>,
  ) => {
    setSaveLoading(true);
    const resp = await apis.saveAllForecastData();
    if (resp) {
      message.success('系数保存成功');
    }
    setSaveLoading(false);
  };

  const goTo = (
    num: number,
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
  ) => {
    e.preventDefault();
    if (!stockInfo || !searchParams) {
      return;
    }
    const {page, pageCount} = stockInfo;
    if (page === 1 && num === -1) {
      return;
    }
    if (pageCount <= page) {
      return;
    }

    const params = {
      ...searchParams,
      currentPage: page + num,
    };

    apis.fetchSkuStock(params).then(() => {
      setSearchParams(params);
    });
  };

  return (
    <Form
      // initialValues={{remember: true}}
      autoComplete="off"
      layout="inline"
      size="small"
      onFinish={onFinish}
      className={`scm-search-form ${styles.searchForm}`}
    >
      <Form.Item
        label="分析仓库"
        name="analysisWarehouseId"
        rules={[{required: true, message: '仓库必选'}]}
      >
        <Select defaultValue="" style={{width: 100}} onChange={() => undefined}>
          {getOptions(warehouses)}
        </Select>
      </Form.Item>

      {/* // todo 这是哪个 */}
      <Form.Item label="销售区域" name="salesGroupId">
        <Select style={{width: 100}} onChange={() => undefined}>
          {getOptions(saleAreas)}
        </Select>
      </Form.Item>

      {/* // todo 这是哪个 */}
      <Form.Item label="销售渠道" name="salesGroupId">
        <Select style={{width: 100}} onChange={() => undefined}>
          {getOptions(saleAreas)}
        </Select>
      </Form.Item>

      <Form.Item
        label="品牌"
        name="brandIds"
        rules={[{required: true, message: '品牌必选'}]}
      >
        <Select style={{width: 100}} onChange={() => undefined}>
          {getOptions(brands)}
        </Select>
      </Form.Item>

      <Form.Item label="型号" name="modelIds">
        <Input type="text" style={{width: 100}} />
      </Form.Item>

      <Form.Item label="型系" name="modelGroupIds">
        <Input type="text" style={{width: 100}} />
      </Form.Item>

      <Form.Item label="是否采购" name="isPurchase">
        <Select style={{width: 100}} onChange={() => undefined}>
          {getOptions(trueOrFalse as any)}
        </Select>
      </Form.Item>

      <Form.Item label="IS PAN_EN" name="isPanEu">
        <Select style={{width: 100}} onChange={() => undefined}>
          {getOptions(trueOrFalse as any)}
        </Select>
      </Form.Item>

      <Form.Item label="SKU" name="sku">
        <Input type="text" style={{width: 100}} />
      </Form.Item>

      <Form.Item label="MSKU" name="msku">
        <Input type="text" style={{width: 100}} />
      </Form.Item>

      <Form.Item
        label="显示周数"
        name="weekNum"
        rules={[{required: true, message: '周数必填'}]}
      >
        <Input
          type="number"
          min={1}
          step={1}
          style={{width: 100}}
          defaultValue="20"
        />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          查询
        </Button>

        <Button
          type="default"
          style={{margin: '0 16px'}}
          loading={saveLoading}
          onClick={(e) => {
            handleSaveAllForecastData(e);
          }}
        >
          保存
        </Button>
      </Form.Item>

      <div className="page-tool">
        <a onClick={(e) => goTo(-1, e)} title="上一页">
          prev
        </a>
        <span style={{margin: '0 8px'}}>
          {stockInfo?.page || 1}/{stockInfo?.pageCount || 1}
        </span>
        <a onClick={(e) => goTo(1, e)}>next</a>
      </div>
    </Form>
  );
};
