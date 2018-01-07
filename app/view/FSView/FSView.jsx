import React from 'react';
import { observer, inject } from 'mobx-react';
import { withRouter } from 'react-router';
import _ from 'lodash';

import FSPanel from './FSPanel.jsx';
import FSTable from './FSTable.jsx';

@withRouter
@inject((allStores) => ({
  mainStore: allStores.mainStore,
  fileSysStore: allStores.fileSysStore,
}))
@observer
class FSView extends React.Component {

  constructor(props) {
    super(props);
  }

  componentWillReceiveProps(nextProps) {
    if (!_.eq(this.props.location.search, nextProps.location.search)) {
      const path = this.props.location.search.match(/\?path=(.+)/)[1] || '/';
      this.props.fileSysStore.currentPath = path;
      this.props.fileSysStore.fetchDirectoryAsync(path);
    }
  }

  componentDidMount() {
    if (this.props.location.search) {
      const path = this.props.location.search.match(/\?path=(.+)/)[1];
      this.props.fileSysStore.currentPath = path;
      this.props.fileSysStore.fetchDirectoryAsync(path);
    } else {
      this.props.fileSysStore.fetchDirectoryAsync('/');
    }
  }

  render() {
    return (
      <div>
        <FSPanel />
        <FSTable />
      </div>
    );
  }
}

export default FSView;
