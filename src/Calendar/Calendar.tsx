import type {Dayjs} from 'dayjs';
import React, {useEffect, useState} from 'react';
import {Calendar, theme} from 'antd';
import type {CalendarProps} from 'antd';
import './Calendar.css';
import {MonthCount} from "../MonthCount/MonthCount";
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';

const onPanelChange = (value: Dayjs, mode: CalendarProps<Dayjs>['mode']) => {
    console.log(value.format('YYYY-MM-DD'), mode);
    console.log(value.day());
};

export const CalendarContainer: React.FC = () => {
    const {token} = theme.useToken();
    const wrapperStyle: React.CSSProperties = {
        width: 300,
        border: `1px solid ${token.colorBorderSecondary}`,
        borderRadius: token.borderRadiusLG,
    };

    const [DayUtarg, ChangeDayUtarg] = useState(0)
    const [SelectedDay, ChangeSelectedDay] = useState('18-08-2023')
    const [DayDohodCount, ChangeDayDohodCount] = useState<string>('0')
    const onSelectHandler = (value: Dayjs) => {
        ChangeSelectedDay(value.format('DD-MM-YYYY'))
    }


    return (
        <div className={'CalPanel'}>
            <div style={wrapperStyle}>
                <Calendar  fullscreen={false} onSelect={onSelectHandler} onPanelChange={onPanelChange}/>
            </div>
            <div className={'infoCounts'}>
                <div className={'Utarg'}>Утарг:<MonthCount ChangeDayDohodCount={ChangeDayDohodCount} DayDohodCount={DayDohodCount} SelectedDay={SelectedDay} ChangeDayUtarg={ChangeDayUtarg}/></div>
                <div className={'Utarg'}>Заробітокза з утаргу:{DayUtarg}</div>
                <div className={'Utarg'}>Чайові:</div>
            </div>
        </div>
    );
};

