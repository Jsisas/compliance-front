import React, {useEffect} from "react";
import {Col, Row, Table, Typography} from "antd";
import AlButton from "../../components/_ui/AlButton/AlButton";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../redux/reducer";
import {Regulation, selectAllRegulations} from "../../redux/Regulation/RegulationSlice";
import {ColumnProps} from "antd/lib/table";
import {fetchAllRegulations} from "../../redux/Regulation/RegulationService";
import themeStyles from './../../theme.module.scss';
import {CheckCircleOutlined, WarningFilled} from "@ant-design/icons/lib";
import {concatStyles} from "../../util/StyleUtil";
import {Link} from "react-router-dom";
import {notifyError} from "../../util/NotificationUtil";

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

    if (regulations.length > 0) {
        columns.push({
            title: "Title",
            dataIndex: "name",
            key: "id",
            render: (text: any, record: Regulation) => {
                return <span className={themeStyles.textBold}>{record.title}</span>
            }
        });
        columns.push({
            title: "Requirements covered",
            dataIndex: "requirements covered",
            key: "id",
            render: (text: any, record: Regulation) => {
                return <span>{Math.round(record.statistics.controls_failing * 100 / record.statistics.requirements_total)}%</span>
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
                    {record.statistics.requirements_total}
                </Link>
            }
        });
        columns.push({
            title: "Without control",
            dataIndex: "Without control",
            key: "id",
            render: (text: any, record: Regulation) => {
                return <span
                    className={concatStyles(themeStyles.primaryTextColor, themeStyles.textBold)}>{record.statistics.requirements_without_control}</span>
            }
        });
        columns.push({
            title: "Controls failing",
            dataIndex: "Controls failing",
            key: "id",
            render: (text: any, record: Regulation) => {
                const failingCount = record.statistics.controls_failing;
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
                    <AlButton type='primary' style={{width: '100%'}} onClick={() => notifyError("Not implemented", "Function is not implemented yet")}>
                        Add regulations
                    </AlButton>
                </Col>
            </Row>
            <Row gutter={[16, 16]} justify={"space-between"}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                    <Table
                        dataSource={regulations}
                        columns={columns}
                        rowKey="id"
                        scroll={regulations.length < 1 ? {x: undefined} : {x: 'auto'}}
                        loading={isTableLoading}
                        style={{width: "100%"}}
                    />
                </Col>
            </Row>
        </>
    );
}
