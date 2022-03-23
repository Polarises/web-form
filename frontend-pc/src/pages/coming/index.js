import React, { PureComponent } from 'react';
import Coming from './components/Coming';
import { Card, Button, Table, Space, Modal, message, Popconfirm } from "antd";

/**
 * 在一个类上增加这个装饰器，表示这个类是一个未完成的功能，
 * 将会展示成一个即装到来的友好页面，可以设置倒计时时间
 * @param {*} options Coming 组件选项
 */
export default class coming extends React.Component {
    render() {
        return (
            <Card title="精彩即将呈现">
                <Coming
                    title="精彩即将呈现"
                    value={Date.now() + 1000 * 60 * 60 * 24 * 2}
                />
            </Card>
        )
    }
}
