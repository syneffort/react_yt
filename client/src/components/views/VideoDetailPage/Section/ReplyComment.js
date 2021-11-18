import React, { useState, useEffect } from 'react'
import SingleComment from './SingleComment'

function ReplyComment(props) {

    const [ChildCommentNumber, setChildCommentNumber] = useState(0);
    const [OpenReplyComments, setOpenReplyComments] = useState(false)

    useEffect(() => {

        let commentNumber = 0;
        props.commentList.map((comment) => {
            if (comment.responseTo === props.parentCommentId) {
                commentNumber++;
            }
        });

        setChildCommentNumber(commentNumber);
    }, [ props.commentList ]);
    
    const renderReplyComment = (parentCommentId) => 
        props.commentList.map((comment, index) => (
            <React.Fragment key={index}>
                {comment.responseTo === parentCommentId &&
                    <div style={{ width: '90%', marginLeft: '40px '}}>
                        <SingleComment refreshFunction={props.refreshFunction} comment={comment} postId={props.postId} />
                        <ReplyComment refreshFunction={props.refreshFunction} parentCommentId={comment._id} postId={props.postId} commentList={props.commentList}/>
                    </div>
                }
            </React.Fragment>
        ));

    const onHandleChange = () => {
        setOpenReplyComments(!OpenReplyComments);
    }
    
    return (
        <div>
            <p style={{ fontSize: '14px', margin: 0, color: 'gray' }} onClick={onHandleChange}>
                {ChildCommentNumber}개 댓글 더보기
            </p>

            {OpenReplyComments && 
                renderReplyComment(props.parentCommentId)
            }
        </div>
    )
}

export default ReplyComment
