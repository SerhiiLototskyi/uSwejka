import React, {useEffect} from 'react';
import './App.css';
import logo from './img/u-szwejka.png';
import {TipsCount} from "./TipsCount/TipsCount";
import {Route, Routes, useNavigate} from "react-router-dom";
import {Menu} from "./Select/Select/Menu";
import {PayrollCounter} from "./PayrollCounter/PayrollCounter";
import {Qr} from "./Qr/Qr";
import background from "./img/bgsw.jpg";

function App() {
    const navigate = useNavigate()
    useEffect(() => {
        navigate('/')
    }, [])
    return (
        <div className="App">
            <img className='bg' src={background} alt=""/>
              <div className={'header'}>
                  <img className={'logo'} src={logo} alt=""/>
                  <Menu/>
              </div>
              <div className="BodyContainer">
                  <Routes>
                      <Route path="/tips" element={<TipsCount/>}/>
                      <Route path="/" element={<PayrollCounter/>}/>
                      <Route path="/share" element={<Qr/>}/>
                  </Routes>

              </div>

          </div>
    );
}

export default App;
