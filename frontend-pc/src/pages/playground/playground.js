import React, { Component } from 'react'
import { Card, Button, Table, Space, Modal, message, Popconfirm } from "antd";
import ShowForm from './components/showFrom'
import formApi from "../../api/form/formApi";
import dataApi from "../../api/data/dataApi";
import jsonApi from "../../api/json/jsonApi";

/*
    访问链接页面
*/
export default class playground extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataItems: {},
            showFormVisible: true,
            subFormData: {},
        };
    }
    componentDidMount() {
        const {params} = this.props.match;
        this.getFormDetail(params.id);
    }
    async getFormDetail(_id) {
        const res = await formApi.getFormById(_id);
        if (res.status === 0) {
            // message.success("查询成功");
            this.setState({dataItems: res.data, formId: _id})
        }
    }
    handleSubmit = async val => {
        console.log('lova val::', val);
        const {submitData = {}, value = {}} = val;
        const {properties = {}} = value;
        let list = [];
        if (Object.keys(properties).length > 0) {
            Object.keys(properties).map(tt => {
                list.push({label: properties[tt].title, value: '无', key: tt})
            })
        }
        if (Object.keys(properties).length > 0) {
            Object.keys(properties).map((tt, ttIndex) => {
                list[ttIndex].value = submitData[tt] || '无';
            });
        }
        let tabsList = [];
        list.map(item => {
            tabsList.push(item.label)
        });

        const formData = {
            formId: this.state.formId,
            info: val.submitData || {},
            tabs: tabsList,
        };
        const jsonData = {
            formId: this.state.formId,
            json: list || []
        };
        this.setState({
            subFormData: {
                formId: this.state.formId,
                info: val.submitData || {}
            }
        });
        const res = await dataApi.addData(formData);
        const jes = await jsonApi.addJson(jsonData);
        if (res.status === 0) {
            message.success("提交成功");
            this.props.history.push('/manage')
        }
    };

    render() {
        const {dataItems = {}} = this.state;

        return (
            <div className="playground content-box">
                <Card
                    title={dataItems.name || 'playground'}
                    extra={
                        dataItems.createdAt
                    }
                >
                    <ShowForm
                        showFormVisible={this.state.showFormVisible}
                        // onCancel={() => this.setState({showFormVisible: false})}
                        defaultValue={dataItems}
                        onSubmit={(val) => this.handleSubmit(val)}
                    />
                </Card>
            </div>
        )
    }
}
