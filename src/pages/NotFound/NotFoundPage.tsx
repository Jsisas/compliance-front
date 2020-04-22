import * as React from 'react';
import {Button, Result, Typography} from 'antd';
import AlButton from "../../components/_ui/AlButton/AlButton";

const {Title} = Typography;

export function NotFoundPage(props: any) {
    return (
        <>
            <Result
                status="404"
                title="404"
                subTitle="Sorry, the page you visited does not exist."
                extra={<AlButton type="primary" onClick={() => props.history.goBack()}>Back Home</AlButton>}
            />
        </>
    );
};