import React, {ChangeEvent, useEffect, useState} from 'react';
import './DayUtarg.css';
import {EditOutlined} from "@ant-design/icons";
import Input from "antd/es/input/Input";

type DayUtarg = {
    ChangeDayUtarg: (count: number) => void
    SelectedDay: string
    DayDohodCount: string
    ChangeDayDohodCount: (count: string) => void
    ChangeMonthUtarg: (count: number) => void
    SelectedMonth: string
    MonthUtarg: number
    DayUtarg: number
}

export const DayUtargCount = (props: DayUtarg) => {
    useEffect(() => {
        let count = localStorage.getItem(props.SelectedDay)
        if (count) {
            props.ChangeDayDohodCount(count)
            props.ChangeDayUtarg((Number(count) / 100 * 6))
        } else {
            props.ChangeDayDohodCount('0')
            props.ChangeDayUtarg(0)
        }
    }, [props.SelectedDay])


    const [ActiveMode, ChangeActiveMode] = useState(false)
    const OnActiveMode = () => {
        ChangeActiveMode(true)
        props.ChangeMonthUtarg(props.MonthUtarg - Number(props.DayDohodCount))
        localStorage.setItem(props.SelectedMonth, (props.MonthUtarg + Number(props.DayDohodCount)).toString())
    }
    const ChangeDayUtargHandler = () => {
        ChangeActiveMode(false)
        props.ChangeDayUtarg((Number(props.DayDohodCount) / 100 * 6))
        localStorage.setItem(props.SelectedDay, props.DayDohodCount)
        props.ChangeMonthUtarg(props.MonthUtarg + Number(props.DayDohodCount))
        localStorage.setItem(props.SelectedMonth, (props.MonthUtarg + Number(props.DayDohodCount)).toString())
    }
    const ChangeDayCountHandler = (e: ChangeEvent<HTMLInputElement>) => {
        props.ChangeDayDohodCount(e.currentTarget.value)
    }
    // @ts-ignore
    const onKeyPress = (e: KeyboardEventHandler<HTMLInputElement>) => {
        if (e.key === "Enter") {
            ChangeDayUtargHandler()
        }
    }
    return (
        <div className={'DayCount'}>
            {ActiveMode ?
                <Input className='input'
                       autoFocus={true}
                       onChange={ChangeDayCountHandler}
                       onBlur={ChangeDayUtargHandler}
                       placeholder="Zapisz utarg"
                       maxLength={5}
                       onKeyPress={onKeyPress}
                />
                :
                <span>{props.DayDohodCount}</span>}
            <EditOutlined style={{fontSize: '35px', paddingLeft: '40px'}} onClick={OnActiveMode}/>
        </div>
    );
};

