import React, {useEffect} from "react";
import {Col, Row, Table, Typography} from "antd";
import Button from "../../components/_ui/Button/Button";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../redux/reducer";
import {Regulation, selectAllRegulations} from "../../redux/Regulation/RegulationSlice";
import {ColumnProps} from "antd/lib/table";
import {fetchAllRegulations} from "../../redux/Regulation/RegulationService";
import themeStyles from './../../theme.module.scss';
import {CheckCircleOutlined, WarningFilled} from "@ant-design/icons/lib";
import {concatStyles} from "../../util/StyleUtil";
import {Link} from "react-router-dom";

const {Title} = Typography;

interface RegulationPageProps {
    history: any;
}

export default function RegulationsPage(props: RegulationPageProps) {
    const regulations = useSelector((state: RootState) => selectAllRegulations(state));
    const isTableLoading = useSelector(
        (state: RootState) => state.regulation.loading
    );

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchAllRegulations());
    }, [dispatch]);
    let columns: ColumnProps<any>[] = [];

    function getRegulationFailingRequirementsPercentage(regulation: Regulation) {
        const a = regulation.requirements.filter(x => x.controls.some(y => y.tasks.some(u => new Date(u.dueDate) < new Date())));
        return a.length * 100 / regulation.requirements.length || 0;
    }

    function getRegulationFailingControlsCount(regulation: Regulation) {
        const a = regulation.requirements.map(x => x.controls.map(y => y.tasks.filter(u => new Date(u.dueDate) < new Date()))).concat([]).flat(2)
        return a.length;
    }

    function getRegulationRequirementsWithoutControl(regulation: Regulation) {
        const a = regulation.requirements.filter(x => x.controls.length < 1);
        return a.length;
    }

    if (regulations.length > 0) {
        columns.push({
            title: "Title",
            dataIndex: "name",
            key: "id",
            render: (text: any, record: Regulation) => {
                return <span className={themeStyles.textBold}>{record.name}</span>
            }
        });
        columns.push({
            title: "Requirements covered",
            dataIndex: "requirements covered",
            key: "id",
            render: (text: any, record: Regulation) => {
                return <span>{getRegulationFailingRequirementsPercentage(record)}%</span>
            }
        });
        columns.push({
            title: "All requirements",
            dataIndex: "All requirements",
            key: "id",
            render: (text: any, record: Regulation) => {
                return <Link
                    to={`/regulations/${record.id}/requirements`}
                    className={concatStyles(themeStyles.primaryTextColor, themeStyles.textBold)}>
                    {record.requirements.length}
                </Link>
            }
        });
        columns.push({
            title: "Without control",
            dataIndex: "Without control",
            key: "id",
            render: (text: any, record: Regulation) => {
                return <span
                    className={concatStyles(themeStyles.primaryTextColor, themeStyles.textBold)}>{getRegulationRequirementsWithoutControl(record)}</span>
            }
        });
        columns.push({
            title: "Controls failing",
            dataIndex: "Controls failing",
            key: "id",
            render: (text: any, record: Regulation) => {
                const failingCount = getRegulationFailingControlsCount(record);
                return <span
                    className={failingCount > 0 ? themeStyles.errorTextColor : themeStyles.successTextColor}>{failingCount > 0 ?
                    <WarningFilled/> : <CheckCircleOutlined/>} {failingCount}</span>
            }
        });
    }

    return (
        <>
            <Row gutter={[16, 16]} justify={"space-between"}>
                <Col xs={24} sm={16} md={10} lg={16} xl={16} xxl={16}>
                    <Title>Regulations Page</Title>
                </Col>
                <Col xs={24} sm={8} md={5} lg={5} xl={4} xxl={3}>
                    <Button type='primary' style={{width: '100%'}}>Add regulations</Button>
                </Col>
            </Row>
            <Row gutter={[16, 16]} justify={"space-between"}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                    <Table
                        dataSource={regulations}
                        columns={columns}
                        rowKey="id"
                        scroll={regulations.length < 1 ? {x: undefined} : {x: 340}}
                        loading={isTableLoading}
                        style={{width: "100%"}}
                    />
                </Col>
            </Row>
        </>
    );
}
