import React from 'react';
import { observer, inject } from 'mobx-react';

import FSPanel from './FSPanel.jsx';
import FSTable from './FSTable.jsx';

@inject((allStores) => ({
  mainStore: allStores.mainStore,
  fileSysStore: allStores.fileSysStore,
}))
@observer
class FSView extends React.Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.fileSysStore.fetchDirectoryAsync('/');
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
