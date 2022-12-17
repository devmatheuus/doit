import { Login } from 'pages/Login';
import { Dashboard } from 'pages/Dashboard';
import { SignUp } from 'pages/Signup';

import { Switch } from 'react-router-dom';
import { Route } from 'routes/Route';
import { PageNotFound } from 'pages/PageNotFound';
import { useAuth } from '../contexts/AuthContext';

export const Routes = () => {
    const { accessToken } = useAuth();

    return (
        <Switch>
            <Route exact path="/" component={Login} />
            <Route exact path="/signup" component={SignUp} />
            <Route path="/dashboard" component={Dashboard} isPrivate />
            <Route component={PageNotFound} isPrivate={!!accessToken} />
        </Switch>
    );
};
