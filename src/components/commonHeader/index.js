import React from 'react';
import { Layout, Button, Avatar, Dropdown } from 'antd';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux'
import { collapseMenu } from '../../store/reducers/tab'
import { useNavigate } from 'react-router-dom'
import './index.css';

const { Header } = Layout;

const CommonHeader = ({ collapsed }) => {
    const navigate = useNavigate()

    const logOut = () => {
        //clear token
        localStorage.removeItem('token')
        navigate('/login')
    }

    const items = [
        {
            key: '1',
            label: (
                <a target="_blank" rel="noopener noreferrer">
                    User Info 
                </a>
            ),
        },
        {
            key: '2',
            label: (
                <a target="_blank" rel="noopener noreferrer">
                    Setting
                </a>
            ),
            //icon: <SmileOutlined />
        },
        {
            key: '3',
            label: (
                <a onClick={() => logOut() } target="_blank" rel="noopener noreferrer">
                    Log Out
                </a>
            )
        }
    ];

    const dispatch = useDispatch()
    const setCollapsed = () => {
        console.log(collapsed);
        dispatch(collapseMenu());
    }

    return (
        <Header className="header-container">
            <Button
                type="text"
                icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                style={{
                    fontSize: '16px',
                    width: 56,
                    height: 35,
                    backgroundColor:'#fff'
                }}
                onClick={() => { setCollapsed() }}
            />
            <Dropdown menu={{ items } }>
                <Avatar size={40} src={<img src={require("../../assets/images/useravator.png")}></img>} />
            </Dropdown>
           
        </Header>
    )
}

export default CommonHeader;