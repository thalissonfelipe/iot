import {
    Router,
    Switch,
    Route,
    Redirect
} from 'react-router-dom';

import history from './history';

import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import CreateRecipient from './pages/CreateRecipient';
import EditRecipient from './pages/EditRecipient';
import Login from './pages/Login';
import Register from './pages/Register';

import { isAuthenticated } from './services/auth';

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
        isAuthenticated() ? (
            <Component {...props} />
        ) : (
            <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
        )
    }
  />
);

export default function Routes () {
    return (
        <Router history={history}>
            <Switch>
                <Route path='/' exact component={Home} />
                <PrivateRoute path='/dashboard' component={Dashboard} />
                <PrivateRoute exact path='/recipients' component={CreateRecipient} />
                <PrivateRoute path='/recipients/edit' component={EditRecipient} />
                <Route path='/login' component={Login} />
                <Route path='/register' component={Register} />
                <Route path="*" component={() => <h1>Page not found</h1>} />
            </Switch>
        </Router>
    );
}
