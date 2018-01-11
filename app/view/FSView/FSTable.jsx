import React from 'react';
import { observer, inject } from 'mobx-react';
import { Table, Icon, Button, Popconfirm, message, Popover } from 'antd';
import filesize from 'filesize';
import moment from 'moment';

import _ from 'lodash';

// import FileSysStore from 'app/store/FileSysStore';
import ApiUtils from 'app/utils/api-util';
import RenameFilePopoverContent from './RenameFilePopoverContent.jsx';

const renderFileName = (txt, record) => {
  const filename = record.name;
  if (record.isFile === false) {
    const forwardUrl = '/fs?path=' + record.path.match(/hdfs:\/\/(.+):([0-9]+)(\/.*)/)[3];
    return (
      <span style={{ color: '#1890ff' }}>
        <a href={forwardUrl}>
          <Icon type="folder" />&nbsp;&nbsp;{filename}
        </a>
      </span>
    );
  }
  return (
    <span>
      <Icon type="file" />&nbsp;&nbsp;{filename}
    </span>
  );
};

const renderModTime = (txt, record) => {
  return (
    <span>{moment(record.modificationTime).format('YYYY-MM-DD hh:mm:ss')}</span>
  );
};

const onDeleteFile = (self, record) => async () => {
  const currentPath = self.props.fileSysStore.currentPath;
  const filename = record.name;
  const response = await ApiUtils.tokenDelete(
    '/api/fs/delete',
    {
      filePath: currentPath + '/' + filename,
    }
  );
  if (response.errCode) {
    throw new Error();
  }
  // else
  message.success(`File ${filename} removed.`);
  await self.props.fileSysStore.fetchDirectoryAsync(currentPath);
};

const onClickRename = (self, record) => async (newFileName) => {
  const oldName = self.props.fileSysStore.currentPath + '/' + record.name;
  const newName = self.props.fileSysStore.currentPath + '/' + newFileName;
  const response = await ApiUtils.tokenPut('/api/fs/rename', {
    oldName,
    newName,
  });
  if (response.errCode) {
    message.error('Rename file failed!');
    throw new Error(response);
  }
  // if success
  message.success('Rename file success.');
  await self.props.fileSysStore.fetchDirectoryAsync(self.props.fileSysStore.currentPath);
};

const renderOperations = (self) => (txt, record) => {
  const btns = [];
  let p = self.props.fileSysStore.currentPath;
  if (p[p.length - 1] !== '/') {
    p = p + '/';
  }
  if (record.isFile) {
    let link = `/api/fs/downloadFile?filename=${record.name}&dst=${p}`;
    btns.push(
      <a
        target="_blank"
        href={link}
        key="download"
      >
        <Button type="primary">
          <Icon type="download" />
        </Button>
      </a>
    );
  } else {
    btns.push(
       <Button type="primary" key="download" disabled>
          <Icon type="download" />
       </Button>
    );
  }
  btns.push(
    <Button key="info">
      <Icon type="info-circle-o" />
    </Button>
  );
  btns.push(
    <Popover
      content={<RenameFilePopoverContent onOK={onClickRename(self, record)}/>}
      trigger="click"
      key="rename"
    >
      <Button>
        <Icon type="edit" />
      </Button>
    </Popover>
  );
  btns.push(
    <Popconfirm
      title="Are you sure delete this file?"
      onConfirm={onDeleteFile(self, record)}
      key="delete"
    >
      <Button>
        <Icon type="delete" />
      </Button>
    </Popconfirm>
  );
  return (
    <Button.Group>
      {btns}
    </Button.Group>
  );
};

@inject((allStores) => ({
  fileSysStore: allStores.fileSysStore,
}))
@observer
class FSView extends React.Component {

  static getColumns = (self) => ([
    { title: 'Name', render: renderFileName, key: 'name' },
    { title: 'Permission', dataIndex: 'permission', key: 'permission', width: '120px' },
    { title: 'Owner', dataIndex: 'owner', key: 'owner', width: '150px' },
    { title: 'Owner group', dataIndex: 'superGroup', key: 'superGroup', width: '150px' },
    { title: 'Size', render: (txt, record) => filesize(record.length), key: 'length' },
    { title: 'Block size', render: (txt, record) => filesize(record.blockSize), key: 'blockSize' },
    { title: 'Replication', dataIndex: 'replication', key: 'replication' },
    { title: 'Modification Time', dataIndex: 'modificationTime', render: renderModTime, key: 'modificationTime' },
    { title: 'Operations', render: renderOperations(self), key: 'operations' }
  ]);

  constructor(props) {
    super(props);
  }

  render() {
    const { fileSysStore } = this.props;
    return (
      <Table
        className="fs-table"
        dataSource={fileSysStore.filesInDirectory}
        columns={FSView.getColumns(this)}
        rowKey={(record, idx) => `${record.path}_${idx}`}
        loading={fileSysStore.currentPathIsLoading}
      />
    );
  }
}

export default FSView;
