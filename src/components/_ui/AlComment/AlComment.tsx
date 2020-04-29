import * as React from 'react';
import { Comment, Avatar } from 'antd';

interface AlCommentProps {
    children?: any;
}
export function AlComment(props: AlCommentProps) {
    return (
        <Comment
            actions={[<span key="comment-nested-reply-to">Reply to</span>]}
            author={<a>Han Solo</a>}
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
};