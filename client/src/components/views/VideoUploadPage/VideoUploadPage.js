import React from 'react';
import Dropzone from 'react-dropzone';
import { Typography, Button, Form, message, Input, Icon } from 'antd';

const { Title } = Typography;
const { TextArea } = Input;

function VideoUploadPage() {
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

            <Input onChange value/>

            <br/>
            <br/>
            
            <label>설명</label>
            <TextArea onChange value/>

            <br/>
            <br/>

            <select onChange>
                <option value></option>
            </select>

            <br/>
            <br/>

            <select onChange>
                <option value></option>
            </select>

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

