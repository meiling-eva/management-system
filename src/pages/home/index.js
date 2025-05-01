import React, { useEffect, useState } from 'react'
import { Col, Row, Card, Table } from 'antd'
import * as Icon from '@ant-design/icons'
import "./home.css"
import { getData } from '../../api'
import Echarts from '../../components/Echarts'

const columns = [
    {
        title: 'Brand',
        dataIndex: 'brand',
        key: 'brand'
    },
    {
        title: 'Daily Sales',
        dataIndex: 'dailySales',
        key: 'dailySales'
    },
    {
        title: 'Month Sales',
        dataIndex: 'monthSales',
        key: 'monthSales'
    },
    {
        title: 'Total Sales',
        dataIndex: 'totalSales',
        key: 'totalSales'
    }
]

//order data
const countData = [
    {
        "name": "Daily Sales",
        "value": 14556,
        "icon": "SmileOutlined",
        "color": "#2ec7c9"
    },
    {
        "name": "Daily Unsales",
        "value": 1204,
        "icon": "MehOutlined",
        "color": "#5ab1ef"
    },
    {
        "name": "Daily Other Sales",
        "value": 181,
        "icon": "LikeOutlined",
        "color": "#ffb980"
    },
    {
        "name": "Month Sales",
        "value": 566234,
        "icon": "SmileOutlined",
        "color": "#2ec7c9"
    },
    {
        "name": "Month Unsales",
        "value": 13234,
        "icon": "MehOutlined",
        "color": "#5ab1ef"
    },
    {
        "name": "Month Other Sales",
        "value": 3421,
        "icon": "LikeOutlined",
        "color": "#ffb980"
    }
]

const iconToElement = (name) => React.createElement(Icon[name])

const Home = () => {
    const userImg = require("../../assets/images/useravator.png")

    const [echartData, setEchartData] = useState({})
    //add a state variable to your component
    const [tableData, setTableData] = useState([])

    //synchronize a component with an external system
    useEffect(() => {
        getData().then(({ data }) => {
            console.log(data, 'data')
            const { tableData, orderData, userData, videoData } = data.data
            setTableData(tableData);

            //Echarts data
            const order = orderData
            //x aris
            const xData = order.date
            // series
            const keyArray = Object.keys(order.data[0])
            const series = []
            keyArray.forEach(key => {
                series.push({
                    name: key,
                    data: order.data.map(item => item[key]),
                    type: 'line'
                })
            })
            setEchartData({
                order: {
                    xData,
                    series
                },
                user: {
                    xData: userData.map(item => item.date),
                    series: [{
                        name: 'New Users',
                        data: userData.map(item => item.new),
                        type: 'bar'
                    },
                    {
                        name: 'Active User',
                        data: userData.map(item => item.active),
                        type: 'bar'
                    }
                    ]
                },
                video: {
                    series: [
                        {
                            data: videoData,
                            type: 'pie'
                        }
                    ]
                }
            })
        })
    }, [])

    return (
        <Row className="home">
            <Col span={8}>
                <Card hoverable>
                    <div className="user">
                        <img src={userImg} alt="" />
                        <div className="userInfo">
                            <p className="name">Admin</p>
                            <p className="role">Administration</p>
                        </div>
                    </div>
                    <div className="login-info">
                        <p>Last Login Date:<span className="lastLogDate">10/04/2025</span></p>
                        <p>Last Login Location:<span>Australia</span></p>
                    </div>
                </Card>
                <Card className="brandName">
                    <Table rowKey={"brand"} columns={columns} dataSource={tableData} pagination={false}>
                    </Table>
                </Card>
            </Col>
            <Col span={16}>
                <div className="num">
                    {
                        countData.map((item, index) => {
                            return (
                                <Card key={index}>
                                    <div className="icon-box" style={{ background: item.color }}>
                                        {iconToElement(item.icon)}
                                    </div>
                                    <div className="details">
                                        <p className="detailsValue">{item.value}</p>
                                        <p className="detailsName">{item.name}</p>
                                    </div>
                                </Card>
                            )
                        })
                    }
                </div>
                {echartData.order && <Echarts chartData={echartData.order} style={{ height: '280px' }}> </Echarts>}
                <div className="graphes">
                    {echartData.user && <Echarts chartData={echartData.user} style={{ height: '240px', width: '50%' }} />}
                    {echartData.video && <Echarts chartData={echartData.video} isAxisChart={false} style={{ height: '240px', width: '50%' }} />}
                </div>
            </Col>
        </Row>
    )
}

export default Home;