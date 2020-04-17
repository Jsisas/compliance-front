import React, {useEffect} from "react";
import {Col, Row, Table, Typography} from "antd";
import Button from "../../components/_ui/Button/Button";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../redux/reducer";
import {Regulation, selectAllRegulations} from "../../redux/Regulation/RegulationSlice";
import {ColumnProps} from "antd/lib/table";
import {fetchAllRegulations} from "../../redux/Regulation/RegulationService";
import {lowerCameltoUpperCamel} from "../../util/StringUtil";
import themeStyles from './../../theme.module.scss';
import {WarningFilled} from "@ant-design/icons/lib";

const {Title} = Typography;

export default function RegulationsPage() {
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
        Object.keys(regulations[0]).forEach((key, i) => {
            if (key === "coveredRequirementCount") {
                columns.push({
                    title: lowerCameltoUpperCamel(key),
                    dataIndex: key,
                    key: key,
                    render: (text: any) => {
                        return text + '%'
                    }
                });
            } else if (key === "requirementCount" || key === 'withoutControlRequirementCount') {
                columns.push({
                    title: lowerCameltoUpperCamel(key),
                    dataIndex: key,
                    key: key,
                    render: (text: any) => {
                        return <span className={themeStyles.primaryTextColor}>{text}</span>
                    }
                });
            } else if (key === "failingControlCount") {
                columns.push({
                    title: lowerCameltoUpperCamel(key),
                    dataIndex: key,
                    key: key,
                    render: (text: any) => {
                        return <span className={themeStyles.errorTextColor}><WarningFilled /> {text}</span>
                    }
                });
            }
            else if (key !== "id") {
                columns.push({
                    title: lowerCameltoUpperCamel(key),
                    dataIndex: key,
                    key: key,
                });
            }
        });
    }

    function onRowClick(record: Regulation){
        console.log(record.id)
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
                        onRow={(record: Regulation) => {
                            return {
                                onClick: event => onRowClick(record)
                            }
                        }}
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
