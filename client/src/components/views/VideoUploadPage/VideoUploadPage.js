import React, { useState } from 'react';
import Dropzone from 'react-dropzone';
import { Typography, Button, Form, message, Input, Icon, Select } from 'antd';
import axios from 'axios';
import { useSelector } from 'react-redux';

import { SERVER_URL, VIDEO_SERVER } from '../../Config';

const { Title } = Typography;
const { TextArea } = Input;

const PrivateOptions = [
    {value: 0, label: '비공개' },
    {value: 1, label: '공개' },
];

const CategoryOptions = [
    {value: 0, label: '영화 & 애니메이션' },
    {value: 1, label: '자동차 & 탈것' },
    {value: 2, label: '음악' },
    {value: 3, label: '애완동물 & 동물' },
];

function VideoUploadPage(props) {

    const user = useSelector(state => state.user);
    const [VideoTitle, setVideoTitle] = useState("");
    const [Description, setDescription] = useState("");
    const [Private, setPrivate] = useState(0);
    const [Category, setCategory] = useState("영화 & 애니메이션");
    const [FilePath, setFilePath] = useState("");
    const [Duration, setDuration] = useState("");
    const [ThumbnailPath, setThumbnailPath] = useState("");

    const onTitleChange = (e) => {
        setVideoTitle(e.currentTarget.value);
    };
    
    const onDescriptionChange = (e) => {
        setDescription(e.currentTarget.value);
    };

    const onPrivateChange = (e) => {
        setPrivate(e === '공개' ? 1 : 0);
    };

    const onCategoryChange = (e) => {
        setCategory(e);
    };

    const onDrop = (files) => {
        let formData = new FormData;
        const config = {
            header: {'content-type': 'multipart/form-data'}
        };
        formData.append('file', files[0]);

        axios.post(`${VIDEO_SERVER}/uploadfiles`, formData, config)
            .then(response => {
                if (!response.data.success) return alert('비디오 업로드에 실패했습니다.'); 

                let variable = {
                    url: response.data.url,
                    fileName: response.data.fileName
                };

                setFilePath(response.data.url);

                axios.post(`${VIDEO_SERVER}/thumbnail`, variable)
                .then(response => {
                    if (response.data.success) {
                        setDuration(response.data.fileDuration);
                        setThumbnailPath(response.data.url);
                    } else {
                        alert('썸네일 생성에 실패했습니다.');
                    }
                });
            })
    };

    const onSubmit = (e) => {
        e.preventDefault();
        
        const variables = {
            writer: user.userData._id,
            title: VideoTitle,
            description: Description,
            privacy: Private,
            filePath: FilePath,
            category: Category,
            duration: Duration,
            thumbnail: ThumbnailPath
        };
        axios.post(`${VIDEO_SERVER}/uploadVideo`, variables)
        .then(response => {
            if (response.data.success) {
                message.success('성공적으로 업로드했습니다.');

                setTimeout(() => {
                    props.history.push('/');
                }, 3000);
            } else {
                alert('비디오 업로드에 실패했습니다.');
            }
        })
    }

    return (
        <div style={{ maxWidth: '700px', margin: '2rem auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                <Title level={2}>🎬 비디오 업로드</Title>
            </div>
            <Form onSubmit={onSubmit}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    {/* Drop zone */}
                    <Dropzone 
                    onDrop={onDrop}
                    multiple={false}
                    maxSize={100 * 1024 * 1024}>
                        {({ getRootProps, getInputProps }) => (
                            <div style={{ width: '300px', height: '240px', border: '1px solid lightgray', display: 'flex', alignItems: 'center', justifyContent: 'center'}} {...getRootProps()}>
                                <input {...getInputProps()}/>
                                <Icon type="plus" style={{ fontSize: '3rem' }} />
                            </div>
                        )}
                    </Dropzone>

                    {/* Thumbnail zone */}
                    {ThumbnailPath && 
                        <div>
                        <img src={SERVER_URL + `/${ThumbnailPath}`} alt="thumbnail"/>
                        </div>
                    }
                </div>

            <br/>
            <br/>
            <label>제목</label>
            <Input onChange={onTitleChange} value={VideoTitle}/>

            <br/>
            <br/>
            
            <label>설명</label>
            <TextArea onChange={onDescriptionChange} value={Description}/>

            <br/>
            <br/>

            <label>공개</label>
            <Select onChange={onPrivateChange} defaultValue={PrivateOptions[0].label}>
                {PrivateOptions.map((item, index) => {
                    return <Select.Option key={item.value} value={item.label}>{item.label}</Select.Option>
                })}
            </Select>

            <br/>
            <br/>

            <label>카테고리</label>
            <Select onChange={onCategoryChange} defaultValue={CategoryOptions[0].label}>
                {CategoryOptions.map((item, index) => {
                    return <Select.Option key={item.value} value={item.label}>{item.label}</Select.Option>
                })}
            </Select>

            <br/>
            <br/>

            <Button type="primary" size="large" onClick={onSubmit}>
                업로드
            </Button>


            </Form>
        </div>
    )
}

export default VideoUploadPage

