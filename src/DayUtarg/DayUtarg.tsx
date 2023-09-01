import React, {ChangeEvent, useEffect, useState} from 'react';
import './DayUtarg.css';

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
            props.ChangeDayUtarg((Number(count) / 100 * 5))
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
    const ChangeDayUtargHandler = (e: ChangeEvent<HTMLInputElement>) => {
        ChangeActiveMode(false)
        props.ChangeDayUtarg((Number(props.DayDohodCount) / 100 * 5))
        localStorage.setItem(props.SelectedDay, props.DayDohodCount)
        props.ChangeMonthUtarg(props.MonthUtarg + Number(props.DayDohodCount))
        localStorage.setItem(props.SelectedMonth, (props.MonthUtarg + Number(props.DayDohodCount)).toString())
    }
    const ChangeDayCountHandler = (e: ChangeEvent<HTMLInputElement>) => {
        props.ChangeDayDohodCount(e.currentTarget.value)
    }

    return (
        <div className={'DayCount'}>
            {ActiveMode ? <input autoFocus={true} onBlur={ChangeDayUtargHandler} onChange={ChangeDayCountHandler}
                                 type={"number"}/> :
                <span onClick={OnActiveMode}>{props.DayDohodCount}</span>}

        </div>
    );
};

