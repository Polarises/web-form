import React, { Component } from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Admin from './pages/admin/admin';
import Login from './pages/login/login';
import storage from './api/common/storageDao';
import utils from './api/utilsHelper';

// utils.scope._id = storage.getItem('_id');
// utils.scope.user = storage.getItem('user');
let _id = storage.getItem('_id');
let user = storage.getItem('user');
if(_id){
  utils.scope._id = _id;
  utils.scope.user = user;
}

export default class App extends Component {
  render() {
  return (
    <BrowserRouter>
        <Switch>
            <Route path="/login" component={Login} />
            <Route path="/" component={Admin} />
        </Switch>
    </BrowserRouter>
  );
  }
}
