import React from 'react';
import './App.css';
import logo from './img/szwejk-logo-svg.svg';
import {TipsCount} from "./TipsCount/TipsCount";
import {MonthCount} from "./MonthCount/MonthCount";
import {Route, Routes} from "react-router-dom";
import {Menu} from "./Select/Select/Menu";
import {PayrollCounter} from "./PayrollCounter/PayrollCounter";

function App() {


    return (
        <div className="App">
            <div className={'header'}>
                <img src={logo} alt=""/>
                <Menu/>
            </div>
            <div className="BodyContainer">
                <Routes>
                    <Route path="/tips" element={<TipsCount/>}/>
                    <Route path="/" element={<PayrollCounter/>}/>
                </Routes>

            </div>

        </div>
    );
}

export default App;
