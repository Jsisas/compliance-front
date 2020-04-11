import React from 'react';

import { useSelector } from 'react-redux';
import { AssigneeSearch } from '../../components/AssigneeSearch/AssigneeSearch';
import { Typography } from 'antd';
import { RootState } from '../../redux/reducer';
import { selectAllControls } from '../../redux/Control/ControlSlice';

const { Text } = Typography;

export function ControlsPage() {
    const controls = useSelector((state: RootState) => selectAllControls(state));

    return (
        <>
            <h1>Controls Page</h1>
            <Text type="secondary">Assignees</Text>
            <AssigneeSearch />
            <div>
                {controls.map(course => {
                    return <p>{course.title}</p>
                })}
            </div>
        </>
    )
}