import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect
} from 'react-router-dom';

import Home from './pages/Home/Home';
import Ingredients from './pages/Ingredients/Ingredients';
import Recipient from './pages/Recipient/Recipient';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';

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
        <Router>
            <Switch>
                <Route path='/' exact component={Ingredients} />
                <PrivateRoute path='/dashboard' component={Home} />
                <PrivateRoute path='/recipients' component={Recipient} />
                <Route path='/login' component={Login} />
                <Route path='/register' component={Register} />
                <Route path="*" component={() => <h1>Page not found</h1>} />
            </Switch>
        </Router>
    );
}
