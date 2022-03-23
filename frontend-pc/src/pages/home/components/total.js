import React, { Component } from 'react';
// 引入 ECharts 主模块
import * as echarts from 'echarts';

class Total extends Component {
    constructor(props) {
        super(props);
        this.state = {
            infoData: {},
            option: {},
        };
    }
    componentWillReceiveProps(nextProps, nextContext) {
        if (nextProps.total) {
            this.setState({infoData: nextProps.total}, () => {
                this.setChartOption()
            });
        }
    }
    componentDidMount() {
        this.setChartOption()
    }
    setChartOption() {
        // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.getElementById('main'));
        const option = {
            title: {
                text: 'Data Statistics'
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'shadow'
                }
            },
            legend: {},
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            xAxis: {
                type: 'value',
                boundaryGap: [0, 0.01]
            },
            yAxis: {
                type: 'category',
                data: ['Total']
            },
            series: [
                {
                    name: 'Form 表单',
                    type: 'bar',
                    data: [this.state.infoData.form || 0]
                },
                {
                    name: 'Data 数据',
                    type: 'bar',
                    data: [this.state.infoData.data || 0]
                }
            ]
        };
// 绘制图表
        myChart.setOption(option);
    }
    render() {
        return (
            <div className="dashboard">
                <div style={{display: 'flex', justifyContent: 'space-around', marginBottom: '25px'}}>
                    <div id="main" style={{ width: 1200, height: 150 }} />
                </div>
            </div>
        );
    }
}

export default Total;
