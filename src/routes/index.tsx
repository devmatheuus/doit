import { Login } from 'pages/Login';
import { Dashboard } from 'pages/Dashboard';
import { SignUp } from 'pages/Signup';

import { Switch } from 'react-router-dom';
import { Route } from 'routes/Route';

export const Routes = () => (
    <Switch>
        <Route exact path="/" component={Login} />
        <Route exact path="/signup" component={SignUp} />
        <Route path="/dashboard" component={Dashboard} isPrivate />
    </Switch>
);
