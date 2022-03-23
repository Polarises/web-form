import React, { Component } from "react";
import { Form, Select, Input, Button } from "antd";
import "./searchItem.less";
const { Option } = Select;
const { Item } = Form;
export default class searchItem extends Component {
  formRef = React.createRef();
  render() {
    return (
      <div>
        <Form className="form" ref={this.formRef}>
          <Item
            className="form-item"
            name="searchType"
            initialValue="formName"
            rules={[{ required: true }]}
          >
            <Select style={{ width: "150px", marginRight: "10px" }}>
              <Option value="formName">按名称搜索</Option>
              <Option value="formDesc">按描述搜索</Option>
            </Select>
          </Item>
          <Item
            className="form-item"
            name="string"
            initialValue=""
            rules={[{ required: false }]}
          >
            <Input
              placeholder="关键字"
              style={{ width: "170px", marginRight: "10px" }}
            />
          </Item>
          <Item className="form-item">
            <Button type="primary" onClick={this.props.onSearch}>
              搜索
            </Button>
          </Item>
        </Form>
      </div>
    );
  }
}

/*
<div>
        <Select
          defaultValue="formName"
          style={{ width: "150px", marginRight: "10px" }}
          onChange={(value) => (this.searchType = value)}
        >
          <Option value="formName">按名称搜索</Option>
          <Option value="formDesc">按描述搜索</Option>
        </Select>
        <Input
          placeholder="关键字"
          style={{ width: "170px", marginRight: "10px" }}
        ></Input>
        <Button type="primary" onClick={this.props.onSearch}>
          搜索
        </Button>
      </div>
*/
