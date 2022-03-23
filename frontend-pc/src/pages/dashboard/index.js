import React, { Component } from 'react';
/*// 引入 ECharts 主模块
import echarts from 'echarts/lib/echarts';
// 引入柱状图
import  'echarts/lib/chart/bar';
// 引入提示框和标题组件
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';*/
import * as echarts from 'echarts';
import {Card} from "antd";
import './index.less'
import infoApi from "../../api/info/infoApi";
import formApi from "../../api/form/formApi";
import dayjs from "dayjs";

class EchartsTest extends Component {
    constructor(props) {
        super(props);
        this.state = {
            infoData: {},
            allData: {},
            formList: [],
            formData: [],
            formNameList: [],
            firstChartData: [0, 0, 0, 0, 0, 0, 0],
            _7daysData: [0, 0, 0, 0, 0, 0, 0],
            pieData: [
                /*{ value: 1048, name: 'Search Engine' },
                { value: 735, name: 'Direct' },
                { value: 580, name: 'Email' },
                { value: 484, name: 'Union Ads' },
                { value: 300, name: 'Video Ads' }*/
            ],        // pie 饼图 接口数据
        };
    }
    componentDidMount() {
        this.getInfoData();
        this.getFormList();
        this.getPieInfoData();
        this.getDashboardAll();

        this.setChart1();

        this.setChart2();

        this.setChart3();

        this.setChart4();

        this.setChart5();
    }
    setChart1 = () => {
        let days;
        this.getDay(0);  //当天日期数  只有日
        this.getDay(-7);  //7天前日期数  只有日
        days = this.getDayBefore(-7);

        // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.getElementById('main'));
// 绘制图表
        myChart.setOption({
            title: {
                text: 'Form 表单近7日数据'
            },
            tooltip: {},
            xAxis: {
                data: days
            },
            yAxis: {},
            series: [
                {
                    name: '销量',
                    type: 'bar',
                    data: this.state.firstChartData
                }
            ]
        });
    };
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
        if(month.toString().length === 1){
            m = "0" + month;
        }
        return m;
    }
    setChart2 = () => {
        const {formNameList = []} = this.state;
        console.log('log name::', this.state.formNameList);
        const option = {
            title: {
                // text: 'Stacked Area Chart'
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'cross',
                    label: {
                        backgroundColor: '#6a7985'
                    }
                }
            },
            legend: {
                // data: ['Email', 'Union Ads', 'Video Ads', 'Direct', 'Search Engine']
                data: this.state.formNameList.slice(0, 7)
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            xAxis: [
                {
                    type: 'category',
                    boundaryGap: false,
                    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
                }
            ],
            yAxis: [
                {
                    type: 'value'
                }
            ],
            series: [
                {
                    name: formNameList[0],
                    type: 'line',
                    stack: 'Total',
                    areaStyle: {},
                    emphasis: {
                        focus: 'series'
                    },
                    // data: [120, 132, 101, 134, 90, 230, 210]
                    data: this.state.firstChartData
                },
                {
                    name: formNameList[1],
                    type: 'line',
                    stack: 'Total',
                    areaStyle: {},
                    emphasis: {
                        focus: 'series'
                    },
                    // data: [220, 182, 191, 234, 290, 330, 310]
                    data: this.state.firstChartData
                },
                {
                    name: formNameList[2],
                    type: 'line',
                    stack: 'Total',
                    areaStyle: {},
                    emphasis: {
                        focus: 'series'
                    },
                    // data: [150, 232, 201, 154, 190, 330, 410]
                    data: this.state.firstChartData
                },
                {
                    name: formNameList[3],
                    type: 'line',
                    stack: 'Total',
                    areaStyle: {},
                    emphasis: {
                        focus: 'series'
                    },
                    // data: [320, 332, 301, 334, 390, 330, 320]
                    data: this.state.firstChartData
                },
                {
                    name: formNameList[4],
                    type: 'line',
                    stack: 'Total',
                    areaStyle: {},
                    emphasis: {
                        focus: 'series'
                    },
                    // data: [820, 932, 901, 934, 1290, 1330, 1320]
                    data: this.state.firstChartData
                },
                {
                    name: formNameList[5],
                    type: 'line',
                    stack: 'Total',
                    areaStyle: {},
                    emphasis: {
                        focus: 'series'
                    },
                    // data: [320, 332, 301, 334, 390, 330, 320]
                    data: this.state.firstChartData
                },
                {
                    name: formNameList[6],
                    type: 'line',
                    stack: 'Total',
                    areaStyle: {},
                    emphasis: {
                        focus: 'series'
                    },
                    // data: [320, 332, 301, 334, 390, 330, 320]
                    data: this.state.firstChartData
                },
            ]
        };
        var myChart2 = echarts.init(document.getElementById('main2'));
        myChart2.setOption(option);
    }
    setChart3 = () => {
        const option3 = {
            title: {
                text: 'Analysis of a Website',
                subtext: 'Form Data',
                left: 'right'
            },
            tooltip: {
                trigger: 'item'
            },
            legend: {
                orient: 'vertical',
                left: 'left'
            },
            series: [
                {
                    name: 'Access From',
                    type: 'pie',
                    radius: '50%',
                    data: this.state.pieData,
                    emphasis: {
                        itemStyle: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    }
                }
            ]
        };
        var myChart3 = echarts.init(document.getElementById('main3'));
        myChart3.setOption(option3);
    };
    setChart4 = () => {
        const categories = (function () {
            let now = new Date();
            let res = [];
            let len = 10;
            while (len--) {
                res.unshift(now.toLocaleTimeString().replace(/^\D*/, ''));
                now = new Date(+now - 2000);
            }
            return res;
        })();
        const categories2 = (function () {
            let res = [];
            let len = 10;
            while (len--) {
                res.push(10 - len - 1);
            }
            return res;
        })();
        const data = (function () {
            let res = [];
            let len = 10;
            while (len--) {
                res.push(Math.round(Math.random() * 1000));
            }
            return res;
        })();
        const data2 = (function () {
            let res = [];
            let len = 0;
            while (len < 10) {
                res.push(+(Math.random() * 10 + 5).toFixed(1));
                len++;
            }
            return res;
        })();
        const option4 = {
            title: {
                text: '虚拟数据',
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'cross',
                    label: {
                        backgroundColor: '#283b56'
                    }
                }
            },
            legend: {
                left: 'right'
            },
            dataZoom: {
                show: false,
                start: 0,
                end: 100
            },
            xAxis: [
                {
                    type: 'category',
                    boundaryGap: true,
                    data: categories
                },
                {
                    type: 'category',
                    boundaryGap: true,
                    data: categories2
                }
            ],
            yAxis: [
                {
                    type: 'value',
                    scale: true,
                    name: 'Price',
                    max: 30,
                    min: 0,
                    boundaryGap: [0.2, 0.2]
                },
                {
                    type: 'value',
                    scale: true,
                    name: 'Order',
                    max: 1200,
                    min: 0,
                    boundaryGap: [0.2, 0.2]
                }
            ],
            series: [
                {
                    name: 'Dynamic Bar',
                    type: 'bar',
                    xAxisIndex: 1,
                    yAxisIndex: 1,
                    data: data
                },
                {
                    name: 'Dynamic Line',
                    type: 'line',
                    data: data2
                }
            ]
        };
        let app = {};
        app.count = 11;
        setInterval(function () {
            let axisData = new Date().toLocaleTimeString().replace(/^\D*/, '');
            data.shift();
            data.push(Math.round(Math.random() * 1000));
            data2.shift();
            data2.push(+(Math.random() * 10 + 5).toFixed(1));
            categories.shift();
            categories.push(axisData);
            categories2.shift();
            categories2.push(app.count++);
            myChart4.setOption({
                xAxis: [
                    {
                        data: categories
                    },
                    {
                        data: categories2
                    }
                ],
                series: [
                    {
                        data: data
                    },
                    {
                        data: data2
                    }
                ]
            });
        }, 2100);
        var myChart4 = echarts.init(document.getElementById('main4'));
        myChart4.setOption(option4);
    }
    setChart5 = () => {
        let formNameList = this.state.formNameList;
        let option5 = {
            title: {
                text: '7日内数据比对'
            },
            legend: {
                data: ['Form 表单', 'Data 数据'],
                left: 'right'
            },
            radar: {
                // shape: 'circle',
                indicator: [
                    { name: 'Sales' },
                    { name: 'Administration' },
                    { name: 'Information Technology' },
                    { name: 'Customer Support' },
                    { name: 'Development' },
                    { name: 'Marketing' }
                ]
                // indicator: this.state.formNameList
                // indicator: formNameList
            },
            series: [
                {
                    name: 'Form 表单 vs Data 数据',
                    type: 'radar',
                    data: [
                        {
                            // value: [4200, 3000, 20000, 35000, 50000, 18000],
                            value: this.state.firstChartData,
                            name: 'Form 表单'
                        },
                        {
                            // value: [5, 14, 2, 26, 4, 21],
                            value: this.state._7daysData,
                            name: 'Data 数据'
                        }
                    ]
                }
            ]
        };
        /*if (formNameList.length > 0) {
            option5.radar.indicator = formNameList
        } else {
            option5.radar.indicator = []
        }*/
        var myChart5 = echarts.init(document.getElementById('main5'));
        myChart5.setOption(option5);
    }

    async getInfoData() {
        const res = await infoApi.getDashboardInfo();
        this.setState({infoData: res.data});
    }
    async getDashboardAll() {
        const res = await infoApi.getDashboardAll();
        if (res.status === 0) {
            this.setState({allData: res.data});
            const {formList = [], dataList = []} = res.data;
            let arrList = [];
            let formNameList = [];
            let timeList = this.getDayBefore(-7);
            let firstChart = this.state.firstChartData;
            let _7daysData = this.state._7daysData;
            formList.map(form => {
                form.createdAt = dayjs(form.createdAt).format("YYYY-MM-DD")
                form.value = 0;
                dataList.map(data => {
                    if (data.formId == form._id) {
                        form.value = form.value + 1;
                    }
                });
                arrList.push({
                    value: form.value,
                    name: form.name,
                });
                formNameList.push(form.name);
                timeList.map((time, timeIndex) => {
                    if (form.createdAt === time) {
                        firstChart[timeIndex] = firstChart[timeIndex] + 1;
                    }
                })
            });
            dataList.map(data => {
                data.createdAt = dayjs(data.createdAt).format("YYYY-MM-DD")
                timeList.map((time, timeIndex) => {
                    if (data.createdAt === time) {
                        _7daysData[timeIndex] = _7daysData[timeIndex] + 1;
                    }
                })
            });
            console.log('log arr list;:', formList, arrList, formNameList, _7daysData)

            // 1.柱状图 近7日 form 表单数据；
            this.setState({firstChartData: firstChart}, () => {
                this.setChart1();
            });
            // 2.堆叠图 近7日 data 数据信息；
            // 3.雷达图 form data 数据比对；
            this.setState({formNameList, _7daysData}, () => {
                this.setChart5();
                this.setChart2();
            });
        }
    }
    getFormList = async () => {
        const res = await formApi.getFormList();
        this.setState({formList: res.data});
        let list = [];
        (res.data || []).map(item => {
            list.push(item.name);
        });
        this.setState({formData: list}, () => {
        });
    };
    getPieInfoData = async () => {
        const pie = await infoApi.getPieInfo();
        if (pie.status === 0) {
            this.setState({pieData: pie.data}, () => {
                this.setChart3();
            })
        }
    };
    getDataList = async () => {
        const res = await formApi.getFormList();
        this.setState({formList: res.data});
        let list = [];
        (res.data || []).map(item => {
            list.push(item.name);
        });
        this.setState({formData: list}, () => {
        });
    };
    render() {
        return (
            <div className="dashboard">
                <div className="card-item">
                    <Card title="图表分析">
                        <div style={{display: 'flex', justifyContent: 'space-around', marginBottom: '25px'}}>
                            <div id="main" style={{ width: 400, height: 400 }} />
                            <div id="main2" style={{ width: 400, height: 400 }} />
                        </div>
                        <div style={{display: 'flex', justifyContent: 'space-around', marginBottom: '25px'}}>
                            <div id="main3" style={{ width: 400, height: 400 }} />
                            <div id="main4" style={{ width: 400, height: 400 }} />
                        </div>
                    </Card>
                </div>
                <div className="card-item">
                    <Card title="数据分析">
                        <div style={{display: 'flex', justifyContent: 'space-around', marginBottom: '25px'}}>
                            <div id="main5" style={{ width: 400, height: 400 }} />
                            <div id="main6" style={{ width: 400, height: 400 }} />
                        </div>
                    </Card>
                </div>
            </div>
        );
    }
}

export default EchartsTest;
