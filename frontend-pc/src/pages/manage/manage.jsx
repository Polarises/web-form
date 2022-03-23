import React, { Component } from "react";
import { Card, Button, Table, Space, Modal, message, Popconfirm } from "antd";
import { PlusOutlined, SwapRightOutlined } from "@ant-design/icons";
import "./manage.less";
import AddForm from "../../components/manage/addForm/addForm";
import EditForm from "../../components/manage/editForm/editForm";
import formApi from "../../api/form/formApi";
import Transform from './components/editForm'
import UseForm from './components/useForm'
import dayjs from "dayjs";

/*
    表单管理
*/

// 后续会变化的才放在state中
export default class manage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true, // table的加载状态
      manageData: [], // 表单数据
      parentId: "0", // 父类id
      parentName: "", // 父类名称
      addVisible: false, // 新增表单弹窗是否可见
      editVisible: false, // 修改表单弹窗是否可见
      editFormData: {}, // 编辑状态的表单数据
      editConfirmLoading: false, // 修改确认的loading
      typeData: [], // option的数据
        editFormVisible: false,
        defaultValue: {},
        useFormVisible: false,
    };
    this.columns = [
        {
            title: "表单ID",
            dataIndex: "_id",
            key: "_id",
            width: "10%",
        },
      {
        title: "表单名称",
        key: "name",
        width: "50%",
          render: (recode) => {
            return (
                <a onClick={() => {
                    this.editManageStart(recode);
                }}>{recode.name}</a>
            )
          }
      },
        {
            title: "创建时间",
            dataIndex: "createdAt",
            key: "createdAt",
            width: "15%",
        },
      {
        title: "操作",
        key: "action",
        render: (recode) => (
          <Space size="middle">
            <span
              className="link-tag"
              onClick={() => {
                this.editFormStart(recode);
              }}
            >
              修改
            </span>
            {this.state.parentId === "0" ? (
                <span
                    style={{color: 'blue'}}
                    className="link-tag"
                    onClick={() => this.goToFrPlayground(recode)}
                >
                访问链接
              </span>
            ) : null}
              <span
                  className="link-tag"
                  onClick={() => this.useFormStart(recode)}
              >
                表单数据
              </span>
              <span
                  className="link-tag"
                  // onClick={() => this.delFormData(recode)}
              >
                  <Popconfirm overlayClassName="confirm" placement="bottom" title="请确认是否删除该表单信息？" onConfirm={() => this.delFormData(recode)}>
                      <a className="f-fl" style={{color: 'red'}}>删除</a>
                  </Popconfirm>
              </span>
          </Space>
        ),
        width: "30%",
      },
    ];
  }

  delFormData = async (recode) => {
      const res = await formApi.deleteForm({_id: recode._id});
      if (res.status === 0) {
          message.success("删除成功");
          this.getFormList()
      }
  };
  editManageStart = (recode) => {
    this.setState({
      editVisible: true,
      editFormData: recode,
    });
  };
  editFormStart = (recode) => {
    this.setState({
      editFormData: recode,
        editFormVisible: true,
    });
  };
    useFormStart = (recode) => {
        /*this.setState({
            editFormData: recode,
            useFormVisible: true,
        });*/
        this.props.history.push(`/data/list/${recode._id}`)
    };
  editFormFinal = () => {
    this.setState({ editConfirmLoading: true });

    // 进行表单验证
    this.editForm.formRef.current
      .validateFields()
      .then(async (values) => {
        let { formName } = values;
        await formApi.updateForm({
            ...this.state.editFormData,
            name: formName,
        });
        message.success("修改成功");
          this.getFormList()
          this.setState({
          editVisible: false,
        });
      })
      .catch((err) => {
        message.error(err.message ? err.message : "格式不正确");
      })
      .finally(() => {
        this.setState({
          editConfirmLoading: false,
        });
      });
  };
  addManage = () => {
    this.addForm.formRef.current
      .validateFields()
      .then(async (value) => {
        let { parentId, formName } = value;
        await formApi.addManage(parentId, formName);
        message.success("添加成功");
        this.setState({
          addVisible: false,
        });
      })
      .catch((err) => {
        message.error(err.message ? err.message : "格式不正确");
      });
  };
  getFormList = async() => {
      const res = await formApi.getFormList();
      res.data.map(item => {
          if (item.createdAt) {
              item.createdAt = dayjs(item.createdAt).format("YYYY-MM-DD HH:mm:ss")
          }
      })
      this.setState({manageData: res.data, loading: false})
  };
    goToFrPlayground = (record) => {
        // window.open('/playground');
        this.props.history.push(`/playground/${record._id}`);
    };
    handleEdit = async val => {
        const res = await formApi.updateForm({
            ...this.state.editFormData,
            schemas: val
        });
        if (res.status === 0) {
            message.success("修改成功");
            this.setState({editFormVisible: false});
            this.getFormList()
        } else {
            console.log('log log')
        }
    };
    handleAdd = async val => {
        const res = await formApi.addForm({
            ...this.state.editFormData,
            schemas: val
        });
        if (res.status === 0) {
            message.success("修改成功");
            this.setState({editFormVisible: false});
            this.getFormList()
        } else {
            console.log('log log')
        }
    };
  componentDidMount() {
    this.getFormList();
  }
  render() {
    const title =
      this.state.parentId === "0" ? (
        "表单列表"
      ) : (
        <div>
          <span className="link-tag">
            表单列表
          </span>
          <span style={{ marginRight: "10px", marginLeft: "10px" }}>
            <SwapRightOutlined />
          </span>
          <span>{this.state.parentName}</span>
        </div>
      );
    return (
      <div className="manage content-box">
        <Card
          title={title}
          /*extra={
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={() => {
                this.setState({ editFormVisible: true, editFormData: {} });
              }}
            >
              添加
            </Button>
          }*/
          style={{ height: "100%" }}
        >
          <Table
            dataSource={this.state.manageData}
            columns={this.columns}
            bordered
            rowKey={(recode) => recode._id}
            loading={this.state.loading}
            pagination={{
              total: this.state.manageData.length, // 数据总数
              pageSize: 5, // 每页条数
              defaultCurrent: 1,
            }}
          />
        </Card>

        <Modal
          title="新增表单"
          visible={this.state.addVisible}
          onOk={() => {
            this.addManage();
          }}
          onCancel={() => {
            this.setState({ addVisible: false });
          }}
          okText="确认"
          cancelText="取消"
          destroyOnClose={true}
        >
          <AddForm
            typeData={this.state.typeData}
            parentId={this.state.parentId}
            ref={(addForm) => (this.addForm = addForm)}
          />
        </Modal>

        <Modal
          title="修改表单名称"
          visible={this.state.editVisible}
          onOk={() => {
            this.editFormFinal();
          }}
          onCancel={() => {
            this.setState({ editVisible: false });
          }}
          okText="确认"
          cancelText="取消"
          destroyOnClose={true}
          confirmLoading={this.state.editConfirmLoading}
        >
          <EditForm
            ref={(editForm) => (this.editForm = editForm)}
            editFormData={this.state.editFormData}
          />
        </Modal>

          <Transform
              editFormVisible={this.state.editFormVisible}
              onCancel={() => this.setState({editFormVisible: false})}
              defaultValue={this.state.editFormData}
              onSubmit={(val) => this.handleEdit(val)}
          />
          <UseForm
              editFormVisible={this.state.useFormVisible}
              onCancel={() => this.setState({useFormVisible: false})}
              defaultValue={this.state.editFormData}
              onSubmit={() => console.log('log submit::')}
          />
      </div>
    );
  }
}
