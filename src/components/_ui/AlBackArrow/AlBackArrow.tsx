import * as React from 'react';
import {LeftOutlined} from "@ant-design/icons/lib";
import AlButton from "../AlButton/AlButton";

interface AlBackArrowProps {
    history: any;
}

export function AlBackArrow(props: AlBackArrowProps) {
    return (
        <>
            <AlButton type="link" onClick={() => props.history.goBack()}>
                <LeftOutlined style={{fontSize: "24px", float: "right"}}/>
            </AlButton>
        </>
    );
};