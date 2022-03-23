import React, { Component } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { Layout } from "antd";
import utils from "../../api/utilsHelper";
import "./admin.less";
import Header from '../../components/header/header';

import SiderBar from "../../components/SiderBar/SiderBar";
import Home from "../home/home";
import Manage from "../manage/manage";
import Form from "../form/form";
import User from "../user/user";
import Role from "../role/role";
import Pie from "../charts/pie";
import Line from "../charts/line";
import Bar from "../charts/bar";
import Playground from "../playground/playground";
import Dashboard from "../dashboard";
import DataList from "../data";
import '../../style/ellipsis.less'

const {Footer, Sider, Content } = Layout;

export default class admin extends Component {
  render() {
    if (utils.scope._id) {
      return (
        <Layout className="admin-page">
          <Sider className="admin-sider">
            <SiderBar />
          </Sider>
          <Layout className="admin-right">
            <Header />
            <Content className="admin-content">
              <Switch>
                <Route path="/home" component={Home} />
                <Route path="/manage" component={Manage} />
                <Route path="/setting" component={Form} />
                <Route path="/user" component={User} />
                <Route path="/role" component={Role} />
                <Route path="/charts/pie" component={Pie} />
                <Route path="/charts/line" component={Line} />
                <Route path="/charts/bar" component={Bar} />
                <Route path="/playground/:id" component={Playground} />
                <Route path="/dashboard" component={Dashboard} />
                <Route path="/data/list/:formId" component={DataList} />
                <Redirect to='/home' />
              </Switch>
            </Content>
            <Footer className="admin-footer">copyright@webform</Footer>
          </Layout>
        </Layout>
      );
    } else if (this.props.location.pathname.includes('/playground')) {
      const {pathname} = this.props.location;
      // this.props.history.push(pathname);
      return (
          <Layout className="admin-page">
            <Layout className="admin-right">
              <Content className="admin-content">
                <Switch>
                  <Route path="/playground/:id" component={Playground} />
                </Switch>
              </Content>
              <Footer className="admin-footer">copyright@webform</Footer>
            </Layout>
          </Layout>
      );
    } else {
      return <Redirect to="/login" />;
    }
  }
}
