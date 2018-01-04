import React from 'react';
import P from 'prop-types';
import { observer, inject } from 'mobx-react';
import { Switch, Route, Redirect } from 'react-router-dom';

// views
import MainView from '../view/Main';
import RelationView from '../view/Relation';
import SelftradingView from '../view/Selftrading';

@inject('routingStore')
@observer
class AppRoutes extends React.Component {

  static propTypes = {
    routingStore: P.object.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Switch location={this.props.routingStore.location}>
        <Route path="/" exact component={MainView} />
        <Route path="/relations" exact component={RelationView} />
        <Route path="/selftrading" exact component={SelftradingView} />
      </Switch>
    );
  }
}

export default AppRoutes;
