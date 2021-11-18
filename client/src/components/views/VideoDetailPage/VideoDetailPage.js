import React, { useEffect, useState } from 'react';
import { Row, Col, List, Avatar } from 'antd';
import axios from 'axios';
import { SERVER_URL, VIDEO_SERVER, COMMENT_SERVER } from '../../Config';
import SideVideo from './Section/SideVideo';
import Subscribe from './Section/Subscribe';
import Comment from './Section/Comment';
import LikeDislikes from './Section/LikeDislikes';

function VideoDetailPage(props) {

    const videoId = props.match.params.videoId;
    const variable = { videoId };

    const [VideoDetail, setVideoDetail] = useState([]);
    const [Comments, setComments] = useState([]);
    const [IsFinished, setIsFinished] = useState(false)

    useEffect(() => {
        axios.post(`${VIDEO_SERVER}/getVideoDetail`, variable)
            .then(response => {
                console.log(response.data);
                if (response.data.success) {
                    setVideoDetail(response.data.videoDetail);
                } else {
                    alert('비디오 가져오기에 실패했습니다.');
                }
            });
        
        axios.post(`${COMMENT_SERVER}/getComments`, variable)
            .then(response => {
                if (response.data.success) {
                    setComments(response.data.comments);
                } else {
                    alert('댓글 정보 가져오기에 실패했습니다.');
                }

                setIsFinished(true);
            });
    }, []);

    const refreshFunction = (newComment) => {
        setComments(Comments.concat(newComment));
    }

    if (VideoDetail.writer && IsFinished) {

        const subscribeButton = VideoDetail.writer._id !== localStorage.getItem('userId') && [<Subscribe userTo={VideoDetail.writer._id} userFrom={localStorage.getItem('userId')}/>];
        return (
            <Row gutter={[16, 16]}>
                <Col lg={18} xs={24}>
                    <div style={{ width: '100%', padding: '3rem 4rem' }}>
                        <video style={{ width: '100%' }} src={`${SERVER_URL}/${VideoDetail.filePath}`} controls/>
                        <List.Item
                            actions={[<LikeDislikes video userId={localStorage.getItem('userId')} videoId={videoId}/>, subscribeButton]}
                        >
                            
                        <List.Item.Meta
                            avatar={<Avatar src={VideoDetail.writer.image} />}
                            title={VideoDetail.writer.name}
                            description={VideoDetail.description}
                        />
    
                        </List.Item>
    
                        {/* Comments */}
                        <Comment refreshFunction={refreshFunction} postId={videoId} commentList={Comments}/>
                    </div>
                </Col>
    
                <Col lg={6} xs={24}>
                    <SideVideo/>
                </Col>
            </Row>
        );
    } else {
        return <div>🙏불러오는 중...</div>
    }
}

export default VideoDetailPage
