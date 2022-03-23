import React, { Component } from "react";
import { Form, Select, Input } from "antd";
const { Item } = Form;
const { Option } = Select;
export default class addForm extends Component {

  // 非常好用哈哈哈 绑定到表单上 ref
  formRef = React.createRef();
  render() {
    const defaultValue = this.props.parentId;
    return (
      <Form ref={this.formRef}>
        {/* name很重要 后面表单验证成功后 这个作为键值 */}
        <Item initialValue={defaultValue} name="parentId" label="所属表单" rules={[{ required: true, message: "请输入表单名称!" }]}>
          <Select >
            {this.props.typeData.map((item) => {
              return (
                <Option value={item._id} key={item._id}>
                  {item.name}
                </Option>
              );
            })}
          </Select>
        </Item>
        <Item label="表单名称" initialValue="" name="formName" rules={[{ required: true, message: "请输入表单名称!" }]}>
          <Input />
        </Item>
      </Form>
    );
  }
}
