import React, { Component } from "react";
import "./home.less";
import dataApi from "../../api/data/dataApi";
import formApi from "../../api/form/formApi";
import infoApi from "../../api/info/infoApi";
import Dashboard from "../dashboard"
import Coming from "../coming/components/Coming";
import { Card, Button, Table, Space, Modal, message, Popconfirm } from "antd";
import {
  AreaChartOutlined,
  BarChartOutlined,
  LineChartOutlined,
  PieChartOutlined,
  MailOutlined,
  HomeOutlined,
  UserOutlined,
  SafetyOutlined,
  UnorderedListOutlined,
  SwapRightOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import Total from "./components/total";

/*
    首页
*/
export default class home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataList: {},
      formList: {},
      showFormVisible: true,
      subFormData: {},
      homeInfo: {},
      total: {},
    };
  }
  componentDidMount() {
    this.getDataList();
    this.getFormList();
    this.getHomeInfoData();
  }
  async getDataList() {
    const res = await dataApi.getDataList()
    if (res.status === 0) {
      this.setState({dataList: res.data})
    }
  }
  async getFormList() {
    const res = await formApi.getFormList()
    if (res.status === 0) {
      this.setState({formList: res.data})
    }
  }
  async getHomeInfoData() {
    const res = await infoApi.getHomeInfo()
    if (res.status === 0) {
      this.setState({homeInfo: res.data})
    }
  }

  render() {
    return (
      <div className="home content-box">
        <div className="panel">
          <div className="panel-item">
            <Card title="表单统计">
              <div className="item-info">
                <div>共 <span>{this.state.formList.length}</span> 个表单。</div>
                {/*<br/>*/}
                <UnorderedListOutlined />
              </div>
            </Card>
          </div>
          <div className="panel-item">
            <Card title="数据统计">
              <div className="item-info">
                <div>共 <span>{this.state.dataList.length}</span> 条数据。</div>
                <AreaChartOutlined />
              </div>
            </Card>
          </div>
          <div className="panel-item">
            <Card title="欢迎使用">
              <div className="item-info">
                <div className="home-temp">欢迎使用 <span>web</span> 表单创建管理系统</div>
                <HomeOutlined />
              </div>
            </Card>
          </div>
        </div>
        <div className="card-item">
          <Card title="数据统计"
                extra={
                  <Button
                      type="primary"
                      icon={<SwapRightOutlined />}
                      onClick={() => {
                        this.props.history.push('/dashboard');
                      }}
                  >
                    查看更多..
                  </Button>
                }
          >
            {/*<div>共{this.state.formList.length}个表单。</div>
            <br/>
            <div>共{this.state.dataList.length}条数据。</div>
            <br/>
            <div className="home-temp">欢迎使用 web 表单创建管理系统</div>*/}
            <Total total={{form: this.state.formList.length, data: this.state.dataList.length}}/>
          </Card>
        </div>

        <div className="card-item">
        </div>
      </div>
    );
  }
}
