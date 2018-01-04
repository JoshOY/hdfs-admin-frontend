import React from 'react';
import P from 'prop-types';
import { observer, inject } from 'mobx-react';
import { Link } from 'react-router-dom';
import { Layout, Menu, Breadcrumb, Icon } from 'antd';

import TransactionCreditChart from './charts/TransactionCreditChart';

const { Header, Content, Footer, Sider } = Layout;
// const SubMenu = Menu.SubMenu;

@inject('chartStore')
@observer
class MainView extends React.Component {

  constructor(props) {
    super(props);
    this.state = { collapsed: false, };
  }

  _onCollapse = (collapsed) => {
    console.log(collapsed);
    this.setState({ collapsed });
  };

  render() {
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Sider
          collapsible
          collapsed={this.state.collapsed}
          onCollapse={this._onCollapse}
        >
          <div className="navigator-logo" />
          <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
            <Menu.Item key="1">
              <Link to="/">
                <Icon type="pie-chart" />
                <span>分析图表</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="2">
              <Link to="/relations">
                <Icon type="contacts" />
                <span>人员关系分析</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="3">
              <Link to="/selftrading">
                <Icon type="dot-chart" />
                <span>自账户资金转移分析</span>
              </Link>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout>
          <Header style={{ background: '#fff', padding: 0 }} />
          <Content style={{ margin: '0 16px' }}>
            <Breadcrumb style={{ margin: '16px 0' }}>
              <Breadcrumb.Item>资产分析工具</Breadcrumb.Item>
              <Breadcrumb.Item>分析图表</Breadcrumb.Item>
            </Breadcrumb>
            <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
              <TransactionCreditChart />
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>
            艾匀科技©2017 Created by JoshOY
          </Footer>
        </Layout>
      </Layout>
    );
  }

}

export default MainView;
