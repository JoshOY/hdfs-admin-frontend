import React from 'react';
import {observer} from 'mobx-react';
// import G2 from '@antv/g2';
import DataSet from '@antv/data-set';
import { Chart, Coord, Axis, Legend, Tooltip, Geom, Label } from 'bizcharts';

const colorMap = {
  'Free space': '#33CC33',
  'Used space': 'rgb(246,146,50)',
};

@observer
class DiskSpacePieChart extends React.Component {

  constructor(props) {
    super(props);
    this.dv = null;
    this.cols = {
      percent: {
        formatter: val => {
          val = (val * 100) + '%';
          return val;
        }
      }
    }
  }

  componentWillMount() {
    const demoData = [
      { item: 'Free space', count: 113.2 },
      { item: 'Used space', count: 6.8 },
    ];
    this._initChartData(demoData);
  }

  _initChartData = (data) => {
    const { DataView } = DataSet;
    this.dv = new DataView();
    this.dv.source(data).transform({
      type: 'percent',
      field: 'count',
      dimension: 'item',
      as: 'percent',
    });
  };

  render() {
    return (
      <div className="overview__disk-space-pie-chart">
        <Chart
          width={425}
          height={380}
          data={this.dv}
          scale={this.cols}
          padding={[ 20, 150, 80, 30 ]}
        >
          <Coord type="theta" radius={0.75} />
          <Axis name="percent" />
          <Legend
            position="right"
            offsetY={-window.innerHeight / 2 + 120}
            offsetX={-100}
          />
          <Tooltip
            showTitle={false}
            itemTpl='<li><span style="background-color:{color};" class="g2-tooltip-marker"></span>{name}: {value}</li>'
          />
          <Geom
            type="intervalStack"
            position="percent"
            color={['item', (item) => { return colorMap[item]; }]}
            tooltip={['item*percent*count', (item, percent, count) => {
              // console.log(count);
              // const count = item.point.count;
              percent = (percent * 100).toFixed(2) + '% (' + count + ' GB)';
              return {
                name: item,
                value: percent
              };
            }]}
            style={{lineWidth: 1,stroke: '#fff'}}
          >
            <Label
              content='percent'
              formatter={(val, item) => {
                // console.log(item);
                return item.point.item + ': ' + item.point.count + ' GB';
              }}
            />
          </Geom>
        </Chart>
      </div>
    );
  }
}

export default DiskSpacePieChart;
