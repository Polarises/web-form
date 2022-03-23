import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import dayjs from "dayjs";
import { Modal } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import utils from "../../api/utilsHelper";
import storage from "../../api/common/storageDao";
import menuConfig from "../../config/menuConfig";
import "./header.less";
const { confirm } = Modal;
class header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      timerId: null,
      timerNow: dayjs().format("YYYY-MM-DD HH:mm:ss"),
    };
  }
  logOut = () => {
    let self = this;
    confirm({
      title: "确认要退出账号吗?",
      icon: <ExclamationCircleOutlined />,
      content: "退出后，下次进入需重新输入密码",
      okText: "确认",
      cancelText: "取消",
      onOk() {
        storage.delItem("user");
        storage.delItem("_id");
        utils.scope.user = {};
        utils.scope._id = "";
        self.props.history.replace("/login");
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  };
  getTime() {
    let timerId = setInterval(() => {
      this.setState({
        timerNow: dayjs().format("YYYY-MM-DD HH:mm:ss"),
      });
    }, 1000);
    this.setState({
      timerId: timerId,
    });
  }
  getTitle = (path) => {
    let title;
    menuConfig.forEach((menu) => {
      if (menu.key === path) {
        title = menu.title;
      } else if (menu.children) {
        menu.children.forEach((item) => {
          if (path.indexOf(item.key) === 0) {
            title = item.title;
          }
        });
      }
    });
    return title;
  };
  componentDidMount() {
    this.getTime();
  }
  componentWillUnmount() {
    clearInterval(this.state.timerId);
    this.setState({
      timerId: null,
    });
  }
  render() {
    const title = this.getTitle(this.props.location.pathname);
    return (
      <div className="header">
        <div className="header-userInfo">
          <div className="header-userName">
            你好, {utils.scope.user.username}
          </div>
          <div className="header-logout-btn" onClick={this.logOut}>
            退出
          </div>
        </div>
        <div className="header-title-area">
          <div className="header-title">{title}</div>
          {/* <div className="header-time-box">2020/04/08 16:40:50</div> */}
          <div className="header-time-box">{this.state.timerNow}</div>
        </div>
      </div>
    );
  }
}
export default withRouter(header);
