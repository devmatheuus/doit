import { Login } from 'pages/Login';
import { Dashboard } from '../pages/Dashboard/index';

import { Switch } from 'react-router-dom';
import { Route } from 'routes/Route';

export const Routes = () => (
    <Switch>
        <Route exact path="/" component={Login} />
        <Route path="/dashboard" component={Dashboard} isPrivate />
    </Switch>
);
