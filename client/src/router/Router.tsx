import * as React from 'react';
import {Home, NotFound} from '../views';

import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';

const AppRouter = () => (
    <Router>
      <Switch>
        <Route exact={true} path="/" component={Home} />
        <Route component={NotFound} />
      </Switch>
    </Router>
  );
  export default AppRouter;
