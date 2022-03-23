import React, { Component } from "react";
import {Card, Button, Table, message, Modal, Form, Select, Input} from "antd";
import { withRouter } from "react-router-dom";
import Generator from 'fr-generator';
import './index.less';
import Transform from './transform'
import formApi from "../../../api/form/formApi";

const { Provider, Sidebar, Canvas, Settings } = Generator;
const { Item } = Form;

const defaultValue = {
  "type": "object",
  "properties": {
    "inputName": {
      "title": "姓名",
      "placeholder": "请输入姓名",
      "type": "string",
      "props": {}
    }
  },
  "labelWidth": 120,
  "displayType": "row",
  "preview": "true"
}

class formHome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pageNow: 1, // 当前页数
      pageSize: 3, // 一页数据量
      pageAll: 1, // 总页数
      dataLength: 10,
      loading: true,
      cutPageStatus: 0, // 0代表获取全部的商品列表 1则是搜索列表
      dataItem: {},
      dataSchema: {},
      formModel: {
        visible: false,
        name: '',
      },
    };
  }

  componentDidMount() {
   /* const ele = document.getElementsByClassName('dnd-container')
    // console.log('log eele::', ele[0].classList.remove('edit'))
    // 最终预览
    ele[0].classList.remove('edit')
    ele[0].classList.add('preview')
    ele[0].getElementsByTagName('div')[0].style.height = '33px'
    const field = document.getElementsByClassName('field-wrapper')
    console.log('log ele,', ele[0].getElementsByTagName('ul').style)
    // console.log('log eele::', trAllDom)
    const treeHei = 66;
    let trAllDom = document.getElementsByClassName('field-wrapper');
    var x = document.querySelectorAll("field-wrapper");
    console.log('log eele::', trAllDom, trAllDom.length, x)
    for(let i = 0; i < trAllDom.length; i++){
      trAllDom[i].style.height = treeHei + "px";
    }*/
    const ele = document.getElementsByClassName('dnd-container')
    // 获取文档中所有 class="example" 的 <p> 元素
    var x = document.querySelectorAll("div.dnd-container");
    // ele[0].querySelectorAll("div")[0].parentNode.removeChild(ele[0].querySelectorAll("div")[0])
    console.log('log xxx::', x, ele[0].querySelectorAll("div"))
  }
  goToFrPlayground = (e) => {
    // window.open('/playground');
  };
  createSave = async () => {
    this.setState({
      formModel: {visible: true}
    })
  };
  setSchema = (ma) => {
    this.setState({dataSchema: ma})
  };
  handleOk = async () => {
    if (this.formRef.current.getFieldValue('formName')) {
      const {dataSchema = {}} = this.state;
      if (dataSchema.properties) {
        let formData = {
          name: this.formRef.current.getFieldValue('formName'),
          schemas: dataSchema
        };
        const res = await formApi.addForm(formData);
        if (res.status === 0) {
          this.onClose();
          message.success('新增成功！！');
          Modal.confirm({
            title: '继续编辑?',
            content: '',
            okText: '查看表单',
            okType: 'danger',
            cancelText: '继续编辑',
            onOk: () => {
              this.props.history.push("/manage");
            },
            onCancel() {
              console.log('Cancel');
            },
          });
        }
      } else {
        let formData = {
          name: this.formRef.current.getFieldValue('formName'),
          schemas: defaultValue
        };
        const res = await formApi.addForm(formData);
        if (res.status === 0) {
          this.onClose();
          message.success('新增成功！！');
          Modal.confirm({
            title: '继续编辑?',
            content: '',
            okText: '查看表单',
            okType: 'danger',
            cancelText: '继续编辑',
            onOk: () => {
              this.props.history.push("/manage");
            },
            onCancel() {
              console.log('Cancel');
            },
          });
        }
      }
    } else {
      message.error('请输入表单名称！！')
    }
  };
  onClose() {
    this.setState({formModel: {visible: false}});
    this.formRef.current.resetFields();
  };
  formRef = React.createRef();

  render() {
    return (
      <div className="content-box">
        <Card
          title="表单创建"
        >
          <div style={{ height: '80vh' }}>
            <Generator
                defaultValue={defaultValue}
                // extraButtons={[false, false, false, false, { text: '测试', onClick: val => this.goToFrPlayground(val) }]}
                // settings={[]}
                // commonSettings={{}}
                // globalSettings={{}}
                // extraButtons={[{ text: '去playground验证', onClick: this.goToFrPlayground }]}
                extraButtons={[true, true, true, false, { text: '保存表单', onClick: this.createSave }]}
                onChange={data => console.log('data:change', this.setState({dataItem: data}))}
                onSchemaChange={schema => this.setSchema(schema)}
                hideId={true}
                preview={true}
                canDelete={true}
                // controlButtons={[false, false, {text: '按钮选择666', onClick: console.log('log 6666')}]}
                // controlButtons={[false, false]}
            />
          </div>
          <div className="fr-generator-playground" style={{ height: '40vh' }}>
            {/*<Provider
                onChange={data => console.log('data:change', data)}
                onSchemaChange={schema => console.log('schema:change', schema)}
                defaultValue={defaultValue}
                hideId={true}
                // extraButtons={[ { text: '最终展示', onClick: val => this.goToFrPlayground(val) }, false, false, false, false]}
                // extraButtons={[true, false, false, false, false]}
            >
              <div className="fr-generator-container">
                <Sidebar fixedName />
                <Canvas defaultValue={defaultValue} />
                <Settings />
              </div>
            </Provider>*/}

            {/*<Transform />*/}

            <Modal
                visible={this.state.formModel.visible}
                onCancel={() => this.onClose()}
                onOk={() => this.handleOk()}
                okText="保存"
                cancelText="取消"
                width="40%"
                bodyStyle={{ height: '25vh', padding: '40px' }}
            >
              <div>
                <Card title="表单名称">
                  <Form ref={this.formRef}>
                    <Item
                        label="表单名称"
                        className="form-item"
                        name="formName"
                        initialValue={undefined}
                        rules={[{ required: true }]}
                    >
                      <Input
                          placeholder="请输入表单名称"
                          style={{ marginRight: "10px" }}
                      />
                    </Item>
                  </Form>
                </Card>
              </div>
            </Modal>
          </div>
        </Card>
      </div>
    );
  }
}

export default withRouter(formHome);
