import {observable, action, computed, toJS} from 'mobx';
import _ from 'lodash';
import ApiUtil from 'app/utils/api-util';
import { message } from 'antd';

class FileSysStore {

  /* Current directory */
  @observable currentPath = '/';
  @observable currentPathIsLoading = false;
  /* directory view records (for go previous / go forward) */
  @observable _previousViews = [];
  @observable _forwardViews = [];
  /* Files in current directory */
  @observable _filesInDirectory = [];

  /* compute parent directory */
  @computed get parentDirectoryPath() {
    if (this.currentPath === '/') {
      return null;
    }
    let paths = this.currentPath.split('/');
    if (_.last(paths) === '') {
      paths = _.dropRight(paths);
    }
    paths =_.dropRight(paths);
    return paths.join('/') + '/';
  }

  @computed get filesInDirectory() {
    return toJS(this._filesInDirectory);
  }

  @action fetchDirectoryAsync = async (path) => {
    this.currentPathIsLoading = true;
    const respObj = await ApiUtil.tokenGet(
      '/api/fs/getDirectoryFromHdfs',
      { path },
    );
    this.currentPathIsLoading = false;
    if (respObj.errCode) {
      throw new Error(respObj);
    }
    if (respObj.directories === null) {
      this._filesInDirectory = [];
      message.error('Error: target directory is deleted or not exist.');
      return this._filesInDirectory;
    }
    // if success
    // message.success('Directory load success.');
    this._filesInDirectory = respObj.directories;
    return this._filesInDirectory;
  };
}

export default FileSysStore;
