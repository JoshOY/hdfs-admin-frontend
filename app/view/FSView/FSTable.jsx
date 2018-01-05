import React from 'react';
import { observer, inject } from 'mobx-react';
import { Table, Icon, Button } from 'antd';
import filesize from 'filesize';
import moment from 'moment';
import _ from 'lodash';

const demoDataSource = [
  { name: 'input', path: '/user/hduser/input', permission: 'drwxr-xr-x', owner: 'hduser', group: 'supergroup', lastModified: (new Date()).getTime(), size: 0, replication: 0, blockSize: 0 },
  { name: 'logs', path: '/user/hduser/logs', permission: 'drwxr-xr-x', owner: 'hduser', group: 'supergroup', lastModified: (new Date()).getTime(), size: 0, replication: 0, blockSize: 0 },
  { name: 'tmp', path: '/user/hduser/tmp', permission: 'drwxr-xr-x', owner: 'hduser', group: 'supergroup', lastModified: (new Date()).getTime(), size: 0, replication: 0, blockSize: 0 },
  { name: 'readme.txt', path: '/user/hduser/readme.txt', permission: '-rw-r--r--', owner: 'hduser', group: 'supergroup', lastModified: (new Date()).getTime(), size: 310, replication: 2, blockSize: 128 * 1024 * 1024 },
];

const renderFileName = (txt, record) => {
  const filename = record.name;
  if (record.permission[0] == 'd') {
    return (<span style={{ color: '#1890ff' }}><Icon type="folder" />&nbsp;&nbsp;{filename}</span>);
  }
  return (<span style={{ color: '#1890ff' }}><Icon type="file" />&nbsp;&nbsp;{filename}</span>);
};

const renderOperations = (self) => (txt, record) => {
  const btns = [];
  if (record.permission[0] !== 'd') {
    btns.push(
      <Button type="primary" key="download">
        <Icon type="download" />
      </Button>
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
    <Button key="copy">
      <Icon type="copy" />
    </Button>
  );
  btns.push(
    <Button key="delete">
      <Icon type="delete" />
    </Button>
  );
  return (
    <Button.Group>
      {btns}
    </Button.Group>
  );
};

@observer
class FSView extends React.Component {

  static getColumns = (self) => ([
    { title: 'Name', render: renderFileName, key: 'name' },
    { title: 'Permission', dataIndex: 'permission', key: 'permission', width: '120px' },
    { title: 'Owner', dataIndex: 'owner', key: 'owner', width: '150px' },
    { title: 'Owner group', dataIndex: 'group', key: 'group', width: '150px' },
    { title: 'Size', render: (txt, record) => filesize(record.size), key: 'size' },
    { title: 'Block size', render: (txt, record) => filesize(record.blockSize), key: 'blockSize' },
    { title: 'Replication', dataIndex: 'replication', key: 'replication' },
    { title: 'Operations', render: renderOperations(self), key: 'operations' }
  ]);

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Table
        className="fs-table"
        dataSource={demoDataSource}
        columns={FSView.getColumns(this)}
        rowKey={(record) => record.path}
      />
    );
  }
}

export default FSView;
