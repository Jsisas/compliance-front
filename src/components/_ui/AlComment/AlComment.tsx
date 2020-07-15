import * as React from 'react';
import {Avatar, Comment} from 'antd';

interface AlCommentProps {
	children?: JSX.Element;
}

export function AlComment(props: AlCommentProps): JSX.Element {
	return (
		<Comment
			actions={[<span key="comment-nested-reply-to">Reply to</span>]}
			author={<span>Han Solo</span>}
			avatar={
				<Avatar
					src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
					alt="Han Solo"
				/>
			}
			content={
				<p>
					We supply a series of design principles, practical patterns and high quality design
					resources (Sketch and Axure).
				</p>
			}
		>
			{props.children}
		</Comment>
	);
}
