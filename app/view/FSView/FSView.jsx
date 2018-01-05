import React from 'react';
import { observer, inject } from 'mobx-react';
import _ from 'lodash';

@inject((allStores) => ({
  mainStore: allStores.mainStore,
}))
@observer
class FSView extends React.Component {

  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div>FS-VIEW PLACEHOLDER</div>
    );
  }
}

export default FSView;
