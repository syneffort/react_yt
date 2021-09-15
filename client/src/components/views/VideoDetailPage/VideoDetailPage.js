import React, { useEffect, useState } from 'react';
import { Row, Col, List, Avatar } from 'antd';
import axios from 'axios';
import { SERVER_URL, VIDEO_SERVER } from '../../Config';

function VideoDetailPage(props) {

    const videoId = props.match.params.videoId;
    const variable = { videoId };

    const [VideoDetail, setVideoDetail] = useState([]);

    useEffect(() => {
        axios.post(`${VIDEO_SERVER}/getVideoDetail`, variable)
            .then(response => {
                console.log(response.data);
                if (response.data.success) {
                    setVideoDetail(response.data.videoDetail);
                } else {
                    alert('비디오 가져오기에 실패했습니다.');
                }
            })
    }, []);

    if (VideoDetail.writer) {
        return (
            <Row gutter={[16, 16]}>
                <Col lg={18} xs={24}>
                    <div style={{ width: '100%', padding: '3rem 4rem' }}>
                        <video style={{ width: '100%' }} src={`${SERVER_URL}/${VideoDetail.filePath}`} controls/>
                        <List.Item
                            actions
                        >
                            <List.Item.Meta
                                avatar={<Avatar src={VideoDetail.writer.image} />}
                                title={VideoDetail.writer.name}
                                description={VideoDetail.description}
                            />
    
                        </List.Item>
    
                        {/* Comments */}
                    </div>
                </Col>
    
                <Col lg={6} xs={24}>
                    Side Videos
                </Col>
            </Row>
        );
    } else {
        return <div>🙏불러오는 중...</div>
    }
}

export default VideoDetailPage
