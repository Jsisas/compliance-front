import * as React from 'react';
import {useParams} from "react-router-dom";

export function TaskDetail() {
    let {id} = useParams<{ id: string }>();

    return (
        <>
            <h1>Task detail</h1>
            <p>{id}</p>
        </>
    );
};