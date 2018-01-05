import React from 'react';
import P from 'prop-types';
import { observer, inject } from 'mobx-react';
import { Switch, Route, Redirect } from 'react-router-dom';

// views
import MainView from '../view/Main';
import OverviewView from '../view/OverviewView';
import FSView from '../view/FSView';

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
        <Route path="/">
          <MainView location={this.props.routingStore.location.pathname}>
            <Route path="/" exact component={OverviewView} />
            <Route path="/fs" exact component={FSView} />
          </MainView>
        </Route>
      </Switch>
    );
  }
}

export default AppRoutes;
