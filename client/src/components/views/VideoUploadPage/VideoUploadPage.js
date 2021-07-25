import React, { useState } from 'react';
import Dropzone from 'react-dropzone';
import { Typography, Button, Form, message, Input, Icon, Select } from 'antd';

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

function VideoUploadPage() {

    const [VideoTitle, setVideoTitle] = useState("");
    const [Description, setDescription] = useState("");
    const [Private, setPrivate] = useState(0);
    const [Category, setCategory] = useState("영화 & 애니메이션");

    const onTitleChange = (e) => {
        setVideoTitle(e.currentTarget.value);
    };
    
    const onDescriptionChange = (e) => {
        setDescription(e.currentTarget.value);
    };

    const onPrivateChange = (e) => {
        setPrivate(e.currentTarget.value);
    };

    const onCategoryChange = (e) => {
        setCategory(e.currentTarget.value);
    }

    return (
        <div style={{ maxWidth: '700px', margin: '2rem auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                <Title level={2}>🎬 비디오 업로드</Title>
            </div>
            <Form onsubmit>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    {/* Drop zone */}
                    <Dropzone 
                    onDrop 
                    multiple
                    maxSize>
                        {({ getRootProps, getInputProps }) => (
                            <div style={{ width: '300px', height: '240px', border: '1px solid lightgray', display: 'flex', alignItems: 'center', justifyContent: 'center'}} {...getRootProps()}>
                                <input {...getInputProps()}/>
                                <Icon type="plus" style={{ fontSize: '3rem' }} />
                            </div>
                        )}
                    </Dropzone>

                    {/* Thumbnail zone */}
                    <div>
                        <img src alt/>
                    </div>
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
            <Select onChange={onPrivateChange}>
                {PrivateOptions.map((item, index) => {
                    return <option key={item.index} value={item.label}>{item.label}</option>
                })}
            </Select>

            <br/>
            <br/>

            <label>카테고리</label>
            <Select onChange={onCategoryChange}>
                {CategoryOptions.map((item, index) => {
                    return <option key={item.index} value={item.label}>{item.label}</option>
                })}
            </Select>

            <br/>
            <br/>

            <Button type="primary" size="large" onClick>
                업로드
            </Button>


            </Form>
        </div>
    )
}

export default VideoUploadPage

