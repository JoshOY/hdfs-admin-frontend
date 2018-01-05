import React from 'react';
import P from 'prop-types';
import { observer, inject } from 'mobx-react';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';
import { Layout, Menu, Breadcrumb, Icon } from 'antd';
import _ from 'lodash';

import HadoopLogoImg from 'app/static/1000px-Hadoop_logo.png';

const { Header, Content, Footer, Sider } = Layout;
// const SubMenu = Menu.SubMenu;

const breadcrumbNameMap = {
  '/': 'Overview',
  '/fs': 'File Management',
};

@withRouter
@inject((allStores) => ({
  mainStore: allStores.mainStore,
}))
@observer
class MainView extends React.Component {

  constructor(props) {
    super(props);
    this.state = { collapsed: false, };
  }

  shouldComponentUpdate(nextProps) {
    const flag = !_.eq(
      nextProps.mainStore.breadcrumbPath,
      this.props.mainStore.breadcrumbPath
    );
    // console.log('this.props.mainStore.breadcrumbPath =', this.props.mainStore.breadcrumbPath[0]);
    // console.log('nextProps.mainStore.breadcrumbPath =', nextProps.mainStore.breadcrumbPath[0]);
    console.log('update flag =', flag);
    return flag;
  }

  _onCollapse = (collapsed) => {
    console.log(collapsed);
    this.setState({ collapsed });
  };

  _renderBreadcrumb = () => {
    const { location } = this.props;
    const pathSnippets = location.pathname.split('/').filter(i => i);
    const extraBreadcrumbItems = pathSnippets.map((_, index) => {
      const url = `/${pathSnippets.slice(0, index + 1).join('/')}`;
      return (
        <Breadcrumb.Item key={url}>
          <Link to={url}>
            {breadcrumbNameMap[url]}
          </Link>
        </Breadcrumb.Item>
      );
    });
    const breadcrumbItems = [(
      <Breadcrumb.Item key="HDFS">
        <Link to="/">HDFS Home</Link>
      </Breadcrumb.Item>
    )].concat(extraBreadcrumbItems);
    return breadcrumbItems;
  };

  render() {
    const { mainStore } = this.props;
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
          <Menu theme="dark" defaultSelectedKeys={['overview']} mode="inline">
            <Menu.Item key="overview">
              <Link to="/">
                <Icon type="pie-chart" />
                <span>System Overview</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="fs">
              <Link to="/fs">
                <Icon type="hdd" />
                <span>File Management</span>
              </Link>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout>
          <Header style={{ background: '#fff', padding: 0 }} />
          <Content style={{ margin: '0 16px' }}>
            <Breadcrumb style={{ margin: '16px 0' }}>
              {this._renderBreadcrumb()}
            </Breadcrumb>
            <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
              {this.props.children || 'placeholder'}
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
