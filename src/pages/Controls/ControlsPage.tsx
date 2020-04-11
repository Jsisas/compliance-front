import React, { useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { AssigneeSearch } from '../../components/AssigneeSearch/AssigneeSearch';
import { Typography, Table, Button } from 'antd';
import { RootState } from '../../redux/reducer';
import { selectAllControls } from '../../redux/Control/ControlSlice';
import { fetchAllControls } from '../../redux/Control/ControlService';
import { PlusOutlined } from '@ant-design/icons';
import { ColumnProps } from 'antd/lib/table';

const { Text } = Typography;

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
            <h1>Controls Page</h1>
            <Text type="secondary">Assignees</Text>
            <AssigneeSearch />
            <Table dataSource={controls} columns={columns} rowKey="id" />
        </>
    );
}