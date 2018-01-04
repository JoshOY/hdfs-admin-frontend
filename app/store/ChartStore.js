import {observable, action, computed, toJS} from 'mobx';
// import _ from 'lodash';
// import omit from 'object.omit';
// import moment from 'moment';

import ApiUtil from '../utils/api-util';

class ChartStore {

  @observable _creditData = [];
  @observable _relationData = [];
  @observable _chordData = [];
  @observable _chordNodes = null;

  @computed get creditData() {
    return toJS(this._creditData);
  };

  @computed get relationData() {
    return toJS(this._relationData);
  }

  @computed get chordData() {
    return toJS(this._chordData);
  }

  @computed get chordNodes() {
    return toJS(this._chordNodes);
  }

  @action fetchMonthlyCreditAsync = async () => {
    const respObj = await ApiUtil.tokenGet('/api/query/monthly/debit/credit');
    if (respObj && respObj.ok) {
      this._creditData = respObj.data;
    } else {
      throw new Error();
    }
  };

  @action fetchRelationDataAsync = async () => {
    const respObj = await ApiUtil.tokenGet('/api/query/relation/amount/frequency');
    if (respObj && respObj.ok) {
      this._relationData = respObj.data;
    } else {
      throw new Error();
    }
  };

  @action fetchChordDataAsync = async () => {
    const respObj = await ApiUtil.tokenGet('/api/query/selftrade');
    if (respObj && respObj.ok) {
      this._relationData = respObj.data;
      this._chordNodes = respObj.nodes;
    } else {
      throw new Error();
    }
  };
}

export default ChartStore;
