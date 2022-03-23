import React, { Component } from 'react'
import {Button, Card, Popconfirm, Space, Table} from "antd";
import dataApi from "../../api/data/dataApi";
import formApi from "../../api/form/formApi";
import jsonAPi from "../../api/json/jsonApi";
import dayjs from "dayjs";
import ChartRender from "./components/chartRender"
import './index.less'
import JsonModal from './components/jsonModal'

/*
    Data 数据管理
*/
export default class DataList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataList: [],
            timeValueList: [],
            timeArrList: [],
            columns: [],
            formItem: {},
            loading: true, // table的加载状态
            showModal: false,
            jsonData: [],
        };
    }
    componentDidMount() {
        const {params} = this.props.match;
        this.getDataList(params.formId);
        this.getFormDetail(params.formId);
        this.getJsonDataList(params.formId);
    }
    async getDataList(formId) {
        const res = await dataApi.getDataListByFormId(formId);
        if (res.status === 0) {
            let timeValue = [];
            let timeArr = [];
            res.data.map(item => {
                if (item.createdAt) {
                    item.createdAt = dayjs(item.createdAt).format("YYYY-MM-DD HH:mm:ss")
                    timeValue.push(0);
                    timeArr.push(dayjs(item.createdAt).format("YYYY-MM-DD"));
                }
            });
            this.setState({dataList: res.data, timeValueList: timeValue, timeArrList: timeArr, loading: false});
            this.getWordCnt(timeArr);
            let subTimeVal = [];
            let subPv = this.getWordCnt(timeArr);
            const days = this.getDayBefore(-7);

            days.map(arr => {
                if (subPv[arr]) {
                    subTimeVal.push({
                        date: arr,
                        pv: subPv[arr]
                    })
                } else {
                    subTimeVal.push({
                        date: arr,
                        pv: 0
                    })
                }
            })
            this.setState({
                timeArrList: subTimeVal
            })
        }
    }
    async getFormDetail(_id) {
        const res = await formApi.getFormById(_id);
        if (res.status === 0) {
            if (res.data.createdAt) {
                res.data.createdAt = dayjs(res.data.createdAt).format("YYYY-MM-DD HH:mm:ss")
            }
            this.setState({formItem: res.data, formId: _id, loading: false});
        }
    }
    async getJsonDataList(formId) {
        const res = await jsonAPi.getJsonListByFormId(formId);
        console.log('log res::', res)
        this.setState({
            jsonData: res.data.data,
            urlLink: 'http://localhost:5000/json/list?formId=' + formId
    })
    }
    getWordCnt(arr){
        var obj = {};
        for(var i= 0, l = arr.length; i< l; i++){
            var item = arr[i];
            obj[item] = (obj[item] +1 ) || 1;
        }
        return obj;
    }
    getDayBefore(before) {
        let arrTime = [];
        for (let i = before + 1; i <= 0; i++) {
            arrTime.push(this.getDay(i))
        }
        return arrTime
    }
    getDay(day){
        var today = new Date();
        var targetday_milliseconds = today.getTime() + 1000 * 60 * 60 * 24 * day;
        today.setTime(targetday_milliseconds); //注意，这行是关键代码
        var tYear = today.getFullYear();
        var tMonth = today.getMonth();
        var tDate = today.getDate();
        tMonth = this.doHandleMonth(tMonth + 1);
        tDate = this.doHandleMonth(tDate);
        return tYear+"-"+tMonth+"-"+tDate;
    }
    doHandleMonth(month){
        var m = month;
        if(month.toString().length == 1){
            m = "0" + month;
        }
        return m;
    }
    render() {
        const {dataList = [], formItem = {}, timeValueList = []} = this.state;
        const {schemas = {}} = formItem;
        let columns = [];
        if (schemas.properties) {
            const {properties = {}} = schemas;
            let list = [];
            columns = [
                {
                    title: "数据ID",
                    dataIndex: "_id",
                    key: "_id",
                    width: "10%",
                    render: (text, row, index) => {
                        return (
                            <div className="table-content-box">
                                <p>{ row._id || '-' }</p>
                            </div>
                        )
                    }
                },
            ];
            let tabs = [];
            dataList.map(item => {
                if (item.tabs) {
                    tabs = item.tabs;
                }
            })
            if (Object.keys(properties).length > 0) {
                tabs.map((tab, tabIndex) => {
                    columns.push({
                        title: tab,
                        dataIndex: `info`,
                        key: 'info',
                        width: "10%",
                        render: (text, row, index) => {
                            return (
                                <div className="table-content-box">
                                    {
                                        row.info && Object.keys(row.info).length > 0 ?
                                            <p>{row.info[Object.keys(row.info)[tabIndex]]}</p>
                                            : <p>-</p>
                                    }
                                </div>
                            )
                        }
                    })
                });
                columns.push({ title: "创建时间", dataIndex: "createdAt", key: "createdAt", width: "15%",
                    render: (text, row, index) => {
                        return (
                            <div className="table-content-box">
                                <p>{ row.createdAt }</p>
                            </div>
                        )
                    }
                });
            }
        }

        return (
            <div className="data content-box">
                {/*get formId*/}
                <Card
                    title={'表单名称：' + formItem.name || 'playground'}
                    extra={
                        <div>
                            <span style={{marginRight: 15}}>{formItem.createdAt}</span>
                            <Button
                                type="primary"
                                onClick={() => {
                                    // this.setState({showModal: true})
                                    window.open(this.state.urlLink);
                                }}
                            >
                                JSON数据
                            </Button>
                        </div>
                    }
                >
                    <span><a>*注：这里是表单 《{formItem.name}》 下提交的列表数据。</a></span>
                    <Table
                        dataSource={dataList}
                        columns={columns}
                        bordered
                        rowKey={(recode) => recode._id}
                        loading={this.state.loading}
                        pagination={{
                            total: dataList.length, // 数据总数
                            pageSize: 5, // 每页条数
                            defaultCurrent: 1,
                        }}
                    />
                </Card>

                <Card title="图表分析">
                    <ChartRender
                        defaultData={this.state.timeArrList}
                    />
                </Card>

                <JsonModal
                    editFormVisible={this.state.showModal}
                    onCancel={() => this.setState({showModal: false})}
                    defaultValue={this.state.jsonData}
                    onSubmit={() => console.log('log submit::')}
                />

            </div>
        )
    }
}
