import React from 'react';
import { observer, inject } from 'mobx-react';
import { Breadcrumb, Icon, Button, Input } from 'antd';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import _ from 'lodash';

const ButtonGroup = Button.Group;
const Search = Input.Search;

import style from './FSView-style.styl';


@withRouter
@inject((allStores) => ({
  fileSysStore: allStores.fileSysStore,
}))
@observer
class FSPanel extends React.Component {

  constructor(props) {
    super(props);
  }

  shouldComponentUpdate(nextProps) {
    let flag = false;
    flag = flag || (!_.eq(
      nextProps.location.search,
      this.props.location.search
    ));
    console.log(flag);
    return flag;
  }

  _renderBreadcrumb = (currentPath) => {
    if (currentPath === '/') {
      return (
        <Breadcrumb className={style.Breadcrumb}>
          <Breadcrumb.Item key="/">
            <Link to="/fs">
              <Icon type="hdd" />
              <span>HDFS /</span>
            </Link>
          </Breadcrumb.Item>
        </Breadcrumb>
      );
    } else {
      let paths = _.drop(currentPath.split('/'));
      if (_.last(paths) === '') {
        paths = _.dropRight(paths);
      }
      const doms = paths.map((directoryName, idx) => {
        const absPath = '/' + paths.slice(0, idx + 1).join('/')
        return (
          <Breadcrumb.Item key={absPath}>
            <a href={'/fs?path=' + absPath}>{directoryName}</a>
          </Breadcrumb.Item>
        );
      });
      return (
        <Breadcrumb className={style.Breadcrumb}>
          <Breadcrumb.Item key="/">
            <a href="/fs?path=/">
              <Icon type="hdd" />
              <span>HDFS</span>
            </a>
          </Breadcrumb.Item>
          {doms}
        </Breadcrumb>
      );
    }
  };

  render() {
    return (
      <div className={style.FSPanel}>
        {/* Breadcrumb for navigation */}
        <div className={style.BreadcrumbWrapper}>
          <span>Current directory:</span>
          {this._renderBreadcrumb(this.props.fileSysStore.currentPath)}
        </div>
        <div>
          {/* Buttons panel */}
          <div className={style.ButtonsContainer}>
            <ButtonGroup>
              <Button type="default">
                <Icon type="left" />
                <span>Go Back</span>
              </Button>
              <Button type="default" disabled>
                <Icon type="right" />
                <span>Go Forward</span>
              </Button>
              <Button type="default">
                <Icon type="up" />
                <span>Parent Folder</span>
              </Button>
            </ButtonGroup>
            <span className={style.HorizontalSpaceHolder} />
            <Button type="primary">
              <Icon type="cloud-upload-o" />
              <span>Upload File</span>
            </Button>
            <span className={style.HorizontalSpaceHolder} />
            <Button type="default">
              <Icon type="reload" />
              <span>Refresh</span>
            </Button>
          </div>
          {/* Search files */}
          <div className={style.SearchInputWrapper}>
            <Search
              placeholder="Search file name..."
              style={{ width: 250 }}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default FSPanel;
