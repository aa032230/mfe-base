import {CommonSelectType, DealDetail} from '@src/components/type';

import {fetchData} from './fetch';

/**
 * 获取品牌数据
 * @returns
 */
export async function fetchBrands() {
  const data: any = await fetchData('/lenkor-sms/brands');
  return (data || []).map((item: any) => ({
    id: item.dicValue,
    text: item.dicLabel,
    ...item,
  })) as CommonSelectType[];
}

/**
 * 获取销售区域
 * @returns
 */
export async function fetchSaleAreas() {
  const data: any = await fetchData('/lenkor-sms/saleAreas');
  return (data || []).map((item: any) => ({
    id: item.id,
    text: item.salesGroupName,
    ...item,
  })) as CommonSelectType[];
}

/**
 * 获取型号
 * @returns
 */
export async function fetchModels() {
  const data: any = await fetchData('/lenkor-sms/models');
  return (data || []).map((item: any) => ({
    id: item.dicValue,
    text: item.dicLabel,
    ...item,
  })) as CommonSelectType[];
}

/**
 * 获取店铺数据
 * @returns
 */
export async function fetchShops() {
  const data: any = await fetchData('/lenkor-sms/shops');
  return (data || []).map((item: any) => ({
    id: item.channelId,
    text: item.channelName,
    ...item,
  })) as CommonSelectType[];
}

/**
 * 获取库存信息
 * @returns
 */
export async function fetchWarehouses() {
  const data: any = await fetchData('/lenkor-sms/dic/selectWarehouseGroupList');
  return (data || []).map((item: any) => ({
    id: item.dicValue,
    text: item.dicLabel,
    ...item,
  })) as CommonSelectType[];
}

/**
 * 获取运输方式
 * @returns
 */
export async function fetchTransferTypes() {
  const data: any = await fetchData('/lenkor-sms/transferTypes');
  return (data || []).map((item: any) => ({
    id: item.dicValue,
    text: item.dicLabel,
    ...item,
  })) as CommonSelectType[];
}

/**
 * 获取SKU信息
 * @returns
 */
export async function fetchSkus() {
  const data: any = await fetchData('/lenkor-sms/skus');
  return data;
}

/**
 * 获取deal弹框数据
 */
export async function fetchDealDetail(params: {
  forecastGoodsId: string; //预测商品id
  clickDate: string; //选择日期
  analysisWarehouseId: string; //分析仓库id
  salesGroupId: string; //销售区域id
  channelId?: string; //渠道id 可选
  productSeriesId: string; //型系id
  skuId: string; //skuId
  platformSku: string; //平台sku
}) {
  const data: any = await fetchData('/lenkor-sms/dealDetail', params, 'POST');

  return data as DealDetail;
}

/**
 * 获取预测曲线
 */
export async function fetchSkuForcast(sku: string) {
  const data: any = await fetchData('/lenkor-sms/skuForcast', {sku}, 'POST');

  return data as DealDetail;
}
