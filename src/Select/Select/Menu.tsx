import React from 'react';
import {Select, Space} from 'antd';
import {useNavigate} from "react-router-dom";


export const Menu = () => {
    const navigate = useNavigate()
    const handleChange = (value: string) => {
        navigate(`/${value}`)
    };
    return (
        <Space wrap>
            <Select
                defaultValue="Cash"
                style={{width: 120}}
                onChange={handleChange}
                options={[
                    {value: '', label: 'Cash'},
                    {value: 'tips', label: 'Tips'},
                    {value: 'share', label: 'Share'},
                ]}
            />
        </Space>
    )
}

