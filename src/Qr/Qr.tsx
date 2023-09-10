import React from 'react';
import './Qr.css'
import {QRCode, Space} from 'antd';

export const Qr = () => {
    return (
        <Space className='qr' direction="vertical" align="center">
            <QRCode size={300} value={'https://serhiilototskyi.github.io/uSwejka/'} />
        </Space>
    );
};

