//added for customization
import 'bootstrap/dist/css/bootstrap.min.css';

import React from 'react';
import ReactDOM from 'react-dom';

import {BrowserRouter, Link, Route, Switch} from 'react-router-dom';
import Post from './Post';
import Category from './Category';

import './index.css';
//import App from './App';
import * as serviceWorker from './serviceWorker';

class Root extends React.Component {
    render() {
        return (
            <Switch>
                <Route path="/posts" component={Post}></Route>
                <Route path="/categories" component={Category}></Route>
            </Switch>
        )
    }
}


//ReactDOM.render(<BrowserRouter><App /></BrowserRouter>,document.getElementById('root'));
ReactDOM.render(<BrowserRouter><div>
    <h2>Welcome to App Component...</h2>
    <ul>
        <li><div><Link to="/posts">Posts</Link></div></li>
        <li><Link to="/categories">Categories</Link></li>
    </ul>

</div><Root></Root></BrowserRouter>,document.getElementById("root"));


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
