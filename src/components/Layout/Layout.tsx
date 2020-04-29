import React, {useState} from "react";
import {Dropdown, Layout, Menu} from "antd";
import {UserOutlined, VideoCameraOutlined} from "@ant-design/icons";
import {Link} from "react-router-dom";
import {Routes} from "../../pages/Routes";
import {ReactComponent as Logo} from "./../../assets/logo/small_logo.svg";
import styles from "./layout.module.scss";

const {Content, Sider} = Layout;

export function PageLayout() {
    const homePage = "/regulations";
    const selectedHomePage = window.location.pathname === "/" ? homePage : window.location.pathname;
    const [selectedKey, setSelectedKey] = useState(selectedHomePage)
    const [isCollapsed, setCollapsed] = useState(false)

    const connectControlDropdown = (
        <Menu>
            <Menu.Item key="Settings">
                Settings
            </Menu.Item>
            <Menu.Item key="Account">
                Account
            </Menu.Item>
            <Menu.Item key="Log out">
                Log out
            </Menu.Item>
        </Menu>
    )

    return (
        <Layout >
            <Sider
                breakpoint="lg"
                collapsedWidth="0"
                theme={"light"}
                className={styles.extraExtraLightGrey}
                onCollapse={((collapsed, type) => setCollapsed(collapsed))}
                style={{minHeight: "100vh"}}
            >
                <div className={styles.logo}>
                    <Link to="/regulations" onClick={() => setSelectedKey('/regulations')}><Logo/></Link>
                </div>
                <Menu
                    mode="inline"
                    selectedKeys={[selectedKey]}
                    className={styles.extraExtraLightGrey}

                >
                    <Menu.Item key={"/regulations"} onClick={() => setSelectedKey('/regulations')}>
                        <UserOutlined/>
                        <Link to="/regulations" className="nav-text">
                            Overview
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="/controls" onClick={() => setSelectedKey('/controls')}>
                        <VideoCameraOutlined/>
                        <Link to="/controls" className="nav-text">
                            Controls
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="/tasks" onClick={() => setSelectedKey('/tasks')}>
                        <VideoCameraOutlined/>
                        <Link to="/tasks" className="nav-text">
                            Tasks
                        </Link>
                    </Menu.Item>
                </Menu>
                <div className={styles.profile} style={{display: (isCollapsed ? 'none' : ''), width: '175px'}}>
                    <Dropdown overlay={connectControlDropdown} trigger={['click']}>
                            <img src="https://www.w3schools.com/howto/img_avatar.png" alt="Avatar"/>
                    </Dropdown>
                    <Link to={"/"}>Joosep Sisas</Link>
                </div>
            </Sider>
            <Layout
                style={{background: "#fff", minWidth: "340px"}}
                className={styles.white}
            >
                <Content className={styles.white}>
                    <div
                        className="site-layout-background"
                        style={{padding: 24, minHeight: 360}}
                    >
                        <Routes/>
                    </div>
                </Content>
            </Layout>
        </Layout>
    );
}
