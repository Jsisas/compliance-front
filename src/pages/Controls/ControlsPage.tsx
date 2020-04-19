import React, {useEffect} from "react";

import {useDispatch, useSelector} from "react-redux";
import {UserSearch} from "../../components/AssigneeSearch/AssigneeSearch";
import {Col, Row, Table, Typography} from "antd";
import {RootState} from "../../redux/reducer";
import {Control, selectAllControls} from "../../redux/Control/ControlSlice";
import {fetchAllControls} from "../../redux/Control/ControlService";
import {PlusOutlined} from "@ant-design/icons";
import {ColumnProps} from "antd/lib/table";
import {Link} from "react-router-dom";
import Button from "../../components/_ui/Button/Button";
import style from './controlsPage.module.scss';

const {Text, Title} = Typography;

export function ControlsPage() {
    const controls = useSelector((state: RootState) => selectAllControls(state));
    const isControlsLoading = useSelector(
        (state: RootState) => state.control.loading
    );

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchAllControls());
    }, [dispatch]);
    let columns: ColumnProps<any>[] = [];

    function addTask(record: any, text: any) {
        console.log("Catched");
    }

    if (controls.length > 0) {
        columns.push({
            title: "Title",
            dataIndex: "name",
            key: "id",
            render: (text: any, record: Control) => {
                return <span>{record.name}</span>
            }
        });
        columns.push({
            title: "Status",
            dataIndex: "status",
            key: "id",
            render: (text: any, record: Control) => {
                return <span>{record.status}</span>
            }
        });
        columns.push({
            title: "Category",
            dataIndex: "category",
            key: "id",
            render: (text: any, record: Control) => {
                return <span>{record.category}</span>
            }
        });
        columns.push({
            title: "Assignee",
            dataIndex: "assignees",
            key: "id",
            render: (text: any, record: Control) => {
                return <span>{record.assignees?.map(x => <span>@{x.fname} {x.lname}</span>)}</span>
            }
        });
        columns.push({
            title: "Tasks",
            dataIndex: "tasks",
            key: "id",
            render: (text: any, record: any) => {
                if (!text || text.length < 1) {
                    return (
                        <div className={style.addTaskButton}>
                            <span className={"controls-table-action-span"}>No tasks</span>
                            <Button type="primary" onClick={() => addTask(record, text)}>
                                <PlusOutlined/>
                            </Button>
                        </div>
                    );
                } else {
                    return (
                        <>
                            <span className={"controls-table-action-span"}>{text}</span>
                        </>
                    );
                }
            }
        });
    }

    return (
        <>
            <Row gutter={[16, 16]}>
                <Col xs={24} lg={24}>
                    <Title>Controls Page</Title>
                </Col>
            </Row>
            <Row gutter={[16, 32]} justify={"space-between"} align={"bottom"}>
                <Col xs={12} sm={8} lg={6}>
                    <Text type="secondary">Assignees</Text>
                    <UserSearch/>
                </Col>
                <Col xs={12} sm={12} md={6} lg={4} xl={3} xxl={2}>
                    <Link to="/controls/new">
                        <Button type={"primary"} style={{width: "100%"}}>
                            Add Control
                        </Button>
                    </Link>
                </Col>
            </Row>
            <Row>
                <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                    <Table
                        dataSource={controls}
                        columns={columns}
                        rowKey="id"
                        scroll={controls.length < 1 ? {x: undefined} : {x: 340}}
                        loading={isControlsLoading}
                        style={{width: "100%"}}
                    />
                </Col>
            </Row>
        </>
    );
}
