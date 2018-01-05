import React from 'react';
import { observer, inject } from 'mobx-react';
import { Breadcrumb, Icon, Button, Input } from 'antd';

const ButtonGroup = Button.Group;
const Search = Input.Search;

import style from './FSView-style.styl';

@observer
class FSPanel extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className={style.FSPanel}>
        {/* Breadcrumb for navigation */}
        <div className={style.BreadcrumbWrapper}>
          <span>Current directory:</span>
          <Breadcrumb className={style.Breadcrumb}>
            <Breadcrumb.Item key="/">
              <Icon type="hdd" />
              <span>HDFS</span>
            </Breadcrumb.Item>
            <Breadcrumb.Item key="/">
              <span>user</span>
            </Breadcrumb.Item>
            <Breadcrumb.Item key="/">
              <span>hduser</span>
            </Breadcrumb.Item>
          </Breadcrumb>
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
