import React, { useEffect, useState } from 'react'
import { Card, Icon, Avatar, Col, Typography, Row } from 'antd';
import { SERVER_URL, VIDEO_SERVER } from '../../Config';
import moment from 'moment';
import axios from 'axios';

const { Title } = Typography;
const { Meta } = Card;

function LandingPage() {

    const [Video, setVideo] = useState([]);

    useEffect(() => {
        
        axios.get(`${VIDEO_SERVER}/getVideos`)
        .then(response => {
            if (response.data.success) {
                console.log(response.data);
                setVideo(response.data.videos);
            } else {
                alert('비디오 가져오기에 실패했습니다.');
            }
        });
    }, [])

    const renderCards = Video.map((video, index) => {

        let minute = Math.floor(video.duration / 60);
        let seconds = Math.floor(video.duration - (minute * 60));

        return <Col key={index} lg={6} md={8} xs={24}>
        <a href={`/video/post/${video._id}`}>
            <div style={{ position: 'relative' }}>
                <img style={{ width: '100%' }} src={`${SERVER_URL}/${video.thumbnail}`} alt="thumbnail"/>
                <div className="duration">
                    <span>{minute} : {seconds}</span>
                </div>
            </div>
        </a>
        <br/>
        <Meta
            avatar={
                <Avatar src={video.writer.image}/>
            }
            title={video.title}
            description=""
        />
        <span>{video.writer.name}</span>
        <br/>
        <span>{video.views} views</span>
        <span> - {moment(video.createdAt).format("MMM Do YY")}</span>
        </Col>
    });

    return (
        <div style={{ width: '85%', margin: '3rem auto' }}>
            <Title level={2}>😎 추천 영상</Title>
            <hr/>
            <Row gutter={[32, 16]}>
                {renderCards}
            </Row>
            <hr/>
        </div>
    )
}

export default LandingPage