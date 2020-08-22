import React, { useEffect } from 'react';
import { Col, Row, Table, Typography } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/reducer';
import { Regulation, selectAllRegulations } from '../../redux/Regulation/RegulationSlice';
import { ColumnProps } from 'antd/lib/table';
import { fetchAllRegulations } from '../../redux/Regulation/RegulationService';
import themeStyles from './../../theme.module.scss';
import { CheckCircleOutlined, WarningFilled } from '@ant-design/icons/lib';
import { concatStyles } from '../../util/StyleUtil';
import { Link } from 'react-router-dom';
import { RegulationStatistics } from '../../redux/Regulation/RegulationSlice';
import { RequirementFilter } from '../Requirements/RequirementsPage';

const { Title } = Typography;

export default function RegulationsPage(): JSX.Element {
	const regulations = useSelector((state: RootState) => selectAllRegulations(state));
	const isTableLoading = useSelector((state: RootState) => state.regulation.loading);

	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(fetchAllRegulations());
	}, [dispatch]);
	const columns: ColumnProps<never>[] = [];

	if (regulations.length > 0) {
		columns.push({
			title: 'Title',
			dataIndex: 'name',
			key: 'id',
			render: (text: string, record: Regulation) => {
				return (
					<Link
						to={`/regulations/${record.id}/requirements`}
						className={concatStyles(themeStyles.primaryTextColor, themeStyles.textBold)}
					>
						{record.title}
					</Link>
				);
			},
			sorter: (a: Regulation, b: Regulation) => a.title.length - b.title.length,
			sortDirections: ['descend', 'ascend'],
		});
		columns.push({
			title: 'Requirements covered',
			dataIndex: 'requirements covered',
			key: 'id',
			render: (text: string, record: Regulation) => {
				return <span>{getRequirementsCovered(record.statistics)}%</span>;
			},
			sorter: (a: Regulation, b: Regulation) =>
				getRequirementsCovered(a.statistics) - getRequirementsCovered(b.statistics),
			sortDirections: ['descend', 'ascend'],
		});
		columns.push({
			title: 'All requirements',
			dataIndex: 'All requirements',
			key: 'id',
			render: (text: string, record: Regulation) => {
				return (
					<Link
						to={{ pathname: `/regulations/${record.id}/requirements`, state: {filter: RequirementFilter.ALL} }}
						className={concatStyles(themeStyles.primaryTextColor, themeStyles.textBold)}
					>
						{record.statistics.requirements_total}
					</Link>
				);
			},
			sorter: (a: Regulation, b: Regulation) => a.statistics.requirements_total - b.statistics.requirements_total,
			sortDirections: ['descend', 'ascend'],
		});
		columns.push({
			title: 'Without control',
			dataIndex: 'Without control',
			key: 'id',
			render: (text: string, record: Regulation) => {
				return (
					<Link
						to={{ pathname: `/regulations/${record.id}/requirements`, state: {filter: RequirementFilter.WITHOUT_CONTROl} }}
						className={concatStyles(themeStyles.primaryTextColor, themeStyles.textBold)}
					>
						{record.statistics.requirements_without_control}
					</Link>
				);
			},
			sorter: (a: Regulation, b: Regulation) =>
				a.statistics.requirements_without_control - b.statistics.requirements_without_control,
			sortDirections: ['descend', 'ascend'],
		});
		columns.push({
			title: 'Controls failing',
			dataIndex: 'Controls failing',
			key: 'id',
			render: (text: string, record: Regulation) => {
				const failingCount = record.statistics.controls_failing;
				return (
					<Link
						to={{ pathname: `/regulations/${record.id}/requirements`, state: {filter: RequirementFilter.WITH_FAILING_CONTROL} }}
						className={failingCount > 0 ? themeStyles.errorTextColor : themeStyles.successTextColor}
					>
						{failingCount > 0 ? <WarningFilled /> : <CheckCircleOutlined />} {failingCount}
					</Link>
				);
			},
			sorter: (a: Regulation, b: Regulation) => a.statistics.controls_failing - b.statistics.controls_failing,
			sortDirections: ['descend', 'ascend'],
		});
	}

	function getRequirementsCovered(statistics: RegulationStatistics): number {
		return Math.round((statistics.controls_failing * 100) / statistics.requirements_total);
	}

	return (
		<>
			<Row gutter={[16, 16]} justify={'space-between'}>
				<Col xs={24} sm={16} md={10} lg={16} xl={16} xxl={16}>
					<Title>Regulations</Title>
				</Col>
			</Row>
			<Row gutter={[16, 16]} justify={'space-between'}>
				<Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
					<Table
						dataSource={regulations as never}
						columns={columns}
						rowKey='id'
						scroll={regulations.length < 1 ? { x: undefined } : { x: 'auto' }}
						loading={isTableLoading}
						style={{ width: '100%' }}
						pagination={{ hideOnSinglePage: true }}
					/>
				</Col>
			</Row>
		</>
	);
}
