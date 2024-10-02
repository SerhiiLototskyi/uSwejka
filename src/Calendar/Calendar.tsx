import type {Dayjs} from 'dayjs';
import dayjs from 'dayjs';
import React, {ChangeEvent, useEffect, useState} from 'react';
import type {CalendarProps} from 'antd';
import {Calendar, ConfigProvider, theme} from 'antd';
import './Calendar.css';
import {DayUtargCount} from "../DayUtarg/DayUtarg";
import {EditOutlined} from '@ant-design/icons';
import Input from 'antd/es/input/Input';
import plPL from 'antd/locale/pl_PL';
import {DropdownButton} from "../Dropdown/Dropdown";

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
        width: 300,
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
     // @ts-ignore
    const onKeyPress = (e: KeyboardEventHandler<HTMLInputElement>) => {
        if(e.key === "Enter"){
            ChangeDayTipsBlurHandler()
        }
    }

    return (
       <div className={'CalPanel'}>
            <div style={wrapperStyle}>
                <ConfigProvider
                    theme={{
                        components: {
                            Calendar: {
                                colorPrimary: '#a29c98',
                                fullBg: "#f7f7f8",
                                fullPanelBg: "#f7f7f8",

                            },
                        },
                    }}
                >
                    <ConfigProvider locale={plPL}>
                    <Calendar fullscreen={false} onSelect={onSelectHandler} onPanelChange={onPanelChange}/>
                    </ConfigProvider>
                </ConfigProvider>

            </div>

            <div className={'infoCounts'}>
                <div>
                    <div className={'Utarg'}>Utarg - <DayUtargCount ChangeDayDohodCount={ChangeDayDohodCount}
                                                                  DayDohodCount={DayDohodCount}
                                                                  SelectedMonth={SelectedMonth}
                                                                  SelectedDay={SelectedDay}
                                                                  ChangeMonthUtarg={ChangeMonthUtarg}
                                                                  MonthUtarg={MonthUtarg}
                                                                  DayUtarg={DayUtarg}
                                                                  ChangeDayUtarg={ChangeDayUtarg}/>
                    </div>
                    <div className={'Utarg'}>Zarobki z utargu - {DayUtarg}</div>
                    <div className={'Utarg'}>Napiwek -  {<div className={'DayCount'}>
                        {ActiveMode ?
                            <Input
                                className='input-napiwek'
                                autoFocus={true}
                                onChange={ChangeDayTipsHandler}
                                onBlur={ChangeDayTipsBlurHandler}
                                onKeyPress={onKeyPress}
                                placeholder="Zapisz napiwek"
                                maxLength={3}
                            />
                            /*<input autoFocus={true} onBlur={ChangeDayTipsBlurHandler} onChange={ChangeDayTipsHandler}
                                   type={"number"}/>*/ :
                            <span >{DayTips}</span>}

                    </div>}
                        <EditOutlined style={{  fontSize: '35px', paddingLeft: '40px' }} onClick={OnActiveMode}/>
                    </div>
                </div>
                <div>
                    <div>
                        Utarg za miesiąc - {MonthUtarg}
                    </div>
                    <div>
                        Zarobki za miesiąc - {(MonthUtarg / 100 * 6).toFixed(2)}
                    </div>
                    <div>
                        Napiwek za miesiąc - {MonthTips}
                    </div>
                </div>
            </div>
        </div>

    );
};

