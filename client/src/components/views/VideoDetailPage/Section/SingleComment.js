import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Comment, Avatar, Button, Input } from 'antd';
import axios from 'axios';

import { COMMENT_SERVER } from '../../../Config';

const { TextArea } = Input;

function SingleComment(props) {

    const user = useSelector(state => state.user);
    
    const [OpenReply, setOpenReply] = useState(false);
    const [ComentValue, setComentValue] = useState('')

    const onClickReplyOpen = () => {
        setOpenReply(!OpenReply);
    }

    const onHandleChange = (event) => {
        setComentValue(event.currentTarget.CommentValue)
    }

    const onSubmit = (event) => {
        event.preventDefault();

        const variables = {
            content: ComentValue,
            writer: user.userData._id,
            postId: props.postId,
            responseTo: props.comment._id
        }

        axios.post(`${COMMENT_SERVER}/saveComment`, variables)
            .then(response => {
                if (response.data.success) {
                    console.log(response.data.result);
                    setComentValue('');
                    props.refreshFunction(response.data.result);
                } else {
                    alert('댓글 입력에 실패했습니다.');
                }
            });
    }

    const actions = [
        <span onClick={onClickReplyOpen} key='comment-basic-reply-to'>댓글</span>
    ]

    return (
        <div>
            <Comment
                actions={actions}
                author={props.comment.writer.name}
                avatar={<Avatar src={props.comment.writer.image} alt />}
                content={<p>{props.comment.content}</p>}
            />

            {OpenReply &&
                <form style={{ display: 'flex' }} onSubmit={onSubmit}>
                    <textarea
                        style={{ width: '100%', borderRadius: '5px' }}
                        onChange={onHandleChange}
                        value={ComentValue}
                        placeholder="댓글을 입력해 주세요."
                    />
                    <br/>
                <button style={{ width: '20%', height: '52px' }} onClick={onSubmit}>댓글</button>
            </form>
            }
        </div>
    )
}

export default SingleComment