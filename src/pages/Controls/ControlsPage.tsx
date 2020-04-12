import React, { useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { UserSearch } from '../../components/AssigneeSearch/AssigneeSearch';
import { Typography, Table, Button, Row, Col } from 'antd';
import { RootState } from '../../redux/reducer';
import { selectAllControls } from '../../redux/Control/ControlSlice';
import { fetchAllControls } from '../../redux/Control/ControlService';
import { PlusOutlined } from '@ant-design/icons';
import { ColumnProps } from 'antd/lib/table';
import { Link } from 'react-router-dom';
import { lowerCameltoUpperCamel } from '../../util/StringUtil';

const { Text, Title } = Typography;

export function ControlsPage() {
    const controls = useSelector((state: RootState) => selectAllControls(state));
    const isControlsLoading = useSelector((state: RootState) => state.control.loading)

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
                    title: lowerCameltoUpperCamel(key),
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
            } else if (key !== 'id' && key !== 'assignee') {
                columns.push({
                    title: lowerCameltoUpperCamel(key),
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
                <Col xs={24} lg={24}>
                    <Title>Controls Page</Title>
                </Col>
            </Row>
            <Row gutter={[16, 32]} justify={"space-between"} align={"bottom"}>
                <Col xs={12} sm={8} lg={6}>
                    <Text type="secondary">Assignees</Text>
                    <UserSearch />
                </Col>
                <Col xs={12} sm={12} md={6} lg={4} xl={3} xxl={2}>
                    <Link to="/controls/new"><Button type={'primary'} style={{ width: '100%' }}>Add Control</Button></Link>
                </Col>
            </Row>
            <Row>
                <Col xs={24} lg={24}>
                    <Table dataSource={controls} columns={columns} rowKey="id" scroll={{ x: 240 }} loading={isControlsLoading} />
                </Col>
            </Row>


        </>
    );
}