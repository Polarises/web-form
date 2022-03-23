import React, { Component } from "react";
import { Menu } from "antd";
import { Link, withRouter } from "react-router-dom";

import menuConfig from "../../config/menuConfig";
import "./SiderBar.less";
import logo from "../../assets/logo-withname.png";
const { SubMenu } = Menu;

// submenu keys of first level
// const subNum = 0; // 规定了折叠的key值
// const itemNum = 0; // 规定了点击

class SiderBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openKeys: [], // 存储展开的subMenu的key
      rootSubmenuKeys: [], // 存储全部subMenu的key
      w:[]
    };
  }
  onItemClick = (item) => {
    // 如果是二级item则关闭其他的subMenu
    // 如果是一级item则关闭圈闭subMenu
    if (item.keyPath[1]) {
      this.setState({
        openKeys: [item.keyPath[1]],
      });
    } else {
      this.setState({
        openKeys: [],
      });
    }
    // 在此需要关闭除了自己以外的sub
  };
  onOpenChange = (keys) => {
    // 每次点击展开/关闭 都会将相关key压栈到keys数组中
    // openkeys此处操作前打开的相关key
    // 此处获取最新打开的key openkeys比keys少一个最新打开的key
    const latestOpenKey = keys.find(
      (key) => this.state.openKeys.indexOf(key) === -1
    );

    // 如果不是根目录下的key 就全打开
    if (this.state.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      this.setState({
        openKeys: keys,
      });
    } else {
      /// 如果是根目录下的key 就只打开最新的那个key
      this.setState({
        openKeys: latestOpenKey ? [latestOpenKey] : [],
      });
    }
  };
  initMenuNode = (nodeList) => {
    // 需要递归遍历
    return nodeList.map((item) => {
      if (item.children) {
        console.log(item.key);
        console.log(this.props.location.pathname);
        this.state.rootSubmenuKeys.push(item.key); // 存储根节点
        let nowNode = item.children.find((v) => {
          // pathname中含有该项 则将其高亮显示
          return this.props.location.pathname.indexOf(v.key) !== -1
        });
        if(nowNode){
          this.setState({
            openKeys: [item.key]
          })
        }
        return (
          <SubMenu key={item.key} title={item.title} icon={item.icon}>
            {this.initMenuNode(item.children)}
          </SubMenu>
        );
      } else {
        return (
          <Menu.Item key={item.key} icon={item.icon}>
            <Link to={item.key}>{item.title}</Link>
          </Menu.Item>
        );
      }
    });
  };
  UNSAFE_componentWillMount(){
    this.menuNode = this.initMenuNode(menuConfig)
  }
  render() {
    const path = this.props.location.pathname;

    return (
      <div className="menu">
        <div className="siderbar-logo">
          <img src={logo} alt="" />
        </div>
        <Menu
          mode="inline"
          openKeys={this.state.openKeys}
          onOpenChange={this.onOpenChange}
          className="siderbar-menu"
          theme="dark"
          onClick={this.onItemClick}
          defaultSelectedKeys={path}
        >
          {/* 递归遍历 生成menu节点 */}
          {this.menuNode}
        </Menu>
      </div>
    );
  }
}

export default withRouter(SiderBar);
