import React from "react";
import { Layout, Menu } from "antd";
import { UserOutlined, VideoCameraOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Routes } from "../../pages/Routes";
import { ReactComponent as Logo } from "./../../assets/logo/small_logo.svg";
import styles from "./layout.module.scss";

const { Content, Sider } = Layout;

export function PageLayout() {
  const homePage = "/insights";
  const currentPath = window.location.pathname;
  let defaultSelectedKey = currentPath.length < 2 ? homePage : currentPath;

  console.log(defaultSelectedKey);

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        breakpoint="lg"
        collapsedWidth="0"
        theme={"light"}
        className={styles.extraExtraLightGrey}
      >
        <div className={styles.logo}>
          <Logo></Logo>
        </div>

        <Menu
          mode="inline"
          defaultSelectedKeys={[defaultSelectedKey]}
          className={styles.extraExtraLightGrey}
        >
          <Menu.Item key={"/insights"}>
            <UserOutlined />
            <Link to="/insights" className="nav-text">
              Insights
            </Link>
          </Menu.Item>

          <Menu.Item key="/controls">
            <VideoCameraOutlined />
            <Link to="/controls" className="nav-text">
              Controls
            </Link>
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout
        style={{ background: "#fff", minWidth: "340px" }}
        className={styles.white}
      >
        <Content className={styles.white}>
          <div
            className="site-layout-background"
            style={{ padding: 24, minHeight: 360 }}
          >
            <Routes></Routes>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
}
