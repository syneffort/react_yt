import React, { useEffect, useState } from 'react'
import { Tooltip, Icon } from 'antd';
import axios from 'axios';

import { LIKE_SERVER } from '../../../Config';

function LikeDislikes(props) {

    const [Likes, setLikes] = useState(0);
    const [Dislikes, setDislikes] = useState(0)
    const [LikeAction, setLikeAction] = useState(null);
    const [DislikeAction, setDislikeAction] = useState(null);
    

    let variables = {};

    if (props.video) {
        variables = { videoId: props.videoId, userId: props.userId };
    } else {
        variables = { commentId: props.commentId, userId: props.userId };
    }

    useEffect(() => {
        axios.post(`${LIKE_SERVER}/getLikes`, variables)
            .then((response) => {
                if (response.data.success) {
                    // 좋아요 받은 수
                    setLikes(response.data.likes.length);

                    // 좋아요 여부
                    response.data.likes.map(like => {
                        if (like.userId === props.userId) {
                            setLikeAction('liked');
                        }
                    })
                } else {
                    alert('좋아요 정보 가져오기에 실패했습니다.');
                }
            });

        axios.post(`${LIKE_SERVER}/getDislikes`, variables)
            .then((response) => {
                if (response.data.success) {
                    // 싫어요 받은 수
                    setDislikes(response.data.dislikes.length);

                    // 싫어요 여부
                    response.data.dislikes.map(dislike => {
                        if (dislike.userId === props.userId) {
                            setDislikeAction('disliked');
                        }
                    })
                } else {
                    alert('싫어요 정보 가져오기에 실패했습니다.');
                }
            });
    }, [])

    return (
        <div>
            <span key='comment-basic-like' style={{ paddingRight: '10px', cursor:'auto' }}>
                <Tooltip title='Like'>
                    <Icon 
                        type='like'
                        theme={LikeAction === 'liked' ? 'filled' : 'outlined'}
                        onClick
                    />
                </Tooltip>
                <span style={{ paddingLeft:'8px', cursor:'auto'}}>
                    {Likes}
                </span>
            </span>

            <span key='comment-basic-dislike' style={{ paddingRight: '10px', cursor:'auto' }}>
                <Tooltip title='Dislike'>
                    <Icon 
                        type='dislike'
                        theme={DislikeAction === 'disliked' ? 'filled' : 'outlined'}
                        onClick
                    />
                </Tooltip>
                <span style={{ paddingLeft:'8px', cursor:'auto'}}>
                    {Dislikes}
                </span>
            </span>
        </div>
    )
}

export default LikeDislikes