import React, { Component } from "react";
import { Form, Input, Button } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import "./login.less";
import logo from "../../assets/logo-transparent.png";
import storage from "../../api/common/storageDao";
import utils from "../../api/utilsHelper";

import loginApi from "../../api/login/loginApi";

class NormalLoginForm extends Component {
  onFinish = async (values) => {
    try {
      const { data: rep } = await loginApi.userLogin(
        values.username,
        values.password
      );
      // 将关键信息保存到内存与本地存储中
      utils.scope._id = rep._id;
      utils.scope.user = rep;
      storage.setItem("_id", rep._id);
      storage.setItem("user", rep);
      this.props.goAdminPage();
    } catch (err) {
      console.log("err=>", err);
    }
  };
  render() {
    console.log(this.props);
    return (
      <Form
        name="normal_login"
        className="login-form"
        initialValues={{
          remember: true,
        }}
        onFinish={this.onFinish}
      >
        <Form.Item
          name="username"
          // 声明式验证
          rules={[
            {
              // required代表该字段是否必填
              required: true,
              message: "用户名不能为空",
            },
            {
              // 正则匹配
              pattern: /^[a-zA-Z0-9_-]+$/,
              message: "由数字、大小写数字或下划线组成",
            },
            {
              // 正则匹配
              max: 12,
              message: "用户名最大长度12",
            },
            {
              // 正则匹配
              min: 4,
              message: "用户名最小长度为4",
            },
          ]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="用户名"
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: "密码不能为空",
            },
          ]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="密码"
          />
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            登录
          </Button>
          {/* Or <a href="">register now!</a> */}
        </Form.Item>
      </Form>
    );
  }
}
export default class login extends Component {
  goAdminPage = () => {
    this.props.history.replace("/");
  };
  render() {
    return (
      <div className="login">
        <header className="login-header">
          <div className="logo fl">
            <img src={logo} alt="web 表单创建" />
          </div>
          <div className="login-title fl">web 表单创建管理系统</div>
        </header>
        <section className="login-section">
          <div className="login-box">
            <div className="login-box-title">用户登录</div>
            <NormalLoginForm goAdminPage={this.goAdminPage}/>
          </div>
        </section>
        <footer className="login-footer"/>
      </div>
    );
  }
}
