import React from 'react';
import P from 'prop-types';
import { observer, inject } from 'mobx-react';
import { Link } from 'react-router-dom';
import { Layout, Menu, Breadcrumb, Icon } from 'antd';

import HadoopLogoImg from 'app/static/1000px-Hadoop_logo.png';

const { Header, Content, Footer, Sider } = Layout;
// const SubMenu = Menu.SubMenu;


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
          <div className="navigator-logo">
            <img
              src={HadoopLogoImg}
              alt="hadoop-logo"
            />
          </div>
          <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
            <Menu.Item key="1">
              <Link to="/">
                <Icon type="pie-chart" />
                <span>System Overview</span>
              </Link>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout>
          <Header style={{ background: '#fff', padding: 0 }} />
          <Content style={{ margin: '0 16px' }}>
            <Breadcrumb style={{ margin: '16px 0' }}>
              <Breadcrumb.Item>File System</Breadcrumb.Item>
              <Breadcrumb.Item>Overview</Breadcrumb.Item>
            </Breadcrumb>
            <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
              <p>Placeholder</p>
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>
            Created by JoshOY
          </Footer>
        </Layout>
      </Layout>
    );
  }

}

export default MainView;
