import React, { Component } from 'react'
import {Switch, Route, Redirect} from 'react-router-dom'
import FormHome from './formHome/formHome'
import './setting.less'
/*
    表单设计
*/
export default class form extends Component {
    render() {
        return (
            <Switch>
                <Route path="/setting" component={FormHome} exact />
                <Redirect to="/setting" />
            </Switch>
        )
    }
}
