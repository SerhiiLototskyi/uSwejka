import type {Dayjs} from 'dayjs';
import React, {useState} from 'react';
import {Calendar, theme} from 'antd';
import type {CalendarProps} from 'antd';
import './Calendar.css';
import {MonthCount} from "../MonthCount/MonthCount";

const onPanelChange = (value: Dayjs, mode: CalendarProps<Dayjs>['mode']) => {
    console.log(value.format('YYYY-MM-DD'), mode);
    console.log(value.day());
};
const onSelectHandler = (value: Dayjs) => {
    console.log(value.date())
    console.log(value.get("month"))
}
export const CalendarContainer: React.FC = () => {
    const {token} = theme.useToken();

    const wrapperStyle: React.CSSProperties = {
        width: 300,
        border: `1px solid ${token.colorBorderSecondary}`,
        borderRadius: token.borderRadiusLG,
    };
    const [DayUtarg, ChangeDayUtarg] = useState(0)

    return (
        <div className={'CalPanel'}>
            <div style={wrapperStyle}>
                <Calendar fullscreen={false} onSelect={onSelectHandler} onPanelChange={onPanelChange}/>
            </div>
            <div className={'infoCounts'}>
                <div className={'Utarg'}>Утарг:<MonthCount ChangeDayUtarg={ChangeDayUtarg}/></div>
                <div className={'Utarg'}>Заробітокза день:{DayUtarg}</div>
                <div className={'Utarg'}>Чайові:</div>
            </div>
        </div>
    );
};

