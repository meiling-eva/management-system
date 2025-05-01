import React from 'react'
import { getMenu } from '../../api'
import {useNavigate, Navigate } from 'react-router-dom'
import { Form, Input, Button, message } from 'antd'
import './login.css'


const Login = () => {
    const [messageApi, contextHolder] = message.useMessage();
    const navigate = useNavigate()

    //if already login, can not jump to login page, should navigate to home page instead
    if (localStorage.getItem('token')) {
        return <Navigate to="/home" replace />
    }

    const handleSubmit = (val) => {
        if (!val.username || !val.password) {
            return messageApi.open({
                type: 'warning',
                content: 'Please Input User Name and Password',
            });
        }
        getMenu(val).then(({ data }) => {
            console.log(data)
            debugger
            if (data.code === -999) {
                return messageApi.open({
                    type: 'warning',
                    content: 'Please Input Correct User Name and Password',
                });
            }
            //set token
            localStorage.setItem('token', data.data.token)
            navigate('/home')
        })
    }

    return (
        
        <Form
            className="login-container"
            labelCol={{ flex: '80px' }}
            onFinish={handleSubmit}
        >
            {contextHolder}
            <div className="login_title">Login</div>
            <Form.Item
                label="User Name"
                name="username"
                >
                <Input placeholder="Please input user name"></Input>
            </Form.Item>
            <Form.Item
                label="Password"
                name="password"
                >
                <Input.Password placeholder="Please input password"></Input.Password>
            </Form.Item>
            <Form.Item className="login-subbutton">
                <Button type="primary" htmlType="submit">Submit</Button>
            </Form.Item>
        </Form>
    )
}

export default Login