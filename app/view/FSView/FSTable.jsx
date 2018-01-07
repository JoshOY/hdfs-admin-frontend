import React from 'react';
import { observer, inject } from 'mobx-react';
import { Table, Icon, Button } from 'antd';
import filesize from 'filesize';
import moment from 'moment';
import _ from 'lodash';
import FileSysStore from "app/store/FileSysStore";

const renderFileName = (txt, record) => {
  const filename = record.name;
  if (record.isFile === false) {
    return (<span style={{ color: '#1890ff' }}><Icon type="folder" />&nbsp;&nbsp;{filename}</span>);
  }
  return (<span style={{ color: '#1890ff' }}><Icon type="file" />&nbsp;&nbsp;{filename}</span>);
};

const renderModTime = (txt, record) => {
  return (
    <span>{moment(record.modificationTime).format('YYYY-MM-DD hh:mm:ss')}</span>
  );
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
        rowKey={(record) => record.path}
      />
    );
  }
}

export default FSView;
