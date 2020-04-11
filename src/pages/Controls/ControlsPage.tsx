import React, { useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { AssigneeSearch } from '../../components/AssigneeSearch/AssigneeSearch';
import { Typography, Table, Button, Row, Col } from 'antd';
import { RootState } from '../../redux/reducer';
import { selectAllControls } from '../../redux/Control/ControlSlice';
import { fetchAllControls } from '../../redux/Control/ControlService';
import { PlusOutlined } from '@ant-design/icons';
import { ColumnProps } from 'antd/lib/table';
import { Link } from 'react-router-dom';

const { Text, Title } = Typography;

export function ControlsPage() {
    const controls = useSelector((state: RootState) => selectAllControls(state));
    const dispatch = useDispatch();
    useEffect(() => { dispatch(fetchAllControls()) }, [dispatch])
    let columns: ColumnProps<any>[] = [];

    function addTask(record: any, text: any) {
        console.log("Catched");
    }

    if (controls.length > 0) {
        Object.keys(controls[0]).forEach(function (key, i) {
            if (key === 'tasks') {
                columns.push({
                    title: key,
                    dataIndex: key,
                    key: key,
                    render: (text: any, record: any) => {
                        if (!text || text.length < 1) {
                            return (
                                <>
                                    <span className={"controls-table-action-span"}>No tasks </span>
                                    <Button type="primary" icon={<PlusOutlined />} onClick={() => addTask(record, text)} />
                                </>
                            )
                        } else {
                            return (
                                <>
                                    <span className={"controls-table-action-span"}>{text}</span>
                                </>
                            )
                        }
                    }
                });
            } else if (key !== 'id') {
                columns.push({
                    title: key,
                    dataIndex: key,
                    key: key,
                });
            }
        }
        );
    }

    return (
        <>
            <Row gutter={[16, 16]}>
                <Col xs={{ span: 24 }} lg={{ span: 24 }}>
                    <Title>Controls Page</Title>
                </Col>
            </Row>
            <Row gutter={[16, 32]} justify={"space-between"} align={"bottom"}>
                <Col xs={{ span: 12 }} lg={{ span: 6 }}>
                    <Text type="secondary">Assignees</Text>
                    <AssigneeSearch />
                </Col>
                <Col xs={{ span: 12 }} lg={{ span: 2 }}>
                    <Link to="/controls/new"><Button type={'primary'} style={{ float: "right" }}>Add Control</Button></Link>
                </Col>
            </Row>
            <Row>
                <Col xs={{ span: 24 }} lg={{ span: 24 }}>
                    <Table dataSource={controls} columns={columns} rowKey="id" scroll={{ x: 240 }} />
                </Col>
            </Row>


        </>
    );
}