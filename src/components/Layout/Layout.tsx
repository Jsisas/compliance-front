import React, {useEffect, useState} from "react";
import {Dropdown, Layout, Menu} from "antd";
import {Link, useHistory} from 'react-router-dom'
import {Routes} from "../../pages/Routes";
import {ReactComponent as Logo} from "./../../assets/logo/small_logo.svg";
import styles from "./layout.module.scss";
import {AuthUtil} from "../../util/AuthUtil";

const {Content, Sider} = Layout;

export function PageLayout() {
    let history = useHistory();
    const homePage = "/regulations";
    const [selectedKey, setSelectedKey] = useState(history.location.pathname)
    const [isCollapsed, setCollapsed] = useState(false)
    const authentication = AuthUtil.getUserAuth();

    useEffect(() => {
        backButtonListener()
    })

    function backButtonListener() {
        window.addEventListener("popstate", e => {
            setSelectedKey(getSelectedKey())
        });
    }

    function getSelectedKey() {
        return window.location.pathname === "/" ? homePage : window.location.pathname;
    }

    function handleLogOut() {
        AuthUtil.logout()
        history.push("/login")
    }

    const connectControlDropdown = (
        <Menu>
            <Menu.Item key="Settings">
                Settings
            </Menu.Item>
            <Menu.Item key="Account">
                Account
            </Menu.Item>
            <Menu.Item key="Log out" onClick={() => handleLogOut()}>
                Log out
            </Menu.Item>
        </Menu>
    )

    return (
        <Layout>
            {!(history.location.pathname === '/login') &&
            <Sider
                breakpoint="lg"
                collapsedWidth="0"
                theme={"light"}
                className={styles.extraExtraLightGrey}
                onCollapse={((collapsed) => setCollapsed(collapsed))}
                style={{minHeight: "100vh"}}
            >
                <div className={styles.logo}>
                    <Link to="/regulations" onClick={() => setSelectedKey('/regulations')}><Logo/></Link>
                </div>
                <Menu
                    className={styles.sideMenu}
                    mode="inline"
                    selectedKeys={[selectedKey]}
                    
                >
                    <Menu.Item key={"/regulations"} onClick={() => setSelectedKey('/regulations')}>
                        <Link to="/regulations" className="nav-text">
                            Overview
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="/controls" onClick={() => setSelectedKey('/controls')}>
                        <Link to="/controls" className="nav-text">
                            Controls
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="/tasks" onClick={() => setSelectedKey('/tasks')}>
                        <Link to="/tasks" className="nav-text">
                            Tasks
                        </Link>
                    </Menu.Item>
                </Menu>
                <div className={styles.profile} style={{display: (isCollapsed ? 'none' : ''), width: '175px'}}>
                    <Dropdown overlay={connectControlDropdown} trigger={['click']}>
                        <img src={authentication?.user.picture} alt="Avatar"/>
                    </Dropdown>
                    <Link to={"/"}>{authentication?.user.name}</Link>
                </div>
            </Sider>
            }
            <Layout
                style={{background: "#fff", minWidth: "340px"}}
                className={styles.white}
            >
                <Content className={styles.white}>
                    <div
                        className="site-layout-background"
                        style={{padding: 24, minHeight: 360}}
                    >
                        <Routes isAuthenticated={authentication != null}/>
                    </div>
                </Content>
            </Layout>
        </Layout>
    );
}
