import {
    BrowserRouter as Router,
    Switch,
    Route,
} from 'react-router-dom';

import Home from './pages/Home/Home';
import Ingredients from './pages/Ingredients/Ingredients';
import Recipient from './pages/Recipient/Recipient';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register'

export default function Routes () {
    return (
        <Router>
            <Switch>
                <Route path='/' exact component={Home} />
                <Route path='/ingredients' component={Ingredients} />
                <Route path='/recipients' component={Recipient} />
                <Route path='/login' component={Login} />
                <Route path='/register' component={Register} />
            </Switch>
        </Router>
    );
}
