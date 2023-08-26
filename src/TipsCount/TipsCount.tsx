import React, {useState} from 'react';
import {AddTipsBtn} from "../AddTipsBtn/addTipsBtn";
import './TipsContainer.css'
export const TipsCount = () => {

    const [AllDayTips, AddTips] = useState(Number(localStorage.getItem('allDayTips')))
    const clearTips = () => {
        AddTips(0)
        localStorage.setItem('allDayTips', (0).toString())

    }
    return (
        <div className='TipsContainer'>
            <div className="tipsPanel">
                <p className="Tips">{AllDayTips}</p>
            </div>
            <div className="Buttons">
                <div>
                    <AddTipsBtn AddTips={AddTips} AllDayTips={AllDayTips} number={5}/>
                    <AddTipsBtn AddTips={AddTips} AllDayTips={AllDayTips} number={10}/>
                    <AddTipsBtn AddTips={AddTips} AllDayTips={AllDayTips} number={20}/>
                </div>
                <div>
                    <AddTipsBtn AddTips={AddTips} AllDayTips={AllDayTips} number={30}/>
                    <AddTipsBtn AddTips={AddTips} AllDayTips={AllDayTips} number={40}/>
                    <AddTipsBtn AddTips={AddTips} AllDayTips={AllDayTips} number={50}/>
                </div>
            </div>
            <p className='clear' onClick={() => clearTips()}>x</p>
        </div>
    );
};

