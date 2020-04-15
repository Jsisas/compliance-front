import React from "react";
import { Layout, Menu } from 'antd'
import { UserOutlined, VideoCameraOutlined } from '@ant-design/icons'
import { Link } from "react-router-dom";
import styled from 'styled-components';
import { Routes } from "../../pages/Routes";

const { Content, Sider } = Layout;

const Logo = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 64px;
`

export function PageLayout() {

    const homePage = '/insights';
    const currentPath = window.location.pathname;
    let defaultSelectedKey = currentPath.length < 2 ? homePage : currentPath;

    console.log(defaultSelectedKey);

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Sider breakpoint="lg" collapsedWidth="0" theme={"light"} style={{ background: "#f9f9f9" }}>

                <Logo className="logo" >
                    <h1>Alfred</h1>
                </Logo>

                <Menu mode="inline" defaultSelectedKeys={[defaultSelectedKey]} style={{ background: "#f9f9f9" }}>
                    <Menu.Item key={'/insights'}>
                        <UserOutlined />
                        <Link to='/insights' className="nav-text">Insights</Link>
                    </Menu.Item>

                    <Menu.Item key="/controls">
                        <VideoCameraOutlined />
                        <Link to='/controls' className="nav-text">Controls</Link>
                    </Menu.Item>
                </Menu>
            </Sider>
            <Layout style={{ background: "#fff", minWidth: '340px' }}>
                <Content style={{ background: "#fff" }}>
                    <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
                        <Routes></Routes>
                    </div>
                </Content>
            </Layout>
        </Layout>
    )
}