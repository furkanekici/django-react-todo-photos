import React, { useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import useLogout from '../hooks/useLogout'
/* Icons */
import { IconContext } from 'react-icons';
import { BsUiChecksGrid } from "react-icons/bs";
import { RiLogoutCircleFill } from "react-icons/ri";
import { MdPhotoSizeSelectActual } from "react-icons/md";

function Layout() {
    const [darkMode, setDarkMode] = useState(false);
    const [drawerOpen, setDrawerOpen] = useState(false);
    const navigate = useNavigate();
    const logout = useLogout();

    const key = localStorage.getItem('key');

    return (
        <div data-theme={darkMode ? "luxury" : "pastel"} className="drawer">
            {key && (
                <input id="my-drawer-3" type="checkbox" checked={drawerOpen} className="drawer-toggle" onChange={() => { setDrawerOpen(true) }} />
            )}
            <div className="drawer-content flex flex-col">
                <div className="w-full navbar ">
                    <div className="flex-none lg:hidden">
                        {key && (
                            <label htmlFor="my-drawer-3" className="btn btn-square btn-ghost">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-6 h-6 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
                            </label>
                        )}
                    </div>
                    <div className={darkMode ? "flex-1 font-medium ml-2 leading-tight text-l" : "flex-1 font-medium ml-2 leading-tight text-l text-pastel-blue"}>Todo Application</div>
                    <div className="flex-none hidden lg:flex flex-grow">
                        {!key ? (
                            <div className="flex flex-row justify-evenly items-center">
                            </div>
                        ) : (
                            <ul className="menu menu-horizontal">
                                <IconContext.Provider value={{ color: darkMode ? "#dca54c" : "#70acc7", className: "h-6 w-6" }}>
                                    <div className='tooltip tooltip-bottom' data-tip="Todo">
                                        <li><a onClick={() => {
                                            navigate('/todo');
                                        }}><BsUiChecksGrid /></a></li>
                                    </div>
                                </IconContext.Provider>
                                <IconContext.Provider value={{ color: darkMode ? "#dca54c" : "#70acc7", className: "h-6 w-6" }}>
                                    <div className='tooltip tooltip-bottom' data-tip="Photo">
                                        <li><a onClick={() => {
                                            navigate('/photo');
                                        }}><MdPhotoSizeSelectActual /></a></li>
                                    </div>
                                </IconContext.Provider>
                                <IconContext.Provider value={{ color: darkMode ? "#dca54c" : "#70acc7", className: "h-6 w-6" }}>
                                    <div className='tooltip tooltip-bottom' data-tip="Logout">
                                        <li><a onClick={() => {
                                            logout().then((res) => {
                                                if (res.status === 200) {
                                                    navigate('/login');
                                                }
                                            })
                                        }}><RiLogoutCircleFill /></a></li>
                                    </div>
                                </IconContext.Provider>
                            </ul>
                        )}
                    </div>
                    <div className='lg:px-5 tooltip tooltip-bottom' data-tip={darkMode ? "Light Mode" : "Dark Mode"}>
                        <label className='swap swap-rotate'>
                            <input type="checkbox" defaultChecked={darkMode} onChange={(e) => {
                                setDarkMode(e.target.checked);
                            }} />
                            <svg className="swap-on fill-current w-7 h-7" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" /></svg>
                            <svg className="swap-off fill-current w-7 h-7 text-pastel-blue" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" /></svg>
                        </label>
                    </div>
                </div>
                <div>
                    <Outlet context={[darkMode, setDarkMode]} />
                </div>
                <footer className='footer footer-center p-4 text-base-content'>
                    <div>
                        <p className={darkMode ? 'text-xs md:text-sm lg:text-base' : 'text-xs md:text-sm lg:text-base text-pastel-blue'}>
                            Copyright &copy; 2022 - All right reserved by Todo Application
                        </p>
                    </div>
                </footer>
            </div>
            {key && (
                <div className="drawer-side">
                    <label htmlFor="my-drawer-3" className="drawer-overlay"></label>
                    <ul className="menu p-4 overflow-y-auto w-80 bg-base-100">
                        <IconContext.Provider value={{ color: darkMode ? "#dca54c" : "#70acc7", className: "h-6 w-6" }}>
                            <li><a onClick={() => {
                                navigate('/todo');
                                setDrawerOpen(false);
                            }}><BsUiChecksGrid /> Todo</a></li>
                        </IconContext.Provider>
                        <IconContext.Provider value={{ color: darkMode ? "#dca54c" : "#70acc7", className: "h-6 w-6" }}>
                            <li><a onClick={() => {
                                navigate('/photo');
                                setDrawerOpen(false);
                            }}><MdPhotoSizeSelectActual /> Photo</a></li>
                        </IconContext.Provider>

                        <IconContext.Provider value={{ color: darkMode ? "#dca54c" : "#70acc7", className: "h-6 w-6" }}>
                            <li><a onClick={() => {
                                logout().then((res) => {
                                    if (res.status === 200) {
                                        navigate('/login');
                                    }
                                })
                                setDrawerOpen(false);
                            }}><RiLogoutCircleFill /> Logout</a></li>
                        </IconContext.Provider>
                    </ul>
                </div>
            )}
        </div>
    )
}

export default Layout;