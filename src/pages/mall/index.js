import React from 'react'
import { useNavigate } from 'react-router-dom'
import { setCurrentMenu } from '../../store/reducers/tab'
import { useSelector, useDispatch } from 'react-redux'
import { Space, Typography, Button, Card, Col } from 'antd'
import { EnvironmentOutlined, SunOutlined } from '@ant-design/icons'
import './mall.css'

const { Text, Title } = Typography;

const memberOptionsData = [
    {
        "type": "HOME",
        "clubAccess": "Single Club",
        "price": "$21.99",
        "color":"#E9967A",
        "linkPage":"/memhome"
    },
    {
        "type": "PASSPORT",
        "clubAccess": "All Passport Clubs",
        "price": "$27.99",
        "color": "#D2691E",
        "linkPage": "/passport"
    },
    {
        "type": "PLATINUM",
        "clubAccess": "40+ Clubs",
        "price": "$32.99",
        "color": "#DCDCDC",
        "linkPage": "/platinum"
    },
    {
        "type": "PLATINUM PLUS",
        "clubAccess": "All Passport and Platinum Clubs",
        "price": "$37.99",
        "color": "#FFD700",
        "linkPage": "/platinumplus"
    },
    {
        "type": "TITANIUM",
        "clubAccess": "City Only",
        "price": "$39.99",
        "color": "#DAA520",
        "linkPage": "/titanium"
    },
    {
        "type": "BLACK LABEL",
        "clubAccess": "City and Bondi",
        "price": "$58.99",
        "color": "#2F4F4F",
        "linkPage": "/blacklabel"
    },
]

const Mall = () => {
    const currentMenu = useSelector(state => state.tab.currentMenu)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const handleClick = (linkPage) => {
        //console.log(linkPage)
        //dispatch(setCurrentMenu(linkPage))
        //navigate(linkPage)
    }

    return (
        <div>
            <Title  className="mallTitle">Membership Options</Title> 
            <div className="memberOptions">
                {
                    memberOptionsData.map((item, index) => {
                        return (
                            <Col span={8} style={{ minWidth: '20rem' }}>
                                <Card className="memOptCards" title={item.type} key={index} style={{ borderTopColor: item.color, borderRightColor: item.color }} hoverable>
                                    <div className="memCard">
                                        <Space direction="vertical" style={{width: '100%'}} > 
                                            <div className="memAccess">
                                                <Text >{React.createElement(EnvironmentOutlined)}Club Access <Text className="clubAccess">{item.clubAccess}</Text></Text>
                                            </div>
                                            <Text>{React.createElement(SunOutlined)}Price Per Week Below</Text>
                                            <Text className="memStart">Starting From</Text>
                                            <Text className="memPrice" style={{ justifyContent: 'center' }}>{item.price}</Text>
                                            <Button danger className="memBtn" onClick={() => { handleClick(item.linkPage) }}>View {item.type} Clubs</Button>
                                        </Space>
                                        
                                    </div>
                                </Card>
                            </Col>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default Mall;