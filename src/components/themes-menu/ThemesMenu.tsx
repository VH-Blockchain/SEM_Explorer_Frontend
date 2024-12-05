import React, { useState, useEffect, useRef } from "react";

import { useTypedDispatch } from "../../hooks/typed";
import { setMode, setColor } from "../../store/themes/themes.slice";
import { ThemesMode, ThemesColors, ThemeMode, ThemeColor, LigthMode, DarkMode } from "../../store/themes/themesProps";

import './themes-menu.scss';
import { Button } from "@mui/base";

const ThemesMenu: React.FC = () => {
    const dispath = useTypedDispatch();

    const menu_ref = useRef<HTMLDivElement>(null);
    const menu_toggle_ref = useRef<HTMLButtonElement>(null);

    const [currentMode, setCurrentMode] = useState('ligth');
    const [currentColor, setCurrentColor] = useState('blue');
    const [tempTheme, setTempTheme] = useState(true);
    const [tempUpdate, setTempUpdate] = useState<any>(null)
    const [isActive, setIsActive] = useState(false);

    const openMenu = () => {
        if (!menu_ref.current) return;
        menu_ref.current.classList.add('active');
    };

    const closeMenu = () => {
        if (!menu_ref.current) return;
        menu_ref.current.classList.remove('active');
    };

    const openModal = () => {
        setIsActive(true);
    };

    const closeModal = () => {
        setIsActive(false);
    };

    const updateMode = (mode: ThemeMode) => {
        setCurrentMode(mode.id);
        localStorage.setItem('themeMode', mode.class);
        dispath(setMode(mode.class));
    };

    const updateColor = (color: ThemeColor) => {
        setCurrentColor(color.id);
        localStorage.setItem('colorMode', color.class);
        document.body.className = '';
        document.body.classList.add(color.class);
        dispath(setColor(color.class));
    }
    useEffect(() => {
        if (tempUpdate) {
            if (tempTheme) {
                localStorage.setItem('themeMode', LigthMode);
                dispath(setMode(LigthMode));
            }
            else {
                localStorage.setItem('themeMode', DarkMode);
                dispath(setMode(DarkMode));
            }
        }
    }, [tempUpdate])
    useEffect(() => {
        function assertIsNode(e: EventTarget | null): asserts e is Node {
            if (!e || !("nodeType" in e)) {
                throw new Error(`Node expected`);
            }
        }
        document.addEventListener('mousedown', (e) => {
            assertIsNode(e.target);
            // user click toggle
            if (menu_ref.current && menu_toggle_ref.current && menu_toggle_ref.current.contains(e.target)) {
                menu_ref.current.classList.toggle('active')
            } else {
                // user click outside toggle and content
                if (menu_ref.current && !menu_ref.current.contains(e.target)) {
                    menu_ref.current.classList.remove('active')
                }
            }
        })
    }, []);

    useEffect(() => {
        const themeClass = ThemesMode.find(theme => theme.class === localStorage.getItem('themeMode'));
        const colorClass = ThemesColors.find(color => color.class === localStorage.getItem('colorMode'));

        if (themeClass !== undefined) setCurrentMode(themeClass.id)
        if (colorClass !== undefined) setCurrentColor(colorClass.id)
        document.body.classList.add(colorClass?.class as string);
    }, []);

    return (
        <div className="header-right-wrap">
            {/* <Button className="nav-items btn SEM-chain-btn" onClick={() => window.open("https://SEMchain.io/", '_blank')}>Connect Wallet</Button> */}
            <Button className="light-dark-btn" onClick={() => { setTempTheme(!tempTheme); setTempUpdate(Math.random() * 5) }}>
                <svg className={`light-dark-img  light-img ${!tempTheme ? 'active' : ''}`} viewBox="0 0 24 24" width="20" height="20"><path fill="currentColor" d="M12,9c1.65,0,3,1.35,3,3s-1.35,3-3,3s-3-1.35-3-3S10.35,9,12,9 M12,7c-2.76,0-5,2.24-5,5s2.24,5,5,5s5-2.24,5-5 S14.76,7,12,7L12,7z M2,13l2,0c0.55,0,1-0.45,1-1s-0.45-1-1-1l-2,0c-0.55,0-1,0.45-1,1S1.45,13,2,13z M20,13l2,0c0.55,0,1-0.45,1-1 s-0.45-1-1-1l-2,0c-0.55,0-1,0.45-1,1S19.45,13,20,13z M11,2v2c0,0.55,0.45,1,1,1s1-0.45,1-1V2c0-0.55-0.45-1-1-1S11,1.45,11,2z M11,20v2c0,0.55,0.45,1,1,1s1-0.45,1-1v-2c0-0.55-0.45-1-1-1C11.45,19,11,19.45,11,20z M5.99,4.58c-0.39-0.39-1.03-0.39-1.41,0 c-0.39,0.39-0.39,1.03,0,1.41l1.06,1.06c0.39,0.39,1.03,0.39,1.41,0s0.39-1.03,0-1.41L5.99,4.58z M18.36,16.95 c-0.39-0.39-1.03-0.39-1.41,0c-0.39,0.39-0.39,1.03,0,1.41l1.06,1.06c0.39,0.39,1.03,0.39,1.41,0c0.39-0.39,0.39-1.03,0-1.41 L18.36,16.95z M19.42,5.99c0.39-0.39,0.39-1.03,0-1.41c-0.39-0.39-1.03-0.39-1.41,0l-1.06,1.06c-0.39,0.39-0.39,1.03,0,1.41 s1.03,0.39,1.41,0L19.42,5.99z M7.05,18.36c0.39-0.39,0.39-1.03,0-1.41c-0.39-0.39-1.03-0.39-1.41,0l-1.06,1.06 c-0.39,0.39-0.39,1.03,0,1.41s1.03,0.39,1.41,0L7.05,18.36z"></path></svg>
                <svg className={`light-dark-img  light-img ${tempTheme ? 'active' : ''}`} viewBox="0 0 24 24" width="20" height="20"><path fill="currentColor" d="M9.37,5.51C9.19,6.15,9.1,6.82,9.1,7.5c0,4.08,3.32,7.4,7.4,7.4c0.68,0,1.35-0.09,1.99-0.27C17.45,17.19,14.93,19,12,19 c-3.86,0-7-3.14-7-7C5,9.07,6.81,6.55,9.37,5.51z M12,3c-4.97,0-9,4.03-9,9s4.03,9,9,9s9-4.03,9-9c0-0.46-0.04-0.92-0.1-1.36 c-0.98,1.37-2.58,2.26-4.4,2.26c-2.98,0-5.4-2.42-5.4-5.4c0-1.81,0.89-3.42,2.26-4.4C12.92,3.04,12.46,3,12,3L12,3z"></path></svg>
            </Button>
            {/* <Button className="light-dark-btn" onClick={() => { setTempTheme(!tempTheme); setTempUpdate(Math.random() * 5) }}>
                <svg className={`light-dark-img  light-img ${!tempTheme ? 'active' : ''}`} viewBox="0 0 24 24" width="20" height="20"><path fill="currentColor" d="M12,9c1.65,0,3,1.35,3,3s-1.35,3-3,3s-3-1.35-3-3S10.35,9,12,9 M12,7c-2.76,0-5,2.24-5,5s2.24,5,5,5s5-2.24,5-5 S14.76,7,12,7L12,7z M2,13l2,0c0.55,0,1-0.45,1-1s-0.45-1-1-1l-2,0c-0.55,0-1,0.45-1,1S1.45,13,2,13z M20,13l2,0c0.55,0,1-0.45,1-1 s-0.45-1-1-1l-2,0c-0.55,0-1,0.45-1,1S19.45,13,20,13z M11,2v2c0,0.55,0.45,1,1,1s1-0.45,1-1V2c0-0.55-0.45-1-1-1S11,1.45,11,2z M11,20v2c0,0.55,0.45,1,1,1s1-0.45,1-1v-2c0-0.55-0.45-1-1-1C11.45,19,11,19.45,11,20z M5.99,4.58c-0.39-0.39-1.03-0.39-1.41,0 c-0.39,0.39-0.39,1.03,0,1.41l1.06,1.06c0.39,0.39,1.03,0.39,1.41,0s0.39-1.03,0-1.41L5.99,4.58z M18.36,16.95 c-0.39-0.39-1.03-0.39-1.41,0c-0.39,0.39-0.39,1.03,0,1.41l1.06,1.06c0.39,0.39,1.03,0.39,1.41,0c0.39-0.39,0.39-1.03,0-1.41 L18.36,16.95z M19.42,5.99c0.39-0.39,0.39-1.03,0-1.41c-0.39-0.39-1.03-0.39-1.41,0l-1.06,1.06c-0.39,0.39-0.39,1.03,0,1.41 s1.03,0.39,1.41,0L19.42,5.99z M7.05,18.36c0.39-0.39,0.39-1.03,0-1.41c-0.39-0.39-1.03-0.39-1.41,0l-1.06,1.06 c-0.39,0.39-0.39,1.03,0,1.41s1.03,0.39,1.41,0L7.05,18.36z"></path></svg>
                <svg className={`light-dark-img  light-img ${tempTheme ? 'active' : ''}`} viewBox="0 0 24 24" width="20" height="20"><path fill="currentColor" d="M9.37,5.51C9.19,6.15,9.1,6.82,9.1,7.5c0,4.08,3.32,7.4,7.4,7.4c0.68,0,1.35-0.09,1.99-0.27C17.45,17.19,14.93,19,12,19 c-3.86,0-7-3.14-7-7C5,9.07,6.81,6.55,9.37,5.51z M12,3c-4.97,0-9,4.03-9,9s4.03,9,9,9s9-4.03,9-9c0-0.46-0.04-0.92-0.1-1.36 c-0.98,1.37-2.58,2.26-4.4,2.26c-2.98,0-5.4-2.42-5.4-5.4c0-1.81,0.89-3.42,2.26-4.4C12.92,3.04,12.46,3,12,3L12,3z"></path></svg>
            </Button> */}

            {/* <div className="cus-network-btn">
                <Button onClick={openModal}><img src={SEMchainlogo} alt="chain-logo" /></Button>
                <ul className={isActive ? "active" : ""}>
                <li onClick={closeModal}><a className={isActive ? "active" : ""} href="/">SEMTestnet</a></li>
                    <Tooltip title="ComingSoon" placement="left-start" >
                        <li  onClick={closeModal}>SEMMainnet</li>
                    </Tooltip>

                </ul>
            </div> */}

            {/* <button ref={menu_toggle_ref} className="theme_menu__toggle" onClick={openMenu}>
                <i className='bx bx-palette' />
            </button> */}
            <div ref={menu_ref} className="theme-menu">
                <h4>Theme settings</h4>
                <button className="theme-menu__close" onClick={closeMenu}>
                    <i className='bx bx-x' />
                </button>
                <div className="theme-menu__select">
                    <span>Choose mode</span>
                    <ul className="mode-list">
                        {
                            ThemesMode.map((mode, index) => (
                                <li key={index} onClick={() => updateMode(mode)}>
                                    <div className={`mode-list__color ${mode.background} ${mode.id === currentMode ? 'active' : ''}`}>
                                        <i className='bx bx-check'></i>
                                    </div>
                                    <span>{mode.name}</span>
                                </li>
                            ))
                        }
                    </ul>
                    <div className="theme-menu__select">
                        {/* <span>Choose color</span> */}
                        <ul className="mode-list">
                            {
                                ThemesColors.map((color, index) => (
                                    <li key={index} onClick={() => {
                                        console.log(color);
                                        updateColor(color);
                                    }}>
                                        <div className={`mode-list__color ${color.background} ${color.id === currentColor ? 'active' : ''}`}>
                                            <i className='bx bx-check'></i>
                                        </div>
                                        <span>{color.name}</span>
                                    </li>
                                ))
                            }
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default ThemesMenu;