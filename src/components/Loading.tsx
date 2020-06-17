import React from 'react'
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import '../styles/loading.css'

export const Loading=()=>{
    const antIcon = <LoadingOutlined style={{ fontSize: 35 }} spin />;

    return (
        <div className='loading-wrapper'>
             <Spin indicator={antIcon} />
        </div>
       
    )
}


