import * as React from 'react';
import {Typography} from "antd";
import {ReactNode} from "react";
import styles from './alText.module.scss';

const {Text} = Typography;

interface AlTextProps {
    type?: "secondary" | "danger" | "warning" | undefined
    children?: ReactNode;
}
export function AlText(props: AlTextProps) {
    return (
        <Text className={styles.textStyle} type={props.type}>
            {props.children}
        </Text>
    );
};