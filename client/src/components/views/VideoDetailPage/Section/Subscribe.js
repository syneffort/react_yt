import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { SUBSCRIBE_SERVER } from '../../../Config';

function Subscribe(props) {

    const [SubscribeNumber, setSubscribeNumber] = useState(0);
    const [Subscribed, setSubscribed] = useState(false)

    useEffect(() => {
        let variable = { userTo: props.userTo }
        axios.post(`${SUBSCRIBE_SERVER}/subscribeNumber`, variable)
            .then(response=> {
                if (response.data.success) {
                    setSubscribeNumber(response.data.SubscribeNumber);
                } else {
                    alert('구독자 수 가져오기에 실패했습니다.');
                }
            });

        let subscribedVariable = { userTo: props.userTo, userFrom: localStorage.getItem('userId') }
        
        axios.post(`${SUBSCRIBE_SERVER}/subscribed`, subscribedVariable)
            .then(response => {
                if (response.data.success) {
                    setSubscribed(response.data.subscribed);
                } else {
                    alert('구독 정보 가져오기에 실패했습니다.')
                }
            })
    }, [])

    return (
        <div>
            <button
                style={{ 
                    backgroundColor: Subscribed ? '#AAAAAA' : '#CC0000', borderRadius: '4px', 
                    color: 'white', padding: '10px 16px', border: 'none',
                    fontWeight: '500', fontSize: '1rem', textTransform: 'uppercase'
            }}
            onClick
            >
                {SubscribeNumber} {Subscribed ? '구독중' : '구독'}
            </button>
        </div>
    )
}

export default Subscribe
