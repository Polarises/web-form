import React, { useState } from 'react';
import { Line, Column, PivotTable } from 'chart-render';

export default (props) => {
    const [component, setComponent] = useState('Line');
    const ChartRender = { Line, Column, PivotTable }[component];

    return (
        <div>
            <div style={{ marginBottom: 10 }}>
                <button
                    style={{ marginRight: 10 }}
                    className="ant-btn ant-btn-primary"
                    onClick={() => setComponent('Line')}
                >
                    折线图
                </button>
                <button
                    style={{ marginRight: 10 }}
                    className="ant-btn ant-btn-primary"
                    onClick={() => setComponent('Column')}
                >
                    柱状图
                </button>
                <button
                    style={{ marginRight: 10 }}
                    className="ant-btn ant-btn-primary"
                    onClick={() => setComponent('PivotTable')}
                >
                    交叉表
                </button>
            </div>

            <ChartRender
                meta={[
                    { id: 'date', name: '日期', isDim: true },
                    { id: 'pv', name: '数量', isDim: false },
                    // { id: 'uv', name: '访客数', isDim: false },
                ]}
                /*data={[
                    { date: '20200101', pv: 100, uv: 50 },
                    { date: '20200102', pv: 120, uv: 60 },
                    { date: '20200103', pv: 140, uv: 70 },
                    { date: '20200104', pv: 160, uv: 80 },
                ]}*/
                data={props.defaultData || []}
            />
        </div>
    );
};
