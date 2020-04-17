import React, {useState} from "react";
import {Layout, Menu} from "antd";
import {UserOutlined, VideoCameraOutlined} from "@ant-design/icons";
import {Link} from "react-router-dom";
import {Routes} from "../../pages/Routes";
import {ReactComponent as Logo} from "./../../assets/logo/small_logo.svg";
import styles from "./layout.module.scss";

const {Content, Sider} = Layout;

export function PageLayout() {
    const [selectedKey, setSelectedKey] = useState(window.location.pathname)

    return (
        <Layout style={{minHeight: "100vh"}}>
            <Sider
                breakpoint="lg"
                collapsedWidth="0"
                theme={"light"}
                className={styles.extraExtraLightGrey}
            >
                <div className={styles.logo}>
                    <Link to="/insights" onClick={() => setSelectedKey('/insights')}><Logo/></Link>
                </div>
                <Menu
                    mode="inline"
                    selectedKeys={[selectedKey]}
                    className={styles.extraExtraLightGrey}
                >
                    <Menu.Item key={"/insights"} onClick={() => setSelectedKey('/insights')}>
                        <UserOutlined/>
                        <Link to="/insights" className="nav-text">
                            Insights
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="/controls" onClick={() => setSelectedKey('/controls')}>
                        <VideoCameraOutlined/>
                        <Link to="/controls" className="nav-text">
                            Controls
                        </Link>
                    </Menu.Item>
                </Menu>
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
