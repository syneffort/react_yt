import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { SERVER_URL, VIDEO_SERVER } from '../../../Config';

function SideVideo() {

    const [sideVideos, setSideVideos] = useState([]);

    useEffect(() => {
        
        axios.get(`${VIDEO_SERVER}/getVideos`)
        .then(response => {
            if (response.data.success) {
                setSideVideos(response.data.videos);
            } else {
                alert('비디오 가져오기에 실패했습니다.');
            }
        });
    }, []);

    const renderSideVideo = sideVideos.map((video, index) => {

        let minutes = Math.floor(video.duration / 60);
        let seconds = Math.floor(video.duration - (minutes * 60));

        return (
        <div key={index} style={{ display: 'flex', flexDirection: 'row', marginBottom: "1rem", padding: '0 2rem' }}>
            <div style={{ width: '40%', marginRight: '1rem'}}>
                <a href={`/video/${video._id}`}>
                    <img style={{ width: '100%' }} src={`${SERVER_URL}/${video.thumbnail}`} alt='thumbnail'/>
                </a>
            </div>
            <div style={{ width: '50%' }}>
                <a href={`/video/${video._id}`} style={{ color: 'gray' }}>
                    <span style={{ fontSize: '1rem', color: 'black' }}>{video.title}</span><br/>
                    <span>{video.writer.name}</span><br/>
                    <span>{video.views} views</span><br/>
                    <span>{minutes} : {seconds}</span>
                </a>
            </div>
        </div>);
    })

    return (

        <React.Fragment>
            <div style={{ marginTop: '3rem' }}/>
            {renderSideVideo}
        </React.Fragment>

        
    )
}

export default SideVideo
