import React, {
  Component
}                               from 'react';
import {      
  Route,
  Switch
}                               from 'react-router-dom';
import { ConnectedRouter}       from 'react-router-redux';
import { Provider }             from 'react-redux';
import configureStore           from './redux/configureStore';
import { history }              from './redux/configureStore';
import { default as Layout }    from './containers/Layout';
import { default as PageNotFound } from './views/PageNotFound';
import ScrollTop                from './components/scrollToTop/ScrollToTop';

type Props = any;
type State = any;

const store = configureStore();

class Root extends Component<Props, State> {
  render() {

    return (
      <Provider store={store}>
        <div>
          <ConnectedRouter history={history}>
            <ScrollTop> 
              <Switch>                
                <Route exact path="/" component={Layout} />               
                <Route component={PageNotFound} />    
              </Switch>                                                      
            </ScrollTop>
          </ConnectedRouter>
        </div>
      </Provider>
    );
  }
}

export default Root;