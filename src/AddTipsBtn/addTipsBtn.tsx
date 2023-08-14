import React from 'react';

type propsType = {
    number: number
    AddTips: (n:number) => void
    AllDayTips: any
}

export const AddTipsBtn = (props: propsType) => {
    const addTip = () => {
        props.AddTips(props.AllDayTips + props.number)
        localStorage.setItem('allDayTips', (props.AllDayTips + props.number).toString())
    }
    return (
        <button onClick={() => {
            addTip()
        }}>{props.number}
        </button>
    )
}