import React, { ReactNode } from 'react';
import { Button } from 'antd';
import styles from './alButton.module.scss';
import { CSSProperties } from 'styled-components';
import { concatStyles } from '../../../util/StyleUtil';

export interface ButtonProp {
	type: 'primary' | 'secondary' | 'link';
	style?: CSSProperties;
	children?: ReactNode;
	onClick?: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void;
	htmlType?: 'button' | 'submit' | 'reset';
	className?: string | '';
	disabled?: boolean;
	preventDefault?: boolean;
	stopPropagation?: boolean;
}

export default function AlButton(props: ButtonProp): JSX.Element {
	function onButtonClick(e: React.MouseEvent<HTMLElement, MouseEvent>): void {
		if (props.preventDefault) {
			e.preventDefault();
		}

		if (props.stopPropagation) {
			e.stopPropagation();
		}

		if (props.onClick) {
			props.onClick(e);
		}
	}

	function getButtonClassName(): string {
		if (props.type === 'link') {
			return '';
		} else {
			return styles[props.type];
		}
	}

	function getButtonType(type: string): 'link' | 'primary' | undefined {
		if (type === 'link' || type === 'primary') {
			return type;
		} else if (type === 'secondary') {
			return undefined;
		} else {
			return 'primary';
		}
	}

	return (
		<Button
			className={concatStyles(getButtonClassName(), props.className || '')}
			type={getButtonType(props.type)}
			style={props.style}
			onClick={onButtonClick}
			htmlType={props.htmlType}
			disabled={props.disabled || false}
		>
			{props.children}
		</Button>
	);
}
