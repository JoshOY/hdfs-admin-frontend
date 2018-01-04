/**
 * @author joshoy
 * Created on 2017/10/23
 */

import React from 'react';
// import P from 'prop-types';
// import c from 'classnames';
import { observer, inject } from 'mobx-react';
import _ from 'lodash';

// import the core library.
import ReactEchartsCore from 'echarts-for-react/lib/core';
// then import echarts modules those you have used manually.
import echarts from 'echarts/lib/echarts';
import 'echarts/lib/chart/bar';
import 'echarts/lib/chart/line';
import 'echarts/lib/component/tooltip';

@inject('chartStore')
@observer
class TransactionCreditChart extends React.Component {

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.props.chartStore.fetchMonthlyCreditAsync();
  }

  componentWillUnmount() {
  }

  _getOption = () => {
    const creditData = this.props.chartStore.creditData;
    return {
      tooltip : {
        trigger: 'axis',
        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
          type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
        }
      },
      legend: {
        data:['总收支', '贷', '借']
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true,
      },
      yAxis : [
        {
          type : 'value'
        }
      ],
      xAxis : [
        {
          type: 'category',
          axisTick: {show: false},
          data: creditData.length ?
            creditData.filter((row) => row.direction === 1).map((row) => row.date) : [],
        }
      ],
      series : [
        {
          name:'收入',
          type:'bar',
          stack: '总量',
          label: {
            normal: {
              show: false,
            }
          },
          data: creditData.length ?
            creditData.filter((row) => row.direction === 1).map((row) => row.amount) : [],
        },
        {
          name:'支出',
          type:'bar',
          stack: '总量',
          label: {
            normal: {
              show: false,
              position: 'left'
            }
          },
          data: creditData.length ?
            creditData.filter((row) => row.direction === -1).map((row) => -1 * row.amount) : [],
        },
        {
          name: '当月收支',
          type: 'line',
          /*
          label: {
            normal: {
              show: false,
              position: 'inside'
            }
          },
          */
          // yAxisIndex: 1,
          data: (() => {
            const income = creditData.filter((row) => row.direction === 1).map((row) => row.amount);
            const outcome = creditData.filter((row) => row.direction === -1).map((row) => -1 * row.amount);
            const ret = _.cloneDeep(income).map((amount, idx) => amount + outcome[idx]);
            return ret;
          })(),
        },
      ]
    };
  };

  render() {
    return (
      <div className="app-transaction-credit-chart-wrapper">
        <h1>每月借贷概览</h1>
        <ReactEchartsCore
          style={{ height: '600px' }}
          echarts={echarts}
          option={this._getOption()}
        />
      </div>
    );
  }

}

export default TransactionCreditChart;
