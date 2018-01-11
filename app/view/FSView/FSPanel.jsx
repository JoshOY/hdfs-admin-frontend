import React from 'react';
import { observer, inject } from 'mobx-react';
import { Breadcrumb, Icon, Button, Input, Upload, Popover, message } from 'antd';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import _ from 'lodash';

const ButtonGroup = Button.Group;
const Search = Input.Search;

import style from './FSView-style.styl';
import ApiUtil from "app/utils/api-util";

const getUploadProps = (self, options) => ({
  name: 'file',
  action:  `/api/fs/uploadFile?dst=${options.dst}`,
  onChange: (info) => {
    if (info.file.status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (info.file.status === 'done') {
      message.success(`${info.file.name} file uploaded successfully`);
      self.props.fileSysStore.fetchDirectoryAsync(
        self.props.fileSysStore.currentPath
      );
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
});

const renderMkdirContent = (self) => {
  return (
    <div>
      <div>
        <label htmlFor="new-folder-name-input">
          Enter new folder name:
        </label>
        <Input
          id="new-folder-name-input"
          size="small"
          onChange={self._handleNewFolderNameChange}
          value={self.state.createFolderName}
        />
      </div>
      <div style={{ marginTop: '10px' }}>
        <Button
          type="primary"
          size="small"
          onClick={self._createNewFolder}
        >
          Create
        </Button>
      </div>
    </div>
  );
};

@withRouter
@inject((allStores) => ({
  fileSysStore: allStores.fileSysStore,
}))
@observer
class FSPanel extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      createFolderPopoverVisible: false,
      createFolderName: '',
    };
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

  _handleVisibleChange = (visible) => {
    console.log('visible =', visible);
    this.setState({
      createFolderPopoverVisible: visible,
    });
  };

  _handleNewFolderNameChange = (ev) => {
    this.setState({
      createFolderName: ev.target.value,
    });
  };

  _createNewFolder = async () => {
    const response = await ApiUtil.tokenPost(
      '/api/fs/mkdir',
      { path: this.props.fileSysStore.currentPath + '/' + this.state.createFolderName }
    );
    if (response.errCode) {
      message.error('Create folder failed!');
      throw new Error(response);
    }
    // if success
    message.success('Create folder success.');
    await this.props.fileSysStore.fetchDirectoryAsync(
      this.props.fileSysStore.currentPath
    );
  };

  render() {
    const uploadOptions = {
      dst: this.props.fileSysStore.currentPath + '/',
    };
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
              <a href={this.props.fileSysStore.parentDirectoryPath ?
                `${this.props.fileSysStore.parentDirectoryPath}` : ''
              }>
                <Button type="default" disabled={!this.props.fileSysStore.parentDirectoryPath}>
                  <Icon type="up" />
                  <span>Parent Folder</span>
                </Button>
              </a>
            </ButtonGroup>
            <span className={style.HorizontalSpaceHolder} />
            <Upload {...getUploadProps(this, uploadOptions)}>
              <Button type="primary">
                <Icon type="cloud-upload-o" />
                <span>Upload File</span>
              </Button>
            </Upload>
            <span className={style.HorizontalSpaceHolder} />
            <Popover
              content={renderMkdirContent(this)}
              title="Create new folder"
              trigger="click"
              visible={this.state.createFolderPopoverVisible}
              onVisibleChange={this._handleVisibleChange}
            >
              <Button type="primary">
                <Icon type="folder-add" />
                <span>Create New Folder</span>
              </Button>
            </Popover>
            <span className={style.HorizontalSpaceHolder} />
            <Button type="default">
              <Icon type="reload" />
              <span>Refresh</span>
            </Button>
          </div>
        </div>
      </div>
    );
  }
}

export default FSPanel;
