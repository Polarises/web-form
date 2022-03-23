import React, { Component } from "react";
import { Form, Input } from "antd";
// import { FormInstance } from 'antd/lib/form';
const { Item } = Form;

export default class editForm extends Component {
  formRef = React.createRef();
  render() {
    return (
      <Form ref={this.formRef}>
        <Item
          rules={[{ required: true, message: "请输入表单名称!" }]}
          name="formName"
          label="表单名称"
          initialValue={this.props.editFormData.name}
        >
          <Input />
        </Item>
      </Form>
    );
  }
}
