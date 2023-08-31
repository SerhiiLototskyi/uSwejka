import type {Dayjs} from 'dayjs';
import dayjs from 'dayjs';
import React, {ChangeEvent, useEffect, useState} from 'react';
import type {CalendarProps} from 'antd';
import {Calendar, theme} from 'antd';
import './Calendar.css';
import {DayUtargCount} from "../DayUtarg/DayUtarg";
import 'dayjs/locale/zh-cn';

const onPanelChange = (value: Dayjs, mode: CalendarProps<Dayjs>['mode']) => {

};

export const CalendarContainer: React.FC = () => {
    useEffect(() => {
        ChangeSelectedDay(dayjs().format('DD-MM-YYYY'))
        ChangeDayTips(Number(localStorage.getItem(dayjs().format('DD-MM-YYYY') + 'tips')))
        ChangeSelectedMonth(dayjs().format('MM-YYYY'))
    }, [])

    const {token} = theme.useToken();
    const wrapperStyle: React.CSSProperties = {
        border: `1px solid ${token.colorBorderSecondary}`,
        borderRadius: token.borderRadiusLG,
    };
    const [ActiveMode, ChangeActiveMode] = useState(false)
    const [DayTips, ChangeDayTips] = useState(0)
    const [MonthTips, ChangeMonthTips] = useState(0)
    const [DayUtarg, ChangeDayUtarg] = useState(0)
    const [SelectedDay, ChangeSelectedDay] = useState('')
    const [SelectedMonth, ChangeSelectedMonth] = useState('')
    const [DayDohodCount, ChangeDayDohodCount] = useState<string>('0')
    const [MonthUtarg, ChangeMonthUtarg] = useState(0)

    const OnActiveMode = () => {
        ChangeActiveMode(true)
        ChangeMonthTips(MonthTips - DayTips)

        localStorage.setItem(SelectedMonth + 'tips', (Number(localStorage.getItem(SelectedMonth + 'tips')) - DayTips).toString())
    }

    const onSelectHandler = (value: Dayjs) => {
        ChangeSelectedDay(value.format('DD-MM-YYYY'))
        ChangeSelectedMonth(value.format('MM-YYYY'))
    }

    const ChangeDayTipsHandler = (e: ChangeEvent<HTMLInputElement>) => {
        ChangeDayTips(Number(e.currentTarget.value))
    }
    const ChangeDayTipsBlurHandler = () => {
        ChangeActiveMode(false)
        ChangeMonthTips(MonthTips + DayTips)
        localStorage.setItem(SelectedDay + 'tips', DayTips.toString())
        localStorage.setItem(SelectedMonth + 'tips', (Number(localStorage.getItem(SelectedMonth + 'tips')) + DayTips).toString())
    }
    useEffect(() => {
        ChangeDayTips(Number(localStorage.getItem(SelectedDay + 'tips')))
    }, [SelectedDay])
    useEffect(() => {
        ChangeMonthUtarg(Number(localStorage.getItem(SelectedMonth)))
    }, [SelectedMonth])
    useEffect(() => {
        ChangeMonthTips(Number(localStorage.getItem(SelectedMonth + 'tips')))
    }, [SelectedMonth])
    return (
        <div className={'CalPanel'}>
            <div style={wrapperStyle}>
                <Calendar fullscreen={false} onSelect={onSelectHandler} onPanelChange={onPanelChange}/>
            </div>
            <div className={'infoCounts'}>
                <div>
                    <div className={'Utarg'}>Утарг:<DayUtargCount ChangeDayDohodCount={ChangeDayDohodCount}
                                                                  DayDohodCount={DayDohodCount}
                                                                  SelectedMonth={SelectedMonth}
                                                                  SelectedDay={SelectedDay}
                                                                  ChangeMonthUtarg={ChangeMonthUtarg}
                                                                  MonthUtarg={MonthUtarg}
                                                                  DayUtarg={DayUtarg}
                                                                  ChangeDayUtarg={ChangeDayUtarg}/></div>
                    <div className={'Utarg'}>Заробіток з утаргу:{DayUtarg}</div>
                    <div className={'Utarg'}>Чайові: {<div className={'DayCount'}>
                        {ActiveMode ?
                            <input autoFocus={true} onBlur={ChangeDayTipsBlurHandler} onChange={ChangeDayTipsHandler}
                                   type={"number"}/> :
                            <span onDoubleClick={OnActiveMode}>{DayTips}</span>}

                    </div>}</div>
                </div>
                <div>
                    <div>
                        Утарг за місяць:{MonthUtarg}
                    </div>
                    <div>
                        Дохід з утаргу за місяць:{(MonthUtarg / 100 * 5).toFixed(2)}
                    </div>
                    <div>
                        Чайові за місяць:{MonthTips}
                    </div>
                </div>
            </div>
        </div>
    );
};

