import React from 'react';
import {observer} from 'mobx-react';
import { Row, Col } from 'antd';
import _ from 'lodash';

import DiskSpacePieChart from './DiskSpacePieChart.jsx';
import style from './OverviewView-style.styl';
import {inject} from "mobx-react/index";

@inject((allStores) => ({
  mainStore: allStores.mainStore,
}))
@observer
class OverviewView extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="overview-layout">
        <h1>DFS Overview</h1>
        <Row>
          <Col span={8} className={style.RightBorderSplit}>
            <h3>Space Usage Status</h3>
            <DiskSpacePieChart />
          </Col>
          <Col span={16} className={style.ColLeftPadding}>
            <h3>Nodes Overview</h3>
            <div className={style.MarginTopMid}>
              <ul>
                <li>DataNode 1 (192.168.100.3): OK</li>
                <li>DataNode 2 (192.168.100.4): OK</li>
                <li>DataNode 3 (192.168.100.5): OK</li>
                <li>DataNode 4 (192.168.100.6): OK</li>
              </ul>
            </div>
          </Col>
        </Row>

      </div>
    );
  }
}

export default OverviewView;
