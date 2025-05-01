import React from 'react';
import { Outlet } from 'react-router-dom';
import { Layout, theme } from 'antd';
import CommonAside from '../components/commonAside';
import CommonHeader from '../components/commonHeader';
import CommonTag from '../components/commonTag';
import { useSelector } from 'react-redux'
import { RouterAuth } from '../router/routerAuth'

const { Content } = Layout;

const Main = () => {
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    const collapsed = useSelector(state => state.tab.isCollapse)

    return (
        <RouterAuth>
            <Layout className="main-container">
                <CommonAside collapsed={collapsed} />
                <Layout>
                    <CommonHeader collapsed={collapsed} />
                    <CommonTag></CommonTag>
                    <Content
                        style={{
                            margin: '10px 15px',
                            padding: 24,
                            minHeight: 280,
                            background: colorBgContainer,
                            borderRadius: borderRadiusLG,
                        }}
                    >
                        <Outlet>Content</Outlet>
                    </Content>
                </Layout>
            </Layout>
        </RouterAuth>
    );
}

export default Main;
