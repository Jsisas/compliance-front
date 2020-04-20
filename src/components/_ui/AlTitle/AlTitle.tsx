import * as React from 'react';
import {ReactNode} from "react";
import {Typography} from "antd";
import {CSSProperties} from "styled-components";

const {Title} = Typography;

interface AlTextProps {
    style?: CSSProperties;
    children?: ReactNode;
}

export function AlTitle(props: AlTextProps) {
    return (
        <Title style={props.style}>
            {props.children}
        </Title>
    );
};