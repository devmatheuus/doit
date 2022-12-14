import { Login } from 'pages/Login';
import { Route, Switch } from 'react-router-dom';

export const Routes = () => (
    <Switch>
        <Route exact path="/" component={Login} />
    </Switch>
);
