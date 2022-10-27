import * as echarts from 'echarts';
import React, {useEffect, useRef, useState} from 'react';

import {fetchSkuForcast} from '@src/service';

import {SkuChartData, SkuForcast} from '../type';

export default (props: {
  sku: string;
  salesForecastInfoList: {
    forecastTime: string;
    forecastType: string;
    forecastQty: string;
  }[];
}) => {
  const {sku} = props;

  const chartSkuRef = useRef<HTMLDivElement>(null);
  const chartSkuAvgRef = useRef<HTMLDivElement>(null);
  const [detail, setDetail] = useState<SkuForcast>();

  const renderChart = (
    container: HTMLDivElement | null,
    data: SkuChartData,
    title: string,
  ) => {
    if (!container || !data) {
      return;
    }

    const oldChart = echarts.getInstanceByDom(container);
    if (oldChart && !oldChart.isDisposed) {
      oldChart.dispose();
    }

    // 基于准备好的dom，初始化echarts实例
    const chart = echarts.init(container);

    const {previousYear, lastYear, thisYear, thisYearForcast} = data;
    const xAxis = {
      type: 'category',
      data: previousYear.map((item) => item.week),
    };

    const thisYearForcastData = thisYearForcast.map((item) => item.value);
    thisYearForcastData.splice(0, 0, thisYear.slice(-1)[0].value);
    for (let i = 0; i < thisYear.length - 1; i++) {
      thisYearForcastData.splice(0, 0, '-');
    }

    const series = [
      {
        data: previousYear.map((item) => item.value),
        type: 'line',
        name: '前年',
      },
      {
        data: lastYear.map((item) => item.value),
        type: 'line',
        name: '去年',
      },
      {
        data: thisYear.map((item) => item.value),
        type: 'line',
        name: '今年',
        markPoint: {
          data: [
            {
              name: '当前周',
              value: '当前周',
              xAxis: thisYear.length - 1,
              yAxis: thisYear.slice(-1)[0].value,
            },
          ],
        },
      },
      {
        data: thisYearForcastData,
        type: 'line',
        name: '今年预计',
      },
    ];

    // 指定图表的配置项和数据
    const option = {
      title: {
        text: title,
      },
      tooltip: {
        trigger: 'axis',
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true,
      },
      legend: {
        data: series.map((item) => item.name),
      },
      xAxis,
      yAxis: {
        type: 'value',
      },
      series,
    };

    // 使用刚指定的配置项和数据显示图表。
    chart.setOption(option);
  };

  useEffect(() => {
    fetchSkuForcast(sku).then((res) => {
      setDetail(res as any);
    });
  }, []);

  useEffect(() => {
    if (!detail) {
      return;
    }

    const {saleInfo, saleInfoAvg} = detail;
    renderChart(chartSkuRef?.current, saleInfo, '销量预计');
    renderChart(chartSkuAvgRef?.current, saleInfoAvg, '加权销量预计');
  }, [detail]);

  return (
    <div>
      <div
        ref={chartSkuRef}
        style={{width: '100%', height: '400px', marginBottom: '40px'}}
      ></div>
      <div
        ref={chartSkuAvgRef}
        style={{
          width: '100%',
          height: '400px',
          borderTop: '1px dashed #ddd',
          paddingTop: '32px',
        }}
      ></div>
    </div>
  );
};
