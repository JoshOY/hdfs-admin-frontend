import {observable, action, computed, toJS} from 'mobx';
import _ from 'lodash';
import ApiUtil from 'app/utils/api-util';

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

  @action fetchDirectoryAsync = async (path) => {
    const respObj = await ApiUtil.tokenGet(
      '/api/fs/getDirectoryFromHdfs',
      { path },
    );
  };
}

export default FileSysStore;
