import React, { Component } from 'react';
import Login from './components/auth/Login';
import Todo from './components/manageList/Todo';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    
  } from "react-router-dom";
class App extends Component {
    render() {
        return (
            <div>
                <Router>
                    <Switch>
                        <Route exact path="/todo">
                            <Todo />
                        </Route>
                        <Route exact path="/">
                            <Login />
                        </Route>
                    </Switch>
                </Router>
            </div>
        );
    }
}

export default App;


