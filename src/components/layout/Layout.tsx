import React, { useEffect } from "react";
import { BrowserRouter as Router } from 'react-router-dom';
import { useTypedSelector, useTypedDispatch } from "../../hooks/typed";

import { selectThemes, setMode, setColor } from "../../store/themes/themes.slice";

import Header from "../header/Header";
import Footer from "../footer/Footer";
import Pages from "../Pages";

import './layout.scss';

import textureBg2 from "../../images/texture-bg-2.svg";
import textureBg1 from "../../images/texture-bg-1.svg";
import textureBg from "../../images/texture-bg.svg";
import walletone from '../../images/walletOne.svg'
import { Button, Tooltip } from "@mui/material"

const Layout: React.FC = () => {

    const themesReducer = useTypedSelector(selectThemes);
    const dispath = useTypedDispatch();

    useEffect(() => {
        const themeClass = localStorage.getItem('themeMode') || 'theme-mode-light';
        const colorClass = localStorage.getItem('colorMode') || 'theme-color-orange';

        dispath(setMode(themeClass));
        dispath(setColor(colorClass));

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    

    return (
        <Router>
            <div className={`layout ${themesReducer.mode} ${themesReducer.color}`}>
                <div className="layout__content">
                    {/* <div className="overlay-sec"></div> */}
                    <Header />
                    <div className="layout__content-main">
                        <div className="texture-bg-wrape">
                        </div>
                        <Pages />
                        {/* <div className="mic">
                            <Button onClick={AddMetamask}><img src={walletone} alt="walletone" className='matamask-btn' /></Button>
                            <div className="mic-shadow"></div>
                        </div> */}
                        {/* <div className="matamask-btn-main">
                            <p>Add SEMNetwork</p>
                            <Button onClick={AddMetamask}><img src={walletone} alt="walletone" className='matamask-btn' /></Button>
                        </div> */}
                    </div>
                    <Footer />
                </div>
                {/* <div className="layout__footer">
                    <h3>Powered by BscScan APIs</h3>
                </div> */}
            </div>
        </Router>
    )
};

export default Layout;