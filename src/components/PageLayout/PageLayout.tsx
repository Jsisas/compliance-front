import React, { useEffect, useState } from 'react';
import { Dropdown, Layout, Menu } from 'antd';
import { Link } from 'react-router-dom';
import { Routes } from '../../pages/Routes';
import { ReactComponent as Logo } from './../../assets/logo/small_logo.svg';
import styles from './PageLayout.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/reducer';
import { clearAuth, getAuthentication } from '../../redux/Auth/AuthSlice';
import { authenticate } from '../../redux/Auth/AuthService';

const { Content, Sider } = Layout;

export function PageLayout(): JSX.Element {
	const homePage = '/regulations';
	const [selectedKey, setSelectedKey] = useState(getSelectedKey());
	const [isCollapsed, setCollapsed] = useState(false);
	const authentication = useSelector((state: RootState) => getAuthentication(state));
	const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);

	const dispatch = useDispatch();
	useEffect(() => {
		if (!isAuthenticated && authentication && authentication.token) {
			dispatch(authenticate(authentication.token));
		}
	}, [dispatch, isAuthenticated, authentication]);

	useEffect(() => {
		backButtonListener();
	});

	function backButtonListener() {
		window.addEventListener('popstate', () => {
			setSelectedKey(getSelectedKey());
		});
	}

	function getSelectedKey() {
		return window.location.pathname === '/' ? homePage : window.location.pathname;
	}

	function handleLogOut() {
		dispatch(clearAuth());
	}

	const profileOptions = (
		<Menu>
			<Menu.Item key='Settings'>Settings</Menu.Item>
			<Menu.Item key='Account'>Account</Menu.Item>
			<Menu.Item key='Log out' onClick={() => handleLogOut()}>
				Log out
			</Menu.Item>
		</Menu>
	);

	return (
		<Layout>
			{isAuthenticated && (
				<Sider
					breakpoint='lg'
					collapsedWidth='0'
					theme={'light'}
					className={styles.extraExtraLightGrey}
					onCollapse={(collapsed) => setCollapsed(collapsed)}
					style={{ minHeight: '100vh' }}
				>
					<div className={styles.logo}>
						<Link to='/regulations' onClick={() => setSelectedKey('/regulations')}>
							<Logo />
						</Link>
					</div>
					<Menu className={styles.sideMenu} mode='inline' selectedKeys={[selectedKey]}>
						<Menu.Item key={'/regulations'} onClick={() => setSelectedKey('/regulations')}>
							<Link to='/regulations' className='nav-text'>
								Overview
							</Link>
						</Menu.Item>
						<Menu.Item key='/controls' onClick={() => setSelectedKey('/controls')}>
							<Link to='/controls' className='nav-text'>
								Controls
							</Link>
						</Menu.Item>
						<Menu.Item key='/tasks' onClick={() => setSelectedKey('/tasks')}>
							<Link to='/tasks' className='nav-text'>
								Tasks
							</Link>
						</Menu.Item>
					</Menu>
					<div className={styles.profile} style={{ display: isCollapsed ? 'none' : '', width: '175px' }}>
						<Dropdown overlay={profileOptions} trigger={['click']}>
							<img src={authentication.user.picture} alt='Avatar' />
						</Dropdown>
						<Link to={'/'}>{authentication.user.name}</Link>
					</div>
				</Sider>
			)}
			<Layout style={{ background: '#fff', minWidth: '340px' }} className={styles.white}>
				<Content className={styles.white}>
					<div className='site-layout-background' style={{ padding: 24, minHeight: 360 }}>
						<Routes />
					</div>
				</Content>
			</Layout>
		</Layout>
	);
}
