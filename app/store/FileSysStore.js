import {observable, action, computed, toJS} from 'mobx';
import _ from 'lodash';

class FileSysStore {

  /* Current directory */
  @observable currentPath = '/';
  /* compute parent directory */
  @computed get parentDirectoryPath() {
    if (this.currentPath === '/') {
      return null;
    }
    const paths = this.currentPath.split('/');
    if (_.last(paths) === '') {
      _.dropRight(paths);
    }
    _.dropRight(paths);
    return paths.join('/');
  }
  /* directory view records (for go previous / go forward) */
  @observable previousViews = [];
  @observable forwardViews = [];
}

export default FileSysStore;
