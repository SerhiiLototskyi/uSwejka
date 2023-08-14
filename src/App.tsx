import React, {useEffect, useState} from 'react';
import './App.css';
import logo from './img/szwejk-logo-svg.svg';
import {AddTipsBtn} from "./AddTipsBtn/addTipsBtn";

function App() {

    const [AllDayTips, AddTips] = useState(Number(localStorage.getItem('allDayTips')))

    const clearTips = () => {
        AddTips(0)
        localStorage.setItem('allDayTips', (0).toString())

    }
    return (
        <div className="App">
            <img src={logo} alt=""/>
            <div className="tipsPanel">
                <p className="Tips">{AllDayTips}</p>
            </div>
            <div className="Buttons">
                <AddTipsBtn AddTips={AddTips} AllDayTips={AllDayTips} number={5}/>
                <AddTipsBtn AddTips={AddTips} AllDayTips={AllDayTips} number={10}/>
                <AddTipsBtn AddTips={AddTips} AllDayTips={AllDayTips} number={20}/>
                <AddTipsBtn AddTips={AddTips} AllDayTips={AllDayTips} number={30}/>
                <AddTipsBtn AddTips={AddTips} AllDayTips={AllDayTips} number={40}/>
                <AddTipsBtn AddTips={AddTips} AllDayTips={AllDayTips} number={50}/>
                <p className='clear' onClick={() => clearTips()}>x</p>
            </div>
        </div>
    );
}

export default App;
