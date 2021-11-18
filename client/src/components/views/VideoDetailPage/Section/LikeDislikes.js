import React, { useEffect, useState } from 'react'
import { Tooltip, Icon } from 'antd';
import axios from 'axios';

import { LIKE_SERVER } from '../../../Config';

function LikeDislikes(props) {

    const [Likes, setLikes] = useState(0);
    const [Dislikes, setDislikes] = useState(0)
    const [LikeAction, setLikeAction] = useState(null);
    const [DislikeAction, setDislikeAction] = useState(null);

    let processed = false;

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
    }, []);

    const onLike = () => {
        if (processed) return;

        processed = true;
        if (LikeAction === null) {
            axios.post(`${LIKE_SERVER}/upLike`, variables)
                .then(response => {
                    if (response.data.success) {
                        setLikes(Likes + 1);
                        setLikeAction('liked');
                        
                        if (DislikeAction !== null) {
                            setDislikeAction(null);
                            setDislikes(Dislikes - 1);
                        }
                    } else {
                        alert('좋아요 처리에 실패했습니다.');
                    }

                    processed = false;
                });
        } else {
            axios.post(`${LIKE_SERVER}/unLike`, variables)
                .then(response => {
                    if (response.data.success) {
                        setLikes(Likes - 1);
                        setLikeAction(null);
                    } else {
                        alert('좋아요 취소에 실패했습니다.');
                    }

                    processed = false;
                });
        }
    }

    const onDislike = () => {
        if (processed) return;

        processed = true;
        if (DislikeAction === null) {
            axios.post(`${LIKE_SERVER}/upDislike`, variables)
                .then(response => {
                    if (response.data.success) {
                        setDislikes(Dislikes + 1);
                        setDislikeAction('disliked');
                        
                        if (LikeAction !== null) {
                            setLikeAction(null);
                            setLikes(Likes - 1);
                        }
                    } else {
                        alert('싫어요 처리에 실패했습니다.');
                    }

                    processed = false;
                });
        } else {
            axios.post(`${LIKE_SERVER}/unDislike`, variables)
                .then(response => {
                    if (response.data.success) {
                        setDislikes(Dislikes - 1);
                        setDislikeAction(null);
                    } else {
                        alert('싫어요 취소에 실패했습니다.');
                    }

                    processed = false;
                });
        }
    }

    return (
        <div>
            <span key='comment-basic-like' style={{ paddingLeft:'8px', paddingRight:'8px', cursor:'auto' }}>
                <Tooltip title='Like'>
                    <Icon 
                        type='like'
                        theme={LikeAction === 'liked' ? 'filled' : 'outlined'}
                        onClick={onLike}
                    />
                </Tooltip>
                <span style={{ paddingLeft:'8px', cursor:'auto'}}>
                    {Likes}
                </span>
            </span>

            <span key='comment-basic-dislike' style={{ paddingLeft:'8px', paddingRight:'8px', cursor:'auto' }}>
                <Tooltip title='Dislike'>
                    <Icon 
                        type='dislike'
                        theme={DislikeAction === 'disliked' ? 'filled' : 'outlined'}
                        onClick={onDislike}
                    />
                </Tooltip>
                <span style={{ paddingLeft:'4px', paddingRight:'4px', cursor:'auto'}}>
                    {Dislikes}
                </span>
            </span>
        </div>
    )
}

export default LikeDislikes