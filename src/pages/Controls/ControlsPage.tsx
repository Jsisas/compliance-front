import React from 'react';

import { useSelector } from 'react-redux';
import { RootState } from '../../redux/reducer';


export function ControlsPage() {
    const controls = useSelector((state: RootState) => state.course);

    return (
        <>
            <h1>Controls Page</h1>
            <div>
                {controls.map(course => {
                    return <p>{course.title}</p>
                })}
            </div>
        </>
    )
}