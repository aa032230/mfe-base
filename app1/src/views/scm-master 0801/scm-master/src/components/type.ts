/**
 * 到货信息
 */
export interface ArriveItem {
  id: string;
  /**
   * 时间：2022-03-02
   */
  date: string;
  /**
   * 数量
   */
  count: number;
  /**
   * 单据状态：未结 - outstanding ，海运已交货 - sea ,空运已交货 - air，未通过审核的备货计划 - applying
   */
  status: string;
  /**
   * 可否优先出运 - 展示为闪电标记
   */
  isPriorityShipping?: boolean;

  /**
   * 是否质检通过 - 展示为三角不带问号
   */
  isQC?: boolean;

  /**
   * 没有预计交货日期或者没有正确匹配出运计划 - 展示为三角带问号
   */
  isMatched?: boolean;
}

export interface FlightInfo {
  date: string;
  type: string; // air or ship
}
[];

export interface DealInfo {
  id: string;
  startDate: string;
  holdDays: number;
  count: number;
}

export interface StockInfo {
  page: number;
  pageCount: number;
  searchWeeks: number;
  analysisWarehouseProperty: {
    overseaLocationPutOnSalePeriod: number;
    shipPeriod: number;
    shipmentType: string;
  }[];
  /**
   * 航班信息
   */
  flightData: FlightInfo[];
  stockItems: StockItem[];
}

export interface StockItem {
  /**
   * sku名称
   */
  skuName: string;

  /**
   * 基础消耗ps
   */
  basePs: number;
  /**
   * rps
   */
  rps: number;
  /**
   * mps
   */
  mps: number;
  /**
   * saleEventps
   */
  saleEventPs: number;
  /**
   * -1周
   */
  week1: number;
  /**
   * -2周
   */
  week2: number;
  /**
   * -3周
   */
  week3: number;
  /**
   * -4周
   */
  week4: number;
  /**
   * shipped
   */
  shipped: number;
  /**
   * orderPedding
   */
  orderPedding: number;
  /**
   * sellable
   */
  sellable: number;
  /**
   * turnover
   */
  turnover: number;
  /**
   * 周递减系数map
   */
  weekForecastMap: Record<string, number>;
  /**
   * 初始货物数量
   */
  baseCount: number;
  /**
   * 到货数据
   */
  arriveData: ArriveItem[];

  /**
   * 航班信息
   */
  flightData: FlightInfo[];

  /**
   * 促销信息
   */
  dealData: DealInfo[];

  /**
   * 接口附加数据
   */
  extendInfo?: any;
}

/**
 * 请求参数
 */
export interface FetchParams {
  /**
   * 分析仓id
   */
  analysisWarehouseId: number;
  /**
   * 销售组id
   */
  salesGroupId: number;
  /**
   * 渠道id
   */
  channelIds?: number[];
  /**
   * 品牌id
   */
  brandIds: string[];
  /**
   * 型号id
   */
  modelIds?: string[];
  /**
   * 型系id
   */
  modelGroupIds?: string[];
  /**
   * 是否采购 YES|NO
   */
  isPurchase?: boolean;
  /**
   * 是否PANEU YES|NO
   */
  isPanEu?: boolean;
  /**
   * sku編碼
   */
  sku?: string;
  /**
   * 平台产品编码
   */
  platformSku?: string;
  /**
   * 周数
   */
  weekNum: number;
  /**
   * 当前页
   */
  currentPage: number;
  /**
   * 每页条数
   */
  pageSize: number;
}

/**
 * Select数据提供
 */
export interface CommonSelectType {
  id: string;
  text: string;
}

export interface BaseData {
  brands: CommonSelectType[];
  warehouses: CommonSelectType[];
  saleAreas: CommonSelectType[];
  shops: CommonSelectType[];
  models: CommonSelectType[];
  stockInfo?: StockInfo;
}

export interface APIS {
  fetchSkuStock: (params: FetchParams) => Promise<void>;
  updateStockItem: (stockItem: StockItem) => void;
  updateStockItemAsync: (sellerSku: string) => Promise<void>;
  openDrawer: (config: DrawerConfig) => void;
  closeDrawer: () => void;
  openModal: (config: DrawerConfig) => void;
  closeModal: () => void;
  saveAllForecastData: () => Promise<any>;
}

/**
 * 搜索表单基础
 */
export interface SearchForm extends BaseData {
  apis: APIS;
}

export interface Root extends BaseData {
  stockInfo?: StockInfo;
  isLoading: boolean;
}

/**
 * 红绿线数据提供
 */
export interface WrapedCompType {
  apis: APIS;
  root: Root;
}

export interface ShippingScheduleVo {
  shippingType: number; //运输方式 1空运 2海运 3铁运
  cutOffDate: number; //截仓日期 ETW
  predictShippingDate: number; //出运日期 ETD
  predictArrivalDate: number; //渠道ETA
  logisticsArrivalDate: number; //物流ETA
  latestOrderDate: number; //最晚下单日期
  country: string; //目的国
}

export interface DealDetail {
  analysisWarehouseId: 27;
  boxAmount: 40; //整箱数
  salesGroupId: 24; //销售区域id
  salesGroupName: 'AG-123';
  channelId: 0; //渠道id 可选
  channelName: 'aaaa';
  skuId: 1; //skuId
  skuCode: 'CA1231313123'; //"sku编码"
  productSeriesId: 1; //型系id
  productSeries: 'aaa'; //型系
  platformSku: ''; //平台sku
  productionCycle: 30; //生产周期
  suppilerList: {
    suppilerId: number;
    suppilerName: string;
    moq: number;
    boxAmount: number;
  }[];

  pos: {
    id: string;
    name: string;
    status: string;
    count: number;
    deliveryDate: string;
  }[];

  shippingScheduleVoList: ShippingScheduleVo[];

  activitiesList: {
    id: number;
    channelId: number; //渠道id
    channelName: string; //渠道名称
    forecastGoodsId: number; //预测商品id
    type: number; //活动类型
    predictionAmount: number; //活动数量
    price: string;
    days: number; //活动持续天数
    startDate: number; //活动开始时间
    endDate: number; //活动结束时间
    status: string; //活动状态
    remark: string;
    createTime: number;
    updateTime: number;
    delFlag: number;
    createUserId: number;
    updateUserId: number;
    createUserName: string; //创建人
  }[];
}

export interface DrawerConfig {
  title?: string | React.ReactElement;
  visible?: boolean;
  children?: React.ReactElement | React.FC | React.Component | any; // todo
  width?: number;
  content?: () => void;
}

export interface SkuChartDataItem {
  week: string;
  value: string;
}

export interface SkuChartData {
  previousYear: SkuChartDataItem[];
  lastYear: SkuChartDataItem[];
  thisYear: SkuChartDataItem[];
  thisYearForcast: SkuChartDataItem[];
}

export interface SkuForcast {
  saleInfo: SkuChartData;
  saleInfoAvg: SkuChartData;
}

/**
 * 预测准确率table
 */
export interface ForcastResult {
  id: string;
  /**
   * 周字符串
   */
  week: string;
  /**
   * 预测销量
   */
  forcastSaleCount: string;
  /**
   * 实际销量
   */
  realSaleCount: string;
  /**
   * 准确率
   */
  rate: string;

  /**
   * 原因
   */
  reason?: string;

  /**
   * 备注信息
   */
  memo?: string;
}
