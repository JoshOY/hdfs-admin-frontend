import {observable, action, computed, toJS} from 'mobx';
import _ from 'lodash';

class MainStore {
  @observable _breadcrumbPath = [
    {
      name: 'Overview',
    },
  ];

  @computed get breadcrumbPath() {
    return toJS(this._breadcrumbPath);
  }

  @action changeBreadcrumb(path) {
    this._breadcrumbPath = [];
    this._breadcrumbPath = _.cloneDeep(path);
  }
}

export default MainStore;
