import axios from 'axios';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import { COMMENT_SERVER } from '../../../Config';

function Comment(props) {

    const user = useSelector(state => state.user);
    const [commentValue, setCommentValue] = useState('');

    const videoId = props.videoId;

    const handleClick = (event) => {
        setCommentValue(event.currentTarget.value);
    }

    const onSubmit = (event) => {
        event.preventDefault();

        const variables = {
            content: commentValue,
            writer: user.userData._id,
            postId: videoId,
        }

        axios.post(`${COMMENT_SERVER}/saveComment`, variables)
            .then(response => {
                if (response.data.success) {
                    console.log(response.data.result);
                } else {
                    alert('댓글 입력에 실패했습니다.');
                }
            })
    }

    return (
        <div>
            <br/>
            <p>댓글</p>
            <hr/>

            {/* Comment Lists */}

            {/* Root Comment Form */}

            <form style={{ display: 'flex' }} onSubmit={onSubmit}>
                <textarea
                    style={{ width: '100%', borderRadius: '5px' }}
                    onChange={handleClick}
                    value={commentValue}
                    placeholder="댓글을 입력해 주세요."
                />
                <br/>
                <button style={{ width: '20%', height: '52px' }} onClick={onSubmit}>댓글</button>
            </form>
        </div>
    )
}

export default Comment
